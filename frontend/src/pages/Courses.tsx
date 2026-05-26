import React, { useState } from 'react';
import { Topbar } from '../components/layout/Topbar';
import { Search, Plus, MoreVertical, BookOpen, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const mockCourses = [
  { id: 1, name: "Advanced Data Structures", credits: 4, semester: 3, department: "Computer Science" },
  { id: 2, name: "Machine Learning Fundamentals", credits: 4, semester: 5, department: "Artificial Intelligence" },
  { id: 3, name: "Digital Logic Design", credits: 3, semester: 2, department: "Electronics" },
  { id: 4, name: "Engineering Mathematics IV", credits: 4, semester: 4, department: "Mathematics" },
  { id: 5, name: "Database Management Systems", credits: 3, semester: 4, department: "Computer Science" },
  { id: 6, name: "Computer Networks", credits: 4, semester: 5, department: "Information Science" },
  { id: 7, name: "Operating Systems", credits: 4, semester: 4, department: "Computer Science" },
  { id: 8, name: "Quantum Physics", credits: 3, semester: 1, department: "Physics" },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col relative overflow-hidden transition-colors duration-400">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <Topbar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Courses Management</h1>
            <p className="text-[var(--text-muted)]">View and manage all active academic courses.</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_var(--border-glow)] hover:shadow-[0_0_25px_var(--border-glow)]">
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Courses", value: "142", icon: BookOpen },
            { title: "Active Semesters", value: "8", icon: Clock },
            { title: "Departments", value: "12", icon: Building2 }
          ].map((stat, i) => (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_var(--border-glow)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-subtle)] text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-[0_0_10px_var(--border-glow)]">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
                  <p className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[600px]"
        >
          <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-main)]/50 backdrop-blur-md">
            <h2 className="text-xl font-bold tracking-tight">Course Directory</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-xl text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left text-sm relative">
              <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] sticky top-0 z-20 shadow-sm border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Course Name</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Department</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Semester</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Credits</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-muted)] font-medium">
                      No courses found matching "{searchTerm}"
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course, i) => (
                    <motion.tr 
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="hover:bg-primary/5 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 font-semibold text-[var(--text-main)]">
                        {course.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                          {course.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)] font-medium">Semester {course.semester}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--border-glow)]"></span>
                          <span className="text-[var(--text-main)] font-semibold">{course.credits} Credits</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[var(--text-muted)] hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
