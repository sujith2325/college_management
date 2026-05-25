import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, UserCheck, Calendar, LogOut, LayoutDashboard, Settings } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<{ id: number, name: string, role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = [
    { name: 'Total Students', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Active Courses', value: '84', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Faculty Members', value: '112', icon: UserCheck, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { name: "Today's Classes", value: '42', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CMS Portal
          </span>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Students</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
            <UserCheck className="w-5 h-5" />
            <span className="font-medium">Faculty</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Courses</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-medium text-slate-200">Overview</h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold border border-white/10 shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h2>
            <p className="text-slate-400">Here's what's happening across the campus today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                  <stat.icon className={`w-16 h-16 ${stat.color}`} />
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-400 font-medium mb-1">{stat.name}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="flex items-center justify-center h-48 text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
              <p>Activity feed will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
