import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('admin@college.edu');
  const [password, setPassword] = useState('adminpassword');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the instructions first.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { 
        email: email.trim(), 
        password 
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-400">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
      >
        <div className="md:w-1/2 p-12 bg-[var(--bg-main)] flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-[0_0_20px_var(--border-glow)] flex items-center justify-center bg-primary">
                <img src="/logo.png" alt="Smart Campus Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[var(--text-main)]">Smart Campus</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[var(--text-muted)]">Sign in to your premium administration portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 tracking-wide uppercase">Email Address</label>
              <input
                type="email"
                required
                className="w-full p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--text-main)] mb-2 tracking-wide uppercase">Password</label>
              <input
                type="password"
                required
                className="w-full p-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded bg-[var(--bg-card)] border-[var(--border-subtle)] text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" 
                />
                <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                  I agree to the <span className="text-primary font-semibold">Terms & Conditions</span>
                </span>
              </label>
              <a href="#" className="text-sm text-primary font-semibold hover:text-primary/80 transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_var(--border-glow)] hover:shadow-[0_0_30px_var(--border-glow)] hover:-translate-y-0.5"
            >
              Access Dashboard
            </button>
            
            <p className="text-center text-[var(--text-muted)] text-sm pt-4">
              Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
            </p>
          </form>
        </div>
        
        {/* Right side image/graphic */}
        <div className="hidden md:flex md:w-1/2 bg-[var(--bg-card)] p-12 flex-col justify-between relative overflow-hidden border-l border-[var(--border-subtle)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-[var(--text-main)] mb-4 tracking-tight leading-tight">
              The Future of<br/>University Management.
            </h2>
            <p className="text-[var(--text-muted)] text-lg">
              Streamline operations, manage faculties, and predict attendance with AI-powered analytics.
            </p>
          </div>
          
          <div className="relative z-10 w-full h-64 bg-gradient-to-t from-[var(--bg-main)] to-transparent rounded-2xl border border-[var(--border-subtle)] mt-8 overflow-hidden shadow-2xl flex items-end">
            <div className="w-full p-6 pb-0 grid grid-cols-4 gap-2 items-end opacity-70">
              <div className="w-full h-24 bg-primary/30 rounded-t-lg" />
              <div className="w-full h-32 bg-primary/50 rounded-t-lg" />
              <div className="w-full h-48 bg-primary/70 rounded-t-lg" />
              <div className="w-full h-40 bg-primary/90 rounded-t-lg" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
