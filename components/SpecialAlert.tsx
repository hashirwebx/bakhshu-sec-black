
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, MapPin } from 'lucide-react';

interface SpecialAlertProps {
  onBook: () => void;
}

declare const gsap: any;
declare const ScrollTrigger: any;

const SpecialAlert: React.FC<SpecialAlertProps> = ({ onBook }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".alert-box", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ".alert-box", start: "top 90%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-primary-black overflow-hidden border-t border-white/5 relative">
      {/* Cinematic Action Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1920" 
          alt="Martial Arts Action" 
          className="w-full h-full object-cover opacity-[0.07] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-black via-transparent to-primary-black"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="alert-box bg-white/[0.02] backdrop-blur-3xl p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center gap-12 rounded-none border border-white/10 group shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-red/5 blur-[120px] rounded-none -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-red/5 blur-[100px] rounded-none -ml-32 -mb-32"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-red/10 px-6 py-3 rounded-none border border-primary-red/20 backdrop-blur-md">
              <Zap size={16} className="text-primary-red fill-primary-red animate-pulse" />
              <span className="text-[11px] text-primary-red font-black uppercase tracking-[0.3em]">Give Your Child a Strong Start</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter uppercase">
              Enroll Your Child <br /><span className="text-primary-red">Today</span>
            </h2>
            
            <p className="text-text-gray text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              Discipline you can see at home. Improved behavior, focus, and unshakeable confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button 
                onClick={onBook}
                className="red-button px-16 py-8 rounded-none font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-4 shadow-[0_20px_60px_rgba(255,60,60,0.25)] active:scale-95 transition-all"
              >
                <Zap size={20} className="fill-current" />
                <span>Book Free Trial Class</span>
              </button>
              
              <a 
                href="#branches"
                className="px-16 py-8 rounded-none border border-white/10 bg-white/5 backdrop-blur-md text-white font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-4 hover:bg-white/10 active:scale-95 transition-all"
              >
                <MapPin size={20} />
                <span>Visit Our Academy</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialAlert;
