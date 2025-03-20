import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        
        // Validate password match
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        
        // Validate password strength
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            
            if (error) throw error;
            
            setSuccess(true);
            // Wait 2 seconds before redirecting to login
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="card max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-2xl font-bold text-white">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Or{' '}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>
                
                {error && (
                    <div className="bg-red-900 border border-red-800 text-red-300 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {success && (
                    <div className="bg-green-900 border border-green-800 text-green-300 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">Account created successfully! Redirecting to login...</span>
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="label">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input"
                                placeholder="Password (min. 8 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="label">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>
                    
                    <div className="text-sm text-center text-gray-400">
                        By signing up, you agree to our{' '}
                        <a href="#" className="text-indigo-400 hover:text-indigo-300">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-indigo-400 hover:text-indigo-300">
                            Privacy Policy
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
