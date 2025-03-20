import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        
        checkUser();
        
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="navbar">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-400">KOSLO</span>
                            <span className="ml-2 text-gray-300 text-sm">Synthetic Rubber Trading</span>
                        </Link>
                    </div>
                    
                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/price-charts" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Price Charts
                        </Link>
                        <Link href="/order-management" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Order Management
                        </Link>
                        <Link href="/inventory-tracking" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Inventory
                        </Link>
                        
                        {user ? (
                            <div className="relative ml-3">
                                <button 
                                    onClick={() => handleSignOut()}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                                    Login
                                </Link>
                                <Link href="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/price-charts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Price Charts
                        </Link>
                        <Link href="/order-management" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Order Management
                        </Link>
                        <Link href="/inventory-tracking" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                            Inventory
                        </Link>
                        
                        {user ? (
                            <button 
                                onClick={() => handleSignOut()}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                                    Login
                                </Link>
                                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
