import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  
  export const EmailPayout = ({ sellerEmail, amount }) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Your payout request has been received</Preview>
        <Container style={container}>
          <Section style={headerSection}>
            <Img
              src={`${baseUrl}/logo.png`}
              width="150"
              alt="DIGISTORE Logo"
              style={logo}
            />
          </Section>
  
          <Section>
            <Text style={heading}>Payout Request Confirmation</Text>
            <Text style={text}>Dear {sellerEmail},</Text>
            <Text style={text}>
              We’re pleased to inform you that your payout request of <strong>${amount}</strong> has been received.
              Our team is now processing your request, and the funds will be transferred to your PayPal account within 3-5 business days.
            </Text>
          </Section>
  
          <Section style={infoBox}>
            <Text style={infoText}><strong>Payout Details</strong></Text>
            <Text style={infoText}>💰 Amount: <strong>${amount}</strong></Text>
            <Text style={infoText}>📧 PayPal Email: {sellerEmail}</Text>
            <Text style={infoText}>⏳ Estimated Processing Time: 3-5 business days</Text>
          </Section>
  
          <Section>
            <Text style={text}>Thank you for choosing DIGISTORE. We appreciate your business!</Text>
          </Section>
  
          <Section style={footerSection}>
            <Text style={footerText}>© {new Date().getFullYear()} DIGISTORE. All rights reserved.</Text>
            <Text style={footerText}>
              <Link href="" style={footerLink}>Terms of Service</Link> | 
              <Link href="" style={footerLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default EmailPayout;
  
  const main = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: "#f9f9f9",
    padding: "20px",
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px",
    width: "600px",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };
  
  const headerSection = { textAlign: "center", paddingBottom: "20px" };
  const logo = { display: "block", margin: "0 auto" };
  const heading = { fontSize: "22px", fontWeight: "bold", textAlign: "center" };
  const text = { fontSize: "14px", margin: "10px 0", color: "#333" };
  
  const infoBox = {
    backgroundColor: "#f3f3f3",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "15px",
  };
  const infoText = { fontSize: "14px", margin: "5px 0", color: "#444" };
  
  const link = { color: "#007bff", textDecoration: "none" };
  
  const footerSection = {
    marginTop: "30px",
    paddingTop: "10px",
    borderTop: "1px solid #ddd",
    textAlign: "center",
  };
  
  const footerText = { fontSize: "12px", color: "#777" };
  const footerLink = { color: "#007bff", textDecoration: "none", margin: "0 5px" };