import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Search, Moon, Sun, BrainCircuit } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { NotificationsDropdown } from './NotificationsDropdown';

interface TopbarProps {
  onOpenAI?: () => void;
}

export function Topbar({ onOpenAI }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`w-full h-16 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-main)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_var(--border-glow)] flex items-center justify-center bg-primary">
            <img src="/logo.png" alt="Smart Campus Logo" className="w-full h-full object-cover" onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-black font-extrabold text-lg">SC</span>';
            }} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[var(--text-main)] hidden sm:block">Smart Campus</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: 'Overview', path: '/dashboard' },
            { name: 'Students', path: '/students' },
            { name: 'Courses', path: '/courses' },
            { name: 'Faculty', path: '/faculty' },
            { name: 'Analytics', path: '/analytics' }
          ].map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-bold tracking-wide transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-[var(--text-muted)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all shadow-sm"
          />
        </div>
        
        <button 
          onClick={toggleTheme}
          className="relative p-2 rounded-full hover:bg-[var(--bg-card)] transition-colors text-[var(--text-muted)] hover:text-primary"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-[var(--bg-card)] transition-colors text-[var(--text-muted)] hover:text-primary group"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--border-glow)] group-hover:animate-pulse"></span>
          </button>
          
          <NotificationsDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

        <button 
          onClick={onOpenAI}
          className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm hover:bg-primary hover:text-black transition-all shadow-[0_0_10px_var(--border-glow)]"
        >
          <BrainCircuit className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px] cursor-pointer hover:shadow-[0_0_15px_var(--border-glow)] transition-all">
          <div className="w-full h-full rounded-full bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-main)] font-bold text-sm">
            AD
          </div>
        </div>
      </div>
    </div>
  );
}
