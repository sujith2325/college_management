import React, { useState } from 'react';
import { Topbar } from '../components/layout/Topbar';
import { Search, Plus, Mail, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const mockFaculty = [
  { id: 1, name: "Dr. Alan Turing", email: "alan@college.edu", department: "Computer Science", specialization: "Cryptography & AI", avatar: "AT" },
  { id: 2, name: "Dr. Marie Curie", email: "marie@college.edu", department: "Physics", specialization: "Nuclear Physics", avatar: "MC" },
  { id: 3, name: "Prof. Ada Lovelace", email: "ada@college.edu", department: "Mathematics", specialization: "Computational Mathematics", avatar: "AL" },
  { id: 4, name: "Dr. Richard Feynman", email: "richard@college.edu", department: "Physics", specialization: "Quantum Mechanics", avatar: "RF" },
  { id: 5, name: "Dr. Grace Hopper", email: "grace@college.edu", department: "Computer Science", specialization: "Compilers & Systems", avatar: "GH" },
  { id: 6, name: "Prof. John Nash", email: "john@college.edu", department: "Mathematics", specialization: "Game Theory", avatar: "JN" },
];

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaculty = mockFaculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col relative overflow-hidden transition-colors duration-400">
      <Topbar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Faculty Directory</h1>
            <p className="text-[var(--text-muted)]">Manage esteemed professors, staff members, and assignments.</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_var(--border-glow)] hover:shadow-[0_0_25px_var(--border-glow)]">
            <Plus className="w-4 h-4" /> Add Faculty
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search by name, department, or specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
            />
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.length === 0 ? (
            <div className="col-span-full py-12 text-center text-[var(--text-muted)]">
              No faculty members found matching "{searchTerm}"
            </div>
          ) : (
            filteredFaculty.map((faculty, i) => (
              <motion.div 
                key={faculty.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_var(--border-glow)]"
              >
                {/* Decorative glow on hover */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 z-0 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-black font-extrabold text-2xl shadow-[0_0_15px_var(--border-glow)] border-2 border-[var(--bg-main)] transform group-hover:scale-105 transition-transform duration-300">
                      {faculty.avatar}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                      {faculty.department}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-1 tracking-tight">{faculty.name}</h3>
                  <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-6">
                    <Mail className="w-4 h-4 text-primary/70" />
                    <span>{faculty.email}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-main)] text-primary border border-[var(--border-subtle)] group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mb-0.5">Specialization</p>
                      <p className="text-sm font-medium text-[var(--text-main)]">{faculty.specialization}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
