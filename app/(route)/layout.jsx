"use client"; 

import React from "react";
import { usePathname } from "next/navigation";

function RouteLayout({ children }) {
    const pathname = usePathname();

    // Apply different styles for the pricing page
    const isPricingPage = pathname === "/pricing" || pathname === "/about";
    const containerClass = isPricingPage 
        ? "p-0"     
        : "p-5 sm:px-10 md:px-36 lg:px-48";

    return <div className={containerClass}>{children}</div>;
}

export default RouteLayout
