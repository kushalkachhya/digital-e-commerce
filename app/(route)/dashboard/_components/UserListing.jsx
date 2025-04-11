"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import ProductCardItem from "../../../_components/ProductCardItem";

function UserListing() {
    const [listing,setListing]=useState([]);
    const [loading,setLoading]=useState(false);
    const {user}=useUser();

    useEffect(()=>{
        user&&GetUserProductList();
    },[user])

    const GetUserProductList=async()=>{
        setLoading(true);
        const result=await axios.get('/api/products?email='+user?.primaryEmailAddress?.emailAddress);
        setListing(result.data);
        setLoading(false);
    }

    return (
        <div className="mt-5">
            <h2 className="font-bold text-xl flex justify-between items-center">Listing
                <Link href={'/add-product'}>
                    <Button>+ Add New Product</Button>
                </Link>
            </h2>

            <div>
                {listing.length==0&&
                <h2 className="font-medium text-2xl mt-10 text-center text-gray-300">No Listing Found</h2>
                }

                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                    {listing.map((product,index)=>(
                        <ProductCardItem key={index} product={product}
                            editable={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserListing