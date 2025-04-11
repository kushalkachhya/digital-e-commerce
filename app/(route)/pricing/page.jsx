"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle, FaMoneyBillWave, FaStar, FaArrowRight } from "react-icons/fa";
import Footer from "../../_components/Footer"

const Pricing = () => {
  const [sales, setSales] = useState(10);
  const fee = sales * 0.1;

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-x-hidden">
      {/* Hero Section with Advanced Animation */}
      <header className="relative w-full bg-green-700 py-32 text-center text-black rounded-bl-2xl rounded-br-2xl">

        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="text-6xl text-white font-extrabold drop-shadow-md"
        >
          Sell with Ease 🚀
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4, duration: 1 }} 
          className="mt-4 text-white text-xl opacity-90"
        >
          No monthly fees, only 10% per sale.
        </motion.p>
      </header>

      {/* Pricing Card with Glassmorphism & Hover Effect */}
      <motion.div className="flex justify-center -mt-12 px-4" whileHover={{ scale: 1.05 }}>
        <div className="w-full max-w-2xl bg-white backdrop-blur-lg shadow-2xl rounded-3xl p-10 text-center border border-yellow-300">
          <h2 className="text-4xl font-bold text-gray-800">Simple Pricing</h2>
          <p className="text-gray-600 mt-2">Only pay when you make a sale.</p>
          <h3 className="text-6xl font-bold text-yellow-500 mt-6">10%</h3>
          <p className="text-gray-500 mt-2">Transaction Fee</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-6 w-full bg-primary hover:bg-yellow-400 text-black text-lg py-4 rounded-lg transition shadow-md"
            >
              Start Selling
            </motion.button>
          </Link>
          <p className="mt-4 text-gray-600 flex items-center justify-center gap-2">
            <FaMoneyBillWave className="text-green-500" /> 100% Money-Back Guarantee
          </p>
        </div>
      </motion.div>

      {/* AI-powered Savings Calculator */}
      <div className="text-center mt-16">
        <h3 className="text-3xl font-bold">💡 See How Much You Save</h3>
        <p className="text-gray-600">Enter your sales amount:</p>
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="number"
          className="border border-yellow-400 px-4 py-2 rounded-lg text-center mt-2 shadow-md"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
        />
        <motion.p 
          className="mt-2 text-xl font-bold" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          You Pay: ${fee.toFixed(2)}
        </motion.p>
      </div>

      {/* Features Section with Hover Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full px-6 sm:px-10 py-20">
        {["Instant Payouts", "Secure Transactions", "Sales Analytics"].map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 bg-yellow-100 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold">{feature}</h3>
            <p className="text-gray-600 mt-2">
              {feature === "Instant Payouts" ? (
                <span>💸 Receive payments as soon as you sell.</span>
              ) : feature === "Secure Transactions" ? (
                <span>🔒 Protected payments with PayPal.</span>
              ) : (
                <span>📊 Track your sales in real-time.</span>
              )}
            </p>

          </motion.div>
        ))}
      </div>

      {/* Competitor Comparison Table */}
      <div className="w-full px-6 sm:px-10 pb-20 text-center">
        <h2 className="text-4xl font-bold">Why Choose Us?</h2>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-yellow-300 text-gray-800">
                <th className="py-3">Feature</th>
                <th className="py-3">Us</th>
                <th className="py-3">Others</th>
              </tr>
            </thead>
            <tbody>
              {[{"feature": "Fees", "us": "10%", "others": "20-30%"}, {"feature": "Payout Speed", "us": "Instant", "others": "7 Days"}, {"feature": "Hidden Fees", "us": "None", "others": "Yes"}].map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3">{row.feature}</td>
                  <td className="text-green-600 font-bold">{row.us}</td>
                  <td className="text-red-600">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating CTA Button */}
      <Link href="/dashboard">
        <motion.button 
          className="fixed bottom-5 right-5 bg-primary text-black px-6 py-3 rounded-full text-lg flex items-center gap-2 shadow-lg hover:bg-yellow-400" 
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          Get Started <FaArrowRight />
        </motion.button>
      </Link>
      <Footer />
    </div>
  );
};

export default Pricing