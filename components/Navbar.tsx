
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (isOpen) {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
    };
  }, [isOpen]);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu first
      setIsOpen(false);
      // Small delay to ensure menu closes before scrolling
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="https://ik.imagekit.io/BakhshuTaekwondo/logo.jpeg?updatedAt=1768482725879" alt="Logo" className={`w-14 h-14 ${scrolled ? 'bg-white rounded-full w-14 h-14' : 'bg-transparent'}`} />
            <div>
              <span className="font-bebas text-2xl tracking-widest text-white block leading-none">Bakhshu Taekwondo</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase">& Martial Arts</span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <button onClick={() => scrollToSection('about')} className="nav-link">The Spirit</button>
            <button onClick={() => scrollToSection('achievements')} className="nav-link">Achievements</button>
            <button onClick={() => scrollToSection('programs')} className="nav-link">Programs</button>
            <button onClick={() => scrollToSection('events')} className="nav-link">Events</button>
            <button onClick={() => scrollToSection('branches')} className="nav-link">Locations</button>
          </div>

          {/* Register Button */}
          <div className="hidden lg:block">
            <button
              onClick={onRegister}
              className="red-button px-8 py-3 text-[11px] font-black uppercase tracking-widest rounded-none"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-primary-black z-[110] flex flex-col items-center justify-center space-y-10 overflow-y-auto animate-in fade-in duration-300">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white z-[120]"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>

          <button onClick={() => scrollToSection('about')}
            className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">
            The Spirit
          </button>

          <button onClick={() => scrollToSection('branches')}
            className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">
            Locations
          </button>

          <button onClick={() => scrollToSection('programs')}
            className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">
            Programs
          </button>

          <button
            onClick={() => { onRegister(); setIsOpen(false); }}
            className="red-button px-12 py-4 font-black text-xs tracking-widest uppercase rounded-none"
          >
            Join Now
          </button>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
