import { db } from "../../../configs/db";
import { contactUsTable } from "../../../configs/schema";
import { Resend } from "resend";
import ContactConfirmationEmail from "../../../emails/contact-confirmation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, inquiryType, message } = await req.json();

    if (!name || !email || !inquiryType || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Insert into DB
    await db.insert(contactUsTable).values({ name, email, inquiryType, message });

    // Send confirmation email to user
    await resend.emails.send({
      from: "onboarding@resend.dev", // change this to your verified domain
      to: 'kushalkachhiya@gmail.com',
      subject: "We've received your inquiry!",
      react: ContactConfirmationEmail({ name }),
    });

    return new Response(JSON.stringify({ success: true, message: "Inquiry submitted successfully!" }), { status: 201 });
  } catch (error) {
    console.error("Error saving contact form:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
