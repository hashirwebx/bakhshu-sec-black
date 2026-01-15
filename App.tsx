
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Benefits from './components/Benefits';
import WhyParentsSection from './components/WhyParentsSection';
import GirlsTraining from './components/GirlsTraining';
import Programs from './components/Programs';
import Branches from './components/Branches';
import SpecialAlert from './components/SpecialAlert';
import Gallery from './components/Gallery';
import { Achievements } from './components/Achievements';
import { Events } from './components/Events';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import RegistrationPage from './components/RegistrationPage';
import ConfirmIntentModal from './components/ConfirmIntentModal';
import { Branch } from './types';

declare const Lenis: any;
declare const gsap: any;
declare const ScrollTrigger: any;

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'register'>('home');
  const [selectedBranch, setSelectedBranch] = useState<Branch>('soan');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingBranch, setPendingBranch] = useState<Branch>('soan');

  useEffect(() => {
    window.scrollTo(0, 0);

    let lenis: any;
    
    if (view === 'home') {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [view]);

  const handleEnrollClick = (branch: Branch = 'soan') => {
    setPendingBranch(branch);
    setIsConfirmModalOpen(true);
  };

  const confirmEnrollment = () => {
    setSelectedBranch(pendingBranch);
    setView('register');
    setIsConfirmModalOpen(false);
  };

  const navigateToHome = () => setView('home');

  if (view === 'register') {
    return <RegistrationPage onBack={navigateToHome} defaultBranch={selectedBranch} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onRegister={() => handleEnrollClick('soan')} />
      
      <main className="overflow-hidden">
        <Hero onRegister={() => handleEnrollClick('soan')} />
        <WhyChooseUs />
        <About />
        <Achievements onRegister={() => handleEnrollClick('soan')} />
        <Benefits />
        <Events onRegister={() => handleEnrollClick('soan')} />
        <WhyParentsSection />
        <GirlsTraining />
        <Programs />
        <Branches onRegister={handleEnrollClick} />
        <SpecialAlert onBook={() => handleEnrollClick('soan')} />
        <Gallery />
        <LocationMap />
      </main>

      <Footer />

      <ConfirmIntentModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmEnrollment}
      />


      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923350990834?text=Assalam-o-Alaikum.%20I%20hope%20you%20are%20doing%20well.%20I%20am%20interested%20in%20joining%20Bakhshu%20Taekwondo%20and%20would%20like%20to%20get%20more%20details%20regarding%20training%20schedules,%20fees,%20and%20the%20registration%20process.%20Thank%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <img className="group-hover:rotate-12 transition-transform" src="https://ik.imagekit.io/BakhshuTaekwondo/whatsapp.png" alt="whatsapp image" />
        {/* <MessageCircle size={30} fill="white" className="group-hover:rotate-12 transition-transform" /> */}
        <span className="absolute right-full mr-4 px-4 py-2 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap group-hover:opacity-100 transition-opacity pointer-events-none">
          Contact Coach Basharat
        </span>
      </a>
    </div>
  );
};

export default App;
