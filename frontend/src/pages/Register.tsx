import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-400">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-10 shadow-2xl relative z-10"
      >
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-[0_0_20px_var(--border-glow)] flex items-center justify-center bg-primary">
              <img src="/logo.png" alt="Smart Campus Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[var(--text-main)]">Smart Campus</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-main)] tracking-tight">Create Account</h1>
          <p className="text-[var(--text-muted)] text-sm mt-2">Join the next-generation campus OS.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-[var(--text-main)] mb-2 tracking-wider uppercase">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-3.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[var(--text-main)] mb-2 tracking-wider uppercase">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-main)] mb-2 tracking-wider uppercase">Password</label>
            <input
              type="password"
              required
              className="w-full p-3.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-main)] mb-2 tracking-wider uppercase">Role</label>
            <select
              className="w-full p-3.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="ADMIN">Administrator</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_var(--border-glow)] hover:shadow-[0_0_30px_var(--border-glow)] hover:-translate-y-0.5"
          >
            Create Premium Account
          </button>
          
          <p className="text-center text-[var(--text-muted)] text-sm pt-2">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
