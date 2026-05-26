import React from 'react';
import { Topbar } from '../components/layout/Topbar';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, BrainCircuit, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, Legend } from 'recharts';

const attendanceData = [
  { name: 'Mon', attendance: 85, predicted: 88 },
  { name: 'Tue', attendance: 92, predicted: 90 },
  { name: 'Wed', attendance: 88, predicted: 89 },
  { name: 'Thu', attendance: 95, predicted: 92 },
  { name: 'Fri', attendance: 78, predicted: 80 },
];

const departmentData = [
  { name: 'CS', students: 400 },
  { name: 'Mech', students: 300 },
  { name: 'Civil', students: 200 },
  { name: 'EC', students: 350 },
  { name: 'EE', students: 250 },
];

const feeData = [
  { month: 'Jan', collected: 4000, target: 5000 },
  { month: 'Feb', collected: 4500, target: 5000 },
  { month: 'Mar', collected: 5200, target: 5000 },
  { month: 'Apr', collected: 4800, target: 5000 },
  { month: 'May', collected: 6000, target: 5000 },
];

const recentActivity = [
  { id: 1, title: 'AI System Optimization', desc: 'Predictive models recalibrated for term 2.', time: '2h ago' },
  { id: 2, title: 'Fee Payment Surge', desc: '50+ premium tier payments processed.', time: '4h ago' },
  { id: 3, title: 'Faculty Update', desc: 'Dr. Alan Turing assigned to Cryptography.', time: '1d ago' },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col relative overflow-hidden transition-colors duration-400">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <Topbar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Campus Analytics</h1>
            <p className="text-[var(--text-muted)]">Deep dive into campus data, trends, and AI insights.</p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Avg. Attendance", value: "87.6%", trend: "+2.4%", icon: Activity },
            { title: "Total Students", value: "1,500", trend: "+120", icon: Users },
            { title: "Fee Collection", value: "$1.2M", trend: "+$50k", icon: DollarSign },
            { title: "Performance Index", value: "9.2/10", trend: "+0.3", icon: TrendingUp }
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--border-glow)] hover:border-primary/50"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                <kpi.icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
              </div>
              <div className="relative z-10">
                <p className="text-[var(--text-muted)] text-sm font-medium mb-2">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-[var(--text-main)] mb-2">{kpi.value}</h3>
                <span className="text-primary text-xs font-semibold bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  {kpi.trend} this month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_var(--border-glow)]"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-[var(--text-main)]">
              <Activity className="w-5 h-5 text-primary" /> 
              Weekly Attendance vs. AI Prediction
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary-gold)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--color-primary-gold)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-soft-gold)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--color-soft-gold)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)' }}
                    itemStyle={{ color: 'var(--color-primary-gold)' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="attendance" stroke="var(--color-primary-gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" name="Actual" />
                  <Area type="monotone" dataKey="predicted" stroke="var(--color-soft-gold)" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="Predicted" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Insights & Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* AI Insight Widget */}
            <div className="bg-gradient-to-br from-[var(--bg-card)] to-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_var(--border-glow)]">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)] tracking-wide">AI Insights</h3>
                </div>
                <ul className="space-y-4">
                  <li className="text-sm text-[var(--text-muted)] leading-relaxed border-l-2 border-primary pl-4">
                    <span className="font-semibold text-[var(--text-main)] block mb-1">Attendance Optimization</span>
                    Friday attendance dips consistently. Consider rescheduling core lectures.
                  </li>
                  <li className="text-sm text-[var(--text-muted)] leading-relaxed border-l-2 border-accent pl-4">
                    <span className="font-semibold text-[var(--text-main)] block mb-1">Revenue Forecast</span>
                    Fee collections in May are projected to exceed targets by 15%.
                  </li>
                </ul>
              </div>
            </div>

            {/* Timeline Widget */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 flex-1 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--text-main)]">
                <Clock className="w-5 h-5 text-[var(--text-muted)]" /> 
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shadow-[0_0_5px_var(--border-glow)]" />
                      {i !== recentActivity.length - 1 && <div className="w-0.5 h-full bg-[var(--border-subtle)] my-1" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-main)]">{activity.title}</h4>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{activity.desc}</p>
                      <span className="text-[10px] font-medium text-primary/70 mt-1 block uppercase tracking-wider">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 hover:shadow-[0_0_20px_var(--border-glow)] transition-shadow duration-300 hover:border-primary/30"
          >
            <h3 className="text-lg font-semibold mb-6 text-[var(--text-main)]">Department Distribution</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'var(--border-subtle)'}} contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)' }} />
                  <Bar dataKey="students" fill="var(--color-primary-gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 hover:shadow-[0_0_20px_var(--border-glow)] transition-shadow duration-300 hover:border-accent/30"
          >
            <h3 className="text-lg font-semibold mb-6 text-[var(--text-main)]">Fee Collection Trend</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="collected" stroke="var(--color-primary-gold)" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: 'var(--bg-main)'}} name="Collected ($)" />
                  <Line type="monotone" dataKey="target" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
