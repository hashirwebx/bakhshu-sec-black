
import React from 'react';

interface WhoWeAreProps {
  onRegister: () => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onRegister }) => {
  return (
    <section id="who" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Visual Content */}
        <div className="relative">
          <div className="relative z-10 border-[12px] border-white/5 shadow-2xl overflow-hidden aspect-video">
            <img src="https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale brightness-75" alt="Who we are" />
            <div className="absolute bottom-4 right-4 flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </div>
          {/* Background layered effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-white/10 rounded-full opacity-30"></div>
        </div>

        {/* Text Content */}
        <div className="text-white">
          <h2 className="font-bebas text-6xl md:text-9xl leading-[0.85] mb-8">
            WHO <br />
            <span className="italic font-serif font-light text-4xl md:text-7xl block -mt-4 lowercase">We Are</span>
          </h2>
          <div className="w-24 h-1 bg-primary-blue mb-12"></div>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-lg font-medium">
            Grand Master Bakhshu recognizes the positive impact and influence of a superior teacher upon the development of the student. Bakhshu's Family Tae Kwon Do classes offer the ideal balance of discipline and fun.
          </p>

          <button 
            onClick={onRegister}
            className="border border-white/20 text-white px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Second Part: Founder & Team Grid */}
      <div className="max-w-7xl mx-auto mt-40 grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
           <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">FOUNDERS</p>
           <h3 className="text-4xl font-serif font-light text-white mb-10 italic">Grand Master <br/><span className="italic font-bold not-italic">Bakhshu</span> and team</h3>
           <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-lg font-medium">
             Your child will be coached by patient and enthusiastic instructors. All of Master Bakhshu's instructors are dedicated to helping each student achieve their personal best.
           </p>
           <button 
             onClick={onRegister}
             className="border border-white/20 text-white px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
           >
             Learn More
           </button>
        </div>
        <div className="order-1 lg:order-2">
           <div className="aspect-video bg-slate-900 border-[12px] border-white/5 relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition duration-700" alt="Team" />
              <div className="absolute inset-0 bg-primary-blue/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
