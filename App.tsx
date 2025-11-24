import React, { useState } from 'react';
import { INITIAL_STUDENTS, Student, ViewState } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // App State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Username atau password salah (Gunakan: admin/admin)');
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSaveStudent = (data: Partial<Student>) => {
    if (editingStudent) {
      // Update
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...data } as Student : s));
    } else {
      // Create
      const newStudent: Student = {
        ...data as Student,
        id: Math.random().toString(36).substr(2, 9),
        documents: []
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    setIsFormOpen(false);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">SiArsip<span className="text-blue-600">.</span></h1>
            <p className="text-slate-500 mt-2">Sistem Pengarsipan Data Mahasiswa</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30">
              Masuk Sistem
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-6">Demo Access: admin / admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
        }} 
        onLogout={() => setIsLoggedIn(false)}
        isOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64 h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden mr-4 text-slate-600 hover:text-blue-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-slate-800 capitalize">
                {currentView === 'dashboard' ? 'Dashboard Utama' : 
                 currentView === 'students' ? 'Manajemen Data' : 
                 currentView === 'archive' ? 'Arsip Digital' : 'Pengaturan'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-slate-700">Administrator</p>
                 <p className="text-xs text-slate-500">Bagian Akademik</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                 A
             </div>
          </div>
        </header>

        <div className="p-6">
          {currentView === 'dashboard' && <Dashboard students={students} />}
          {currentView === 'students' && (
            <StudentList 
              students={students} 
              onAdd={handleAddStudent} 
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onView={setViewingStudent}
            />
          )}
          {currentView === 'archive' && (
            <div className="text-center py-20 text-slate-500">
                <p className="text-lg">Modul Arsip Terpusat</p>
                <p className="text-sm">Silakan akses dokumen melalui detail mahasiswa.</p>
            </div>
          )}
          {currentView === 'settings' && (
             <div className="text-center py-20 text-slate-500">
                <p className="text-lg">Pengaturan Sistem</p>
                <p className="text-sm">Konfigurasi akun dan sistem backup.</p>
             </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {isFormOpen && (
        <StudentForm 
          initialData={editingStudent}
          onSave={handleSaveStudent}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {viewingStudent && (
        <StudentDetail
            student={viewingStudent}
            onClose={() => setViewingStudent(null)}
        />
      )}
    </div>
  );
};

export default App;