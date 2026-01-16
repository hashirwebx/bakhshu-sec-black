
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

  const getSectionId = (buttonText: string) => {
    switch (buttonText) {
      case 'Explore Programs': return 'programs';
      case 'View Training Path': return 'about';
      case 'Meet Our Coaches': return 'about';
      case 'Learn More': return 'girls-training';
      case 'Learn About the Program': return 'programs';
      default: return 'programs';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      clearProps: "all"
    });

    startProgressBar();
  }, []);


  return (
    <section id="hero" ref={containerRef} className="relative h-[120dvh] overflow-hidden select-none font-inter pt-[100px]">
      <div ref={slidesRef} className="absolute inset-0 w-full h-full">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full flex flex-col justify-center px-6 lg:px-12 ${idx === 0 ? 'flex' : 'hidden'}`}
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={slide.image}
                alt="Elite Combat Training"
                className="slide-bg w-full h-full object-cover transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-20 w-full max-w-[1440px] mx-auto flex flex-col items-start pb-10">

              <div className="reveal-item w-full max-w-3xl">
                <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 mb-8">
                  <img src="https://ik.imagekit.io/BakhshuTaekwondo/logo.jpeg" className="w-6 h-6 rounded-full" />
                  <div className="h-4 w-[1px] bg-white/20"></div>
                  <span className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">Excellence Since 2010</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white leading-[0.9] tracking-tighter uppercase font-inter [text-shadow:0_4px_30px_rgba(0,0,0,0.5)] mb-6 text-left">
                  {slide.headline}
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl font-black text-primary-red tracking-tight uppercase font-inter italic [text-shadow:0_2px_10px_rgba(0,0,0,0.3)] mb-8 text-left">
                  {slide.subHeadline}
                </p>

                <p className="text-sm md:text-base lg:text-lg text-white/80 font-medium max-w-xl leading-relaxed mb-10 text-left border-l-4 border-primary-red pl-6">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button
                    onClick={onRegister}
                    className="bg-primary-red text-white px-10 md:px-12 py-4 md:py-5 text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_60px_rgba(255,60,60,0.3)] hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 active:scale-95 text-center"
                  >
                    {slide.primaryBtn}
                  </button>

                  <button
                    onClick={() => scrollToSection(getSectionId(slide.secondaryBtn))}
                    className="relative group px-10 md:px-12 py-4 md:py-5 text-[11px] font-black border border-white/30 text-white bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] overflow-hidden active:scale-95 text-center"
                  >
                    <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    <div className="relative">
                      <span>{slide.secondaryBtn}</span>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10  left-0 right-0 z-30 px-2 lg:px-6">
        <div className="max-w-[1440px] mx-auto flex justify-between items-end">
          <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="flex items-center space-x-6">
              <button onClick={prevSlide} className="group p-2 border border-white/10 hover:bg-white hover:text-black text-white transition-all rounded-full">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="group p-2 border border-white/10 hover:bg-white hover:text-black text-white transition-all rounded-full">
                <ChevronRight size={20} />
              </button>
              <div className="flex items-baseline space-x-2 font-inter font-extrabold text-lg ml-4">
                <span className="text-white tracking-tighter text-2xl">0{activeSlide + 1}</span>
                <span className="text-white/40 text-sm font-bold">/ 0{slideCount}</span>
              </div>
            </div>
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
              <div ref={progressRef} className="absolute inset-0 bg-primary-red origin-left scale-x-0"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
