
import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/89903536_3109441672409113_3512394554969948160_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-u5AWacE0yIQ7kNvwFCqKKm&_nc_oc=AdmqKC02bL8X4MDOGgySSpW0Y1ZNKnwZM9Kl9OE1aKTHS8fCMO7HQ0Few4Da0c3ozUg&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=PgphhVYaDxy_Uz5PQNlDBg&oh=00_AfrTygPb3sSlnhp6eteOrGMJ-LK6COELGfWypOnksQFtkg&oe=698D6662", title: "Focus & Meditation", category: "Training" },
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/42776210_2131173663569257_6707202993097277440_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=p27wsTR5_IwQ7kNvwF2deta&_nc_oc=AdnW-tZuJhJL4ZWx0w7R3L6harp1Ca13aoRXBQ_9S2gB7rqBN5KbPZsY9OmdgMozOqo&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=kKiZe0XDJVyQoi3vbcu_CA&oh=00_Afqf7LRQMdwc13wife6FInPDLzT7zThUtNJ610pTdwTs-g&oe=698D7DAB", title: "Precision Kicks", category: "Classes" },
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/55897097_2396752633678024_166100206541078528_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zZEXYYHcKlMQ7kNvwHy2EOe&_nc_oc=Adkx_3wYFj8H018IQD1le8S0O_Fozia3qaJdoKIDMw2DJcj9mwVLTaDm7mxgI_EstFg&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=nHXM_dAuaM8uO8pY150kEw&oh=00_AfrV2fPSvPsRhLG5Z2RVS4lz2qJizqdWgl2RRMOwosyfGA&oe=698D4C53", title: "Advanced Sparring", category: "Elite" },
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/50337254_2296250163728272_6440592503061086208_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kbkOL26iZkkQ7kNvwE_uyjq&_nc_oc=AdkRIEX8e0fuLWtqpedw2uMzfnYgRjriV6NkjTXyDVvTT1ey0PDYO8fxEtXSe7fyS8k&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=Zuo2f_PE0GKy849A2yjy9g&oh=00_Afp_8EedV3dxNMmaEeorvAL4O7ajipU9DUmF2JUCJLvsNg&oe=698D6AD7", title: "Team Discipline", category: "Classes" },
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/45926900_2190397064313583_3332697714625347584_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rQ00kZO3GtcQ7kNvwGcZPZ5&_nc_oc=AdkB3WAxycNplyjO6M9beyXiJOOiw1lkoYSb7iWRCg4Y9NC5-YuFyqsIP8nBwJYZ-k0&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=YU522nj14J-BZf3-y3lPjA&oh=00_AfqikPsTZTK4k1FpVR-wth9Kse2Jcyc74Ftk6NwRggS7cQ&oe=698D661D", title: "Morning Drill", category: "Training" },
  { url: "https://scontent.fxjm2-1.fna.fbcdn.net/v/t1.6435-9/43365891_2138921049461185_4378617732619304960_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=eT3J9miabiUQ7kNvwGIFB8Z&_nc_oc=AdkipDdipFfZPVUc0kPLQiO6mlL4uklSFX79UISWGa-MUVQFFBD_kA6v64wBH_XyYgc&_nc_zt=23&_nc_ht=scontent.fxjm2-1.fna&_nc_gid=1E4jH3jpKsE0TjxpMV3hvA&oh=00_AfoF3VbmbDK0WbWaJlQTN4cfvGkBZBzWV9d9_79UNC0u_A&oe=698D535F", title: "National Spirit", category: "Results" },
];

const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_IMAGES.length);
      }
      if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      }
    };
    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section id="gallery" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery Highlights</h2>
          <p className="text-text-gray max-w-2xl mx-auto">Take a visual tour of our state-of-the-art facilities, equipment, and the incredible transformation journeys of our members.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className="relative group cursor-pointer overflow-hidden rounded-none bg-card-dark aspect-video border border-white/5"
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-primary-red text-[10px] font-black uppercase tracking-widest mb-1">{image.category}</span>
                <h4 className="text-white text-lg font-bold">{image.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 p-6"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button className="absolute top-8 right-8 text-white"><X size={32} /></button>
            <button onClick={handlePrev} className="absolute left-8 text-white/50 hover:text-white"><ChevronLeft size={48} /></button>
            <button onClick={handleNext} className="absolute right-8 text-white/50 hover:text-white"><ChevronRight size={48} /></button>
            <img 
              src={GALLERY_IMAGES[selectedImageIndex].url} 
              className="max-w-full max-h-[80vh] object-contain rounded-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
