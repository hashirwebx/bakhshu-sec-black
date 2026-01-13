
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

declare const gsap: any;

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm Coach Bakhshu's AI assistant. Ask me anything about our classes, schedules, or the benefits of Taekwondo!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const botIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleIconHover = () => {
    if (botIconRef.current) {
      gsap.to(botIconRef.current, {
        scale: 1.2,
        rotate: 15,
        duration: 0.3,
        ease: "back.out(2)"
      });
    }
  };

  const handleIconLeave = () => {
    if (botIconRef.current) {
      gsap.to(botIconRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the AI Assistant for Bakhshu Taekwondo & Fitness Club. 
          Your goal is to inform users about the academy and encourage them to register.
          Key Info:
          - Branches: Soan Garden (Islamabad) and Rawalpindi.
          - Soan Branch: Mon-Thu, Slots 4:30-5:30, 5:30-6:30. Fees: 1000 reg, 5000 monthly.
          - Rawalpindi Branch: Wed-Sat, Slots 4:30-5:30, 5:30-6:30, 6:30-7:30 (Adults). Fees: 1500 reg, 4000 monthly.
          - Owner/Coach: Award-winning instructors.
          - Benefits: Confidence, Discipline, Fitness, Leadership, Self-Defense.
          - Special: Free trial class available at Soan Garden.
          Keep responses concise, energetic, and professional. Always suggest they click the 'Register Now' button if they seem interested.`,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again or contact us via WhatsApp!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a little trouble connecting. Please feel free to call us directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
          className="w-14 h-14 bg-red-600 text-white rounded-none shadow-2xl flex items-center justify-center hover:scale-110 transition group relative"
        >
          <div ref={botIconRef}><Bot size={28} /></div>
          <span className="absolute left-full ml-3 bg-slate-900 text-white px-3 py-1 rounded-none text-xs font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Ask the Coach AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] h-[500px] rounded-none shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-red-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white/20 p-2 rounded-none">
                <Bot size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">Academy AI Coach</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 p-1 rounded-none transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-none text-sm ${
                  m.role === 'user' 
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/10' 
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-none focus-within:ring-2 focus-within:ring-red-600/20 transition">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-red-600 text-white rounded-none hover:bg-red-700 disabled:opacity-50 transition shadow-lg shadow-red-600/20"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
