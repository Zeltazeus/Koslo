import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to hardcoded values (for development only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hgfyrvtaqkzytyuezano.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnlydnRhcWt6eXR5dWV6YW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTMwNDgsImV4cCI6MjA1ODAyOTA0OH0.iRp1lY1zBcCT1uLgn5VoxQ5T-5zdticLc407_t25Lew';
const supabase = createClient(supabaseUrl, supabaseKey);

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            setFeedback(error.message);
        } else {
            setFeedback('Signup successful! Please check your email for confirmation.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold">Signup</h2>
            <form onSubmit={handleSignup} className="mt-4">
                <div>
                    <label className="mr-2">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border rounded" 
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="mr-2">Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="border rounded" 
                        required
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Sign Up</button>
            </form>
            {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
        </div>
    );
};

export default Signup;
