import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, BrainCircuit, Send, Sparkles, TrendingUp, Users, DollarSign } from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello Admin. I am your Campus Intelligence Assistant. How can I optimize operations for you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickActions = [
    { label: 'Low Attendance', icon: Users, query: 'Show me students with dangerously low attendance.' },
    { label: 'Fee Insights', icon: DollarSign, query: 'Give me insights on this month\'s fee collection.' },
    { label: 'Predictive Trends', icon: TrendingUp, query: 'What are the performance predictions for the next term?' }
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      let aiText = "I've analyzed the campus data. Everything is operating within normal parameters.";
      
      if (text.toLowerCase().includes('attendance')) {
        aiText = "Based on recent trends, Friday afternoon lectures have a 15% drop in attendance. I recommend scheduling core subjects earlier in the week or introducing interactive labs on Fridays.";
      } else if (text.toLowerCase().includes('fee')) {
        aiText = "We've collected $1.2M this month, which is 12% above our target. However, there are still 45 students in the Mechanical department with outstanding balances.";
      } else if (text.toLowerCase().includes('predict')) {
        aiText = "My predictive models show a 94% probability that the overall performance index will rise to 9.5 by finals, provided current engagement levels hold.";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[var(--bg-main)]/95 backdrop-blur-2xl border-l border-[var(--border-subtle)] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border-subtle)] bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-primary to-accent shadow-[0_0_15px_var(--border-glow)] text-black">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  {/* Glowing AI Indicator */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] border-2 border-[#050505] animate-pulse" />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-[var(--text-main)] tracking-tight">Campus Intelligence</h2>
                  <p className="text-xs text-[var(--text-muted)] font-medium">AI-powered operational insights</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-primary transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-red-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] rounded-br-sm'
                      : 'bg-gradient-to-br from-primary/20 to-accent/5 border border-primary/20 text-[var(--text-main)] rounded-bl-sm shadow-[0_0_15px_rgba(255,215,0,0.05)]'
                  }`}>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-xs font-bold uppercase tracking-wider">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-bl-sm flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-5 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action.query)}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-primary/10 hover:border-primary/50 text-xs font-medium text-[var(--text-muted)] hover:text-primary transition-colors"
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-5 pt-3 border-t border-[var(--border-subtle)] bg-[var(--bg-main)]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about campus data..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  className="w-full pl-4 pr-12 py-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl text-sm text-[var(--text-main)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all"
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-xl bg-gradient-to-r from-primary to-accent text-black disabled:opacity-50 disabled:grayscale transition-all hover:shadow-[0_0_15px_var(--border-glow)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-[10px] text-[var(--text-muted)] mt-3">
                AI can make mistakes. Verify important metrics on the Dashboard.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
