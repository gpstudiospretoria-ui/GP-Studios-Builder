import React, { useState, useEffect } from "react";
import { Calculator, Sparkles, MessageSquare, ShieldCheck, Zap, DollarSign } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  modifierLabel: string;
  modifierCost: number;
  modifierMax: number;
  defaultModifier: number;
}

const PRICING_OPTIONS: ServiceOption[] = [
  {
    id: "cv",
    name: "CV + Cover Letter",
    basePrice: 150,
    modifierLabel: "Extra Resume Pages (+R50 each)",
    modifierCost: 50,
    modifierMax: 3,
    defaultModifier: 0
  },
  {
    id: "social",
    name: "Social Media Posts (10 posts base)",
    basePrice: 200,
    modifierLabel: "Additional Core Posts (+R20 each)",
    modifierCost: 20,
    modifierMax: 15,
    defaultModifier: 0
  },
  {
    id: "business",
    name: "1-Page Business Plan",
    basePrice: 250,
    modifierLabel: "Include Financial Forecast Annexure (+R150)",
    modifierCost: 150,
    modifierMax: 1, // acts like a checkbox
    defaultModifier: 0
  },
  {
    id: "essay",
    name: "Structured Essay Outline",
    basePrice: 80,
    modifierLabel: "Additional Key Arguments (+R30 each)",
    modifierCost: 30,
    modifierMax: 5,
    defaultModifier: 0
  }
];

