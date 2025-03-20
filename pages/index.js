import React, { useState } from 'react';
import Layout from '../components/Layout';
import DashboardOverview from '../components/DashboardOverview';
import PriceChart from '../components/PriceChart';
import OrderManagement from '../components/OrderManagement';
import InventoryManagement from '../components/InventoryManagement';
import MarketData from '../components/MarketData';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Tab configuration
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'market', label: 'Market Data', icon: 'chart-bar' },
        { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
        { id: 'inventory', label: 'Inventory', icon: 'cube' },
        { id: 'charts', label: 'Price Charts', icon: 'chart-line' }
    ];

    // Render tab content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'market':
                return <MarketData />;
            case 'orders':
                return <OrderManagement />;
            case 'inventory':
                return <InventoryManagement />;
            case 'charts':
                return (
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-white">Price Charts</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <PriceChart rubberType="SBR" timeRange="1M" />
                            <PriceChart rubberType="PBR" timeRange="1M" />
                            <PriceChart rubberType="NBR" timeRange="1M" />
                            <PriceChart rubberType="EPDM" timeRange="1M" />
                        </div>
                    </div>
                );
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <Layout>
            <div className="mb-6">
                <div className="flex overflow-x-auto hide-scrollbar space-x-1 sm:space-x-2 p-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <TabIcon name={tab.icon} />
                            <span className="ml-2">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {renderTabContent()}
        </Layout>
    );
};

// Simple icon component for tabs
const TabIcon = ({ name }) => {
    switch (name) {
        case 'home':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
            );
        case 'chart-bar':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            );
        case 'shopping-cart':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            );
        case 'cube':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
            );
        case 'chart-line':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
            );
        default:
            return null;
    }
};

export default Dashboard;
