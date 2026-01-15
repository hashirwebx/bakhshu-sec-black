
import React from 'react';
import { Shield, Users, Target, Brain, Dumbbell, Award, Heart, Smartphone, Zap, Apple, ShieldCheck, UserCheck, Star, GraduationCap, Globe, Trophy, Mountain, Calendar, Users2, Medal, HeartHandshake } from 'lucide-react';
import { BranchInfo } from './types';

export const BRANCHES: Record<string, BranchInfo> = {
  soan: {
    id: 'soan',
    name: 'Soan Garden Branch',
    days: 'Monday – Thursday',
    slots: ['4:30 PM – 5:30 PM', '5:30 PM – 6:30 PM'],
    fees: {
      registration: '1000/- (Lifetime)',
      monthly: '5000/-',
      discount: '10% Sibling Discount Available'
    },
    address: '1st Floor, Platinum Plaza, Block B, Main Markaz, Soan Garden, Islamabad',
    special: '🎊 Grand Opening: 3rd January 2026 – 4:30 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.867451245847!2d73.1554!3d33.5181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb22e2f69411%3A0x647e335043817117!2sSoan%20Garden%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk'
  },
  pindi: {
    id: 'pindi',
    name: 'Rawalpindi Branch',
    days: 'Wednesday – Saturday',
    slots: ['4:30 PM – 5:30 PM', '5:30 PM – 6:30 PM', '6:30 PM – 7:30 PM (Adults)'],
    fees: {
      registration: '1500/- (Lifetime)',
      monthly: '4000/-'
    },
    address: 'E8 Plaza, 2nd Floor (Above Savemart), Haidri Chowk, Saidpur Road, Rawalpindi',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4925828453476!2d73.0645672!3d33.6441768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df952be78393e1%3A0x334812a87c14041a!2sSaidpur%20Rd%2C%20Rawalpindi!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk'
  }
};

export const KIDS_BENEFITS = [
  {
    title: 'Confidence & Self-Esteem',
    desc: 'Builds confidence and self-esteem through gradual achievement and mastery.',
    icon: <Star className="w-6 h-6" />
  },
  {
    title: 'Focus & Behavior',
    desc: 'Improves focus and classroom behavior by teaching patience and disciplined action.',
    icon: <Target className="w-6 h-6" />
  },
  {
    title: 'Physical Fitness',
    desc: 'Encourages physical fitness and coordination for a healthy, active lifestyle.',
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Self-Control',
    desc: 'Teaches self-control and emotional balance in high-pressure situations.',
    icon: <Brain className="w-6 h-6" />
  },
  {
    title: 'Respect',
    desc: 'Promotes respect for parents, teachers, and peers as a fundamental martial arts value.',
    icon: <Users className="w-6 h-6" />
  }
];

export const ACHIEVEMENTS = [
  {
    title: "Black Belt Excellence",
    desc: "Hundreds of our dedicated students have successfully achieved their Black Belts, reflecting years of discipline and mastery.",
    icon: <Shield className="w-8 h-8" />,
    image: "https://ik.imagekit.io/BakhshuTaekwondo/Achievements%20bakhshu/Gemini_Generated_Image_glbonyglbonyglbo.png"
  },
  {
    title: "University Scholarships",
    desc: "Our champions are recipients of sports-based scholarships in top-tier universities across Pakistan.",
    icon: <GraduationCap className="w-8 h-8" />,
    image: "https://ik.imagekit.io/BakhshuTaekwondo/Achievements%20bakhshu/Gemini_Generated_Image_exaqrnexaqrnexaq.png"
  },
  {
    title: "Global Participation",
    desc: "Regular representation and participation in prestigious national and international Taekwondo events.",
    icon: <Globe className="w-8 h-8" />,
    image: "https://ik.imagekit.io/BakhshuTaekwondo/Achievements%20bakhshu/Gemini_Generated_Image_qecxwiqecxwiqecx.png"
  },
  {
    title: "Medalists & Champions",
    desc: "Proudly producing consistent medalists and champions in elite competitive circuits.",
    icon: <Trophy className="w-8 h-8" />,
    image: "https://ik.imagekit.io/BakhshuTaekwondo/Achievements%20bakhshu/Gemini_Generated_Image_cyyxe1cyyxe1cyyx.png"
  }
];


export const EVENTS = [
  { title: "Club Championships", icon: <Trophy className="w-5 h-5" />, category: "Competition" },
  { title: "National Events", icon: <Globe className="w-5 h-5" />, category: "Federation" },
  { title: "Club Fun Trips", icon: <Heart className="w-5 h-5" />, category: "Social" },
  { title: "Summer Hiking", icon: <Mountain className="w-5 h-5" />, category: "Outdoor" },
  { title: "Council Elections", icon: <Users2 className="w-5 h-5" />, category: "Leadership" },
  { title: "Belt Ceremonies", icon: <Medal className="w-5 h-5" />, category: "Promotion" },
  { title: "Inter-Club Cups", icon: <Target className="w-5 h-5" />, category: "Tournament" },
  { title: "Demo Days", icon: <Zap className="w-5 h-5" />, category: "Exhibition" },
  { title: "Defense Workshops", icon: <ShieldCheck className="w-5 h-5" />, category: "Special" },
  { title: "Anti-Bullying", icon: <HeartHandshake className="w-5 h-5" />, category: "Outreach" },
  { title: "Family Fiesta", icon: <Users className="w-5 h-5" />, category: "BTC Family" }
];


