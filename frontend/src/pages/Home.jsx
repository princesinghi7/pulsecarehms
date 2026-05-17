import React from 'react';
import { ArrowRight, Activity, Clock, Users, Shield, Zap, Search, Phone, HeartPulse, Brain, Bone, Baby, Mail, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="absolute inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-max">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-medium uppercase tracking-wider">Smart Hospital Management System</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Next Generation <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Healthcare</span> Platform
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Experience seamless healthcare management with our AI-powered ecosystem. Streamlined appointments, smart diagnosis, and unified patient records in one platform.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link to="/register" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-all border border-border">
                  Log in
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">10k+</span>
                  <span className="text-sm text-muted-foreground">Patients Served</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">50+</span>
                  <span className="text-sm text-muted-foreground">Specialist Doctors</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">24/7</span>
                  <span className="text-sm text-muted-foreground">Emergency Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-in slide-in-from-right duration-700 delay-150">
              <div className="relative rounded-2xl bg-card border shadow-2xl p-6 backdrop-blur-sm bg-card/80">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    AI Symptom Checker
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">Smart Triage</span>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">Describe your symptoms</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="e.g. headache and fever for 3 days" 
                        className="w-full bg-background border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link to="/register" className="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-muted hover:border-red-500 transition-all cursor-pointer">
                      <Phone className="h-6 w-6 text-red-500 mb-2" />
                      <span className="text-sm font-medium">Emergency</span>
                    </Link>
                    <Link to="/register" className="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-muted hover:border-blue-500 transition-all cursor-pointer">
                      <Clock className="h-6 w-6 text-blue-500 mb-2" />
                      <span className="text-sm font-medium">Book Visit</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-card border shadow-lg rounded-lg p-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">100% Secure</p>
                    <p className="text-xs text-muted-foreground">HIPAA Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Features</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Comprehensive Hospital Management</h2>
            <p className="text-muted-foreground">A fully integrated suite of tools designed to optimize patient care and hospital operations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Smart Appointments', icon: Clock, desc: 'AI-driven slot allocation, smart queues, and automated reminders.' },
              { title: 'Electronic Health Records', icon: Users, desc: 'Secure, centralized patient history accessible anywhere.' },
              { title: 'Real-time Analytics', icon: Activity, desc: 'Interactive dashboards for hospital performance and revenue.' },
              { title: 'AI Diagnostics', icon: Zap, desc: 'Assistive AI for faster diagnosis and treatment planning.' },
              { title: 'Pharmacy & Lab', icon: Activity, desc: 'Integrated inventory management and automated lab reporting.' },
              { title: 'Telemedicine', icon: Phone, desc: 'Built-in video consultations and secure messaging.' }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-muted/30 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Departments</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Centers of Excellence</h2>
            <p className="text-muted-foreground">Our hospital provides state-of-the-art facilities across various medical specialties.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cardiology', icon: HeartPulse, desc: 'Advanced heart care and surgery.' },
              { title: 'Neurology', icon: Brain, desc: 'Comprehensive brain and spine treatments.' },
              { title: 'Orthopedics', icon: Bone, desc: 'Bone, joint, and spine surgery experts.' },
              { title: 'Pediatrics', icon: Baby, desc: 'Specialized healthcare for infants and children.' }
            ].map((dept, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-background border hover:border-primary transition-colors duration-300">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <dept.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
                <p className="text-sm text-muted-foreground">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-background scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Specialists</span>
              <h2 className="text-3xl font-bold mt-2">Meet Our Expert Doctors</h2>
            </div>
            <Link to="/register" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
              View All Doctors <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Sarah Johnson', spec: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { name: 'Dr. Michael Chen', spec: 'Neurologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { name: 'Dr. Emily Davis', spec: 'Pediatrician', img: 'https://images.unsplash.com/photo-1594824432258-293e62f0fcd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
            ].map((doc, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border bg-card hover:shadow-lg transition-all">
                <div className="h-64 overflow-hidden">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{doc.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{doc.spec}</p>
                  <Link to="/register" className="inline-flex flex-1 items-center justify-center w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/80 transition-colors">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Contact Us</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Get In Touch With Us</h2>
              <p className="text-muted-foreground mb-8">
                Have questions or need assistance? Our support team is here to help you 24/7. Reach out via phone, email, or visit our hospital.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Our Location</h4>
                    <p className="text-muted-foreground">123 Health Avenue, Medical District<br/>New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone Number</h4>
                    <p className="text-muted-foreground">+1 (800) 123-4567<br/>Emergency: 911</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Address</h4>
                    <p className="text-muted-foreground">support@pulsecare.com<br/>appointments@pulsecare.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border shadow-xl rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea rows="4" className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-8 bg-background border-t text-center text-muted-foreground">
        <p>&copy; 2026 PulseCare Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
