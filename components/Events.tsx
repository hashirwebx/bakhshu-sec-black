
import React, { useEffect, useRef } from 'react';
import { EVENTS } from '../constants';
import { Calendar, ArrowRight } from 'lucide-react';

interface EventsProps {
    onRegister: () => void;
}

declare const gsap: any;
declare const ScrollTrigger: any;

export const Events: React.FC<EventsProps> = ({ onRegister }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            gsap.from(".event-item", {
                scrollTrigger: {
                    trigger: ".events-list",
                    start: "top 85%",
                    once: true,
                },
                x: -40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            });

            gsap.from(".events-header-wrapper", {
                scrollTrigger: {
                    trigger: ".events-header-wrapper",
                    start: "top 95%",
                    once: true,
                },
                y: 30,
                opacity: 0,
                duration: 1,
                clearProps: "all"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="events" ref={sectionRef} className="py-32 bg-[#0f0f0f] border-t border-white/5 relative overflow-hidden">

            {/* Authentic Calligraphy Background */}
            <div className="absolute right-[-5%] top-[10%] select-none pointer-events-none opacity-[0.02]">
                <span className="text-[40rem] font-serif text-white font-bold leading-none">道</span>
            </div>
            <div className="absolute left-[-5%] bottom-[10%] select-none pointer-events-none opacity-[0.02]">
                <span className="text-[40rem] font-serif text-white font-bold leading-none">武</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="events-header-wrapper flex flex-col md:flex-row justify-between items-end mb-24 gap-12 pt-12 md:pt-20 relative">
                    <h2 className="text-6xl md:text-[10rem] font-bebas text-white/[0.02] absolute top-0 left-0 select-none tracking-tighter uppercase leading-none pointer-events-none -translate-y-1/4">ACTIVITIES</h2>

                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-7xl font-bebas text-white tracking-widest uppercase leading-none">LIFE AT <span className="text-primary-red">BAKHSHU</span></h3>
                        <div className="w-24 h-1 bg-primary-red mt-6"></div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-6 border border-white/10 hidden md:block relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Next Big Event</p>
                        <p className="text-white font-bold text-lg mt-1 flex items-center gap-3">
                            <Calendar size={18} className="text-primary-red" />
                            Summer Hike 2026
                        </p>
                    </div>
                </div>

                <div className="events-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {EVENTS.map((event, idx) => (
                        <div key={idx} className="event-item group bg-white/[0.02] border border-white/5 p-8 flex items-center space-x-6 hover:bg-primary-red transition-all duration-500 hover:-translate-y-2 cursor-default min-h-[120px]">
                            <div className="w-14 h-14 bg-white/5 flex items-center justify-center text-primary-red group-hover:bg-white group-hover:text-primary-red transition-colors shrink-0">
                                {event.icon}
                            </div>
                            <div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-primary-red group-hover:text-white mb-1 block transition-colors">
                                    {event.category}
                                </span>
                                <h4 className="text-white text-xl font-bold tracking-tight uppercase group-hover:text-white transition-colors">
                                    {event.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-primary-red text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_30px_100px_rgba(255,60,60,0.2)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h4 className="text-4xl font-bebas tracking-widest uppercase mb-2">More Than Just Training</h4>
                        <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Join a community that builds characters, makes memories, and celebrates every win.</p>
                    </div>
                    <button
                        onClick={onRegister}
                        className="bg-white text-primary-red px-10 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-xl relative z-10 flex items-center space-x-3"
                    >
                        <span>Join Our Community</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Events;
