import React from 'react';
import { Student } from '../types';
import { X, FileText, Calendar, MapPin, Mail, Phone, Download } from 'lucide-react';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 w-full relative">
          <div className="absolute -bottom-12 left-8 flex items-end">
            <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-lg">
               <div className="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                 <span className="text-3xl font-bold">{student.name.charAt(0)}</span>
               </div>
            </div>
            <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">{student.name}</h2>
                <p className="text-blue-100 font-medium">{student.nim} • {student.major}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 px-8 pb-8 space-y-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Informasi Akademik</h3>
                    <div className="flex items-center text-slate-700">
                        <Calendar className="w-5 h-5 mr-3 text-slate-400" />
                        <div>
                            <p className="text-sm text-slate-500">Angkatan</p>
                            <p className="font-medium">{student.entryYear}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-slate-700">
                        <div className={`w-2.5 h-2.5 rounded-full mr-4 ${student.status === 'Aktif' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                        <div>
                            <p className="text-sm text-slate-500">Status</p>
                            <p className="font-medium">{student.status}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Kontak & Alamat</h3>
                    <div className="flex items-start text-slate-700">
                        <MapPin className="w-5 h-5 mr-3 text-slate-400 mt-1" />
                        <div>
                            <p className="text-sm text-slate-500">Alamat</p>
                            <p className="font-medium">{student.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-slate-700">
                        <Mail className="w-5 h-5 mr-3 text-slate-400" />
                        <p className="font-medium">{student.email}</p>
                    </div>
                    <div className="flex items-center text-slate-700">
                        <Phone className="w-5 h-5 mr-3 text-slate-400" />
                        <p className="font-medium">{student.phone}</p>
                    </div>
                </div>
            </div>

            {/* Documents Section */}
            <div>
                 <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">Arsip Dokumen</h3>
                 {student.documents.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {student.documents.map(doc => (
                             <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all bg-slate-50">
                                 <div className="flex items-center overflow-hidden">
                                     <FileText className="w-8 h-8 text-blue-500 mr-3 flex-shrink-0" />
                                     <div className="truncate">
                                         <p className="font-medium text-slate-700 truncate">{doc.name}</p>
                                         <p className="text-xs text-slate-500">{doc.uploadDate}</p>
                                     </div>
                                 </div>
                                 <a href={doc.url} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                     <Download className="w-5 h-5" />
                                 </a>
                             </div>
                         ))}
                     </div>
                 ) : (
                     <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center text-slate-400">
                         <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                         <p>Belum ada dokumen yang diunggah.</p>
                     </div>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;