"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Banknote, BarChart, DollarSign, DollarSignIcon, Pencil, TrendingUp, Wallet } from "lucide-react";
import { toast } from "sonner";

function PayoutSettings() {
    const [orderList, setOrderList] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [paypalEmail, setPaypalEmail] = useState("");
    const [payoutHistory, setPayoutHistory] = useState([]);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [requestingPayout, setRequestingPayout] = useState(false);
    const [totalWithdrawn, setTotalWithdrawn] = useState(0);


    useEffect(() => {
        GetData();
        fetchPayoutHistory();
    }, [])

    useEffect(() => {
        fetch('/api/updatebalance'); // Triggers update logic
    }, []);
    


    useEffect(() => {
        const fetchPayPalEmail = async () => {
            try {
                const response = await axios.get("/api/payouts");
                setPaypalEmail(response.data.paypalEmail || "");
            } catch (error) {
                toast.error("Error fetching PayPal email", error);
            }
        };
        fetchPayPalEmail();
    }, []);

    const fetchPayoutHistory = async () => {
        try {
            const response = await axios.get("/api/payouts");
            console.log("Fetched Payout Data:", response.data);
            setPayoutHistory(response.data.payoutHistory || []);
            setTotalWithdrawn(response.data.totalWithdrawnBalance);

        } catch (error) {
            toast.error("Error fetching payout history");
        }
    };

    const handleSave = async () => {
        if (!paypalEmail) {
            setMessage("PayPal email cannot be empty.");
            return;
        }

        setSaving(true);
        try {
            const response = await axios.post("/api/payouts", { paypalEmail });
            setMessage(response.data.message);
            setEditing(false);
        } catch (error) {
            console.error("Error saving PayPal email", error);
            setMessage("Failed to save PayPal email.");
        } finally {
            setSaving(false);
        }
    };

    const GetData = async () => {
        try {
            const result = await axios.get('/api/analytics');
            setOrderList(result.data); // Keep order data if needed

            const userRes = await axios.get('/api/user');

            setTotalEarnings(userRes.data.totalEarnings || 0);
            setAvailableBalance(userRes.data.withdrawableBalance || 0);
            

            if (userRes.data.paypalEmail) {
                setPaypalEmail(userRes.data.paypalEmail);
            } else {
                setPaypalEmail("");
            }

        } catch (error) {
            toast.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        if (orderList.length === 0) return;
    }, [orderList]);

    const requestPayout = async () => {
        setRequestingPayout(true);
        try {
            const response = await fetch("/api/payouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sellerEmail: paypalEmail, amount: availableBalance }),
            });

            const data = await response.json();
            if (data.success) {
                await axios.get("/api/updatebalance?reset=true");
                toast("Payout request successful!");
                await GetData(); // Fetch latest balance after payout
                await fetchPayoutHistory();
            } else {
                toast("Payout failed: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            toast("Something went wrong!");
        } finally {
            setRequestingPayout(false);
        }
    };


    return (
        <div>
            <h2 className="font-bold text-2xl mt-5">Payout Settings</h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <BarChart className="text-green-500 bg-green-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Total Earnings</h2>
                            <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <Wallet className="text-green-500 bg-green-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Withdrawable Balance</h2>
                            <p className="text-2xl font-bold text-gray-900">${availableBalance.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition">
                    <CardContent className="p-6 flex items-center space-x-4">
                        <Banknote className="text-green-500 bg-green-100 p-2 rounded-full w-10 h-10" />
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">Total Withdrawn Balance</h2>
                            <p className="text-2xl font-bold text-gray-900">${totalWithdrawn.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold">Request Payout</h3>
                <Card className="p-4 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium mb-2">PayPal Account</h3>
                    <div className="relative flex items-center">
                        <input
                            type="email"
                            className="border rounded-lg p-2 w-full pr-10"
                            placeholder="Enter your PayPal email"
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            disabled={!editing}
                        />
                        <button
                            className="absolute right-3 text-gray-500"
                            onClick={() => setEditing(!editing)}
                        >
                            <Pencil size={18} />
                        </button>
                    </div>
                    <Button onClick={handleSave} disabled={saving || !editing} className="mt-3">
                        {saving ? "Saving..." : "Save PayPal Email"}
                    </Button>
                    {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
                </Card>

                <Button
                    className="mt-3 rounded-md w-full"
                    disabled={availableBalance <= 0 || !paypalEmail || requestingPayout}
                    onClick={requestPayout}
                >
                    {requestingPayout ? "Requesting..." : "Request Payout"}
                </Button>

            </div>

            <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
                <Card className="p-4 bg-white shadow rounded-lg overflow-x-auto">
                    {payoutHistory.length > 0 ? (
                        <table className="w-full border-collapse rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="p-3 text-left border-b">Transaction ID</th>
                                    <th className="p-3 text-left border-b">Amount</th>
                                    <th className="p-3 text-left border-b">Status</th>
                                    <th className="p-3 text-left border-b">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payoutHistory.map((payout, index) => (
                                    <tr key={index} className="border-b last:border-none hover:bg-gray-100 transition">
                                        <td className="p-3 text-sm font-mono">{payout.transactionId}</td>
                                        <td className="p-3 text-sm font-semibold text-green-600">${payout.amount}</td>
                                        <td className="p-3 text-sm">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${payout.status === "Completed"
                                                    ? "bg-green-200 text-green-800"
                                                    : payout.status === "Pending"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-red-200 text-red-800"
                                                    }`}
                                            >
                                                {payout.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">
                                            {new Date(payout.createdAt).toLocaleDateString()} - {new Date(payout.createdAt).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No payout history found.</p>
                    )}
                </Card>
            </div>

        </div>
    );
}

export default PayoutSettings