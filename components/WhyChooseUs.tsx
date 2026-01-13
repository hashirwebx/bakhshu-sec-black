
import React, { useEffect, useRef } from 'react';
import { Dumbbell, Heart, Zap, Apple } from 'lucide-react';

declare const gsap: any;
declare const ScrollTrigger: any;

const FEATURES = [
  {
    title: "Strength Training",
    desc: "Build muscle and increase power with our comprehensive strength training programs and state-of-the-art equipment.",
    icon: <Dumbbell size={32} />
  },
  {
    title: "Cardio Fitness",
    desc: "Improve cardiovascular health and endurance with our dynamic cardio workouts and modern machines.",
    icon: <Heart size={32} />
  },
  {
    title: "Taekwondo Training",
    desc: "Learn martial arts from professional national-level fighters with authentic combat sports training programs.",
    icon: <Zap size={32} />
  },
  {
    title: "Nutrition Coaching",
    desc: "Get personalized nutrition plans and dietary guidance to complement your martial arts and fitness journey.",
    icon: <Apple size={32} />
  }
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        const glassContainer = sectionRef.current?.querySelector('.glass-container');
        const cards = sectionRef.current?.querySelectorAll('.feature-card');

        if (glassContainer) {
          gsap.from(glassContainer, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out"
          });
        }

        if (cards && cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: glassContainer || sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            clearProps: "all"
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary-black py-32 px-6 relative overflow-hidden">
      {/* Decorative ambient glows behind the glass */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-red/10 blur-[140px] rounded-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-red/5 blur-[120px] rounded-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary-red font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Bakhshu Advantage</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Why Choose Our Academy?</h2>
          <p className="text-text-gray max-w-2xl mx-auto font-medium text-base md:text-lg">
            We merge traditional discipline with modern sports science to deliver an unmatched training experience.
          </p>
        </div>
        
        {/* Main Glass Container Wrapper */}
        <div className="glass-container relative bg-white/[0.03] backdrop-blur-[40px] border border-white/10 p-4 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          {/* Subtle inner reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-20">
            {FEATURES.map((feature, i) => (
              <div 
                key={i} 
                className="feature-card bg-white/[0.02] backdrop-blur-2xl p-10 py-16 border border-white/5 rounded-none hover:border-primary-red/40 hover:bg-white/[0.06] transition-all duration-500 flex flex-col items-center text-center group cursor-default"
              >
                <div className="text-white/80 mb-8 group-hover:text-primary-red transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,60,60,0.3)]">
                  {feature.icon}
                </div>
                <h3 className="text-white text-lg font-bold mb-4 tracking-tight group-hover:text-primary-red transition-colors">{feature.title}</h3>
                <p className="text-text-gray text-xs leading-relaxed font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
                  {feature.desc}
                </p>
                
                {/* Decorative corner element on hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-primary-red/0 group-hover:border-r-primary-red/20 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
