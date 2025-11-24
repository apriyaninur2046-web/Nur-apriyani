import React from 'react';
import { LayoutDashboard, Users, Archive, Settings, LogOut, GraduationCap } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Data Mahasiswa', icon: Users },
    { id: 'archive', label: 'Arsip Dokumen', icon: Archive },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl`}>
      <div className="flex items-center justify-center h-20 border-b border-slate-700 bg-slate-800">
        <GraduationCap className="w-8 h-8 text-blue-400 mr-2" />
        <h1 className="text-xl font-bold tracking-wider">SiArsip<span className="text-blue-400">.</span></h1>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700 bg-slate-800">
        <button 
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;