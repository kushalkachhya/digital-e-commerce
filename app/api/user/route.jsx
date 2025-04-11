import { eq } from "drizzle-orm";
import { db } from "../../../configs/db";
import { usersTable } from "../../../configs/schema";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {

    const { user } = await req.json();
    // Check if user already exist
    const userData = await db.select().from(usersTable)
        .where((eq(usersTable.email, user?.primaryEmailAddress.emailAddress)));

    if (userData?.length <= 0) {
        // if not then insert new user to DB
        const result = await db.insert(usersTable).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            image: user?.imageUrl,
            paypalEmail: user?.paypalEmail || ""
        }).returning(usersTable)
        return NextResponse.json(result[0])
    }


    return NextResponse.json(userData[0]);
}

export async function GET(req) {
    const user = await currentUser();

    try {
        const result = await db
            .select({
                totalEarnings: usersTable.totalEarnings, // Ensure correct column name
                withdrawableBalance: usersTable.withdrawableBalance, // Ensure correct column name
                totalWithdrawnBalance: usersTable.totalWithdrawnBalance,
                paypalEmail: usersTable.paypalEmail
            })
            .from(usersTable)
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))
            .limit(1);


        console.log("fetched user data:", result)

        if (!result || result.length === 0) {
            return NextResponse.json({ totalEarnings: 0, withdrawableBalance: 0,totalWithdrawnBalance: 0, paypalEmail: "" });
        }

        return NextResponse.json(result[0]);

    } catch (e) {
        return NextResponse.json({ totalEarnings: 0, withdrawableBalance: 0, totalWithdrawnBalance: 0, paypalEmail: "" });
    }
}