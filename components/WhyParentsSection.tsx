
import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Heart } from 'lucide-react';
import { PARENT_CHOICES } from '../constants';

declare const gsap: any;
declare const ScrollTrigger: any;

const WhyParentsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".parents-header", {
          y: -40,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".parents-header",
            start: "top 85%",
          }
        });

        gsap.from(".parents-content-left", {
          x: -50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".parents-content-left",
            start: "top 80%",
          }
        });

        gsap.from(".parents-content-right", {
          x: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".parents-content-right",
            start: "top 80%",
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Headline Added Here */}
        <div className="parents-header mb-20 relative">
          <h2 className="text-6xl md:text-[10rem] font-bebas text-white/5 absolute -top-16 md:-top-24 left-0 select-none tracking-tighter uppercase leading-none pointer-events-none">Academy</h2>
          <h3 className="text-4xl md:text-7xl font-bebas text-white tracking-widest uppercase relative z-10 leading-none">WHY CHOOSE <span className="text-primary-red">BAKHSHU</span></h3>
          <div className="w-32 h-1 bg-primary-red mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="parents-content-left order-2 lg:order-1">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="text-primary-red" size={24} />
              <span className="text-primary-red font-black uppercase tracking-[0.4em] text-[10px]">Discipline You Can See at Home</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Why Parents Choose <br /><span className="text-primary-red">Bakhshu Club</span>
            </h2>
            <p className="text-text-gray text-lg font-medium leading-relaxed mb-10 max-w-xl">
              Parents trust Bakhshu Taekwondo Club because we focus on <strong>character development first</strong>, skills second, and championships third.
            </p>

            <div className="space-y-4">
              {PARENT_CHOICES.map((choice, i) => (
                <div key={i} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 rounded-none bg-primary-red/10 flex items-center justify-center text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-white/80 font-bold uppercase tracking-widest text-[11px] group-hover:text-white transition-colors">
                    {choice}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="parents-content-right order-1 lg:order-2 relative">
            <div className="aspect-square bg-card-dark rounded-none overflow-hidden border border-white/5 shadow-2xl relative">
              <img
                src="https://ik.imagekit.io/BakhshuTaekwondo/Gemini_Generated_Image_rimb1crimb1crimb.png"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000 rounded-none"
                alt="Safe training environment"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-red/10 blur-[120px] -z-10 rounded-none"></div>

              <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-none">
                <h4 className="text-white font-bold text-xl mb-2">Modern & Safe Facility</h4>
                <p className="text-text-gray text-xs font-bold uppercase tracking-widest leading-relaxed">Clean, well-maintained, and equipped with top-tier safety mats and gear.</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-red/20 blur-[100px] animate-pulse rounded-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyParentsSection;
