import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, MapPin, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { SectionWrapper } from '../components/SectionWrapper';
export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thanks! I'll get back to you soon 🎉", {
        style: {
          background: '#ffffff',
          color: '#1A1035',
          border: '1.5px solid #E5E3F3',
          boxShadow: '0 4px 20px rgba(30,20,90,0.10)',
        },
        iconTheme: {
          primary: '#5B4CF5',
          secondary: '#ffffff',
        }
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Toaster position="bottom-right" />
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5
            }}
            className="space-y-8">
            
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Let's <span className="text-gradient">connect ✨</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-md">
                Open to data analyst roles, internships, and collaborations.
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            {/* Status Widget */}
            <div className="glass-card p-4 rounded-xl inline-flex items-center gap-3 border-accent/20">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </div>
              <span className="text-sm font-medium">
                Currently: Analyzing datasets at Edu Tantr 📊
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <a
                href="mailto:asaranyaa8@gmail.com"
                className="flex items-center gap-4 text-slate-500 hover:text-accent transition-colors group w-fit">
                
                <div className="p-3 glass-card rounded-full group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-medium">asaranyaa8@gmail.com</span>
              </a>

              <div className="flex items-center gap-4 text-slate-500 w-fit">
                <div className="p-3 glass-card rounded-full">
                  <Phone size={20} />
                </div>
                <span className="font-medium">+91 9003365943</span>
              </div>

              <div className="flex items-center gap-4 text-slate-500 w-fit">
                <div className="p-3 glass-card rounded-full">
                  <MapPin size={20} />
                </div>
                <span className="font-medium">Krishnagiri, Tamil Nadu</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://linkedin.com/in/asaranyaarun/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-xl hover:-translate-y-1 hover:text-accent hover:border-accent/30 transition-all">
                
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/asaranya98"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-xl hover:-translate-y-1 hover:text-accent hover:border-accent/30 transition-all">
                
                <Github size={24} />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}>
            
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-3xl space-y-6 relative overflow-hidden">
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full pointer-events-none"></div>

              <h3 className="text-2xl font-heading font-bold mb-6 relative z-10">
                Send me a message
              </h3>

              <div className="space-y-4 relative z-10">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-slate-600">
                    
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4CF5]/30 focus:border-[#5B4CF5] transition-all"
                    placeholder="John Doe" />
                  
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-slate-600">
                    
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4CF5]/30 focus:border-[#5B4CF5] transition-all"
                    placeholder="john@example.com" />
                  
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-slate-600">
                    
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5B4CF5]/30 focus:border-[#5B4CF5] transition-all resize-none"
                    placeholder="Hi Saranya, I'd like to talk about...">
                  </textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative z-10"
                style={{ background: 'var(--accent)', color: '#fff' }}>
                
                {isSubmitting ?
                <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> :

                <>
                    Send Message <Send size={18} />
                  </>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>);

}