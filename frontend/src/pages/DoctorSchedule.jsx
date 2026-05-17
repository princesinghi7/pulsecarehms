import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const DoctorSchedule = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Schedule</h1>
          <p className="text-muted-foreground">Manage your availability and upcoming appointments.</p>
        </div>
        <div className="flex gap-2 border rounded-md p-1 bg-muted/30">
           <button className="px-3 py-1 text-sm font-medium bg-background border shadow-sm rounded">Day</button>
           <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Week</button>
           <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Month</button>
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Calendar Side */}
        <div className="w-full md:w-80 border-r p-6 flex flex-col bg-muted/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">October 2026</h2>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="h-4 w-4" /></button>
              <button className="p-1 hover:bg-muted rounded"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {[...Array(31)].map((_, i) => (
              <button 
                key={i} 
                className={`aspect-square rounded-full flex items-center justify-center transition-colors ${
                  i + 1 === 24 ? 'bg-primary text-primary-foreground font-bold' : 
                  i + 1 === 12 || i + 1 === 18 ? 'bg-primary/20 text-primary font-bold' : 
                  'hover:bg-muted'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
             <h3 className="font-semibold text-sm">Working Hours</h3>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Mon - Fri</span>
                <span className="font-medium">09:00 AM - 05:00 PM</span>
             </div>
             <button className="w-full mt-2 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/5 transition-colors">
               Edit Availability
             </button>
          </div>
        </div>

        {/* Schedule Side */}
        <div className="flex-1 flex flex-col h-[600px] overflow-y-auto">
          <div className="p-4 border-b sticky top-0 bg-card z-10 flex justify-between items-center">
             <h2 className="font-semibold text-lg">Thursday, Oct 24</h2>
             <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">5 Appointments</span>
          </div>
          
          <div className="p-6 relative">
            <div className="absolute left-16 top-6 bottom-6 w-px bg-border"></div>
            
            <div className="space-y-8">
              {[
                { time: '09:00', period: 'AM', name: 'John Smith', type: 'General Checkup', dur: '30 min', status: 'Completed' },
                { time: '10:30', period: 'AM', name: 'Sarah Connor', type: 'Follow up', dur: '15 min', status: 'Waiting' },
                { time: '11:15', period: 'AM', name: 'Michael Brown', type: 'New Patient', dur: '45 min', status: 'Scheduled' },
                { time: '02:00', period: 'PM', name: 'Emma Davis', type: 'Consultation', dur: '30 min', status: 'Scheduled' },
                { time: '04:30', period: 'PM', name: 'James Wilson', type: 'Review', dur: '15 min', status: 'Scheduled' },
              ].map((apt, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-12 text-right shrink-0 relative z-10 bg-card py-1">
                     <span className="text-lg font-bold">{apt.time}</span>
                     <span className="text-xs text-muted-foreground block">{apt.period}</span>
                  </div>
                  
                  <div className={`flex-1 border rounded-lg p-4 transition-colors hover:shadow-md ${
                    apt.status === 'Completed' ? 'bg-muted/50 border-transparent' : 
                    apt.status === 'Waiting' ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50' : 
                    'bg-card border-border'
                  }`}>
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <h3 className="font-semibold text-lg">{apt.name}</h3>
                         <p className="text-sm text-primary font-medium">{apt.type}</p>
                       </div>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                         apt.status === 'Waiting' ? 'bg-yellow-100 text-yellow-700' :
                         'bg-blue-100 text-blue-700'
                       }`}>
                         {apt.status}
                       </span>
                     </div>
                     <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {apt.dur}</span>
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Room 204</span>
                     </div>
                     <div className="mt-4 flex gap-2">
                        <button className="text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors">Start Session</button>
                        <button className="text-xs font-medium border px-3 py-1.5 rounded hover:bg-muted transition-colors">View Records</button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
