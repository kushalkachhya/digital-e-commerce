import React, { useContext } from "react";
import { Card } from "../../components/ui/card";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import CartContext from "../_context/CartContext";
import RemoveFromCart from "./RemoveFromCart"

function CartProductItem({product}) {
    const {cart,setCart}=useContext(CartContext);
    const RemoveItem=async()=>{
        debugger;
        const cartList=cart.filter((item)=>item.id!=product.id);
        setCart(cartList);
        debugger;
        const result=await axios.delete('/api/cart?recordId='+product?.id)
        toast('Item Removed');
    }

    return (
        <Card className="flex gap-5">
            <Image src={product?.imageUrl} alt={product?.title} 
            width={70} height={70}
            className="h-[80px] w-[80px] object-cover" />
            <div>
                <h2 className="font-bold">{product?.title}</h2>
                <h2 className="font-bold text-yellow-600 text-lg">${product?.price}</h2>
                <RemoveFromCart product={product} />
            </div>
        </Card>
    )
}

export default CartProductItem