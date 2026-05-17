import React from 'react';
import { Search, Filter, FileText, Calendar, ChevronRight } from 'lucide-react';

const DoctorPatients = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Patients</h1>
          <p className="text-muted-foreground">View and manage your patient records.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 shadow-sm flex items-center gap-2">
          Add New Patient
        </button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/30">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search patients by name, ID, or phone..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors whitespace-nowrap">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3">Patient Name</th>
                <th className="px-6 py-3">Patient ID</th>
                <th className="px-6 py-3">Age / Gender</th>
                <th className="px-6 py-3">Last Visit</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { name: 'John Smith', id: 'PT-2026-001', age: '45 / Male', date: 'Oct 24, 2026', status: 'Active', img: 'JS' },
                { name: 'Sarah Connor', id: 'PT-2026-042', age: '32 / Female', date: 'Sep 12, 2026', status: 'Active', img: 'SC' },
                { name: 'Michael Brown', id: 'PT-2026-088', age: '58 / Male', date: 'Aug 05, 2026', status: 'Inactive', img: 'MB' },
                { name: 'Emma Davis', id: 'PT-2026-112', age: '24 / Female', date: 'Oct 15, 2026', status: 'Active', img: 'ED' },
                { name: 'James Wilson', id: 'PT-2026-094', age: '61 / Male', date: 'Jul 22, 2026', status: 'Critical', img: 'JW' },
              ].map((patient, i) => (
                <tr key={i} className="hover:bg-muted/10 transition-colors bg-card">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {patient.img}
                    </div>
                    <span className="font-medium text-foreground">{patient.name}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{patient.id}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-700' :
                      patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-primary hover:text-primary/80 transition-colors p-1" title="View Records">
                       <FileText className="h-4 w-4 inline" />
                    </button>
                    <button className="text-primary hover:text-primary/80 transition-colors p-1" title="Schedule">
                       <Calendar className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex justify-between items-center text-sm text-muted-foreground bg-card">
          <span>Showing 1 to 5 of 142 patients</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border rounded hover:bg-muted">Prev</button>
            <button className="px-2 py-1 border rounded bg-primary text-primary-foreground">1</button>
            <button className="px-2 py-1 border rounded hover:bg-muted">2</button>
            <button className="px-2 py-1 border rounded hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
