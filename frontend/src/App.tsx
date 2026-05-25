import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Dashboard } from './features/dashboard/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Analytics from './pages/Analytics';
import { AIChatDrawer } from './components/ai/AIChatDrawer';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <Router>
      {/* We no longer need the hardcoded bg-slate-900 here because index.css handles body bg */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/analytics" element={<Analytics />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        
        {/* Global AI Chat Drawer */}
        <AIChatDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        
        {/* Floating AI Button (Persistent) */}
        {!isAIOpen && window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsAIOpen(true)}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_var(--border-glow)] flex items-center justify-center z-40 group border-2 border-[var(--bg-main)]"
          >
            {/* Soft pulsing glow behind the button */}
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" style={{ animationDuration: '3s' }} />
            
            <div className="relative z-10 w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-primary group-hover:bg-transparent group-hover:text-black transition-colors duration-300">
              <BrainCircuit className="w-6 h-6" />
            </div>
          </motion.button>
        )}
      </div>
    </Router>
  );
}

export default App;
