import React, { useState } from 'react';
import { Student, Major, Status } from '../types';
import { Search, Plus, Edit, Trash2, Eye, Sparkles, Filter, X } from 'lucide-react';
import { parseNaturalSearch } from '../services/geminiService';

interface StudentListProps {
  students: Student[];
  onAdd: () => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onView: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAdd, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilter, setAiFilter] = useState<any>(null); // Store parsed AI filter

  // Filter Logic
  const filteredStudents = students.filter(student => {
    // If AI Filter is active, use it strictly
    if (aiFilter) {
      let match = true;
      if (aiFilter.name && !student.name.toLowerCase().includes(aiFilter.name.toLowerCase())) match = false;
      if (aiFilter.major && student.major !== aiFilter.major) match = false;
      if (aiFilter.year && student.entryYear !== aiFilter.year) match = false;
      if (aiFilter.status && student.status.toLowerCase() !== aiFilter.status.toLowerCase()) match = false;
      return match;
    }

    // Standard Search
    const lowerTerm = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(lowerTerm) ||
      student.nim.includes(lowerTerm) ||
      student.major.toLowerCase().includes(lowerTerm)
    );
  });

  const handleAiSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsAiSearching(true);
    const result = await parseNaturalSearch(searchTerm);
    if (result) {
      setAiFilter(result);
    } else {
        alert("Maaf, AI tidak dapat memahami pencarian tersebut.");
    }
    setIsAiSearching(false);
  };

  const clearAiFilter = () => {
    setAiFilter(null);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Daftar Mahasiswa</h2>
          <p className="text-sm text-slate-500">Kelola seluruh arsip data mahasiswa</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <input
              type="text"
              placeholder={aiFilter ? "Filter AI Aktif..." : "Cari (Nama, NIM, atau Natural...)"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !aiFilter && handleAiSearch()}
              className={`pl-10 pr-12 py-2.5 rounded-lg border ${aiFilter ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-100 w-full sm:w-80 transition-all outline-none`}
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            
            {aiFilter ? (
                 <button 
                 onClick={clearAiFilter}
                 className="absolute right-2 top-2 p-1 bg-indigo-200 hover:bg-indigo-300 rounded-full text-indigo-700 transition-colors"
                 title="Hapus Filter AI"
               >
                 <X className="w-4 h-4" />
               </button>
            ) : (
                <button 
                onClick={handleAiSearch}
                disabled={isAiSearching}
                className="absolute right-2 top-2 p-1 text-indigo-500 hover:bg-indigo-50 rounded transition-colors"
                title="Cari dengan AI (Misal: 'Mahasiswa TI angkatan 2023')"
                >
                <Sparkles className={`w-4 h-4 ${isAiSearching ? 'animate-pulse' : ''}`} />
                </button>
            )}
          </div>

          <button 
            onClick={onAdd}
            className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </button>
        </div>
      </div>

      {/* AI Filter Badge Feedback */}
      {aiFilter && (
        <div className="px-6 py-2 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2 text-sm text-indigo-700">
            <Sparkles className="w-4 h-4" />
            <span>Filter Aktif:</span>
            <div className="flex gap-2">
                {Object.entries(aiFilter).map(([key, value]) => (
                    <span key={key} className="px-2 py-0.5 bg-white rounded border border-indigo-200 capitalize font-medium">
                        {key}: {String(value)}
                    </span>
                ))}
            </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold border-b border-slate-200">NIM</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-200">Nama Lengkap</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-200">Prodi</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-200">Angkatan</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-200">Status</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-200 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-slate-600 font-medium">{student.nim}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{student.major}</td>
                  <td className="px-6 py-4 text-slate-600">{student.entryYear}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.status === Status.ACTIVE ? 'bg-emerald-100 text-emerald-800' : 
                        student.status === Status.GRADUATED ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-600'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onView(student)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Lihat Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onEdit(student)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(student.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Tidak ada data mahasiswa ditemukan.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;