
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, CreditCard, MapPin, CheckCircle, Info } from 'lucide-react';
import { BRANCHES } from '../constants';
import { Branch } from '../types';

interface BranchesProps {
  onRegister: (branch: Branch) => void;
}

declare const gsap: any;
declare const ScrollTrigger: any;

const Branches: React.FC<BranchesProps> = ({ onRegister }) => {
  const [activeTab, setActiveTab] = useState<Branch>('soan');
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentBranch = BRANCHES[activeTab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".branch-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 85%" 
        }
      });

      gsap.from(".branch-tab-container", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 85%" 
        }
      });
      
      gsap.from(".branch-card", {
        scale: 0.98,
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: { 
          trigger: ".branch-card", 
          start: "top 85%" 
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="branches" ref={sectionRef} className="py-24 md:py-32 bg-primary-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="branch-header text-center mb-10 md:mb-12">
          <span className="text-primary-red font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Membership Plans</span>
          <h2 className="text-5xl md:text-8xl font-inter font-extrabold text-white tracking-tighter uppercase leading-none">
            BRANCHES & <span className="text-primary-red">PRICING</span>
          </h2>
        </div>

        {/* Branch Switcher Tabs */}
        <div className="branch-tab-container flex flex-wrap justify-center gap-3 md:gap-4 mb-10 relative z-50">
          {Object.values(BRANCHES).map((branch) => (
            <button
              key={branch.id}
              onClick={() => setActiveTab(branch.id as Branch)}
              className={`px-8 md:px-12 py-4 md:py-5 font-inter font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-none border ${
                activeTab === branch.id 
                  ? 'bg-primary-red border-primary-red text-white shadow-[0_10px_40px_rgba(255,60,60,0.3)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        {/* Branch Detail Card */}
        <div className="max-w-4xl mx-auto">
          <div className="branch-card bg-white/[0.03] backdrop-blur-[50px] border border-white/10 rounded-none overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="grid md:grid-cols-2">
              
              {/* Left Column: Schedule */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 relative">
                <div className="flex items-center space-x-5 mb-10">
                  <div className="w-12 h-12 bg-white/5 backdrop-blur-md text-primary-red flex items-center justify-center rounded-none border border-white/10">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-inter font-extrabold text-2xl md:text-3xl uppercase tracking-tight">{currentBranch.days}</h3>
                    <p className="text-primary-red text-[9px] font-black uppercase tracking-widest mt-1">Training Days</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/50 mb-2">
                    <Clock size={16} className="text-primary-red" />
                    <span className="font-inter font-black text-[10px] uppercase tracking-widest">Available Slots</span>
                  </div>
                  <div className="grid gap-2">
                    {currentBranch.slots.map((slot, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-none group hover:border-primary-red/30 transition-all duration-300 backdrop-blur-sm">
                        <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{slot}</span>
                        <CheckCircle size={14} className="text-primary-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Location */}
              <div className="p-8 md:p-12 flex flex-col justify-between bg-white/[0.02]">
                <div className="space-y-10">
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-white/5 backdrop-blur-md text-primary-red flex items-center justify-center rounded-none border border-white/10">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-inter font-extrabold text-2xl md:text-3xl uppercase tracking-tight">INVESTMENT</h3>
                      <p className="text-primary-red text-[9px] font-black uppercase tracking-widest mt-1">Fee Structure</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end pb-3 border-b border-white/5">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Registration</span>
                      <span className="text-xl md:text-2xl font-inter font-extrabold text-white tracking-tighter">PKR {currentBranch.fees.registration}</span>
                    </div>
                    <div className="flex justify-between items-end pb-3 border-b border-white/5">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Monthly Fee</span>
                      <span className="text-3xl md:text-4xl font-inter font-extrabold text-primary-red tracking-tighter">PKR {currentBranch.fees.monthly}</span>
                    </div>
                    {currentBranch.fees.discount && (
                      <div className="bg-primary-red/10 border border-primary-red/20 p-4 text-center flex items-center justify-center space-x-2">
                        <Info size={14} className="text-primary-red" />
                        <p className="text-primary-red text-[11px] font-black uppercase tracking-widest">{currentBranch.fees.discount}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-10 space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin size={18} className="text-white/30 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-relaxed">
                      {currentBranch.address}
                    </p>
                  </div>
                  <button 
                    onClick={() => onRegister(currentBranch.id as Branch)}
                    className="red-button w-full py-5 md:py-6 font-inter font-black text-xs uppercase tracking-[0.3em] rounded-none shadow-[0_15px_45px_rgba(255,60,60,0.2)] active:scale-95"
                  >
                    Select This Branch
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-red/5 blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red/5 blur-[120px] -z-10"></div>
    </section>
  );
};

export default Branches;
