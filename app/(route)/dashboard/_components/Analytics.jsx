"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ShoppingCart, TrendingUp, User } from "lucide-react";

function Analytics() {

    const [orderList, setOrderList] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [uniqueCustomers, setUniqueCustomers] = useState(0);

    useEffect(() => {
        GetData();
    }, [])

    const GetData = async () => {
        const result = await axios.get('/api/analytics');
        setOrderList(result.data.orderList);
    }

    useEffect(() => {
        if (orderList.length === 0) return; // Avoid errors on empty data

        // Calculate total sales
        const totalSalesAmount = orderList.reduce((sum, order) => sum + order.products.price, 0);
        setTotalSales(totalSalesAmount);

        // Set total orders
        setTotalOrders(orderList.length);

        // Calculate unique customers
        const uniqueEmails = new Set(orderList.map((order) => order.orders.email));
        setUniqueCustomers(uniqueEmails.size);

    }, [orderList]);


    return (
        <div>
            <h2 className="font-bold text-2xl mt-5">Analytics</h2>

            {/* Display total sales and orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <ShoppingCart className="text-blue-500 bg-blue-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Total Orders</h2>
                            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <TrendingUp className="text-green-500 bg-green-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Total Sales</h2>
                            <p className="text-2xl font-bold text-gray-900">$ {totalSales}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <User className="text-purple-500 bg-purple-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Unique Customers</h2>
                            <p className="text-2xl font-bold text-gray-900">{uniqueCustomers}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Display detailed order list */}
            <div className="mt-5">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <table className="w-full mt-3 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Order ID</th>
                            <th className="border border-gray-300 p-2">Customer Email</th>
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orderList) && orderList.map((order) => (
                            <tr key={order.orders.id} className="text-center">
                                <td className="border border-gray-300 p-2">{order.orders.id}</td>
                                <td className="border border-gray-300 p-2">{order.orders.email}</td>
                                <td className="border border-gray-300 p-2">{order.products.title}</td>
                                <td className="border border-gray-300 p-2">{order.products.category || "Uncategorized"}</td>
                                <td className="border border-gray-300 p-2">${order.products.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Analytics