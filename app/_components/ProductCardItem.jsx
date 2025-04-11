import { MoreVerticalIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import Image from "next/image";
import React, { useContext, useState } from "react";
import ProductEditableOption from "./ProductEditableOption";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CartContext from "../_context/CartContext";

function ProductCardItem({ product, editable = false, user, purchase }) {
    console.log("Product Data:", product);
    console.log("Image URL:", product?.imageUrl);

    const { cart, setCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    // const {user}=useUser();
    const AddToCart = async () => {
        setLoading(true);
        setCart(cart => [...cart, product]);
        const result = await axios.post('/api/cart', {
            email: user?.primaryEmailAddress?.emailAddress,
            productId: product?.id
        });
        debugger;
        setLoading(false);
    }

    return (

        <div>
            <Card className='p-3'>
                <Link href={'/explore/' + product?.id}>
                    <Image src={product?.imageUrl} alt={product.title} width={400} height={300} unoptimized className="h-[180px] object-cover" />
                </Link>
                <div className="mt-3">
                    <h2 className="font-bold text-xl line-clamp-1">{product.title}</h2>
                    <h2 className="font-bold text-2xl text-yellow-500">${product?.price}</h2>
                    <div className="mt-3 md:flex justify-between items-center">
                        {!purchase&&
                        <>
                        <div className="flex gap-2 items-center">
                            <Image src={product?.user?.image} alt="user" width={20} height={20} className="rounded-full" />
                            <h2 className="text-sm text-gray-400">{product?.user?.name}</h2>
                        </div>
                        {!editable ?
                            <Button size='sm' className="mt-1" disabled={loading} onClick={AddToCart}>
                                Add to Cart</Button>
                            : <ProductEditableOption product={product}>
                                <MoreVerticalIcon />
                            </ProductEditableOption>}</>}
                        {purchase&&
                        <Link href={product?.fileUrl}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Download Content</Button>
                        </Link>}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProductCardItem