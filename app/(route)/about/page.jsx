"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaStar, FaCheckCircle, FaHandshake, FaCrown, FaGlobe, FaChartLine, FaLaptopCode, FaMoneyBillWave, FaChartBar, FaDollarSign, FaGift, FaArrowRight } from "react-icons/fa";
import Footer from "../../_components/Footer";
import Link from "next/link";

const stats = [
  { icon: <FaUsers className="text-green-700 text-3xl" />, title: "10K+ Creators", desc: "Trusted by thousands worldwide" },
  { icon: <FaLaptopCode className="text-green-700 text-3xl" />, title: "100% Digital", desc: "Instant delivery via email" },
  { icon: <FaMoneyBillWave className="text-green-700 text-3xl" />, title: "Quick Withdrawals", desc: "Earn & withdraw seamlessly" },
  { icon: <FaCheckCircle className="text-green-700 text-3xl" />, title: "Zero Inventory", desc: "No stock, no hassle" },
  { icon: <FaChartBar className="text-green-700 text-3xl" />, title: "$3.1M+ Earned", desc: "Total income by DIGISTORE entrepreneurs" },
  { icon: <FaDollarSign className="text-green-700 text-3xl" />, title: "High Conversion", desc: "Optimized checkout for max sales" },
];

const values = [
  { icon: <FaRocket className="text-white text-2xl" />, title: "Empower Creators" },
  { icon: <FaHandshake className="text-white text-2xl" />, title: "Transparent System" },
  { icon: <FaCrown className="text-white text-2xl" />, title: "Premium Support" },
  { icon: <FaGlobe className="text-white text-2xl" />, title: "Global Platform" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative w-full bg-green-700 py-32 text-center text-white rounded-bl-[2rem] rounded-br-[2rem] shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg relative z-10"
        >
          About DIGISTORE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto font-medium relative z-10"
        >
          The ultimate digital marketplace for creators to thrive, connect, and earn.
        </motion.p>
      </header>

      {/* Stats Grid */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-green-700 text-white py-20 px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
          <p className="text-lg max-w-2xl mx-auto">DIGISTORE is more than a platform. We’re a movement driving digital freedom for creators across the globe.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-10 text-center">
          {values.map((item, idx) => (
            <div key={idx} className="p-6 bg-green-800 rounded-xl shadow-xl hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-green-700 text-white py-16 px-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Future of Digital Commerce</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Whether you're a seller or buyer, DIGISTORE is built for you. Tap into a world of premium digital content and seamless experiences.</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 mx-auto"
            >
              Get Started <FaArrowRight />
          
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
