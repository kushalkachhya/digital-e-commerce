import { eq } from "drizzle-orm";
import { db } from "../../../configs/db";
import { usersTable, payoutTable } from "../../../configs/schema";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import EmailPayout from '../../../emails/payout-email'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const user = await currentUser();

        // Saving PayPal Email
        if (body.paypalEmail) {
            const { paypalEmail } = body;

            if (!paypalEmail) {
                return new Response(JSON.stringify({ error: "PayPal email is required" }), { status: 400 });
            }

            await db.update(usersTable)
                .set({ paypalEmail })
                .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

            return new Response(JSON.stringify({ success: true, message: "PayPal email saved successfully" }), { status: 200 });
        }

        // Processing Payout Request
        const { sellerEmail, amount } = body;
        if (!sellerEmail) {
            return new Response(JSON.stringify({ error: "Seller email is missing" }), { status: 400 });
        }

        // PayPal Authentication
        const auth = Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString("base64");

        const tokenRes = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const accessToken = tokenRes.data.access_token;

        // Send Payout
        const payoutRes = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/payments/payouts",
            {
                sender_batch_header: {
                    sender_batch_id: `batch_${Date.now()}`,
                    email_subject: "You have received a payout!",
                },
                items: [
                    {
                        recipient_type: "EMAIL",
                        receiver: sellerEmail,
                        amount: { value: amount, currency: "USD" },
                        note: "Payout from our platform",
                        sender_item_id: `payout_${Date.now()}`,
                    }
                ]
            },
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );

        const payoutId = payoutRes.data.batch_header.payout_batch_id;

        // Fetch user details
        const [seller] = await db.select().from(usersTable).where(eq(usersTable.paypalEmail, sellerEmail));

        if (!seller) {
            return new Response(JSON.stringify({ error: "User with this PayPal email not found" }), { status: 400 });
        }

        // Update user's balances and last payout date
        const newTotalWithdrawnBalance = (seller.totalWithdrawnBalance || 0) + amount;

        await db
            .update(usersTable)
            .set({
                totalEarnings: 0,
                withdrawableBalance: 0,
                totalWithdrawnBalance: newTotalWithdrawnBalance,
                lastPayoutDate: new Date()
            })
            .where(eq(usersTable.email, sellerEmail));


        // Store in database
        await db.insert(payoutTable).values({
            paypalEmail: seller.email,
            amount: amount,
            transactionId: payoutId,
            status: "Success",
            createdAt: new Date(),
        });


        // ✅ Send Email Notification to Seller
        await sendPayoutEmail(sellerEmail, amount);

        return new Response(JSON.stringify({ success: true, message: "Payout successful!" }), { status: 200 });

    } catch (error) {
        console.error("Payout Error:", error.response?.data || error.message);
        return new Response(JSON.stringify({ error: "Payout failed" }), { status: 500 });
    }
}

// Function to send payout email
async function sendPayoutEmail(sellerEmail, amount) {
    try {
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'kushalkachhiya@gmail.com',
            subject: 'Payout Request Received',
            react: <EmailPayout sellerEmail={sellerEmail} amount={amount} />,
        });

        console.log('Payout Email Sent:', response);
    } catch (error) {
        console.error('Email send error:', error);
    }
}


export async function GET(req) {
    try {
        const user = await currentUser();
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const [userData] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

        if (!userData) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Fetch user's payout history
        const payouts = await db
            .select()
            .from(payoutTable)
            .where(eq(payoutTable.paypalEmail, userData.email));

        const totalWithdrawn = payouts.reduce((sum, payout) => sum + payout.amount, 0);

        return new Response(JSON.stringify({
            email: userData.email,
            paypalEmail: userData.paypalEmail || "", // Ensure PayPal email is included
            payoutHistory: payouts,
            totalWithdrawnBalance: totalWithdrawn
        }), { status: 200 });

    } catch (error) {
        console.error("Error fetching payout history:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch payout history" }), { status: 500 });
    }
}
