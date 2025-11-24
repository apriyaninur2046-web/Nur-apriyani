import React, { useEffect, useState } from 'react';
import { Student, Major, Status } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, UserMinus, GraduationCap, Wand2 } from 'lucide-react';
import { generateDashboardSummary } from '../services/geminiService';

interface DashboardProps {
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const [summary, setSummary] = useState<string>('Memuat analisis AI...');
  
  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
        const text = await generateDashboardSummary(students);
        if (isMounted) setSummary(text);
    };
    fetchSummary();
    return () => { isMounted = false; };
  }, [students]);

  // Stats Calculation
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === Status.ACTIVE).length;
  const graduatedStudents = students.filter(s => s.status === Status.GRADUATED).length;
  const inactiveStudents = totalStudents - activeStudents - graduatedStudents;

  // Chart Data
  const majorData = Object.values(Major).map(major => ({
    name: major.split(' ')[0] + (major.split(' ')[1] ? '...' : ''), // Shorten name
    fullName: major,
    count: students.filter(s => s.major === major).length
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const statusData = [
    { name: 'Aktif', value: activeStudents },
    { name: 'Lulus', value: graduatedStudents },
    { name: 'Lainnya', value: inactiveStudents },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Statistik</h2>
        <span className="text-sm text-slate-500">Terakhir diperbarui: {new Date().toLocaleDateString()}</span>
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wand2 className="w-24 h-24 text-indigo-600" />
        </div>
        <div className="relative z-10">
          <h3 className="flex items-center text-lg font-semibold text-indigo-900 mb-2">
            <Wand2 className="w-5 h-5 mr-2 text-indigo-600" />
            Analisis AI (Gemini)
          </h3>
          <p className="text-indigo-800 leading-relaxed max-w-3xl">
            {summary}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Total Mahasiswa" value={totalStudents} color="bg-blue-500" />
        <StatCard icon={UserCheck} title="Mahasiswa Aktif" value={activeStudents} color="bg-emerald-500" />
        <StatCard icon={GraduationCap} title="Lulusan" value={graduatedStudents} color="bg-amber-500" />
        <StatCard icon={UserMinus} title="Cuti/DO" value={inactiveStudents} color="bg-rose-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Distribusi Program Studi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={majorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Status Akademik</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }: { icon: any, title: string, value: number, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
    <div className={`${color} p-4 rounded-lg text-white mr-4 shadow-md`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
    </div>
  </div>
);

export default Dashboard;