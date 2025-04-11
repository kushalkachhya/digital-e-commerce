import React, { useContext, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"
import CartContext from "../_context/CartContext";
import CartProductItem from "./CartProductItem"
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";


function CartList({ children }) {

    const { cart, setCart } = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total = total + Number(item?.price)
        })
        return total;
    }

    const handleCheckout = () => {
        setOpen(false);
        setTimeout(() => {
            router.push("/checkout");
        }, 300);
    };


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <div onClick={() => setOpen(true)}>{children}</div>
            </SheetTrigger>
            <SheetContent className="z-[100] fixed top-0 right-0 w-full sm:w-[400px] h-full overflow-y-auto bg-white shadow-lg"
  side="right">
                <SheetHeader>
                    <SheetTitle>Cart ({cart?.length}) </SheetTitle>
                    <SheetDescription asChild>
                        <div>
                            <p>Your all cart items listed here</p>
                            <div className="gap-2 flex flex-col mt-5">
                                {cart.map((product, index) => (
                                    <CartProductItem key={index} product={product} />
                                ))}
                            </div>

                            <div>
                                <h2 className=" flex font-bold text-2xl justify-between mt-10">Total : <span>${calculateTotal()}</span></h2>

                                <Button className="w-full mt-3" onClick={handleCheckout}>CHECKOUT</Button>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CartList