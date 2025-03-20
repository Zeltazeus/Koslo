import React, { useState } from 'react';

const OrderManagement = () => {
    const [orderType, setOrderType] = useState('buy');
    const [quantity, setQuantity] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            setFeedback('Please enter a valid quantity.');
            return;
        }
        // Simulate order submission
        setFeedback(`Successfully placed a ${orderType} order for ${quantity} units of synthetic rubber.`);
        // Reset form
        setQuantity('');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Order Management</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div>
                    <label className="mr-2">Order Type:</label>
                    <select value={orderType} onChange={(e) => setOrderType(e.target.value)} className="border rounded">
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label className="mr-2">Quantity:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="border rounded" 
                        required
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Place Order</button>
            </form>
            {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
        </div>
    );
};

export default OrderManagement;
