import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const { data, error } = await supabase
            .from('inventory')
            .select('*');
        if (error) console.error('Error fetching inventory:', error);
        else setInventory(data);
    };

    const updateInventory = async (rubberType, quantity) => {
        const { data, error } = await supabase
            .from('inventory')
            .update({ quantity })
            .eq('type', rubberType);
        if (error) console.error('Error updating inventory:', error);
        else fetchInventory();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Inventory Management</h2>
            <table className="min-w-full mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.type}>
                            <td className="border px-4 py-2">{item.type}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => updateInventory(item.type, item.quantity - 1)} className="bg-red-500 text-white p-1 rounded">Reduce</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryManagement;