export const PARENT_CHOICES = [
  "Safe, child-friendly training environment",
  "Strong emphasis on discipline, respect, and focus",
  "Professional instructors with national-level experience",
  "Special care and encouragement for shy and beginner children",
  "Clear progress system with belts, goals, and achievements"
];

export const PROGRAMS_LIST = [
  { 
    title: "Little Warriors", 
    age: "Ages 4-6", 
    desc: "A fun-filled introduction to Taekwondo focusing on coordination and basic movements.",
    img: "https://ik.imagekit.io/BakhshuTaekwondo/Gemini_Generated_Image_jba7gkjba7gkjba7.png?updatedAt=1768214869617" 
  },
  { 
    title: "Junior Taekwondo", 
    age: "Ages 7-12", 
    desc: "Structured training building speed, strength, and advanced martial arts techniques.",
    img: "https://ik.imagekit.io/BakhshuTaekwondo/Gemini_Generated_Image_b4g7p8b4g7p8b4g7.png?updatedAt=1768214869609" 
  },
  { 
    title: "Teens & Competitive", 
    age: "Competitive Training", 
    desc: "Intensive training for young athletes aiming for championships and elite fitness.",
    img: "https://ik.imagekit.io/BakhshuTaekwondo/Gemini_Generated_Image_553klz553klz553k.png?updatedAt=1768214869571" 
  }
];

export const HERO_SLIDES = [
{
    headline: "Build Confidence from an Early Age",
    subHeadline: "Elite Taekwondo Training for Children",
    description: "Structured, age-appropriate programs that develop discipline, focus, and self-confidence in a safe environment.",
    primaryBtn: "Enroll Now",
    secondaryBtn: "Explore Programs",
    image: "https://ik.imagekit.io/BakhshuTaekwondo/hero%20section%20taewondo%20images/Gemini_Generated_Image_oy2zdwoy2zdwoy2z.png?updatedAt=1768225451542",
    aiPrompt: "A professional cinematic shot of a young child in a clean white Taekwondo uniform, demonstrating a confident stance in a modern martial arts dojang with dramatic lighting."
  },
  {
    headline: "Strength. Focus. Discipline.",
    subHeadline: "A Strong Body Builds a Strong Mind",
    description: "Improve coordination, flexibility, endurance, and mental discipline through structured martial arts training.",
    primaryBtn: "Start Your Journey",
    secondaryBtn: "View Training Path",
    image: "https://ik.imagekit.io/BakhshuTaekwondo/hero%20section%20taewondo%20images/Gemini_Generated_Image_6gswm96gswm96gsw.png?updatedAt=1768225451510",
    aiPrompt: "Close up action shot of a martial artist's hands tied in a black belt, cinematic lighting, sharp focus on the texture of the belt and uniform, grit and discipline atmosphere."
  },
  {
    headline: "Train with Purpose",
    subHeadline: "International-Standard Taekwondo Coaching",
    description: "Led by a former Pakistan National Taekwondo Player with over a decade of excellence.",
    primaryBtn: "Book a Trial Session",
    secondaryBtn: "Meet Our Coaches",
    image: "https://ik.imagekit.io/BakhshuTaekwondo/hero%20section%20taewondo%20images/Gemini_Generated_Image_ekxvinekxvinekxv.png?updatedAt=1768225451654",
    aiPrompt: "A high-ranking Taekwondo master in a formal black-trim uniform performing a powerful jumping side kick, mid-air, dynamic motion blur, elite professional stadium background."
  },
  {
    headline: "Confidence Through Strength",
    subHeadline: "A Safe & Empowering Space for Girls",
    description: "A respectful environment where girls build self-belief, discipline, and self-defense skills.",
    primaryBtn: "Join with Confidence",
    secondaryBtn: "Learn More",
    image: "https://ik.imagekit.io/BakhshuTaekwondo/hero%20section%20taewondo%20images/Gemini_Generated_Image_gvqcudgvqcudgvqc%20(1).png?updatedAt=1768225451868",
    aiPrompt: "A diverse group of young girls in Taekwondo uniforms, smiling confidently after training, empowerment and community theme, soft natural lighting."
  },
  {
    headline: "Strong Foundations Start Early",
    subHeadline: "Toddler Physical Development Program (Ages 2.5–4)",
    description: "A carefully designed movement-based program that supports early physical milestones, helping toddlers improve balance, coordination, posture, and body awareness through safe, guided activities.",
    primaryBtn: "Enroll Your Toddler",
    secondaryBtn: "Learn About the Program",
    image: "https://ik.imagekit.io/BakhshuTaekwondo/hero%20section%20taewondo%20images/Gemini_Generated_Image_y062lty062lty062.png?updatedAt=1768225451696",
    aiPrompt: "Toddlers ages 3 playing with colorful agility equipment in a safe martial arts gym, focus on coordination and fun, bright and welcoming atmosphere."
  }
];
