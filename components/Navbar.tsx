
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
              <img src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835" alt="Logo" className="w-14 h-14" />
          
            <div>
              <span className="font-bebas text-2xl tracking-widest text-white block leading-none">BAKHSHU</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary-red uppercase">FITNESS CLUB</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#about" className="nav-link">The Spirit</a>
            <a href="#branches" className="nav-link">Locations</a>
            <a href="#programs" className="nav-link">Programs</a>
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
        <div className="lg:hidden fixed inset-0 bg-primary-black z-[110] flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-300">
           <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white"><X size={32} /></button>
           <a href="#about" onClick={() => setIsOpen(false)} className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">The Spirit</a>
           <a href="#branches" onClick={() => setIsOpen(false)} className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">Locations</a>
           <a href="#programs" onClick={() => setIsOpen(false)} className="text-3xl font-bebas text-white tracking-widest hover:text-primary-red">Programs</a>
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
