
import React, { useEffect, useRef } from 'react';
import { Award, Users, Trophy, Target, Zap } from 'lucide-react';

const Achievements = [
  { label: "Active Members", val: "208+", icon: <Users size={28} /> },
  { label: "Expert Trainers", val: "12+", icon: <Award size={28} /> },
  { label: "Years Experience", val: "10+", icon: <Zap size={28} /> },
  { label: "Transformations", val: "416+", icon: <Trophy size={28} /> }
];

const Instructors: React.FC = () => {
  return (
    <section id="achievements" className="py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Achievements</h2>
          <p className="text-text-gray max-w-2xl mx-auto">Numbers that reflect our commitment to excellence and the trust our community places in us.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {Achievements.map((ach, idx) => (
            <div key={idx} className="bg-card-dark p-12 border border-white/5 rounded-none flex flex-col items-center text-center group hover:border-primary-red/30 transition-all duration-500">
              <div className="text-primary-red mb-6 transition-transform group-hover:scale-125 duration-500">
                {ach.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{ach.val}</h3>
              <p className="text-text-gray font-bold uppercase tracking-widest text-xs">{ach.label}</p>
            </div>
          ))}
        </div>

        {/* Member Satisfaction bar as seen in image */}
        <div className="bg-card-dark p-10 rounded-none border border-white/5 max-w-4xl mx-auto">
          <h4 className="text-white text-center font-bold text-lg mb-10">Member Satisfaction</h4>
          <div className="space-y-8">
            {[
              { label: "Training Quality", val: "98%" },
              { label: "Equipment Satisfaction", val: "95%" },
              { label: "Overall Experience", val: "97%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="text-text-gray">{stat.label}</span>
                  <span className="text-primary-red">{stat.val}</span>
                </div>
                <div className="h-1.5 bg-black rounded-none overflow-hidden">
                  <div className="h-full bg-primary-red transition-all duration-1000 rounded-none" style={{ width: stat.val }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
