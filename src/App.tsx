import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ServicesLayout from "./components/ServicesLayout";
import DraftRoom from "./components/DraftRoom";
import PricingCalculator from "./components/PricingCalculator";
import Logistics from "./components/Logistics";
import Footer from "./components/Footer";
import { ServiceType } from "./types";
import { Sparkles, Lock, Shield } from "lucide-react";

export default function App() {
  const [activeService, setActiveService] = useState<ServiceType>("cv");
  const [isMeshCovered, setIsMeshCovered] = useState(false);
  const [meshServiceLink, setMeshServiceLink] = useState("");
  const [emailStatus, setEmailStatus] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-neutral-800 selection:text-white flex flex-col relative">
      {/* Absolute top branding header */}
      <Header />

      <main className={`flex-1 ${isMeshCovered ? "blur-sm pointer-events-none select-none contrast-[0.85]" : ""}`}>
        {/* Elite marketing hero section with calls to action */}
        <Hero />

        {/* Pretoria high-stakes key achievements summary blocks */}
        <Stats />

        {/* Traditional card catalogs mimicking user's provided document structure */}
        <ServicesLayout onSelectService={(id) => setActiveService(id)} />

        {/* Immersive AI generation sandbox workspace */}
        <DraftRoom 
          selectedService={activeService} 
          setSelectedService={(id) => setActiveService(id)} 
          onDraftSuccess={(link, status) => {
            setMeshServiceLink(link);
            setEmailStatus(status);
            setIsMeshCovered(true);
          }}
        />

        {/* Custom slider metric cost calculator package */}
        <PricingCalculator />

        {/* Direct WhatsApp coordination & Gumroad processing guides */}
        <Logistics />
      </main>

      {/* Structured legal footers with fast navigators */}
      <Footer />

      {/* Screen-Wide Secure Mesh Cover Locked State Overlay */}
      {isMeshCovered && (
        <div 
          id="mesh-cover-overlay" 
          className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-all"
        >
          <div className="max-w-xl w-full bg-[#0a0a0a] border border-neutral-800/80 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl animate-fade-in">
            {/* Visual lock status badge */}
            <div className="mb-6 inline-block bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-[10px] font-black tracking-[0.2em] text-[#10b981] uppercase flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
                HANDSHAKE REGISTERED & COMPLETED
              </span>
            </div>

            <div className="w-16 h-16 bg-neutral-900/60 border border-neutral-800 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-[#10b981]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase mb-4">
              AI CV Draft Compiled
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto mb-6 font-light">
              Your generated draft text coordinates are recorded. The Gumroad payment checkout pipeline has been launched in a new background tab.
            </p>

            {/* Email Dispatch Monitor Panel  */}
            {emailStatus && (
              <div className={`mb-6 p-4 border text-[11px] font-mono text-left space-y-2 ${emailStatus.success ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" : "border-red-500/10 bg-red-500/5 text-red-400"}`}>
                <div className="flex items-center justify-between font-bold uppercase tracking-wider border-b border-neutral-900 pb-2">
                  <span>SMTP Handshake Delivery:</span>
                  {emailStatus.success ? (
                    <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-black">● DISPATCHED</span>
                  ) : (
                    <span className="text-rose-500 bg-rose-500/10 px-2 py-0.5 text-[9px] font-black">● STOPPED</span>
                  )}
                </div>
                {emailStatus.success ? (
                  <p className="text-neutral-300 leading-relaxed font-sans">
                    The draft document has been transmitted successfully to <strong className="text-white font-semibold underline decoration-emerald-500/50">gpstudiospretoria@gmail.com</strong>.
                  </p>
                ) : (
                  <div className="space-y-1.5 font-sans">
                    {emailStatus.badCredentials ? (
                      <div className="space-y-2.5">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-rose-500 font-mono">❌ GOOGLE AUTH DISPATCH FAILURE (SMTP 535):</p>
                        <p className="text-neutral-300 text-xs leading-relaxed">
                          Your login was rejected because Google requires an <strong>App Password</strong> rather than your standard account login password.
                        </p>
                        
                        <div className="border border-neutral-800 bg-[#060606] p-3 space-y-2.5 text-neutral-400 text-xs">
                          <p className="font-bold text-white uppercase text-[9px] tracking-widest font-mono border-b border-neutral-900 pb-1.5 text-emerald-400">
                            🔑 HOW TO GENERATE A CODESPACE APP PASS:
                          </p>
                          <p className="leading-relaxed">
                            1. Go to <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300 font-bold">Google My Account Dashboard</a>.
                          </p>
                          <p className="leading-relaxed">
                            2. Set up and activate <strong>2-Step Verification</strong> under the <strong>Security</strong> tab if not already done.
                          </p>
                          <p className="leading-relaxed">
                            3. Search or navigate to the <strong>App passwords</strong> section at the very bottom.
                          </p>
                          <p className="leading-relaxed">
                            4. Enter an app name (e.g. <code className="bg-neutral-900 px-1 text-white border border-neutral-800">Pretoria Draft Engine</code>), click <strong>Create</strong>, and copy the <strong>16-digit passkey</strong> generated.
                          </p>
                          <p className="leading-relaxed">
                            5. Open your AI Studio workspace editor on the left, navigate to <strong>Settings &gt; Secrets</strong>, and update the value for <code className="bg-neutral-900 px-1 text-white border border-neutral-800 font-bold">GMAIL_APP_PASS</code>.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold uppercase text-[9.5px] tracking-wider text-rose-500 font-mono">MOCK REPORTING PIPELINE ACTIVE:</p>
                        <p className="text-neutral-300 text-[10.5px] leading-relaxed">
                          Reason: {emailStatus.error}
                        </p>
                        {emailStatus.appPassMissing && (
                          <p className="text-[10px] text-[#10b981] leading-normal font-sans border border-emerald-500/20 bg-emerald-500/5 p-2.5 mt-2.5">
                            💡 <strong>How to Enable Actual Mail Sending</strong>: Open your AI Studio editor and navigate to the <strong>Settings &gt; Secrets</strong> menu. Add a variable <strong className="text-white hover:underline bg-neutral-900 border border-neutral-800 px-1 py-0.5">GMAIL_APP_PASS</strong> set to your Google Account "App Password" to allow the server to deliver live emails.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Protocol breakdown specs */}
            <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-none text-left mb-8 space-y-3 font-mono text-[11px] text-neutral-400 leading-normal">
              <p className="text-[#10b981] font-bold uppercase tracking-wider text-center border-b border-neutral-900 pb-2 mb-2">
                FULFILLMENT INSTRUCTIONS:
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold font-mono">STEP 1:</span>
                <span>Select active tab containing Gumroad checkout and complete your payment.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold font-mono">STEP 2:</span>
                <span>Proceed to WhatsApp to submit your Gumroad receipt for final professional styling.</span>
              </p>
            </div>

            {/* Locked Direct Navigation Options */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={meshServiceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 bg-white text-black hover:bg-neutral-200 cursor-pointer flex items-center justify-center gap-2 font-black text-xs tracking-widest uppercase transition-colors"
              >
                Gumroad Checkout Tab
              </a>
              <a
                href="https://wa.me/27740740875"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 border border-neutral-800 bg-[#0c0c0c] hover:bg-neutral-900 text-emerald-400 hover:text-emerald-300 cursor-pointer flex items-center justify-center gap-2 font-black text-xs tracking-widest uppercase transition-colors"
              >
                Submit receipt to WA
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900">
              <span className="text-[9px] text-neutral-600 block uppercase font-mono tracking-widest leading-relaxed">
                SESSION IS STATIC. PRESSING THE MESH COVER WILL NOT ESCAPE PROTOCOLS.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

