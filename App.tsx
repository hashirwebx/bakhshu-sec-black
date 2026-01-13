
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
        <Benefits />
        <WhyParentsSection />
        <GirlsTraining />
        <Programs />
        <Branches onRegister={handleEnrollClick} />
        <SpecialAlert onBook={() => handleEnrollClick('soan')} />
        <Gallery />
        <LocationMap />
      </main>

      <Footer onRegister={() => handleEnrollClick('soan')} />

      <ConfirmIntentModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmEnrollment}
      />
    </div>
  );
};

export default App;
