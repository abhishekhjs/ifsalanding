// Row 1 — competition / research disciplines (scrolls →)
const ROW_1_ITEMS = [
  'EQUITY RESEARCH',
  'FINANCIAL MODELING',
  'MACRO ANALYSIS',
  'CASE COMPETITIONS',
  'DERIVATIVES & MARKETS',
  'CORPORATE VALUATION',
  'QUANTITATIVE STRATEGIES',
  'PEER REVIEWED NOTES',
]

// Row 2 — mandate / partner names (scrolls ←)
const ROW_2_ITEMS = [
  'VARICASH',
  'CLIMATE B VENTURE',
  'MYMFD',
  'CARBON6',
  'SPOTLIGHT PARTNERS',
  'VENTUREWOLF',
  'INFISUM INC.',
  'COSMO HEALTH',
  'FUNDCAPITA',
  'WALL STREET OASIS',
]

export function HomeMarquee() {
  const r1 = [...ROW_1_ITEMS, ...ROW_1_ITEMS]
  const r2 = [...ROW_2_ITEMS, ...ROW_2_ITEMS]

  return (
    <div
      className="group relative overflow-hidden border-b border-[#E4DACB] bg-[#F4ECE1] py-0"
      aria-hidden="true"
    >
      {/* Row 1 — scrolls right → */}
      <div className="flex w-max items-center gap-8 py-3 animate-[marquee-fwd_42s_linear_infinite] group-hover:[animation-play-state:paused]">
        {r1.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-mono text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#7A5424]">
              {item}
            </span>
            <span className="text-[9px] text-[#BFAFA0]">✦</span>
          </div>
        ))}
      </div>

      {/* Row 2 — scrolls left ← (slightly darker bg strip) */}
      <div className="bg-[#EDE3D4] border-t border-[#E4DACB]">
        <div className="flex w-max items-center gap-8 py-2.5 animate-[marquee-rev_55s_linear_infinite] group-hover:[animation-play-state:paused]">
          {r2.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="font-mono text-[10.5px] font-medium tracking-[0.18em] uppercase text-[#A08060]">
                {item}
              </span>
              <span className="text-[8px] text-[#D9C8B6]">◆</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*='animate-[marquee'] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
