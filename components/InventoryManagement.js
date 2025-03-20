import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newItem, setNewItem] = useState({
        type: 'SBR',
        quantity: 0,
        location: 'Warehouse A',
        status: 'available'
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const [editingItem, setEditingItem] = useState(null);

    // Mock inventory data
    const mockInventory = [
        { id: 1, type: 'SBR', quantity: 15000, location: 'Warehouse A', status: 'available', lastUpdated: '2025-03-15' },
        { id: 2, type: 'PBR', quantity: 8500, location: 'Warehouse B', status: 'available', lastUpdated: '2025-03-16' },
        { id: 3, type: 'NBR', quantity: 5200, location: 'Warehouse A', status: 'reserved', lastUpdated: '2025-03-17' },
        { id: 4, type: 'EPDM', quantity: 3000, location: 'Warehouse C', status: 'in_transit', lastUpdated: '2025-03-18' },
        { id: 5, type: 'SBR', quantity: 7500, location: 'Warehouse B', status: 'available', lastUpdated: '2025-03-19' }
    ];

    // Rubber types for dropdown
    const rubberTypes = [
        { id: 'SBR', name: 'Styrene Butadiene Rubber (SBR)' },
        { id: 'PBR', name: 'Polybutadiene Rubber (PBR)' },
        { id: 'NBR', name: 'Nitrile Butadiene Rubber (NBR)' },
        { id: 'EPDM', name: 'Ethylene Propylene Diene Monomer (EPDM)' }
    ];

    // Warehouse locations
    const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];

    // Status options
    const statusOptions = [
        { value: 'available', label: 'Available' },
        { value: 'reserved', label: 'Reserved' },
        { value: 'in_transit', label: 'In Transit' },
        { value: 'depleted', label: 'Depleted' }
    ];

    useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        
        checkUser();
        
        // Simulate loading inventory from API
        setIsLoading(true);
        setTimeout(() => {
            setInventory(mockInventory);
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
        
        if (editingItem) {
            setEditingItem({
                ...editingItem,
                [name]: name === 'quantity' ? parseInt(value, 10) : value
            });
        } else {
            setNewItem({
                ...newItem,
                [name]: name === 'quantity' ? parseInt(value, 10) : value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        
        // Validate user is logged in
        if (!user) {
            setFormError('You must be logged in to manage inventory');
            return;
        }
        
        if (editingItem) {
            // Update existing item
            const updatedInventory = inventory.map(item => 
                item.id === editingItem.id ? { 
                    ...editingItem, 
                    lastUpdated: new Date().toISOString().split('T')[0] 
                } : item
            );
            
            setInventory(updatedInventory);
            setEditingItem(null);
        } else {
            // Add new item
            const newItemWithId = {
                ...newItem,
                id: Math.max(0, ...inventory.map(item => item.id)) + 1,
                lastUpdated: new Date().toISOString().split('T')[0]
            };
            
            setInventory([...inventory, newItemWithId]);
            setNewItem({
                type: 'SBR',
                quantity: 0,
                location: 'Warehouse A',
                status: 'available'
            });
        }
        
        setFormSuccess(true);
        setTimeout(() => {
            setFormSuccess(false);
            setShowAddForm(false);
        }, 3000);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this inventory item?')) {
            setInventory(inventory.filter(item => item.id !== id));
        }
    };

    const filteredInventory = inventory.filter(item => {
        return (
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Calculate inventory statistics
    const totalItems = filteredInventory.reduce((sum, item) => sum + item.quantity, 0);
    const itemsByType = rubberTypes.map(type => ({
        type: type.id,
        quantity: filteredInventory
            .filter(item => item.type === type.id)
            .reduce((sum, item) => sum + item.quantity, 0)
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
                <button 
                    onClick={() => {
                        setEditingItem(null);
                        setShowAddForm(!showAddForm);
                    }}
                    className="btn btn-primary"
                >
                    {showAddForm ? 'Cancel' : 'Add Inventory'}
                </button>
            </div>
            
            {/* Inventory Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="card p-4 flex flex-col">
                    <span className="text-gray-400 text-sm">Total Inventory</span>
                    <span className="text-2xl font-bold text-white">{totalItems.toLocaleString()} kg</span>
                </div>
                
                {itemsByType.map(item => (
                    <div key={item.type} className="card p-4 flex flex-col">
                        <span className="text-gray-400 text-sm">{item.type} Total</span>
                        <span className="text-2xl font-bold text-white">{item.quantity.toLocaleString()} kg</span>
                    </div>
                ))}
            </div>
            
            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingItem ? 'Edit Inventory Item' : 'Add New Inventory'}
                    </h2>
                    
                    {formSuccess && (
                        <div className="bg-green-900 border border-green-800 text-green-300 px-4 py-3 rounded mb-4">
                            {editingItem ? 'Inventory updated successfully!' : 'Inventory added successfully!'}
                        </div>
                    )}
                    
                    {formError && (
                        <div className="bg-red-900 border border-red-800 text-red-300 px-4 py-3 rounded mb-4">
                            {formError}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="type" className="label">Rubber Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={editingItem ? editingItem.type : newItem.type}
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
                                <label htmlFor="quantity" className="label">Quantity (kg)</label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="0"
                                    value={editingItem ? editingItem.quantity : newItem.quantity}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="location" className="label">Location</label>
                                <select
                                    id="location"
                                    name="location"
                                    value={editingItem ? editingItem.location : newItem.location}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                >
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="status" className="label">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={editingItem ? editingItem.status : newItem.status}
                                    onChange={handleInputChange}
                                    className="input"
                                    required
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!user}
                            >
                                {editingItem ? 'Update Inventory' : 'Add to Inventory'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* Inventory List */}
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Current Inventory</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input py-1 pl-8 pr-2"
                        />
                        <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="text-center py-8 text-gray-400">
                        Loading inventory...
                    </div>
                ) : filteredInventory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        No inventory items found. {searchTerm && 'Try a different search term or '}
                        <button 
                            onClick={() => {
                                setEditingItem(null);
                                setShowAddForm(true);
                            }}
                            className="text-indigo-400 hover:text-indigo-300"
                        >
                            add new inventory
                        </button>.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventory.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.quantity.toLocaleString()} kg</td>
                                        <td>{item.location}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                item.status === 'available' ? 'bg-green-900 text-green-300' :
                                                item.status === 'reserved' ? 'bg-blue-900 text-blue-300' :
                                                item.status === 'in_transit' ? 'bg-yellow-900 text-yellow-300' :
                                                'bg-red-900 text-red-300'
                                            }`}>
                                                {statusOptions.find(option => option.value === item.status)?.label || item.status}
                                            </span>
                                        </td>
                                        <td>{item.lastUpdated}</td>
                                        <td>
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(item)}
                                                    className="text-indigo-400 hover:text-indigo-300"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
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

export default InventoryManagement;
