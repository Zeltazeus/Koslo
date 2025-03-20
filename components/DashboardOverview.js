import React from 'react';
import Link from 'next/link';

const DashboardOverview = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Current Price</h3>
                    <p>$X.XX</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Price Change</h3>
                    <p>+X.XX%</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Market Cap</h3>
                    <p>$X.XX Billion</p>
                </div>
            </div>
            <h2 className="text-xl font-bold mt-6">Price Charts</h2>
            {/* Placeholder for price charts component */}
            <div className="bg-white p-4 rounded shadow mt-4">
                <p>Price charts will be displayed here.</p>
            </div>
            <h2 className="text-xl font-bold mt-6">Manage Orders</h2>
            <Link href="/order-management" className="text-blue-500 underline">Go to Order Management</Link>
        </div>
    );
};

export default DashboardOverview;
