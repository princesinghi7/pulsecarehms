import React, { useContext } from 'react';
import { Calendar, Clock, Activity, FileText, ChevronRight, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../context/AuthContext';

const healthData = [
  { name: 'Jan', bp: 120, heartRate: 72 },
  { name: 'Feb', bp: 118, heartRate: 70 },
  { name: 'Mar', bp: 122, heartRate: 75 },
  { name: 'Apr', bp: 115, heartRate: 68 },
  { name: 'May', bp: 119, heartRate: 71 },
  { name: 'Jun', bp: 118, heartRate: 70 },
];

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good Morning, {firstName}</h1>
          <p className="text-muted-foreground">Here is your health summary for today.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 shadow-sm flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Book New Appointment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Blood Pressure</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">118/75</span>
            <span className="text-sm text-green-500 font-medium">Normal</span>
          </div>
        </div>
        
        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Heart Rate</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">72</span>
            <span className="text-sm text-muted-foreground">bpm</span>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Lab Reports</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">2</span>
            <span className="text-sm text-muted-foreground">New available</span>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-sm text-muted-foreground">Next Visit</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">In 3 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-card border rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Health Trends</h2>
            <select className="bg-muted text-sm rounded-md px-2 py-1 border-none outline-none">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                <YAxis tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line type="monotone" dataKey="bp" name="Blood Pressure" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: 'hsl(var(--primary))'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#ef4444" strokeWidth={3} dot={{r: 4, fill: '#ef4444'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-card border rounded-xl shadow-sm p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Appointments
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            {/* Appointment Card */}
            <div className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-primary">Cardiologist</p>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md">Confirmed</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Oct 24, 2026</div>
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> 10:00 AM</div>
              </div>
            </div>

            {/* Appointment Card */}
            <div className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Dr. Emily Davis</h4>
                  <p className="text-sm text-primary">General Checkup</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 text-xs font-medium px-2 py-1 rounded-md">Pending</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Nov 12, 2026</div>
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> 02:30 PM</div>
              </div>
            </div>

            <button className="mt-auto flex items-center justify-center w-full text-sm font-medium text-primary py-2 hover:bg-primary/5 rounded-md transition-colors">
              View All Schedule <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* AI Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-full text-white shadow-md">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">AI Health Insight</h3>
            <p className="text-blue-800/80 dark:text-blue-200/80">
              Your blood pressure has stabilized over the last 3 months. Based on your recent lab results, we recommend continuing your current diet and adding 20 minutes of daily cardio. Would you like to schedule a follow-up with your Cardiologist to discuss these results?
            </p>
            <div className="mt-3 flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors">Schedule Follow-up</button>
              <button className="bg-transparent border border-blue-300 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
