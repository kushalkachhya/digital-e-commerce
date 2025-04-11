import { db } from "../../../configs/db";
import { orderTable, payoutTable, productsTable, usersTable } from "../../../configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const user = await currentUser();

    try {
        const [userData] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const result = await db.select().from(orderTable)
            .innerJoin(productsTable, eq(orderTable.productId, productsTable.id))
            .innerJoin(usersTable, eq(usersTable.email, productsTable.createdBy))
            .where(
                and(
                    eq(usersTable.email, user?.primaryEmailAddress?.emailAddress),
                    gt(orderTable.createdAt, userData.lastPayoutDate || new Date(0))
                ));

        const orderList = Array.isArray(result) ? result : [];
        let newEarnings = 0;

        orderList.forEach((order) => {
            const price = order.products.price;
            newEarnings += price;
        });

        let totalEarnings = userData.totalEarnings ?? 0;
        let withdrawableBalance = userData.withdrawableBalance ?? 0;
        let totalWithdrawnBalance = userData.totalWithdrawnBalance ?? 0;

        if (!userData.hasWithdrawn) {
            // Calculate fresh values from orders
            const earnings = orderList.reduce((sum, order) => sum + order.products.price, 0);
            const commissionRate = 0.10;
            totalEarnings = earnings;
            withdrawableBalance = earnings - (earnings * commissionRate);

            const payouts = await db
                .select()
                .from(payoutTable)
                .where(eq(payoutTable.paypalEmail, userData.email));

            totalWithdrawnBalance = payouts.reduce((sum, payout) => sum + payout.amount, 0);

            // Optional: update user table with calculated balances
            await db
                .update(usersTable)
                .set({
                    totalEarnings,
                    withdrawableBalance,
                    totalWithdrawnBalance,
                    hasWithdrawn: true
                })
                .where(eq(usersTable.email, userData.email));
        }

        // ✅ Always return a full response
        return NextResponse.json({
            orderList,
            totalEarnings,
            withdrawableBalance,
            totalWithdrawnBalance,
            paypalEmail: userData.paypalEmail || ""
        });

    } catch (err) {
        console.error("Error in analytics/route.jsx:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
