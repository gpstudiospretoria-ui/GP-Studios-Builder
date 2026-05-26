import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#10b981] uppercase flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#10b981]" />
              HIGH-IMPACT DIGITAL EXECUTION
            </span>
          </div>
          <h1 className="text-[44px] sm:text-[76px] lg:text-[90px] leading-[0.85] font-black tracking-tighter mb-8 uppercase text-white">
            You Need Better<br/>
            <span className="text-neutral-600">Presentation.</span>
          </h1>
          <p className="max-w-2xl text-neutral-400 text-base sm:text-lg leading-relaxed font-light mx-auto mb-12">
            Stop letting poor formatting hold your ambitions back. We engineer elite CVs, investor-ready business plans, structured essay outlines, and viral social media assets with relentless Pretoria speed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#draft-room" 
              className="w-full sm:w-auto px-8 py-4 bg-[#10b981] text-black hover:bg-emerald-400 font-extrabold text-xs tracking-widest uppercase transition-colors duration-200 text-center flex items-center justify-center gap-2 rounded-none"
            >
              LAUNCH AI DRAFT ROOM
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-neutral-200 font-extrabold text-xs tracking-widest uppercase transition-colors duration-200 text-center rounded-none"
            >
              CORE OFFERINGS
            </a>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
