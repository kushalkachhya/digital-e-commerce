"use client"
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CartContext from "./_context/CartContext"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({children}) {
    const {user}=useUser();
    const [cart,setCart]=useState([]);
    useEffect(() => {
        user&&CheckIsNewUser();
        user&&GetCartItems();
    }, [user]);
    
    const CheckIsNewUser=async()=>{
        const result = await axios.post('/api/user',{
            user:user
        });
    }

    const GetCartItems=async()=>{
        const result=await axios.get('/api/cart?email='+user?.primaryEmailAddress?.emailAddress)
        setCart(result.data);
    }

    return (
        <div>
            <CartContext.Provider value={{cart,setCart}}>
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <Header/>
            <div>
                {children}
            </div>
            </PayPalScriptProvider>
            </CartContext.Provider>
        </div>
    )
}

export default Provider