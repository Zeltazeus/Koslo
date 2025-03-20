import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newOrder, setNewOrder] = useState({
        type: 'SBR',
        quantity: 100,
        price: 2500,
        orderType: 'buy'
    });
    const [user, setUser] = useState(null);
    const [showNewOrderForm, setShowNewOrderForm] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [filter, setFilter] = useState('all');

    // Mock rubber types and prices
    const rubberTypes = [
        { id: 'SBR', name: 'Styrene Butadiene Rubber (SBR)', price: 2458.75 },
        { id: 'PBR', name: 'Polybutadiene Rubber (PBR)', price: 1875.20 },
        { id: 'NBR', name: 'Nitrile Butadiene Rubber (NBR)', price: 3120.50 },
        { id: 'EPDM', name: 'Ethylene Propylene Diene Monomer (EPDM)', price: 4250.00 }
    ];

    // Mock orders data
    const mockOrders = [
        { id: 'ORD-001', type: 'SBR', quantity: 500, price: 2450.00, orderType: 'buy', status: 'completed', date: '2025-03-19', total: 1225000 },
        { id: 'ORD-002', type: 'PBR', quantity: 250, price: 1870.50, orderType: 'buy', status: 'processing', date: '2025-03-20', total: 467625 },
        { id: 'ORD-003', type: 'NBR', quantity: 150, price: 3115.75, orderType: 'sell', status: 'pending', date: '2025-03-20', total: 467362.5 },
        { id: 'ORD-004', type: 'EPDM', quantity: 100, price: 4245.25, orderType: 'buy', status: 'completed', date: '2025-03-18', total: 424525 },
        { id: 'ORD-005', type: 'SBR', quantity: 300, price: 2455.50, orderType: 'sell', status: 'completed', date: '2025-03-17', total: 736650 }
    ];

    useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        
        checkUser();
        
        // Simulate loading orders from API
        setIsLoading(true);
        setTimeout(() => {
            setOrders(mockOrders);
            setIsLoading(false);
        }, 800);
        
        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user || null);
            }
        );
        
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // If changing rubber type, update the price automatically
        if (name === 'type') {
            const selectedType = rubberTypes.find(type => type.id === value);
            setNewOrder({
                ...newOrder,
                [name]: value,
                price: selectedType ? selectedType.price : newOrder.price
            });
        } else {
            setNewOrder({
                ...newOrder,
                [name]: name === 'quantity' ? parseInt(value, 10) : value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderError(null);
        
        // Validate user is logged in
        if (!user) {
            setOrderError('You must be logged in to place an order');
            return;
        }
        
        // Validate quantity
        if (newOrder.quantity <= 0) {
            setOrderError('Quantity must be greater than 0');
            return;
        }
        
        // Simulate order creation
        const orderId = `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        const newOrderData = {
            id: orderId,
            ...newOrder,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            total: newOrder.price * newOrder.quantity
        };
        
        // Add to orders list
        setOrders([newOrderData, ...orders]);
        
        // Reset form and show success message
        setNewOrder({
            type: 'SBR',
            quantity: 100,
            price: rubberTypes.find(type => type.id === 'SBR').price,
            orderType: 'buy'
        });
        
        setOrderSuccess(true);
        setTimeout(() => {
            setOrderSuccess(false);
            setShowNewOrderForm(false);
        }, 3000);
    };

    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Order Management</h1>
                <button 
                    onClick={() => setShowNewOrderForm(!showNewOrderForm)}
                    className="btn btn-primary"
                >
                    {showNewOrderForm ? 'Cancel' : 'New Order'}
                </button>
            </div>
            
            {/* New Order Form */}
            {showNewOrderForm && (
                <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">Place New Order</h2>
                    
                    {orderSuccess && (
                        <div className="bg-green-900 border border-green-800 text-green-300 px-4 py-3 rounded mb-4">
                            Order placed successfully!
                        </div>
                    )}
                    
                    {orderError && (
                        <div className="bg-red-900 border border-red-800 text-red-300 px-4 py-3 rounded mb-4">
                            {orderError}
                        </div>
                    )}
                    
                    {!user && (
                        <div className="bg-yellow-900 border border-yellow-800 text-yellow-300 px-4 py-3 rounded mb-4">
                            You need to <Link href="/login" className="underline">log in</Link> to place an order.
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="type" className="label">Rubber Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={newOrder.type}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                >
                                    {rubberTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="orderType" className="label">Order Type</label>
                                <select
                                    id="orderType"
                                    name="orderType"
                                    value={newOrder.orderType}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                >
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="quantity" className="label">Quantity (kg)</label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="1"
                                    value={newOrder.quantity}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="price" className="label">Price per kg (USD)</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={newOrder.price}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="bg-gray-800 p-4 rounded-md">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Total Order Value:</span>
                                <span className="text-xl font-bold text-white">
                                    ${(newOrder.price * newOrder.quantity).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!user}
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* Orders List */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Your Orders</h2>
                    <div className="flex space-x-2">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input py-1 px-2 text-sm"
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="text-center py-8 text-gray-400">
                        Loading orders...
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        No orders found. {filter !== 'all' && 'Try changing the filter or '}
                        <button 
                            onClick={() => setShowNewOrderForm(true)}
                            className="text-indigo-400 hover:text-indigo-300"
                        >
                            place a new order
                        </button>.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Type</th>
                                    <th>Order Type</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="font-medium">{order.id}</td>
                                        <td>{order.type}</td>
                                        <td>
                                            <span className={`capitalize ${order.orderType === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                                {order.orderType}
                                            </span>
                                        </td>
                                        <td>{order.quantity.toLocaleString()} kg</td>
                                        <td>${order.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        <td>${order.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'completed' ? 'bg-green-900 text-green-300' :
                                                order.status === 'processing' ? 'bg-blue-900 text-blue-300' :
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
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
