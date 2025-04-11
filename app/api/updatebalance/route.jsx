import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../configs/db";
import { usersTable, orderTable, productsTable } from "../../../configs/schema";
import { eq, and, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const reset = searchParams.get("reset");

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
        return NextResponse.json({ error: "No user email found" }, { status: 400 });
    }

    const [userData] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, userEmail));

    if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🧮 Get all new orders since last payout
    const result = await db
        .select()
        .from(orderTable)
        .innerJoin(productsTable, eq(orderTable.productId, productsTable.id))
        .where(
            and(
                eq(productsTable.createdBy, userEmail),
                gt(orderTable.createdAt, userData.lastPayoutDate || new Date(0))
            )
        );

    const newOrders = Array.isArray(result) ? result : [];

    let earnings = 0;
    newOrders.forEach((order) => {
        earnings += order.products.price;
    });

    const commission = 0.10;
    const withdrawable = earnings - earnings * commission;

    if (reset === "true") {
        // 👉 Payout reset
        const updatedWithdrawnBalance =
            Number(userData.totalWithdrawnBalance ?? 0) +
            Number(userData.withdrawableBalance ?? 0);

        const result = await db
            .update(usersTable)
            .set({
                totalEarnings: 0,
                withdrawableBalance: 0,
                totalWithdrawnBalance: updatedWithdrawnBalance,
                lastPayoutDate: new Date(),
            })
            .where(eq(usersTable.email, userEmail))
            .returning();

        return NextResponse.json({
            message: "Balance reset successful",
            updated: result,
        });
    } else {
        // 👉 Update earnings & withdrawableBalance
        const result = await db
            .update(usersTable)
            .set({
                totalEarnings: earnings,
                withdrawableBalance: withdrawable,
            })
            .where(eq(usersTable.email, userEmail))
            .returning();

        return NextResponse.json({
            message: "Earnings updated successfully",
            updated: result,
        });
    }
}
