
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Phone } from 'lucide-react';

interface NavbarProps {
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsOpen(false);
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex flex-col font-inter">
      {/* Top Bar - White */}
      <div className="bg-white text-primary-navy py-3 px-6 lg:px-12 border-b border-gray-100 relative z-[101]">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
            <img 
              src="https://ik.imagekit.io/BakhshuTaekwondo/logo.jpeg?updatedAt=1768482725879" 
              alt="Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col items-start leading-none">
              <span className="font-bebas text-xl md:text-2xl tracking-widest text-primary-black">Bakhshu Taekwondo</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase">& Fitness Club</span>
            </div>
          </button>

          {/* Top Right Actions */}
          <div className="flex items-center space-x-6 md:space-x-8">
            <a href="tel:+923350990834" className="hidden md:flex items-center space-x-2 text-sm font-bold text-gray-600 hover:text-primary-red transition-colors">
              <Phone size={16} />
              <span>+92 335 0990834</span>
            </a>
            <button className="hidden md:flex items-center space-x-2 text-sm font-bold text-gray-600 hover:text-primary-red transition-colors">
              <User size={16} />
              <span>Member Login</span>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden text-primary-black hover:text-primary-red transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Dark (Hidden on mobile usually, or shown as main nav on desktop) */}
      <div className={`bg-[#0a1018] text-white py-0 px-6 lg:px-12 border-t border-white/5 transition-transform duration-300 ${scrolled ? '-translate-y-full md:translate-y-0' : 'translate-y-0'} hidden lg:block`}>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8 xl:space-x-12 h-full">
            <button onClick={() => scrollToSection('programs')} className="nav-link h-full flex items-center border-b-2 border-transparent hover:border-primary-red hover:text-white text-gray-300 text-[13px]">Programs</button>
            <button onClick={() => scrollToSection('about')} className="nav-link h-full flex items-center border-b-2 border-transparent hover:border-primary-red hover:text-white text-gray-300 text-[13px]">Schedule</button>
            <button onClick={() => scrollToSection('achievements')} className="nav-link h-full flex items-center border-b-2 border-transparent hover:border-primary-red hover:text-white text-gray-300 text-[13px]">Our Instructors</button>
            <button onClick={() => scrollToSection('events')} className="nav-link h-full flex items-center border-b-2 border-transparent hover:border-primary-red hover:text-white text-gray-300 text-[13px]">Events</button>
            <button onClick={() => scrollToSection('branches')} className="nav-link h-full flex items-center border-b-2 border-transparent hover:border-primary-red hover:text-white text-gray-300 text-[13px]">Locations</button>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button
              onClick={onRegister}
              className="bg-primary-red hover:bg-[#d62020] text-white px-8 py-6 h-16 text-[12px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center skew-x-0 hover:skew-x-2"
            >
              Start Trial
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed top-[72px] bottom-0 left-0 right-0 bg-[#0a1018] z-[100] flex flex-col p-8 overflow-y-auto border-t border-white/10 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6 mt-4">
            <button onClick={() => scrollToSection('programs')} className="text-2xl font-bebas text-white tracking-widest text-left hover:text-primary-red border-b border-white/10 pb-4">Programs</button>
            <button onClick={() => scrollToSection('about')} className="text-2xl font-bebas text-white tracking-widest text-left hover:text-primary-red border-b border-white/10 pb-4">Schedule</button>
            <button onClick={() => scrollToSection('achievements')} className="text-2xl font-bebas text-white tracking-widest text-left hover:text-primary-red border-b border-white/10 pb-4">Instructors</button>
            <button onClick={() => scrollToSection('events')} className="text-2xl font-bebas text-white tracking-widest text-left hover:text-primary-red border-b border-white/10 pb-4">Events</button>
            <button onClick={() => scrollToSection('branches')} className="text-2xl font-bebas text-white tracking-widest text-left hover:text-primary-red border-b border-white/10 pb-4">Locations</button>
            
            <div className="pt-4">
              <button
                onClick={() => { onRegister(); setIsOpen(false); }}
                className="w-full bg-primary-red text-white py-4 text-center text-sm font-black uppercase tracking-widest hover:bg-[#d62020]"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
