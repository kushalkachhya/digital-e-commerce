"use client"
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import SimilarProduct from "../[productId]/_components/SimilarProduct"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../../components/ui/accordion"
import CartContext from "../../../_context/CartContext";
import ProductEditableOption from "../../../_components/ProductEditableOption";
import { MoreVerticalIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function ProductDetail({ editable }) {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const { cart, setCart } = useContext(CartContext);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        GetProductDetail();
    }, [])

    const GetProductDetail = async () => {
        const result = await axios.get('/api/products?id=' + productId);
        console.log(result.data);
        setProduct(result?.data);
    }

    const AddToCart = async () => {
        setLoading(true);
        setCart(cart => [...cart, product]);
        const result = await axios.post('/api/cart', {
            email: user?.primaryEmailAddress?.emailAddress,
            productId: product?.id
        });
        setLoading(false);
    }
    return product && (
        <div className="mt-10">
            <Link href={'/explore'}>
                <h2 className="font-bold text-xl flex justify-between items-center">Back</h2>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-10">
                <Card className="flex justify-center items-center max-h-[400px]">
                    <Image src={product?.imageUrl} alt="image"
                        width={400} height={400}
                        className="h-[400px] w-full object-contain"
                    />
                </Card>
                <div className="flex flex-col gap-5">
                    <div>
                        <h2 className="font-bold text-2xl">{product?.title}</h2>
                        <Badge className={'text-black'}>{product?.category}</Badge>
                    </div>
                    <h2 className="font-bold text-3xl text-yellow-600">${product?.price}</h2>
                    <p className="text-gray-500">The {product?.category} will send to your register email id once you purchase this digital content</p>

                    {!editable ?
                        <Button size='lg' className="w-full" disabled={loading} onClick={AddToCart}>
                            Add to Cart</Button>
                        : <ProductEditableOption product={product}>
                            <MoreVerticalIcon />
                        </ProductEditableOption>}

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>
                                {product?.description}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>About product</AccordionTrigger>
                            <AccordionContent>
                                {product?.about}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>


            {/* <div className="mt-10">
                <SimilarProduct category={product?.category} />
            </div> */}
        </div>
    )
}

export default function Page() {
    return <ProductDetail editable={false} />;
  }