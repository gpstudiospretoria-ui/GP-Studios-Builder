import { MessageSquare, Phone } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0a]/90 border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <a href="#" className="text-2xl font-black tracking-tighter uppercase text-white">
            GP Studio<span className="text-[#10b981]">.</span>
          </a>
          <span className="text-[9px] tracking-[0.3em] text-neutral-500 font-bold uppercase mt-0.5">PRETORIA • GAUTENG</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest">
          <a href="#services" className="text-neutral-400 hover:text-white transition-colors duration-200">SERVICES</a>
          <a href="#draft-room" className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            AI DRAFT ROOM
          </a>
          <a href="#pricing-calculator" className="text-neutral-400 hover:text-white transition-colors duration-200">CUSTOMIZER</a>
          <a href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors duration-200">LOGISTICS</a>
        </nav>

        <div>
          <a 
            href="https://wa.me/27740740875" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-emerald-500/30 rounded-none bg-emerald-950/20 hover:bg-emerald-600 text-emerald-400 hover:text-black font-bold text-xs tracking-widest transition-all duration-300 group"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors" />
            WHATSAPP HUB
          </a>
        </div>
      </div>
    </header>
  );
}
