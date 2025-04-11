import React from "react";

export default function ContactConfirmationEmail({ name }) {
  return (
    <div>
      <h2>Hi {name},</h2>
      <p>Thank you for contacting us! 🎉</p>
      <p>
        We've received your inquiry and will get back to you as soon as possible.
        If this matter is urgent, feel free to reply directly to this email.
      </p>
      <p>Have a great day!</p>
      <br />
      <p>– DIGISTORE</p>
    </div>
  );
}
