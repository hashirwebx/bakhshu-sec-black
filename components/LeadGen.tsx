
import React from 'react';

const LeadGen: React.FC = () => {
  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h3 className="text-white font-bebas text-2xl tracking-[0.1em] mb-8 text-center uppercase">
          Curious about Taekwondo? Why not try it out!
        </h3>

        <form className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative border-b border-white/20 pb-2">
            <input
              type="text"
              placeholder="FULL NAME"
              className="bg-transparent text-white w-full placeholder:text-white/30 text-[10px] font-bold tracking-widest focus:outline-none"
            />
          </div>
          <div className="relative border-b border-white/20 pb-2">
            <input
              type="email"
              placeholder="EMAIL"
              className="bg-transparent text-white w-full placeholder:text-white/30 text-[10px] font-bold tracking-widest focus:outline-none"
            />
          </div>
          <div className="relative border-b border-white/20 pb-2">
            <input
              type="tel"
              placeholder="PHONE NUMBER"
              className="bg-transparent text-white w-full placeholder:text-white/30 text-[10px] font-bold tracking-widest focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="bg-white text-black py-4 text-[10px] font-black uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all rounded-sm active:scale-95"
          >
            Try Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeadGen;
