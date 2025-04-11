"use client"
import DisplayProductList from "@/_components/DisplayProductList";
import axios from "axios";
import React, { useEffect, useState } from "react";

function PurchaseHistory() {

    const [productList,setProductList]=useState([]);
    useEffect(()=>{
        GetPurchaseHistory();
    },[])
    const GetPurchaseHistory=async()=>{
        const result=await axios.get('/api/order');
        setProductList(result.data);
    }

    return (
        <div>
            <h2 className="font-bold text-3xl mt-5">Purchase History</h2>

            <DisplayProductList productsList={productList}
                purchase={true}
            />
        </div>
    )
}

export default PurchaseHistory