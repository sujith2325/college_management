import React, { useState, useEffect } from 'react';
import { Topbar } from '../../components/layout/Topbar';
import { Users, BookOpen, UserCheck, Activity, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 1500,
    totalFaculty: 120,
    revenue: "$1.2M",
    attendance: "87.6%"
  });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col relative overflow-hidden transition-colors duration-400">
      <Topbar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10 space-y-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-10 overflow-hidden shadow-2xl"
        >
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">
              Welcome back, Admin
            </h1>
            <p className="text-[var(--text-muted)] text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
              Campus operations are running smoothly today.
            </p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Students", value: stats.totalStudents.toLocaleString(), icon: Users, trend: "+120 this month" },
            { title: "Total Faculty", value: stats.totalFaculty.toLocaleString(), icon: BookOpen, trend: "+3 this month" },
            { title: "Avg Attendance", value: stats.attendance, icon: UserCheck, trend: "+2.4% vs last week" },
            { title: "Revenue", value: stats.revenue, icon: DollarSign, trend: "+$50k vs last month" }
          ].map((stat, i) => (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--border-glow)] hover:border-primary/50 hover:-translate-y-1"
            >
              {/* Animated hover border glow inside */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-primary opacity-50" />
                </div>
                
                <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-[var(--text-main)] mb-3">{stat.value}</p>
                <p className="text-xs text-primary font-medium">{stat.trend}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for Quick Actions or Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              System Status Overview
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-main)] flex flex-col gap-2">
              <span className="text-[var(--text-muted)] text-sm">Database Load</span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[var(--bg-card)] rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[35%]" />
                </div>
                <span className="text-sm font-semibold">35%</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-main)] flex flex-col gap-2">
              <span className="text-[var(--text-muted)] text-sm">Active Sessions</span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[var(--bg-card)] rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[60%]" />
                </div>
                <span className="text-sm font-semibold">1,240</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-main)] flex flex-col gap-2">
              <span className="text-[var(--text-muted)] text-sm">API Latency</span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[var(--bg-card)] rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[15%]" />
                </div>
                <span className="text-sm font-semibold">42ms</span>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
