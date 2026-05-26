import React, { useState, useEffect } from "react";
import { 
  FileText, Sparkles, Copy, Check, Loader2, Send, Terminal, 
  ChevronRight, AlertCircle, Info, Bookmark, RefreshCw, Layers, Zap
} from "lucide-react";
import { 
  ServiceType, CVDraftInputs, SocialDraftInputs, BusinessDraftInputs, 
  EssayDraftInputs, ServiceDetail 
} from "../types";

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "cv",
    title: "CV + Cover Letter",
    priceZAR: 150,
    badge: "Professional Package",
    badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    borderClass: "border-t-green-500 glow-green",
    accentColor: "text-green-400",
    description: "Get same-day elite visual formatting customized to pass standard ATS screening and secure interviews.",
    gumroadLink: "https://gpstudiospretoria.gumroad.com/l/pro-cv-package",
    bullets: [
      "Same-day high-stakes turnaround",
      "Clean ATS-optimized structural formats",
      "Tailored to target job categories",
      "Cover Letter aligned with core value-prop"
    ]
  },
  {
    id: "social",
    title: "10-Post Social Media Pack",
    priceZAR: 200,
    badge: "Small Business Catalyst",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    borderClass: "border-t-yellow-500 glow-yellow",
    accentColor: "text-yellow-400",
    description: "Ready-to-post high-engagement marketing copy, structured captions, visual outlines, and tags.",
    gumroadLink: "https://gpstudiospretoria.gumroad.com/l/social-media-captions",
    bullets: [
      "Facebook, TikTok & Instagram Ready",
      "Complete structured scroll-stopping hooks",
      "South African localized hashtags",
      "Delivered in under 24 hour sprint"
    ]
  },
  {
    id: "business",
    title: "1-Page Business Plan",
    priceZAR: 250,
    badge: "Entrepreneur Quick-Start",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    borderClass: "border-t-orange-500 glow-orange",
    accentColor: "text-orange-400",
    description: "A professional 1-page business plan canvas ideal for investor pitch alignments, partnerships, or bank applications.",
    gumroadLink: "https://gpstudiospretoria.gumroad.com/l/1-page-business-plan",
    bullets: [
      "Clean vector investor-ready structure",
      "Explicit financial and audience mapping",
      "Competitive moats & unique advantage profiles",
      "Instant 2-hour rapid draft delivery"
    ]
  },
  {
    id: "essay",
    title: "Structured Essay Outline",
    priceZAR: 80,
    badge: "Academic Booster",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    borderClass: "border-t-purple-500 glow-purple",
    accentColor: "text-purple-400",
    description: "Full essay outline, topic limits, key arguments, and citation matrix tailored to pass high plagiarism screens.",
    gumroadLink: "https://gpstudiospretoria.gumroad.com/l/essay-outline-service",
    bullets: [
      "Rigorous proposed thesis statement",
      "Logical outline flows for any grade/level",
      "Suggested source placements and Commentaries",
      "30-Minute urgent panic flow delivery"
    ]
  }
];

interface DraftRoomProps {
  selectedService: ServiceType;
  setSelectedService: (id: ServiceType) => void;
  onDraftSuccess: (gumroadLink: string, emailStatus?: any) => void;
}

