
import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Heart, UserCircle, Star } from 'lucide-react';

declare const gsap: any;
declare const ScrollTrigger: any;

const GirlsTraining: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".girls-header", {
          y: -40,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".girls-header",
            start: "top 85%",
          }
        });

        gsap.from(".girls-content-left", {
          x: -50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".girls-content-left",
            start: "top 80%",
          }
        });

        gsap.from(".girls-content-right", {
          x: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".girls-content-right",
            start: "top 80%",
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="girls-training" ref={sectionRef} className="py-32 bg-primary-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Headline Header */}
        <div className="girls-header mb-20 relative">
          <h2 className="text-6xl md:text-[10rem] font-bebas text-white/5 absolute -top-16 md:-top-24 left-0 select-none tracking-tighter uppercase leading-none pointer-events-none">Strength</h2>
          <h3 className="text-4xl md:text-7xl font-bebas text-white tracking-widest uppercase relative z-10 leading-none">EMPOWERING YOUNG <span className="text-primary-red">GIRLS</span></h3>
          <div className="w-32 h-1 bg-primary-red mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div className="girls-content-left relative">
            <div className="aspect-[4/5] bg-card-dark rounded-none overflow-hidden border border-white/5 shadow-2xl relative">
              <img
                src="https://ik.imagekit.io/BakhshuTaekwondo/Gemini_Generated_Image_bvql1tbvql1tbvql.png"
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000 rounded-none"
                alt="Girls Training"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-red/10 blur-[120px] -z-10 rounded-none"></div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-red/10 blur-[100px] animate-pulse rounded-none"></div>
          </div>

          <div className="girls-content-right space-y-10">
            <div className="inline-flex items-center space-x-2 bg-primary-red/20 px-4 py-2 rounded-none border border-primary-red/30">
              <Star size={14} className="text-primary-red" />
              <span className="text-[10px] text-primary-red font-black uppercase tracking-[0.3em]">A Space Where Girls Grow Strong</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
              SAFE & EMPOWERING<br /><span className="text-primary-red">Training FOR GIRLS</span>
            </h2>
            <p className="text-text-gray text-lg font-medium leading-relaxed max-w-xl">
              We provide a secure, respectful, and encouraging environment where girls feel confident to learn and grow.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {[
                { label: "Female-Friendly Atmosphere", icon: <UserCircle size={24} /> },
                { label: "Confidence-Building Defense", icon: <ShieldCheck size={24} /> },
                { label: "Supportive Coaching Style", icon: <Heart size={24} /> },
                { label: "Focus on Strength & Belief", icon: <Star size={24} /> }
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-4 group">
                  <div className="text-primary-red group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-white text-[11px] font-black uppercase tracking-widest leading-tight">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GirlsTraining;
