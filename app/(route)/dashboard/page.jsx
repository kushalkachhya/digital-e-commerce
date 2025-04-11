import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import UserListing from "./_components/UserListing";
import PurchaseHistory from "../dashboard/_components/PurchaseHistory";
import Analytics from "../dashboard/_components/Analytics";
import PayoutSettings from "../dashboard/_components/PayoutSettings";

function Dashboard() {
    return (
        <div className="mt-16">
            <h2 className="font-bold text-2xl">Dashboard</h2>
            <Tabs defaultValue="listing" className="mt-5">
                <TabsList>
                    <TabsTrigger value="listing">Listing</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="purchase">Purchase</TabsTrigger>
                    <TabsTrigger value="payoutsettings">Payout Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="listing">
                    <UserListing />
                </TabsContent>
                <TabsContent value="analytics">
                    <Analytics />
                </TabsContent>
                <TabsContent value="purchase">
                    <PurchaseHistory />
                </TabsContent>
                <TabsContent value="payoutsettings">
                    <PayoutSettings />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Dashboard