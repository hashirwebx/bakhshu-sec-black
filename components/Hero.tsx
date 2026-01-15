
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onRegister: () => void;
}

declare const gsap: any;

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const slideCount = HERO_SLIDES.length;
  const SLIDE_DURATION = 15000;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      mousePos.current = { x: xPos, y: yPos };

      if (slidesRef.current) {
        const currentSlideEl = slidesRef.current.children[activeSlide];
        if (currentSlideEl) {
          const activeBg = currentSlideEl.querySelector('.slide-bg');
          if (activeBg) {
            gsap.to(activeBg, {
              x: xPos,
              y: yPos,
              duration: 1.5,
              ease: "power2.out"
            });
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeSlide]);

  const animateSlide = (index: number, direction: 'next' | 'prev' = 'next') => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const outgoing = slidesRef.current?.children[activeSlide];
    const incoming = slidesRef.current?.children[index];

    if (!outgoing || !incoming) {
      isAnimating.current = false;
      return;
    }

    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { scaleX: 0 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlide(index);
        isAnimating.current = false;
        startProgressBar();
      }
    });

    gsap.set(incoming, { zIndex: 10, display: 'flex', opacity: 1 });
    gsap.set(outgoing, { zIndex: 5 });

    const incomingContent = incoming.querySelectorAll('.reveal-item');
    const incomingBg = incoming.querySelector('.slide-bg');

    if (incomingContent.length) gsap.set(incomingContent, { y: 40, opacity: 0 });
    if (incomingBg) gsap.set(incomingBg, { scale: 1.3, filter: 'blur(30px)' });

    tl.fromTo(incoming, 
      { clipPath: direction === 'next' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0 0 0)', duration: 1.2, ease: "expo.inOut" }
    );

    if (incomingBg) {
      tl.to(incomingBg, { 
        scale: 1.1, 
        filter: 'blur(0px)', 
        duration: 1.5, 
        ease: "power3.out" 
      }, "-=0.8");
    }

    if (incomingContent.length) {
      tl.to(incomingContent, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      }, "-=1.2");
    }

    tl.to(outgoing, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => gsap.set(outgoing, { display: 'none' })
    }, "-=1.2");
  };

  const startProgressBar = () => {
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: SLIDE_DURATION / 1000, ease: "none", onComplete: nextSlide }
      );
    }
  };

  const nextSlide = () => {
    if (isAnimating.current) return;
    animateSlide((activeSlide + 1) % slideCount, 'next');
  };

  const prevSlide = () => {
    if (isAnimating.current) return;
    animateSlide((activeSlide - 1 + slideCount) % slideCount, 'prev');
  };

  useEffect(() => {
  const firstSlide = slidesRef.current?.children[0];
  if (!firstSlide) return;

  const items = firstSlide.querySelectorAll('.reveal-item');

  // 🔥 Force visible (fixes reload fade)
  gsap.set(firstSlide, { opacity: 1, display: "flex" });
  gsap.set(items, { opacity: 1, y: 0 });

  // 🔥 Animate cleanly
  gsap.from(items, {
    opacity: 0,
    y: 60,
    stagger: 0.12,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.2,
    clearProps: "all"   // <-- VERY IMPORTANT
  });

  startProgressBar();
}, []);


  return (
    <section ref={containerRef} className="relative h-[100dvh] overflow-hidden select-none font-inter">
      <div ref={slidesRef} className="absolute inset-0 w-full h-full">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center px-6 ${idx === 0 ? 'flex' : 'hidden'}`}
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={slide.image} 
                alt="Elite Combat Training" 
                className="slide-bg w-full h-full object-cover transition-all duration-1000 scale-105"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/95"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]"></div> */}
            </div>

            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center pb-20 md:pb-24">
              <div className="reveal-item inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-none mb-6">
                <Sparkles className="text-primary-red w-3.5 h-3.5" />
                <span className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">Excellence Since 2010</span>
              </div>

              <h1 className="reveal-item text-4xl md:text-6xl lg:text-[5.5rem] font-extrabold text-white leading-[0.95] tracking-tighter uppercase font-inter [text-shadow:0_4px_30px_rgba(0,0,0,0.5)] mb-4">
                {slide.headline}
              </h1>

              <div className="reveal-item mb-6">
                <p className="text-lg md:text-xl lg:text-[1.8rem] font-black text-primary-red tracking-tight uppercase font-inter italic [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
                  {slide.subHeadline}
                </p>
              </div>

              <p className="reveal-item text-sm md:text-base lg:text-lg text-white/70 font-medium max-w-xl mx-auto leading-relaxed mb-10">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-item w-full sm:w-auto">
                <button 
                  onClick={onRegister}
                  className="bg-primary-red text-white px-10 md:px-12 py-4 md:py-5 text-[10px] font-black uppercase tracking-[0.2em] rounded-none shadow-[0_20px_60px_rgba(255,60,60,0.3)] hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                  {slide.primaryBtn}
                </button>
                
                <a 
                  href="#programs"
                  className="relative group px-10 md:px-12 py-4 md:py-5 text-[10px] font-black border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 rounded-none uppercase tracking-[0.2em] overflow-hidden active:scale-95 text-center"
                >
                  <div className="absolute inset-0 bg-primary-red/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                  <div className="relative">
                    <span>{slide.secondaryBtn}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 px-6 md:px-12 flex flex-col items-center gap-6">
        <div className="w-full max-w-xs h-[1px] bg-white/10 relative overflow-hidden">
          <div ref={progressRef} className="absolute inset-0 bg-primary-red origin-left scale-x-0"></div>
        </div>

        <div className="flex items-center space-x-10">
          <button onClick={prevSlide} className="p-2 text-white/20 hover:text-white transition-all transform hover:scale-110 disabled:opacity-0">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-end space-x-2 font-inter font-extrabold text-lg">
            <span className="text-white tracking-tighter">0{activeSlide + 1}</span>
            <span className="text-white/20 text-[9px] pb-1 font-bold">/ 0{slideCount}</span>
          </div>

          <button onClick={nextSlide} className="p-2 text-white/20 hover:text-white transition-all transform hover:scale-110 disabled:opacity-0">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-primary-red/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-primary-red/5 blur-[150px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Hero;
