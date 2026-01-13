
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROGRAMS_LIST } from '../constants';

declare const gsap: any;
declare const ScrollTrigger: any;

const Programs: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger within the component to be safe
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        if (cardsRef.current) {
          gsap.from(cardsRef.current.children, {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              onEnter: () => ScrollTrigger.refresh(), // Ensure triggers are calculated
            },
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all" // Important: Clear props after animation so visibility isn't stuck at 0
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="bg-primary-black py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary-red font-black uppercase tracking-[0.4em] mb-4 block text-[10px]">From Beginners to Future Champions</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Structured Programs <br />for <span className="text-primary-red">Every Child</span>
          </h2>
          <p className="text-text-gray font-medium text-lg max-w-2xl mx-auto">
            Each program follows a clear belt progression system that keeps children motivated and goal-oriented
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS_LIST.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white/[0.02] backdrop-blur-xl rounded-none overflow-hidden group border border-white/10 hover:border-primary-red/40 transition-all duration-700 hover:-translate-y-4 cursor-pointer relative shadow-2xl"
              style={{ opacity: 1 }} // Safety fallback for visibility
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={cat.img} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-40 group-hover:opacity-80 rounded-none" 
                  alt={cat.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <span className="text-primary-red font-black text-[10px] uppercase tracking-[0.3em] block mb-3">{cat.age}</span>
                  <h4 className="text-white font-bold text-3xl tracking-tight leading-none mb-4">{cat.title}</h4>
                  <p className="text-text-gray text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">{cat.desc}</p>
                  <div className="h-1 w-0 bg-primary-red group-hover:w-full transition-all duration-700"></div>
                </div>

                <div className="absolute top-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-none flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 z-20">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
