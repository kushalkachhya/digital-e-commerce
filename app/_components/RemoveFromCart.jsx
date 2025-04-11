import React, { useContext } from "react";
import CartContext from "../_context/CartContext";
import axios from "axios";
import { toast } from "sonner";

function RemoveFromCart({product}) {
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
        <h2 className="text-red-500 cursor-pointer" onClick={RemoveItem}>Remove</h2>
    )
}

export default RemoveFromCart