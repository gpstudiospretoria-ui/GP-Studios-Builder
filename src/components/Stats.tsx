export default function Stats() {
  return (
    <section className="border-y border-neutral-900 bg-neutral-950/50 py-12 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center divide-y lg:divide-y-0 lg:divide-x divide-neutral-900">
          <div className="flex flex-col justify-center py-4 lg:py-0">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">SAME DAY</span>
            <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase mt-2">Rapid Delivery</span>
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-0">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">R80+</span>
            <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase mt-2">Hyper-Affordable</span>
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-0">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">100%</span>
            <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase mt-2">Custom Built</span>
          </div>
          <div className="flex flex-col justify-center py-4 lg:py-0 text-[#10b981]">
            <span className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-[#10b981]">074 074 0875</span>
            <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase mt-2">WhatsApp Direct Hub</span>
          </div>
        </div>
      </div>
    </section>
  );
}
