
import React from 'react';
import { Play } from 'lucide-react';

const Founder: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-inter text-slate-900 leading-[1.2] mb-16 font-light">
          Grand Master <span className="italic font-bold">Bakhshu</span> recognizes the positive <span className="italic font-bold underline decoration-primary-red underline-offset-8">impact</span> and <span className="italic font-bold">influence</span> of a superior teacher upon the development of the student.
        </h2>

        {/* Video / Image Placeholder */}
        <div className="relative aspect-video w-full bg-slate-200 rounded-lg overflow-hidden mb-16 group cursor-pointer shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
            alt="Founder Training"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
              <Play className="text-white" fill="white" size={32} />
            </div>
          </div>
          <div className="absolute bottom-10 left-10 text-left">
            <p className="text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">FOUNDER</p>
            <h4 className="text-white font-bebas text-3xl tracking-wide">Grand Master Bakhshu</h4>
          </div>
        </div>

        {/* Triple Stats Grid */}
        <div className="grid md:grid-cols-3 gap-12 text-left">
          <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center mb-6">
              <img src="https://img.icons8.com/ios-filled/50/000000/crowd.png" className="w-full grayscale" alt="Stats" />
            </div>
            <h5 className="font-bebas text-xl tracking-widest">OUR FAMILY</h5>
            <div className="w-8 h-0.5 bg-primary-red mb-4"></div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Grand Master Bakhshu recognizes the positive impact and influence of a superior teacher.</p>
          </div>
          <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center mb-6">
              <img src="https://img.icons8.com/ios-filled/50/000000/trophy.png" className="w-full grayscale" alt="Stats" />
            </div>
            <h5 className="font-bebas text-xl tracking-widest">OUR CHAMPIONS</h5>
            <div className="w-8 h-0.5 bg-primary-red mb-4"></div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Grand Master Bakhshu recognizes the positive impact and influence of a superior teacher.</p>
          </div>
          <div className="space-y-4">
            <div className="w-8 h-8 flex items-center justify-center mb-6">
              <img src="https://img.icons8.com/ios-filled/50/000000/positive-dynamic.png" className="w-full grayscale" alt="Stats" />
            </div>
            <h5 className="font-bebas text-xl tracking-widest">OUR RESULTS</h5>
            <div className="w-8 h-0.5 bg-primary-red mb-4"></div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Grand Master Bakhshu recognizes the positive impact and influence of a superior teacher.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
