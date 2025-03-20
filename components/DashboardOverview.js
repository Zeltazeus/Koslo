import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DashboardOverview = () => {
    const [marketData, setMarketData] = useState({
        currentPrice: 2458.75,
        priceChange: 2.35,
        marketCap: 12.7,
        volume24h: 3.8
    });
    
    const [latestPrices, setLatestPrices] = useState([
        { type: 'SBR', price: 2458.75, change: 2.35 },
        { type: 'PBR', price: 1875.20, change: -1.05 },
        { type: 'NBR', price: 3120.50, change: 0.87 },
        { type: 'EPDM', price: 4250.00, change: 3.12 }
    ]);
    
    const [recentOrders, setRecentOrders] = useState([
        { id: 'ORD-001', type: 'SBR', quantity: 500, status: 'Completed', date: '2025-03-19' },
        { id: 'ORD-002', type: 'PBR', quantity: 250, status: 'Processing', date: '2025-03-20' },
        { id: 'ORD-003', type: 'NBR', quantity: 150, status: 'Pending', date: '2025-03-20' }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <div className="flex space-x-2">
                    <button className="btn btn-primary">Refresh Data</button>
                    <Link href="/order-management" className="btn btn-secondary">
                        New Order
                    </Link>
                </div>
            </div>
            
            {/* Market Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Current Price</h3>
                    <p className="text-2xl font-bold text-white">${marketData.currentPrice.toLocaleString()}</p>
                    <div className={`mt-2 text-sm ${marketData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {marketData.priceChange >= 0 ? '↑' : '↓'} {Math.abs(marketData.priceChange)}%
                    </div>
                </div>
                
                <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Market Cap</h3>
                    <p className="text-2xl font-bold text-white">${marketData.marketCap.toLocaleString()} Billion</p>
                    <div className="mt-2 text-sm text-gray-400">Global Market</div>
                </div>
                
                <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">24h Volume</h3>
                    <p className="text-2xl font-bold text-white">${marketData.volume24h.toLocaleString()} Million</p>
                    <div className="mt-2 text-sm text-gray-400">Trading Volume</div>
                </div>
                
                <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                    <h3 className="text-gray-400 text-sm font-medium mb-1">Your Orders</h3>
                    <p className="text-2xl font-bold text-white">{recentOrders.length}</p>
                    <div className="mt-2 text-sm text-gray-400">Active Orders</div>
                </div>
            </div>
            
            {/* Latest Prices */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Latest Prices</h2>
                    <Link href="/price-charts" className="text-indigo-400 hover:text-indigo-300 text-sm">
                        View All Charts →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Price (USD)</th>
                                <th>24h Change</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestPrices.map((item) => (
                                <tr key={item.type}>
                                    <td className="font-medium">{item.type}</td>
                                    <td>${item.price.toLocaleString()}</td>
                                    <td className={item.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                                        {item.change >= 0 ? '+' : ''}{item.change}%
                                    </td>
                                    <td>
                                        <Link href={`/order-management?type=${item.type}`} className="text-indigo-400 hover:text-indigo-300">
                                            Trade
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Recent Orders */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                    <Link href="/order-management" className="text-indigo-400 hover:text-indigo-300 text-sm">
                        View All Orders →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="font-medium">{order.id}</td>
                                    <td>{order.type}</td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'Completed' ? 'bg-green-900 text-green-300' :
                                            order.status === 'Processing' ? 'bg-blue-900 text-blue-300' :
                                            'bg-yellow-900 text-yellow-300'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
