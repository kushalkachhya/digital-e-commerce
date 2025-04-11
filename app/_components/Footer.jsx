"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

function Footer() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [inquiryType, setInquiryType] = useState("General Inquiry");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !inquiryType || !message) {
          alert("Please fill in all fields.");
          return;
        }
      
        setLoading(true);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, inquiryType, message }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setSuccess(true);
      
            // Reset form
            setName("");
            setEmail("");
            setInquiryType("General Inquiry");
            setMessage("");
      
            toast("Report submitted successfully!", {
                style: {
                  background: "white",
                  color: "black",
                },
              });
              


            // Close the dialog
            setOpen(false);
      
          } else {
            alert(data.error || "Something went wrong.");
          }
        } catch (error) {
          console.error("Submit error:", error);
          alert("Failed to submit.");
        } finally {
          setLoading(false);
        }
      };
      


    return (
        <footer className="bg-primary border-t-4 border-black text-black py-12 relative">
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">

                {/* Column 1: Company Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Company</h2>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/about" className="px:2 p-1 cursor-pointer hover:border-2 hover:rounded-md hover:border-white">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="px:2 p-1 cursor-pointer hover:border-2 hover:rounded-md hover:border-white ">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Support */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Support</h2>
                    <ul className="space-y-3">
                        <li>
                            <span
                                className="px:2 p-1 cursor-pointer hover:border-2 hover:border-white hover:rounded-md"
                                onClick={() => setOpen(true)}
                            >
                                Contact Us
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex justify-center md:justify-start space-x-4">
                        {[
                            { icon: FaFacebookF, link: "https://www.facebook.com/", color: "hover:bg-blue-600" },
                            { icon: FaInstagram, link: "https://www.instagram.com/", color: "hover:bg-pink-500" },
                            { icon: FaLinkedinIn, link: "https://www.linkedin.com/", color: "hover:bg-blue-500" },
                            { icon: FaTwitter, link: "https://twitter.com/", color: "hover:bg-blue-400" },
                        ].map(({ icon: Icon, link, color }, index) => (
                            <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 rounded-full bg-black text-white ${color} transition-all duration-300`}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 text-center text-black text-sm">
                <p>© {new Date().getFullYear()} Digi Store. All rights reserved.</p>
            </div>

            {/* Contact Us Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[90vw] max-w-[600px] p-6 rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Contact Us</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Have questions or need help? Our team is here for you!
                        </DialogDescription>
                    </DialogHeader>

                    {/* Contact Form */}
                    <form className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="yourname@example.com"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Inquiry Type Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
                            <select value={inquiryType} onChange={(e) => setInquiryType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Billing & Payments</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Message Box */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                placeholder="Describe your issue or question..."
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Response Time Info */}
                        <p className="text-gray-500 text-sm">
                            We typically respond within 24-48 hours.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleSubmit} disabled={loading} className="bg-black hover:text-black text-white">
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>

                        {/* Success Message */}
                        {success && <p className="text-green-500 text-center mt-2">Message sent successfully!</p>}
                    </form>
                </DialogContent>
            </Dialog>
        </footer>
    );
}

export default Footer