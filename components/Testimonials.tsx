
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';

const TESTIMONIAL_DATA = [
  {
    id: 1,
    quote: "Bakhshu Fitness Club changed my life completely. The trainers are incredibly supportive and the programs are perfectly structured for results.",
    author: "Dr. Ayesha Khan",
    role: "Member",
    stats: "Lost 10kg in 8 months",
    videoThumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    profileThumb: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    quote: "The discipline I learned here goes beyond the gym. It's about mental strength and unshakeable confidence in every part of life.",
    author: "Mansoor Ahmed",
    role: "National Athlete",
    stats: "Black Belt - 2nd Dan",
    videoThumb: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800",
    profileThumb: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    quote: "Best training environment in Rawalpindi. Professional, clean, and the community is like a second family to me.",
    author: "Salahuddin",
    role: "Fitness Member",
    stats: "Training since 2022",
    videoThumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    profileThumb: "https://i.pravatar.cc/150?img=53"
  },
  {
    id: 4,
    quote: "As a parent, I've seen my daughter grow into a confident, strong person. The youth programs here are truly world-class.",
    author: "Javed Iqbal",
    role: "Parent",
    stats: "Junior Champion Program",
    videoThumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    profileThumb: "https://i.pravatar.cc/150?img=68"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TESTIMONIAL_DATA[activeIndex];

  const handleNext = () => setActiveIndex((activeIndex + 1) % TESTIMONIAL_DATA.length);
  const handlePrev = () => setActiveIndex((activeIndex - 1 + TESTIMONIAL_DATA.length) % TESTIMONIAL_DATA.length);

  return (
    <section id="testimonials" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-text-gray max-w-2xl mx-auto">Hear from our members who have transformed their lives through our programs.</p>
        </div>

        {/* Main Highlighted Story */}
        <div className="relative bg-[#151515] rounded-none border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl mb-12 animate-in fade-in duration-700">
          
          {/* Main Video Box */}
          <div className="w-full md:w-1/2 aspect-video bg-black relative group cursor-pointer overflow-hidden rounded-none">
            <img 
              key={`main-thumb-${current.id}`}
              src={current.videoThumb} 
              alt="Transformation" 
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 animate-in zoom-in-95 duration-700 rounded-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary-red rounded-none flex items-center justify-center shadow-[0_0_30px_rgba(255,60,60,0.5)] group-hover:scale-110 transition-transform">
                <Play size={24} className="text-white fill-current ml-1" />
              </div>
            </div>
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded-none text-[8px] font-black uppercase tracking-widest text-white border border-white/10">
              FEATURED STORY
            </div>
          </div>

          {/* Main Review Text */}
          <div className="w-full md:w-1/2 p-10 md:p-16 text-left flex flex-col justify-center relative">
            <div className="flex text-primary-red mb-6 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed italic mb-8 animate-in slide-in-from-left-4 duration-500">
              "{current.quote}"
            </p>
            
            <div className="animate-in slide-in-from-bottom-2 duration-500">
              <h5 className="text-white font-bold text-lg">{current.author}</h5>
              <p className="text-primary-red text-sm font-bold uppercase tracking-widest mt-1">
                {current.stats}
              </p>
              <p className="text-text-gray text-xs mt-1">{current.role}</p>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex space-x-3">
              <button 
                onClick={handlePrev} 
                className="p-3 bg-white/5 hover:bg-primary-red text-white transition-all rounded-none border border-white/5 active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext} 
                className="p-3 bg-white/5 hover:bg-primary-red text-white transition-all rounded-none border border-white/5 active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails Row - Bottom Videos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {TESTIMONIAL_DATA.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-video rounded-none overflow-hidden cursor-pointer border-2 transition-all duration-300 group ${
                activeIndex === idx 
                  ? 'border-primary-red ring-4 ring-primary-red/10 scale-[1.02]' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/10'
              }`}
            >
              <img src={item.videoThumb} alt={item.author} className="w-full h-full object-cover rounded-none" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={20} className="text-white fill-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-3">
                <p className="text-white text-[10px] font-bold uppercase tracking-widest truncate">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button className="bg-primary-red text-white px-10 py-4 rounded-none font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl shadow-primary-red/20">
            View All Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