export default function DraftRoom({ selectedService, setSelectedService, onDraftSuccess }: DraftRoomProps) {
  const currentActiveDetails = SERVICES_DATA.find(s => s.id === selectedService)!;
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLog, setLoadingLog] = useState("");
  const [draftResult, setDraftResult] = useState<string>("");
  const [demoMessage, setDemoMessage] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Input states for each form category
  const [cvInputs, setCvInputs] = useState<CVDraftInputs>({
    name: "",
    role: "Senior Project Administrator",
    skills: "Agile Project Management, Stakeholder Engagement, Budget Allocations, ZAR Financial Reporting",
    experience: "5+ years managing cross-functional teams; optimized budget workflows rendering R2.1M saving across Gauteng logistics operations.",
    academics: "BCom Business Administration - University of Pretoria (UP)"
  });

  const [socialInputs, setSocialInputs] = useState<SocialDraftInputs>({
    businessName: "Pretoria Coffee Roasters",
    industry: "Artisanal Coffee & Cafés",
    offerings: "AeroPress blends, local organic beans, weekend live music sessions",
    tone: "Bold, warm, humorous, heavily focus on hyper-local Pretoria culture",
    campaignTheme: "Unveiling our whole bean winter blend packages"
  });

  const [businessInputs, setBusinessInputs] = useState<BusinessDraftInputs>({
    ventureName: "QuickFix Gauteng Repairs",
    description: "An on-demand mobile repair service targeting high-priority household emergencies in Centurion and Pretoria East.",
    market: "Busy working class professionals, housing estates, and corporate complexes needing fast weekend emergency plumbers or electricians.",
    revenue: "Upfront standard callout fee of R450 + tiered hourly billing. Value-added preventative monthly subscriptions.",
    advantage: "Guaranteed same-day on-site deployment in under 55 minutes or callout fee waived.",
    milestones: "Establish team of 4 expert emergency contractors, sign up first 100 recurring households."
  });

  const [essayInputs, setEssayInputs] = useState<EssayDraftInputs>({
    topic: "The socio-economic impact of energy utility load shedding on micro-businesses in Gauteng municipalities.",
    academicLevel: "Undergraduate / BCom Honours Seminar",
    arguments: "Decreased operational hours leading to margin decay, capital expenditure diverted to backup energy sources, and resilience patterns in micro-businesses.",
    sources: "Stats SA utility metrics (2025), local Gauteng chamber of commerce publications, scholastic business resilience models.",
    thesisGoals: "Construct a comprehensive framework modeling current micro-enterprise survivability limits during periods of infrastructural volatility."
  });

  // State log interval handles beautiful realistic terminal simulation
  const consoleSteps = [
    "Establishing handshake with GP Pretoria Copywriting models...",
    "Injecting regional Gauteng high-stakes formatting criteria...",
    "Parsing user document parameters & constraints...",
    "Triggering Gemini 3.5 deep-intent analysis...",
    "Refining metric achievements into investor-grade structures...",
    "Calibrating ATS keyword densities...",
    "Optimizing presentation layout for maximum visual speed...",
    "Finalizing document draft..."
  ];

  type CVDraftFieldName = keyof CVDraftInputs;
  type SocialDraftFieldName = keyof SocialDraftInputs;
  type BusinessDraftFieldName = keyof BusinessDraftInputs;
  type EssayDraftFieldName = keyof EssayDraftInputs;

  const handleCvChange = (field: CVDraftFieldName, val: string) => {
    setCvInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleSocialChange = (field: SocialDraftFieldName, val: string) => {
    setSocialInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleBusinessChange = (field: BusinessDraftFieldName, val: string) => {
    setBusinessInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleEssayChange = (field: EssayDraftFieldName, val: string) => {
    setEssayInputs(prev => ({ ...prev, [field]: val }));
  };

  const executeDraftGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const activeDetails = 
      selectedService === "cv" ? cvInputs :
      selectedService === "social" ? socialInputs :
      selectedService === "business" ? businessInputs :
      essayInputs;

    // Direct rigorous verification that all input parameters are completely filled
    const emptyFields = Object.entries(activeDetails).filter(
      ([_, val]) => !val || String(val).trim() === ""
    );
    if (emptyFields.length > 0) {
      setValidationError("All configuration parameters must be fully defined before initiating compilation.");
      return;
    }

    // Secure click-gesture trigger: open Gumroad checkout instantly in a new tab to bypass popup blockers
    const currentLink = currentActiveDetails.gumroadLink;
    window.open(currentLink, "_blank");

    setLoading(true);
    setDraftResult("");
    setDemoMessage("");

    // Start logs interval simulation
    let logIndex = 0;
    setLoadingLog(consoleSteps[0]);
    const logInterval = setInterval(() => {
      logIndex++;
      if (logIndex < consoleSteps.length) {
        setLoadingLog(consoleSteps[logIndex]);
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    try {
      const resp = await fetch("/api/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService,
          details: activeDetails
        })
      });

      const data = await resp.json();
      clearInterval(logInterval);

      if (data.error) {
        setDraftResult(`Error parsing draft: ${data.error}`);
      } else {
        setDraftResult(data.draftContent);
        if (data.isDemoMode) {
          setDemoMessage(data.message || "");
        }
        
        // Activate full-viewport greyed-out mesh cover (no close options available)
        onDraftSuccess(currentLink, data.emailStatus);
      }
    } catch (err: any) {
      clearInterval(logInterval);
      setDraftResult(`Network error syncing structure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Pre-filled WhatsApp message compiler
  const compileWhatsAppLink = () => {
    const activeService = SERVICES_DATA.find(s => s.id === selectedService);
    const priceText = activeService ? `R${activeService.priceZAR}` : "";
    
    let summaryText = `*NEW DOCUMENT ORDER FROM WEBSITE*:\n`;
    summaryText += `*Service*: GP Studio ${activeService?.title} (${priceText})\n`;
    summaryText += `*Client Details*:\n`;

    if (selectedService === "cv") {
      summaryText += `- Candidate: ${cvInputs.name || "N/A"}\n- Role: ${cvInputs.role}\n- Primary Academic: ${cvInputs.academics.substring(0, 60)}`;
    } else if (selectedService === "social") {
      summaryText += `- Brand: ${socialInputs.businessName}\n- Industry: ${socialInputs.industry}\n- Campaign: ${socialInputs.campaignTheme.substring(0, 65)}`;
    } else if (selectedService === "business") {
      summaryText += `- Venture: ${businessInputs.ventureName}\n- Advantage: ${businessInputs.advantage.substring(0, 70)}`;
    } else {
      summaryText += `- Topic: ${essayInputs.topic.substring(0, 70)}\n- Academic Level: ${essayInputs.academicLevel}`;
    }

    summaryText += `\n\n_Draft Reference outline successfully processed in Pretoria Studio. Please proceed to premium template conversion and human-formatting review._`;

    const encoded = encodeURIComponent(summaryText);
    return `https://wa.me/27740740875?text=${encoded}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draftResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert markdown-like headers and lists to nicely styled react outputs line by-line
  const parseMarkupToReact = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={i} className="text-sm font-extrabold uppercase text-white border-b border-neutral-800 pb-1.5 mt-6 mb-3 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-emerald-500 rounded-sm"></span>
            {trimmed.substring(2)}
          </h2>
        );
      }
      if (trimmed.startsWith("## ")) {
        return <h3 key={i} className="text-xs font-bold text-neutral-200 mt-5 mb-2">{trimmed.substring(3)}</h3>;
      }
      if (trimmed.startsWith("### ")) {
        return <h4 key={i} className="text-[11px] font-bold text-emerald-400 mt-4 mb-1.5 tracking-tight">{trimmed.substring(4)}</h4>;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={i} className="text-xs text-neutral-300 ml-4 mb-1.5 list-disc leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed) {
        return <p key={i} className="text-xs text-neutral-400 mb-3.5 leading-relaxed">{trimmed}</p>;
      }
      return <div key={i} className="h-1" />;
    });
  };

  // Section Heading rendered cleanly below
  return (
    <section id="draft-room" className="py-20 lg:py-28 bg-[#0a0a0a] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#10b981] uppercase flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5 animate-pulse text-[#10b981]" />
              GP Studio Interactive Workspace
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            AI Draft Room & Service suite
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Select your high-stakes target objective, input your specific structural details, and let our custom studio AI formulate a tailored baseline draft instantly.
          </p>
        </div>

        {/* Multi-Tabs Grid Selectors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {SERVICES_DATA.map((service) => {
            const isActive = selectedService === service.id;
            return (
              <button
                key={service.id}
                id={`btn-service-${service.id}`}
                onClick={() => {
                  setSelectedService(service.id);
                  setDraftResult("");
                  setDemoMessage("");
                }}
                className={`p-5 text-left border rounded-none transition-all duration-300 flex flex-col justify-between group cursor-pointer relative ${
                  isActive 
                    ? `bg-neutral-900 border-neutral-700/80 shadow-lg` 
                    : `bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/20`
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-[#10b981]"></span>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">
                      GP {service.id.toUpperCase()} MODULE
                    </span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 border ${service.badgeColor}`}>
                      {service.title.split("+")[0].split(" ")[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white tracking-tighter uppercase mb-2 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-normal leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-baseline justify-between pt-3 border-t border-neutral-900/60 w-full mt-auto">
                  <span className="text-xs font-bold text-neutral-500 uppercase">Retail Rate</span>
                  <span className="text-base font-black text-white tracking-tighter">R{service.priceZAR}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary Interactive Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side - Inputs (Col: 5) */}
          <div className="lg:col-span-5 bg-[#0b0b0b] border border-[#151515] p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-900/80">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <h3 className="text-xs font-extrabold tracking-widest text-neutral-400 uppercase">
                  DRAFT CONFIGURATION & INPUTS
                </h3>
              </div>

              <form onSubmit={executeDraftGeneration} className="space-y-5">
                
                {/* CV Form Fields */}
                {selectedService === "cv" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="cv-name">
                        Candidate Full Name
                      </label>
                      <input
                        id="cv-name"
                        type="text"
                        required
                        placeholder="e.g. Lerato Khumalo"
                        value={cvInputs.name}
                        onChange={(e) => handleCvChange("name", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="cv-role">
                        Target Position / Industry
                      </label>
                      <input
                        id="cv-role"
                        type="text"
                        required
                        placeholder="e.g. Lead Administrator"
                        value={cvInputs.role}
                        onChange={(e) => handleCvChange("role", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="cv-skills">
                        High-Impact Competencies (Comma Separated)
                      </label>
                      <input
                        id="cv-skills"
                        type="text"
                        required
                        placeholder="e.g. Logistics, Budget oversight, CRM, Team lead"
                        value={cvInputs.skills}
                        onChange={(e) => handleCvChange("skills", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="cv-experience">
                        Key Work Achievement (Describe Brief metrics)
                      </label>
                      <textarea
                        id="cv-experience"
                        required
                        rows={3}
                        placeholder="e.g. Coordinated 12 regional staff; scaled operations leading to R1.2M commercial growth."
                        value={cvInputs.experience}
                        onChange={(e) => handleCvChange("experience", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="cv-academics">
                        Qualifications & Academic History
                      </label>
                      <input
                        id="cv-academics"
                        type="text"
                        placeholder="e.g. Diploma in Business Systems - Varsity College"
                        value={cvInputs.academics}
                        onChange={(e) => handleCvChange("academics", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                  </>
                )}

                {/* Social Media Form Fields */}
                {selectedService === "social" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="social-name">
                        Business / Brand Name
                      </label>
                      <input
                        id="social-name"
                        type="text"
                        required
                        placeholder="e.g. Centurion Premium Auto Specialists"
                        value={socialInputs.businessName}
                        onChange={(e) => handleSocialChange("businessName", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="social-industry">
                        Industry / Niche Theme
                      </label>
                      <input
                        id="social-industry"
                        type="text"
                        required
                        placeholder="e.g. Vehicle Detailing & Custom Wrapping"
                        value={socialInputs.industry}
                        onChange={(e) => handleSocialChange("industry", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="social-offerings">
                        Core Value / Products (max 3 items)
                      </label>
                      <input
                        id="social-offerings"
                        type="text"
                        required
                        placeholder="e.g. Ceramic coding, vinyl wrapping, restoration polish"
                        value={socialInputs.offerings}
                        onChange={(e) => handleSocialChange("offerings", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="social-tone">
                        Brand Voice / Stylistic Vibe
                      </label>
                      <input
                        id="social-tone"
                        type="text"
                        required
                        placeholder="e.g. High intensity, highly expert, localized slangs"
                        value={socialInputs.tone}
                        onChange={(e) => handleSocialChange("tone", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="social-campaign">
                        Primary Campaign Topic
                      </label>
                      <textarea
                        id="social-campaign"
                        required
                        rows={3}
                        placeholder="e.g. Promoting 15% off ceramic coatings during winter month bookings."
                        value={socialInputs.campaignTheme}
                        onChange={(e) => handleSocialChange("campaignTheme", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans resize-none"
                      />
                    </div>
                  </>
                )}

                {/* Business Plan Form Fields */}
                {selectedService === "business" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-name">
                        Venture or Idea Name
                      </label>
                      <input
                        id="bus-name"
                        type="text"
                        required
                        placeholder="e.g. Pretoria Agri-Tech Drone Ops"
                        value={businessInputs.ventureName}
                        onChange={(e) => handleBusinessChange("ventureName", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-desc">
                        Specific Concept / Core Service Offered
                      </label>
                      <textarea
                        id="bus-desc"
                        required
                        rows={2}
                        placeholder="e.g. Automated health scouting and crop-spraying drone operations targeting commercial vegetable farmers in Bronkhorstspruit."
                        value={businessInputs.description}
                        onChange={(e) => handleBusinessChange("description", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-market">
                        Target Market Segments
                      </label>
                      <input
                        id="bus-market"
                        type="text"
                        required
                        placeholder="e.g. Medium-scale commercial farmers, crop insurance brokers"
                        value={businessInputs.market}
                        onChange={(e) => handleBusinessChange("market", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-revenue">
                        Revenue Model & Pricing Points
                      </label>
                      <input
                        id="bus-revenue"
                        type="text"
                        required
                        placeholder="e.g. R1,200 per hectare sprayed; recurring monthly scouting subscription."
                        value={businessInputs.revenue}
                        onChange={(e) => handleBusinessChange("revenue", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-advantage">
                        Unfair Moat / Market Advantage
                      </label>
                      <input
                        id="bus-advantage"
                        type="text"
                        required
                        placeholder="e.g. Sole localized operators with certified SA CAA commercial pilot licensing in East Pretoria."
                        value={businessInputs.advantage}
                        onChange={(e) => handleBusinessChange("advantage", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="bus-milestones">
                        Immediate 90-Day Focus Milestone
                      </label>
                      <input
                        id="bus-milestones"
                        type="text"
                        required
                        placeholder="e.g. Secure first 3 farms, test drone spray velocity, map topography schemas."
                        value={businessInputs.milestones}
                        onChange={(e) => handleBusinessChange("milestones", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                  </>
                )}

                {/* Essay Form Fields */}
                {selectedService === "essay" && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="essay-topic">
                        Essay Prompt / Topic Question
                      </label>
                      <textarea
                        id="essay-topic"
                        required
                        rows={2}
                        placeholder="e.g. Discuss current carbon taxing structures and business offsets in South African manufacturing."
                        value={essayInputs.topic}
                        onChange={(e) => handleEssayChange("topic", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="essay-level">
                        Target Academic Level / Objective
                      </label>
                      <input
                        id="essay-level"
                        type="text"
                        required
                        placeholder="e.g. undergraduate BCom research thesis"
                        value={essayInputs.academicLevel}
                        onChange={(e) => handleEssayChange("academicLevel", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="essay-arguments">
                        Core Arguments/Topics to Cover
                      </label>
                      <input
                        id="essay-arguments"
                        type="text"
                        required
                        placeholder="e.g. Compliance burdens, clean fuel alternative limits, offset credits viability"
                        value={essayInputs.arguments}
                        onChange={(e) => handleEssayChange("arguments", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="essay-sources">
                        Sources / Citation Targets (e.g. Harvard, APA, Stats SA)
                      </label>
                      <input
                        id="essay-sources"
                        type="text"
                        required
                        placeholder="e.g. Stats SA utility indexes, IMF climate papers, Harvard formatting rules"
                        value={essayInputs.sources}
                        onChange={(e) => handleEssayChange("sources", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2" htmlFor="essay-thesis">
                        Ultimate Thesis Goals / Intended Outcome
                      </label>
                      <input
                        id="essay-thesis"
                        type="text"
                        required
                        placeholder="e.g. Prove carbon tax is highly regressive to Gauteng local factories without offset allowances."
                        value={essayInputs.thesisGoals}
                        onChange={(e) => handleEssayChange("thesisGoals", e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-900 p-3 h-11 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                      />
                    </div>
                  </>
                )}

                {validationError && (
                  <div className="bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-xs font-mono flex items-start gap-2 animate-fade-in">
                    <span className="font-extrabold text-red-500 shrink-0">🚩 PROTOCOL:</span>
                    <span>{validationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  id="btn-trigger-ai-draft"
                  disabled={loading}
                  className="w-full h-12 bg-white text-black hover:bg-neutral-200 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 flex items-center justify-center gap-2 font-extrabold text-xs tracking-widest uppercase transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
                      SYNTHESIZING PARAMS...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                      AI DRAFTING ENGINE [INSTANT]
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Support pipeline banner */}
            <div className="mt-8 pt-6 border-t border-neutral-900/60 text-center sm:text-left">
              <span className="text-[10px] font-semibold text-neutral-500 tracking-wider">
                RUSH ORDERS DELIVERED SAME DAY VIA WHATSAPP SECURE DIRECT:
              </span>
              <a 
                href={compileWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-extrabold text-emerald-400 hover:underline hover:text-emerald-300"
              >
                074 074 0875 (Immediate processing pipeline)
              </a>
            </div>
          </div>

          {/* Terminal & Output Side - (Col: 7) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="bg-[#0c0c0c] border border-neutral-900 flex flex-col h-full rounded-none overflow-hidden min-h-[550px]">
              
              {/* Terminal Mock Header */}
              <div className="bg-[#060606] h-12 border-b border-neutral-950 px-4 sm:px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
                  </div>
                  <span className="hidden sm:inline text-[10px] text-neutral-500 font-mono ml-4 tracking-wider uppercase">
                    GP_STUDIO_FORMATTER_v3.5.sh
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] bg-neutral-900 border border-neutral-800 px-3 py-1 font-mono text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    STATUS: ACTIVE
                  </span>
                </div>
              </div>

              {/* Terminal Screen Client */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto font-mono text-xs text-neutral-300 bg-[#050505]">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                    <div>
                      <p className="text-white font-bold tracking-widest text-xs uppercase animate-pulse">
                        SYNTHESIZING PRETORIA DRAFT SHEET
                      </p>
                      <p className="text-neutral-500 text-[10px] mt-1.5 h-4">
                        {loadingLog}
                      </p>
                    </div>
                  </div>
                ) : draftResult ? (
                  <div className="space-y-4 animate-fade-in">
                    
                    {demoMessage && (
                      <div className="bg-emerald-950/15 border border-emerald-500/20 p-4 mb-6 flex items-start gap-3 rounded-none">
                        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-400 text-[10px] font-extrabold tracking-wider uppercase uppercase-none">
                            AI STUDIO ACTION COMPLETED
                          </p>
                          <p className="text-neutral-400 text-[11px] leading-relaxed font-sans mt-0.5">
                            {demoMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pb-3 border-b border-neutral-900/60 sticky top-0 bg-[#050505]">
                      <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                        COMPOSED STRUCTURE OUTPUT:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyToClipboard}
                          className="p-1 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              COPY COMPLETED
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-neutral-400" />
                              COPY DRAFT
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="markdown-body select-text pt-2 font-sans select-none min-h-[300px]">
                      {parseMarkupToReact(draftResult)}
                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4 space-y-4">
                    <Terminal className="w-10 h-10 text-neutral-700" />
                    <div className="max-w-md">
                      <p className="text-white font-bold tracking-widest uppercase text-xs">
                        TERMINAL ACTIVE & READY
                      </p>
                      <p className="text-neutral-500 text-xs font-sans leading-relaxed mt-2 select-none">
                        Configure the document attributes on the left panel, and click <span className="text-emerald-500 font-semibold uppercase font-mono">"AI Drafting Engine [Instant]"</span> to compile your target structural layout.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Bottom CTA Bar */}
              {draftResult && !loading && (
                <div className="bg-[#090909] border-t border-neutral-900 p-4 sm:p-6 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-neutral-500 tracking-wider block uppercase">
                      READY TO CONVERT TO ELITE HUMAN DESIGN?
                    </span>
                    <span className="text-xs font-extrabold text-[#d1d5db]">
                      Pretoria Document Specialist processing price: <span className="text-emerald-400">R{currentActiveDetails.priceZAR} ZAR</span>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <a
                      href={currentActiveDetails.gumroadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 border border-neutral-800 bg-[#121212] leading-tight text-neutral-300 hover:bg-[#1a1a1a] text-center font-bold text-xs tracking-widest uppercase transition-colors"
                    >
                      PAY SECURE GUMROAD
                    </a>
                    <a
                      href={compileWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-emerald-500 leading-tight text-black hover:bg-emerald-400 text-center font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors"
                    >
                      SUBMIT TO WHATSAPP
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