export default function PricingCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("cv");
  const [modifierVal, setModifierVal] = useState<number>(0);
  const [isRush, setIsRush] = useState<boolean>(false);
  const [grandTotal, setGrandTotal] = useState<number>(150);

  const activeService = PRICING_OPTIONS.find(s => s.id === selectedServiceId)!;

  // Whenever inputs change, update total pricing
  useEffect(() => {
    let serviceCost = activeService.basePrice;
    let addOnsCost = modifierVal * activeService.modifierCost;
    let rushCost = isRush ? 75 : 0;
    
    setGrandTotal(serviceCost + addOnsCost + rushCost);
  }, [selectedServiceId, modifierVal, isRush, activeService]);

  // Handle service change gracefully resetting modifiers
  const handleServiceChange = (id: string) => {
    setSelectedServiceId(id);
    setModifierVal(0);
  };

  const compileCustomWhatsAppLink = () => {
    let customMsg = `*CUSTOM CONFIGURATION BOOKING*:\n`;
    customMsg += `- Project Model: GP Studio ${activeService.name}\n`;
    customMsg += `- Scope Adjustment: ${modifierVal} unit(s) of [${activeService.modifierLabel.split(" (+")[0]}]\n`;
    customMsg += `- Fast Tracking / Express Rush? ${isRush ? "YES (+R75 same-day priority action)" : "NO"}\n`;
    customMsg += `- Ready Calculated Total ZAR: *R${grandTotal} ZAR*\n\n`;
    customMsg += `Please initialize and finalize safe payment instructions from Pretoria Studio.`;

    return `https://wa.me/27740740875?text=${encodeURIComponent(customMsg)}`;
  };

  return (
    <section id="pricing-calculator" className="py-20 bg-[#0a0a0a] border-t border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4 inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#10b981] uppercase flex items-center justify-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#10b981]" />
              Flexible Custom Value Builder
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            Custom Document Scope Builder
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto font-light">
            Fine-tune standard requirements and same-day express speed actions, rendering instant transparent calculations.
          </p>
        </div>

        {/* Master Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-neutral-800 bg-neutral-900/30 shadow-2xl">
          
          {/* Slider Adjustment Side */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Factor 1: Select Service */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">
                  1. Choose Core Standard Template Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRICING_OPTIONS.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => handleServiceChange(svc.id)}
                      className={`p-3.5 text-left border rounded-none transition-all duration-200 cursor-pointer ${
                        selectedServiceId === svc.id
                          ? "bg-neutral-900 border-neutral-700/80 text-white"
                          : "bg-neutral-900/10 border-neutral-900 text-neutral-400 hover:border-neutral-810"
                      }`}
                    >
                      <p className="text-xs font-black uppercase tracking-tighter">{svc.name.split(" (")[0]}</p>
                      <p className="text-[10px] text-neutral-500 mt-1 font-mono">Starts from R{svc.basePrice}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Factor 2: Sliding Modifier Scope */}
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  <span id="label-modifier-slider">2. Adjust Scope Modifier</span>
                  <span className="font-mono text-emerald-400 text-xs font-semibold">{modifierVal} Selected</span>
                </div>
                
                <p className="text-[11px] text-neutral-400 font-sans mb-4 leading-relaxed">
                  {activeService.modifierLabel}
                </p>

                {activeService.modifierMax === 1 ? (
                  /* Toggle Checkbox for simple boolean addon */
                  <button
                    onClick={() => setModifierVal(modifierVal === 1 ? 0 : 1)}
                    className={`flex items-center justify-between w-full p-3 border rounded-none text-xs font-bold transition-all duration-200 cursor-pointer ${
                      modifierVal === 1
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
                        : "bg-neutral-900/10 border-[#151515] text-neutral-400 hover:border-neutral-800"
                    }`}
                  >
                    <span>Include Spreadsheet and Annexure</span>
                    <span className="font-mono text-[10px]">+R150 ZAR</span>
                  </button>
                ) : (
                  /* Slide Bar for multi-units */
                  <div className="space-y-3">
                    <input
                      aria-labelledby="label-modifier-slider"
                      type="range"
                      min={0}
                      max={activeService.modifierMax}
                      value={modifierVal}
                      onChange={(e) => setModifierVal(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                      <span>Standard Profile (0)</span>
                      <span>Maximum Multiplier ({activeService.modifierMax})</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Factor 3: Rush Delivery Priority Toggle */}
              <div className="pt-4 border-t border-neutral-950">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                      <Zap className="w-3.5 h-3.5" />
                      EXTREME 30-MIN RUSH PROCESSING?
                    </span>
                    <p className="text-[10px] text-neutral-500 mt-1 font-sans leading-relaxed">
                      Bypasses backlog list queuing directly into immediate production sprint (+R75 ZAR)
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRush(!isRush)}
                    className={`p-2.5 px-4 text-xs font-extrabold tracking-widest transition-all duration-200 cursor-pointer ${
                      isRush
                        ? "bg-orange-500 text-black font-extrabold"
                        : "bg-neutral-900/10 text-neutral-400 border border-neutral-900 hover:border-neutral-800"
                    }`}
                  >
                    {isRush ? "ACTIVE" : "ADD RUSH"}
                  </button>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-neutral-900/35 hidden md:block">
              <span className="text-[9px] text-neutral-600 block uppercase font-mono tracking-wider">
                GP STUDIO SECURITY: No automatic subscription, standard once-off flat billing.
              </span>
            </div>
          </div>

          {/* Pricing Checkout Display Side */}
          <div className="md:col-span-5 p-6 sm:p-10 bg-neutral-950/40 border-t md:border-t-0 md:border-l border-neutral-900/80 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#8e8e8e] block uppercase mb-1">
                  CALCULATED RECEIPT VALUE:
                </span>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter font-mono">
                  R{grandTotal} <span className="text-xs text-neutral-500 uppercase font-sans font-normal ml-1">ZAR</span>
                </p>
              </div>

              <div className="h-px bg-neutral-900"></div>

              <div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block mb-3">
                  Custom Blueprint Breakdown:
                </span>
                <ul className="space-y-2 text-[11px] text-[#aeaeae] font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Base Service Structure: R{activeService.basePrice}
                  </li>
                  {modifierVal > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Scope Scale Adjustment ({modifierVal} Units): +R{modifierVal * activeService.modifierCost}
                    </li>
                  )}
                  {isRush && (
                    <li className="flex items-center gap-2 text-orange-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      Extreme Delivery Sprint: +R75
                    </li>
                  )}
                  <li className="flex items-center gap-2 pt-2 border-t border-neutral-900/50 text-white font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    VAT / Pretoria In-person Handover: FREE
                  </li>
                </ul>
              </div>

            </div>

            <div className="space-y-3 mt-8">
              <a
                href={compileCustomWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#10b981] text-black hover:bg-emerald-400 hover:shadow-lg font-extrabold text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                BOOK ON WHATSAPP
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#5e5e5e]">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                <span>100% Secure Gauteng fulfillment priority.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
