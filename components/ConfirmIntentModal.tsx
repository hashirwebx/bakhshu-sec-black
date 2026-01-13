
import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ConfirmIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

declare const gsap: any;

const ConfirmIntentModal: React.FC<ConfirmIntentModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(modalRef.current, 
          { scale: 0.9, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, 
          "-=0.2"
        );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm opacity-0"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-[#111] border border-white/10 w-full max-w-lg relative overflow-hidden shadow-[0_0_100px_rgba(255,60,60,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thematic Background Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-red/10 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-red/10 blur-[80px] rounded-full"></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-10 md:p-14 relative z-10 text-center">
          <div className="w-20 h-20 bg-primary-red/10 border border-primary-red/20 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} className="text-primary-red" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-widest uppercase mb-4">
            CHAMPIONS START <span className="text-primary-red">HERE</span>
          </h2>
          
          <p className="text-text-gray font-medium text-sm leading-relaxed mb-10 max-w-xs mx-auto">
            Are you ready to join the elite Bakhshu Academy and begin your journey towards discipline, strength, and unshakeable confidence?
          </p>

          <div className="space-y-4">
            <button 
              onClick={onConfirm}
              className="w-full bg-primary-red text-white py-5 font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-red-700 transition-all shadow-xl shadow-primary-red/20 active:scale-95"
            >
              <span>YES, I'M READY</span>
              <Zap size={16} className="fill-current" />
            </button>
            
            <button 
              onClick={onClose}
              className="w-full border border-white/10 bg-white/5 text-white/60 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              NOT YET
            </button>
          </div>

          <p className="mt-8 text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
            "The first step to black belt is showing up"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmIntentModal;
