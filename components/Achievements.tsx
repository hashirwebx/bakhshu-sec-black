
import React, { useEffect, useRef } from 'react';
import { ACHIEVEMENTS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface AchievementsProps {
    onRegister: () => void;
}

declare const gsap: any;
declare const ScrollTrigger: any;

export const Achievements: React.FC<AchievementsProps> = ({ onRegister }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            if (logoRef.current) {
                gsap.to(logoRef.current, {
                    rotate: 360,
                    duration: 120,
                    repeat: -1,
                    ease: "none"
                });
            }

            gsap.from(".ach-card", {
                scrollTrigger: {
                    trigger: ".ach-grid",
                    start: "top 85%",
                    once: true,
                },
                y: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out",
                clearProps: "all"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="achievements" ref={sectionRef} className="py-32 bg-[#121212] border-t border-white/5 relative overflow-hidden">
            {/* Decorative Brand Watermark - Keeping as requested */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
                <img
                    ref={logoRef}
                    src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835"
                    alt="Watermark"
                    className="w-[1200px] h-[1200px] grayscale brightness-0 invert"
                />
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-red/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="ach-header-content mb-24 relative pt-12 md:pt-20">
                    <h2 className="text-6xl md:text-[10rem] font-bebas text-white/[0.02] absolute top-0 left-0 select-none tracking-tighter uppercase leading-none pointer-events-none -translate-y-1/4">LEGACY</h2>

                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-7xl font-bebas text-white tracking-widest uppercase leading-none">OUR <span className="text-primary-red">ACHIEVEMENTS</span></h3>
                        <div className="w-24 h-1 bg-primary-red mt-6"></div>
                    </div>
                </div>

                <div className="ach-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ACHIEVEMENTS.map((ach: any, idx) => (
                        <div key={idx} className="ach-card bg-white/[0.03] backdrop-blur-3xl border border-white/10 group hover:border-primary-red/50 transition-all duration-700 relative overflow-hidden flex flex-col min-h-[400px]">

                            {/* Cinematic Image Layer - Now Static and Premium */}
                            <div className="absolute inset-0 z-0">
                                <img src={ach.image} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100" alt={ach.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>
                            </div>

                            <div className="p-10 flex flex-col justify-between flex-1 relative z-10">
                                <div>
                                    <div className="text-primary-red mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                                        {ach.icon}
                                    </div>
                                    <h4 className="text-white text-2xl font-bold mb-4 tracking-tight leading-none uppercase">{ach.title}</h4>
                                    <p className="text-text-gray text-xs font-bold leading-relaxed uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                                        {ach.desc}
                                    </p>
                                </div>

                                <div className="mt-12 h-1 w-0 bg-primary-red group-hover:w-full transition-all duration-700"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ach-cta mt-24 flex flex-col items-center text-center">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Ready to write your own success story?</p>
                    <button
                        onClick={onRegister}
                        className="red-button px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center space-x-4 shadow-[0_20px_50px_rgba(255,60,60,0.2)]"
                    >
                        <span>Join Our Hall of Fame</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
