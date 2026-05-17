import React from 'react';
import { FileText, Download, Eye, Clock } from 'lucide-react';

const MedicalRecords = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">View and download your lab results and prescriptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Lab Reports
            </h2>
          </div>
          <div className="divide-y">
            {[
              { name: 'Complete Blood Count (CBC)', date: 'Sep 15, 2026', doctor: 'Dr. Emily Davis' },
              { name: 'Lipid Panel', date: 'Sep 15, 2026', doctor: 'Dr. Sarah Johnson' }
            ].map((report, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                <div>
                  <h3 className="font-medium text-sm">{report.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {report.date} &bull; Ordered by {report.doctor}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors" title="View"><Eye className="h-4 w-4" /></button>
                  <button className="p-2 border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition-colors" title="Download"><Download className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Prescriptions
            </h2>
          </div>
          <div className="divide-y">
            {[
              { name: 'Amoxicillin 500mg', instructions: 'Take 1 tablet every 8 hours for 7 days', date: 'Sep 15, 2026' },
              { name: 'Lisinopril 10mg', instructions: 'Take 1 tablet daily', date: 'Aug 01, 2026' }
            ].map((pres, i) => (
              <div key={i} className="p-4 hover:bg-muted/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm text-primary">{pres.name}</h3>
                  <span className="text-xs text-muted-foreground">{pres.date}</span>
                </div>
                <p className="text-sm text-foreground">{pres.instructions}</p>
                <div className="mt-3 flex gap-2">
                   <button className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded hover:bg-secondary/80">Request Refill</button>
                   <button className="text-xs border px-3 py-1.5 rounded hover:bg-muted">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
