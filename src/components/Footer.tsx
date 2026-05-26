export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 py-12 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-600 uppercase text-center sm:text-left">
          &copy; 2026 GP STUDIO PRETORIA. ALL RIGHTS RESERVED.
        </span>
        <div className="text-[9px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
          PROTOCOL: GUMROAD CHECKOUT + WHATSAPP FULFILLMENT
        </div>
        <div className="flex space-x-8 text-[9px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#draft-room" className="hover:text-white transition-colors">Draft Room</a>
          <a href="#pricing-calculator" className="hover:text-white transition-colors">Customizer</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Logistics</a>
        </div>
      </div>
    </footer>
  );
}
