import React, { useState, useEffect } from 'react';
import { Student, Major, Status } from '../types';
import { X, Save, Upload } from 'lucide-react';

interface StudentFormProps {
  initialData?: Student | null;
  onSave: (data: Partial<Student>) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    nim: '',
    major: Major.TI,
    entryYear: new Date().getFullYear(),
    email: '',
    phone: '',
    address: '',
    status: Status.ACTIVE,
    documents: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIM */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">NIM</label>
              <input
                required
                name="nim"
                type="text"
                value={formData.nim}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                placeholder="Ex: 2023001"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                placeholder="Nama sesuai KTP"
              />
            </div>

            {/* Major */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Program Studi</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
              >
                {Object.values(Major).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

             {/* Year */}
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Angkatan</label>
              <input
                required
                name="entryYear"
                type="number"
                min="2010"
                max="2030"
                value={formData.entryYear}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

             {/* Status */}
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Status Akademik</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white"
              >
                {Object.values(Status).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

             {/* Phone */}
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">No. Telepon</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Email Institusi</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Alamat Domisili</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition-all flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;