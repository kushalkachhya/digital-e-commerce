import { Button } from "../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
    return (
        <div className="bg-green-700 p-10 lg:px-36">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-20">
                <div>
                    <h2 className="font-extrabold text-5xl text-white">sell your digital products here</h2>
                    <p className="text-gray-200 mt-5">we have created platform for those people who want to buy or sell digital products online</p>
                    <div className="flex gap-5 mt-8">
                        <Link href={'/explore'}>
                            <Button className="bg-amber-400 hover:bg-amber-500 hover:text-blackbg-yellow-400 text-black font-bold hover:bg-yellow-500 hover:text-white text-black">Explore</Button>
                        </Link>
                        <Link href={'/dashboard'}>
                            <Button className='bg-red-500 hover:bg-red-600 hover:text-white'>Sell</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Image src={"/pc2.png"} alt="pc" width={300} height={300}  />
                </div>
            </div>
        </div>
    )
}

export default Hero