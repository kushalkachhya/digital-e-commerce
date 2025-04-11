import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { cartTable, orderTable, productsTable } from "../../../configs/schema";
import { desc, eq, getTableColumns, or } from "drizzle-orm";
import { Resend } from "resend";
import EmailOrder from "../../../emails/welcome-email";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  //Get order details
  const { orderDetail, email } = await req.json();
  //Insert record to order table
  let orderList = [];
  orderDetail.forEach((order) => {
    orderList.push({
      email: email,
      productId: order?.productId
    })
  });

  const result = await db.insert(orderTable)
    .values(orderList);

  const deleteResult = await db.delete(cartTable)
    .where(eq(cartTable.email, email));

  //Send email
  const sendEmailResult = await SendEmail(orderDetail, email);

  //Delete user cart item
  return NextResponse.json(result);
}


async function SendEmail(orderDetail, userEmail, totalAmount) {
  const calculateTotal = () => {
    let total = 0;
    orderDetail.forEach(item => {
      total = total + Number(item?.price)
    })
    return total;
  }

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "kushalkachhiya@gmail.com",
      subject: 'Order Delivery Receipt',
      react: <EmailOrder orderDetail={orderDetail} totalAmount={calculateTotal()} />,
    });

    console.log('Email Sent:', response);
  } catch (error) {
    console.error('Email send error:', error);
  }
}

SendEmail();

// used to ge t user order list

export async function GET(req) {

  const user=await currentUser();

  const result=await db.select({
    ...getTableColumns(productsTable)
  }).from(orderTable)
  .innerJoin(productsTable,eq(productsTable.id,orderTable.productId))
  .where(eq(orderTable.email,user?.primaryEmailAddress?.emailAddress))
  .orderBy(desc(orderTable.id))

  return NextResponse.json(result);
}

