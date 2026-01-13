
import React, { useEffect, useRef } from 'react';
import { Target, Zap, Brain, Star, Check, Users } from 'lucide-react';

declare const gsap: any;
declare const ScrollTrigger: any;

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(".benefits-header", {
          y: -30,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".benefits-header",
            start: "top 85%",
          }
        });

        gsap.from(".benefit-item", {
          scrollTrigger: {
            trigger: ".benefits-list",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          x: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          clearProps: "all"
        });

        gsap.from(".benefits-visual", {
          scrollTrigger: {
            trigger: ".benefits-visual",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          scale: 0.9,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          clearProps: "all"
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="benefits" ref={sectionRef} className="py-32 bg-primary-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* New Section Headline Header Added Here */}
        <div className="benefits-header mb-20 relative">
          <h2 className="text-6xl md:text-[10rem] font-bebas text-white/5 absolute -top-16 md:-top-24 left-0 select-none tracking-tighter uppercase leading-none pointer-events-none">Discipline</h2>
          <h3 className="text-4xl md:text-7xl font-bebas text-white tracking-widest uppercase relative z-10 leading-none">Benefits of  <span className="text-primary-red">Taekwondo</span></h3>
          <div className="w-32 h-1 bg-primary-red mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-center">

          <div className="lg:col-span-5 benefits-visual relative">
            <div className="relative z-10 rounded-none overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/55795209_2396752590344695_7584201530727727104_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=iwsIfFfsKX4Q7kNvwFwsTfz&_nc_oc=Admm4hHJBwXB90QeVSywkbCyKHAOe1XGeh2P_aSgxpqXy4wryFNspgQ8XzhNH2PWlRk&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=hTcEBYZ2RvIrguz80X3cJw&oh=00_AfoI5DmWS3_MICvRiz9ZNtKzfszMWWGocKsjG5askkJqHw&oe=698D73F5"
                alt="Empowering Young Minds"
                className="w-full h-[550px] object-cover transition-all duration-1000 grayscale brightness-75 hover:grayscale-0 rounded-none"
              />

              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-red/10 blur-[120px] -z-10 rounded-none"></div>

              <div className="absolute bottom-8 left-8 p-8 bg-white/[0.05] backdrop-blur-2xl border border-white/10 text-white rounded-none shadow-2xl">
                <p className="text-3xl font-bold leading-tight">Empowering <br />Young Minds</p>
                <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80">Since 2010</p>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-primary-red/20 rounded-none -z-10 translate-x-4 translate-y-4"></div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-none">
                Benefits of Taekwondo for Kids
              </h2>
              <p className="text-primary-red font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">More Than Just a Sport</p>

              <p className="text-text-gray text-xl font-medium leading-relaxed max-w-xl">
                Taekwondo helps children develop life skills that go far beyond the mat:
              </p>
            </div>

            <div className="benefits-list space-y-6">
              {[
                { text: <span>Builds <strong>confidence and self-esteem</strong></span>, icon: <Star /> },
                { text: <span>Improves <strong>focus and classroom behavior</strong></span>, icon: <Target /> },
                { text: <span>Encourages <strong>physical fitness and coordination</strong></span>, icon: <Zap /> },
                { text: <span>Teaches <strong>self-control and emotional balance</strong></span>, icon: <Brain /> },
                { text: <span>Promotes <strong>respect for parents, teachers, and peers</strong></span>, icon: <Users /> }
              ].map((benefit, idx) => (
                <div key={idx} className="benefit-item group flex items-center space-x-6 p-6 rounded-none transition-all duration-300 bg-white/[0.04] backdrop-blur-2xl border border-white/5 hover:border-primary-red/30 hover:bg-white/[0.08]">
                  <div className="w-12 h-12 shrink-0 bg-white/5 text-primary-red flex items-center justify-center rounded-none group-hover:bg-primary-red group-hover:text-white transition-all duration-500 shadow-inner">
                    {React.cloneElement(benefit.icon as React.ReactElement<any>, { size: 20, strokeWidth: 2 })}
                  </div>
                  <p className="text-white text-lg font-normal tracking-wide">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-white/5">
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-none bg-primary-red/20 flex items-center justify-center text-primary-red">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Certified Instructors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-none bg-primary-red/20 flex items-center justify-center text-primary-red">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Safe Training Mats</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-none bg-primary-red/20 flex items-center justify-center text-primary-red">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Age-Specific Groups</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
