import { MessageSquare, ArrowRight, Wallet, Sparkles, Send } from "lucide-react";

export default function Logistics() {
  return (
    <section id="how-it-works" className="py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Logistics Banner Box */}
        <div className="bg-neutral-900/40 border border-neutral-800 p-8 sm:p-16 text-center relative overflow-hidden">
          
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500 mb-4 block">
            Fulfillment Protocol
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-6">
            Fulfillment Logistics via WhatsApp
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            After completing your checkout transaction on Gumroad, route your digital receipt directly along with your necessary prompt details to our processing matrix via WhatsApp. Execution triggers instantly.
          </p>

          {/* Stepped Horizontal Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 max-w-4xl mx-auto">
            
            <div className="bg-neutral-950/40 border border-neutral-800/60 p-6 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-850 text-[10px] font-bold text-neutral-400 flex items-center justify-center font-mono mb-4">
                  01
                </span>
                <span className="text-sm font-black text-white block uppercase tracking-tighter mb-2">
                  Complete Payment
                </span>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Secure once-off checkout transaction via secure platform links on Gumroad or banking EFT.
                </p>
              </div>
            </div>

            <div className="bg-neutral-950/40 border border-neutral-800/60 p-6 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-850 text-[10px] font-bold text-neutral-400 flex items-center justify-center font-mono mb-4">
                  02
                </span>
                <span className="text-sm font-black text-white block uppercase tracking-tighter mb-2">
                  Construct Blueprint
                </span>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Utilize the AI Draft Room above to generate structured base definitions matching your exact context.
                </p>
              </div>
            </div>

            <div className="bg-neutral-950/40 border border-neutral-800/60 p-6 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-850 text-[10px] font-bold text-neutral-400 flex items-center justify-center font-mono mb-4">
                  03
                </span>
                <span className="text-sm font-black text-white block uppercase tracking-tighter mb-2">
                  Route to Processing
                </span>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Ping draft copy and proof receipt link into the direct pipeline. Final product returned same-day.
                </p>
              </div>
            </div>

          </div>

          {/* WhatsApp Direct Hub Frame */}
          <div className="inline-block bg-neutral-950/40 border border-neutral-800 px-8 py-6 max-w-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
              Direct Pipeline Hub
            </span>
            <a 
              href="https://wa.me/27740740875" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-2xl sm:text-4xl font-black text-[#10b981] tracking-tighter hover:text-emerald-300 transition-colors block break-all uppercase"
            >
              074 074 0875
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
