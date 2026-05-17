import React from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';

const Appointments = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your upcoming and past medical appointments.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 shadow-sm flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Book New
        </button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Appointments
          </h2>
        </div>
        <div className="divide-y">
          {[
            { doc: 'Dr. Sarah Johnson', spec: 'Cardiologist', date: 'Oct 24, 2026', time: '10:00 AM', status: 'Confirmed', loc: 'Room 204, Heart Center' },
            { doc: 'Dr. Emily Davis', spec: 'General Checkup', date: 'Nov 12, 2026', time: '02:30 PM', status: 'Pending', loc: 'Room 101, Main Wing' }
          ].map((apt, i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-muted/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{apt.doc}</h3>
                  <p className="text-primary text-sm font-medium">{apt.spec}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {apt.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {apt.loc}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                  {apt.status}
                </span>
                <button className="w-full sm:w-auto px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors">Reschedule</button>
                <button className="w-full sm:w-auto px-4 py-2 border rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
