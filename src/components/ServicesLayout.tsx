import { Check, ArrowRight } from "lucide-react";
import { ServiceType } from "../types";

interface ServiceCardData {
  id: ServiceType;
  title: string;
  priceZAR: number;
  badge: string;
  badgeColor: string;
  outlineColor: string;
  glowClass: string;
  bullets: string[];
}

const STATIC_SERVICES: ServiceCardData[] = [
  {
    id: "cv",
    title: "CV + Cover Letter",
    priceZAR: 150,
    badge: "Professional Service",
    badgeColor: "text-emerald-500",
    outlineColor: "border-t-emerald-500",
    glowClass: "glow-emerald",
    bullets: [
      "Same-Day Turnaround",
      "Tailored to the Role",
      "Clean ATS-Optimized Formats"
    ]
  },
  {
    id: "social",
    title: "10-Post Social Media Pack",
    priceZAR: 200,
    badge: "For Small Businesses",
    badgeColor: "text-yellow-500",
    outlineColor: "border-t-yellow-500",
    glowClass: "glow-yellow",
    bullets: [
      "Facebook & Instagram Ready",
      "Captions + Hashtags Included",
      "Delivered Under 24 Hours"
    ]
  },
  {
    id: "business",
    title: "1-Page Business Plan",
    priceZAR: 250,
    badge: "For Entrepreneurs",
    badgeColor: "text-orange-500",
    outlineColor: "border-t-orange-500",
    glowClass: "glow-orange",
    bullets: [
      "Clean Investor-Grade Format",
      "Tailored to Your Idea",
      "2-Hour Rapid Delivery"
    ]
  },
  {
    id: "essay",
    title: "Structured Essay Outline",
    priceZAR: 80,
    badge: "For Students",
    badgeColor: "text-purple-500",
    outlineColor: "border-t-purple-500",
    glowClass: "glow-purple",
    bullets: [
      "Full Structure + Key Arguments",
      "Any Subject / Any Grade",
      "30-Minute Panic Delivery"
    ]
  }
];

interface ServicesProps {
  onSelectService: (id: ServiceType) => void;
}

export default function ServicesLayout({ onSelectService }: ServicesProps) {
  const handleCardClick = (id: ServiceType) => {
    onSelectService(id);
    const targetElement = document.getElementById("draft-room");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 lg:py-36 bg-[#0a0a0a] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            Core Structural Offerings
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Select your high-stakes target objective. All digital engineering is deployment-ready at record speeds.
          </p>
        </div>

        {/* 2x2 Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {STATIC_SERVICES.map((svc) => (
            <div
              key={svc.id}
              className={`bg-neutral-900/40 border border-neutral-800 border-t-4 ${svc.outlineColor} p-8 sm:p-12 flex flex-col justify-between group h-full ${svc.glowClass}`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${svc.badgeColor} mb-2 block`}>
                  {svc.badge}
                </span>
                
                <div className="flex items-baseline justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase">
                    {svc.title}
                  </h3>
                  <span className="text-3xl font-black text-white font-mono tracking-tighter">
                    R{svc.priceZAR}
                  </span>
                </div>

                <div className="h-0.5 w-12 bg-neutral-800 mb-6"></div>

                <ul className="space-y-4 mb-12">
                  {svc.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-300">
                      <svg 
                        className={`h-5 w-5 ${svc.badgeColor} shrink-0 mr-3.5`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="3" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Interactivity link: Scrolls & activates form */}
              <button
                onClick={() => handleCardClick(svc.id)}
                className="w-full text-center py-4 bg-neutral-900 text-white font-extrabold text-xs tracking-widest uppercase border border-neutral-800 hover:bg-[#10b981] hover:text-black hover:border-[#10b981] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
              >
                START INTERACTIVE DRAFT
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
