import React, { useContext } from 'react';
import { Users, Calendar, Activity, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const firstName = user?.name ? user.name.split(' ')[0] : 'Doctor';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. {firstName}</h1>
          <p className="text-muted-foreground">You have 5 appointments scheduled for today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Today's Appts</h3>
          </div>
          <span className="text-2xl font-bold">5</span>
        </div>
        
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Total Patients</h3>
          </div>
          <span className="text-2xl font-bold">142</span>
        </div>

        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Next Appt</h3>
          </div>
          <span className="text-xl font-bold">10:30 AM</span>
        </div>

        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Pending Reports</h3>
          </div>
          <span className="text-2xl font-bold">3</span>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Schedule
          </h2>
        </div>
        <div className="divide-y">
          {[
            { time: '09:00 AM', name: 'John Smith', type: 'General Checkup', status: 'Completed' },
            { time: '10:30 AM', name: 'Sarah Connor', type: 'Follow up', status: 'Waiting' },
            { time: '11:15 AM', name: 'Michael Brown', type: 'New Patient', status: 'Scheduled' }
          ].map((apt, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="font-medium w-20 text-sm">{apt.time}</span>
                <div>
                  <h3 className="font-semibold">{apt.name}</h3>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  apt.status === 'Waiting' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {apt.status}
                </span>
                <button className="text-sm text-primary font-medium hover:underline">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
