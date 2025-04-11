import { UserButton } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import { ShoppingBag } from "lucide-react";
import React, { useContext } from "react";
import Link from "next/link";
import { Badge } from "../../components/ui/badge";
import CartContext from "../_context/CartContext";
import CartList from "../_components/CartList"

function Header() {

    const MenuList = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'About Us',
            path: '/about'
        },
        {
            name: 'Explore',
            path: '/explore'
        },
        {
            name: 'Pricing',
            path: '/pricing'
        },
    ]

    const { cart, setCart } = useContext(CartContext);
    return (
        <div className="flex p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-4 border-black justify-between items-center">
            <h2 className="font-bold text-lg text-black px-2 p-1">DIGI STORE</h2>

            <ul className="flex gap-5">
                {MenuList.map((menu, index) => (
                    <Link key={index} href={menu.path}>
                        <li key={index} className="px:2 p-1 cursor-pointer hover:border-2 hover:border-white hover:rounded-md">{menu?.name}</li>
                    </Link>
                ))}
            </ul>

            <div className="flex gap-5 items-center">
                <CartList>
                    <div className="flex items-center">
                        <ShoppingBag className="cursor-pointer" />
                        <Badge className="bg-black cursor-pointer hover:bg-black rounded-full py-1">
                            {cart?.length}
                        </Badge>
                    </div>
                </CartList>
                <Link href={'/dashboard'}>
                    <Button className='bg-red-500 hover:bg-red-600 hover:text-white'>Start Selling</Button>
                </Link>
                <UserButton />
            </div>
        </div>
    )
}

export default Header