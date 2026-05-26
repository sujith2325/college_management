import React, { useState, useEffect, useMemo } from 'react';
import { Topbar } from '../components/layout/Topbar';
import { Search, Plus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  usn: string;
  year: number | null;
  phone: string;
  department?: {
    department_name: string;
  };
}

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      const usn = (student.usn || '').toLowerCase();
      const search = searchTerm.toLowerCase();
      return fullName.includes(search) || usn.includes(search);
    });
  }, [students, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const currentStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col relative overflow-hidden transition-colors duration-400">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <Topbar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full relative z-10 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Students Directory</h1>
            <p className="text-[var(--text-muted)]">Manage all {students.length > 0 ? students.length.toLocaleString() : ''} registered students across the campus.</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_var(--border-glow)] hover:shadow-[0_0_25px_var(--border-glow)]">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search by name or USN..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
            />
          </div>
        </motion.div>

        {/* Data Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[650px]"
        >
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left text-sm relative">
              <thead className="bg-[var(--bg-main)] text-[var(--text-muted)] sticky top-0 z-20 shadow-sm border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">NAME</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">YEAR</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">DEPARTMENT</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">PHONE</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)] font-medium">
                      Loading directory...
                    </td>
                  </tr>
                ) : currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)] font-medium">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student) => (
                    <tr 
                      key={student.student_id}
                      className="hover:bg-primary/5 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 text-[var(--text-muted)] font-mono text-xs font-semibold">
                        {student.usn}
                      </td>
                      <td className="px-6 py-4 font-bold text-[var(--text-main)] tracking-tight">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-[var(--bg-main)] border border-[var(--border-subtle)] text-[var(--text-main)] text-xs font-bold uppercase tracking-wider group-hover:border-primary/50 transition-colors">
                          {student.year ? `Year ${student.year}` : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                          {student.department?.department_name || 'Unassigned'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)] font-medium">
                        {student.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[var(--text-muted)] hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {!loading && filteredStudents.length > 0 && (
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-main)]/50 backdrop-blur-md flex items-center justify-between text-sm text-[var(--text-muted)]">
              <div className="font-medium">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-[var(--bg-card)] disabled:opacity-50 disabled:hover:bg-transparent transition-colors hover:text-primary"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-bold">
                    {currentPage}
                  </span>
                  <span className="px-2 font-medium">of</span>
                  <span className="px-3 py-1 text-[var(--text-main)] font-bold">
                    {totalPages}
                  </span>
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-[var(--bg-card)] disabled:opacity-50 disabled:hover:bg-transparent transition-colors hover:text-primary"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
