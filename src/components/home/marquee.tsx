const MARQUEE_ITEMS = [
  'EQUITY RESEARCH',
  'FINANCIAL MODELING',
  'MACRO ANALYSIS',
  'CASE COMPETITIONS',
  'DERIVATIVES & MARKETS',
  'CORPORATE VALUATION',
  'QUANTITATIVE STRATEGIES',
  'PEER REVIEWED NOTES',
]

export function HomeMarquee() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div
      className="group relative overflow-hidden border-b border-[#E4DACB] bg-[#F4ECE1] py-3.5"
      aria-hidden="true"
    >
      <div className="flex w-max items-center gap-8 animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused]">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#7A5424]">
              {item}
            </span>
            <span className="text-[9px] text-[#BFAFA0]">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_42s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
