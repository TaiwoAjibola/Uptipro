import { useEffect, useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const SLIDES = [
  { label: 'Intro',      start: 0.00, end: 0.16 },
  { label: 'BuildOS',    start: 0.16, end: 0.38 },
  { label: 'FreeInvoice',start: 0.38, end: 0.56 },
  { label: 'BuyOps',     start: 0.56, end: 0.74 },
  { label: 'FeedbackOS', start: 0.74, end: 0.88 },
  { label: 'Final',      start: 0.88, end: 1.00 },
];

function slideProgress(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start), 0, 1);
}

/* ── Product 1: BuildOS ── */
function BuildOSPanel({ local }: { local: number }) {
  const s = (delay: number) => clamp((local - delay) / (1 - delay), 0, 1);
  return (
    <div className="rounded-3xl border border-black/[0.05] overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]" style={{ width: 900, height: 620, opacity: s(0), transform: `translateY(${(1 - s(0)) * 30}px)` }}>
      {/* Header */}
      <div className="h-11 border-b border-black/[0.04] flex items-center px-4 gap-2 bg-[#f8f9fc]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[12px] font-medium text-black/60">BuildOS — Enterprise Workspace</span>
      </div>
      <div className="flex" style={{ height: 'calc(100% - 44px)' }}>
        {/* Sidebar */}
        <div className="w-44 border-r border-black/[0.04] p-2 flex flex-col gap-0.5" style={{ background: '#f8f9fc', opacity: s(0.05) }}>
          {['Dashboard', 'Projects', 'Finance', 'HR', 'Inventory', 'CRM', 'Calendar'].map((item, i) => (
            <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px]" style={{ opacity: clamp((s(0.05) * 2 - i * 0.12), 0, 1), background: i === 0 ? '#2f6df610' : 'transparent', color: i === 0 ? '#2f6df6' : '#000' }}>
              <span className="w-3.5 h-3.5 rounded bg-black/10" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-3 flex flex-col gap-2" style={{ opacity: s(0.1) }}>
          {/* Widgets */}
          <div className="flex gap-2">
            {[
              ['Active Projects', '24', '#2f6df6'],
              ['Open Tasks', '143', '#f97316'],
              ['Team Members', '18', '#22c55e'],
            ].map(([l, v, c], i) => (
              <div key={l as string} className="flex-1 rounded-xl border border-black/[0.04] p-2.5" style={{ opacity: clamp((s(0.1) * 3 - i * 0.3), 0, 1), transform: `translateY(${(1 - clamp((s(0.1) * 3 - i * 0.3), 0, 1)) * 10}px)` }}>
                <div className="text-[9px] text-black/40">{l}</div>
                <div className="text-[22px] font-semibold text-black">{v}</div>
                <div className="h-1 mt-1 rounded-full bg-black/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${60 + i * 15}%`, background: c as string }} />
                </div>
              </div>
            ))}
          </div>
          {/* Kanban */}
          <div className="flex gap-2 flex-1">
            {[['To Do', 3], ['In Progress', 2], ['Review', 2]].map(([col, count]) => (
              <div key={col as string} className="flex-1 rounded-xl border border-black/[0.04] p-2" style={{ opacity: s(0.2) }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-medium text-black/50 uppercase tracking-wide">{col}</span>
                  <span className="text-[9px] text-black/30">{count}</span>
                </div>
                {Array.from({ length: count as number }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-black/[0.04] p-1.5 mb-1 bg-white">
                    <div className="h-1.5 w-3/4 rounded bg-black/10 mb-1" />
                    <div className="h-1 w-1/2 rounded bg-black/5" />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#2f6df6]/30" />
                      <span className="text-[7px] text-black/30">Sprint 14</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Bottom: chart + calendar */}
          <div className="flex gap-2 h-20">
            <div className="flex-1 rounded-xl border border-black/[0.04] p-2 flex items-end gap-1" style={{ opacity: s(0.3) }}>
              {[30, 55, 40, 70, 50, 85, 60, 95, 45, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h * (0.5 + s(0.3) * 0.5)}%`, background: `linear-gradient(to top, #2f6df6, #2f6df680)` }} />
              ))}
            </div>
            <div className="w-32 rounded-xl border border-black/[0.04] p-1.5" style={{ opacity: s(0.35) }}>
              <div className="text-[7px] text-black/40 uppercase tracking-wide mb-1">Jun 2026</div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} className="text-[6px] text-center text-black/30" style={{ background: i === 12 ? '#2f6df620' : 'transparent', borderRadius: 2 }}>{i + 1}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product 2: FreeInvoice ── */
function FreeInvoicePanel({ local }: { local: number }) {
  const s = (delay: number) => clamp((local - delay) / (1 - delay), 0, 1);
  const statusIdx = local < 0.4 ? 0 : local < 0.55 ? 1 : local < 0.7 ? 2 : 3;
  const statuses = ['Draft', 'Sent', 'Viewed', 'Paid'];
  const statusColors = ['#94a3b8', '#f97316', '#2f6df6', '#22c55e'];
  return (
    <div className="rounded-3xl border border-black/[0.05] overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]" style={{ width: 720, height: 480, opacity: s(0), transform: `translateY(${(1 - s(0)) * 30}px) scale(${0.9 + s(0) * 0.1})` }}>
      <div className="h-10 border-b border-black/[0.04] flex items-center px-4 gap-2 bg-[#f8f9fc]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-medium text-black/60">FreeInvoice</span>
      </div>
      <div className="p-4 flex gap-4" style={{ height: 'calc(100% - 40px)' }}>
        <div className="flex-1 flex flex-col justify-center" style={{ opacity: s(0.05) }}>
          <div className="text-[9px] uppercase tracking-[0.15em] text-black/40 mb-1">Client</div>
          <div className="text-[22px] font-semibold text-black" style={{ opacity: s(0.1) }}>Horizon Properties</div>
          <div className="text-[40px] font-semibold text-black mt-2" style={{ opacity: s(0.15) }}>$12,400</div>
          <div className="flex items-center gap-2 mt-2" style={{ opacity: s(0.2) }}>
            <span className="text-[11px] text-black/40">Due: Jun 30, 2026</span>
          </div>
          <div className="mt-3 flex items-center gap-2" style={{ opacity: s(0.25) }}>
            <span className="px-3 py-1 rounded-full text-[10px] font-medium" style={{ background: `${statusColors[statusIdx]}20`, color: statusColors[statusIdx] }}>
              {statuses[statusIdx]}
            </span>
            {statusIdx === 3 && (
              <span className="flex items-center gap-1 text-[10px] text-[#22c55e]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-bounce" />
                Confirmed
              </span>
            )}
          </div>
        </div>
        <div className="w-40 flex flex-col gap-2" style={{ opacity: s(0.1) }}>
          {[['Item', 'Qty', 'Amount'], ['Consulting', '40h', '$8,000'], ['Design', '20h', '$3,200'], ['Hosting', '1', '$1,200']].map((row, i) => (
            <div key={i} className="flex items-center justify-between text-[10px]" style={{ opacity: clamp((s(0.1) * 4 - i * 0.3), 0, 1) }}>
              {row.map((c, j) => (
                <span key={j} className={i === 0 ? 'text-black/30' : 'text-black/70'} style={{ minWidth: 40 }}>{c}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Product 3: BuyOps ── */
function BuyOpsPanel({ local }: { local: number }) {
  const s = (delay: number) => clamp((local - delay) / (1 - delay), 0, 1);
  return (
    <div className="rounded-3xl border border-black/[0.05] overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]" style={{ width: 780, height: 500, opacity: s(0), transform: `translateY(${(1 - s(0)) * 30}px) scale(${0.9 + s(0) * 0.1})` }}>
      <div className="h-10 border-b border-black/[0.04] flex items-center px-4 gap-2 bg-[#f8f9fc]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-medium text-black/60">BuyOps — Portfolio Manager</span>
      </div>
      <div className="p-4 flex gap-4" style={{ height: 'calc(100% - 40px)' }}>
        <div className="flex-1 flex flex-col gap-2">
          {/* Property cards */}
          <div className="flex gap-2" style={{ opacity: s(0.05) }}>
            {[
              { addr: '8 Humber Rd', roi: '+14.2%', price: '$2.4M' },
              { addr: '12 Fleet St', roi: '+11.8%', price: '$4.1M' },
              { addr: '4 Alice Ln', roi: '+9.6%', price: '$1.8M' },
            ].map((p, i) => (
              <div key={p.addr} className="flex-1 rounded-xl border border-black/[0.04] p-2.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ opacity: clamp((s(0.05) * 3 - i * 0.3), 0, 1) }}>
                <div className="h-12 rounded-lg bg-[#e8edf5] mb-1.5 relative overflow-hidden">
                  <div className="absolute left-0 top-1/2 w-full h-px bg-white/50" />
                  <div className="absolute left-1/3 top-0 h-full w-px bg-white/50" />
                  <span className="absolute bottom-0.5 left-0.5 text-[6px] text-black/30 bg-white/60 rounded px-0.5">Map</span>
                </div>
                <div className="text-[10px] font-medium text-black">{p.addr}</div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-[#22c55e]">{p.roi}</span>
                  <span className="text-black/50">{p.price}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Investment graph */}
          <div className="flex-1 rounded-xl border border-black/[0.04] p-2.5" style={{ opacity: s(0.15) }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-black/40">Portfolio Value</span>
              <span className="text-[12px] font-semibold text-black">$8.3M</span>
            </div>
            <div className="flex items-end gap-1 h-16 transition-all">
              {[35, 50, 42, 68, 55, 80, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm transition-all duration-700" style={{ height: `${h * (0.3 + s(0.15) * 0.7)}%`, background: `linear-gradient(to top, #22c55e, #22c55e60)` }} />
              ))}
            </div>
          </div>
        </div>
        {/* Map + ROI side */}
        <div className="w-36 flex flex-col gap-2">
          <div className="flex-1 rounded-xl bg-[#e8edf5] relative overflow-hidden" style={{ opacity: s(0.1) }}>
            {[
              { t: '25%', l: '30%' }, { t: '55%', l: '65%' }, { t: '70%', l: '20%' },
            ].map((pin, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2f6df6] ring-2 ring-white" style={{ top: pin.t, left: pin.l }} />
            ))}
            <div className="absolute bottom-1 left-1 text-[6px] text-black/40 bg-white/70 rounded px-0.5">6 active</div>
          </div>
          <div className="text-[9px] text-black/50 text-center" style={{ opacity: s(0.2) }}>Avg CAP: 7.2%</div>
          <div className="text-[9px] text-[#22c55e] text-center" style={{ opacity: s(0.25) }}>← See all properties</div>
        </div>
      </div>
    </div>
  );
}

/* ── Product 4: FeedbackOS ── */
function FeedbackOSPanel({ local }: { local: number }) {
  const s = (delay: number) => clamp((local - delay) / (1 - delay), 0, 1);
  return (
    <div className="rounded-3xl border border-black/[0.05] overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]" style={{ width: 620, height: 400, opacity: s(0), transform: `translateY(${(1 - s(0)) * 30}px) scale(${0.9 + s(0) * 0.1})` }}>
      <div className="h-10 border-b border-black/[0.04] flex items-center px-4 gap-2 bg-[#f8f9fc]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-medium text-black/60">FeedbackOS — Customer Insights</span>
      </div>
      <div className="p-3 flex gap-3" style={{ height: 'calc(100% - 40px)' }}>
        {/* Messages */}
        <div className="flex-1 flex flex-col gap-2" style={{ opacity: s(0.05) }}>
          {[
            { text: '"Love the new dashboard layout"', rating: 5, delay: 0 },
            { text: '"API integration works flawlessly"', rating: 4, delay: 0.08 },
            { text: '"Would like better mobile support"', rating: 3, delay: 0.16 },
          ].map((r, i) => (
            <div key={i} className="rounded-xl border border-black/[0.04] p-2" style={{ opacity: clamp((s(0.05) * 3 - i * 0.3), 0, 1) }}>
              <div className="flex items-center gap-1 mb-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[9px]" style={{ color: j < r.rating ? '#f59e0b' : '#e2e8f0' }}>★</span>
                ))}
              </div>
              <span className="text-[11px] text-black/70">{r.text}</span>
            </div>
          ))}
          <div className="rounded-xl border border-black/[0.04] p-2 bg-[#8b5cf6]/5" style={{ opacity: s(0.2) }}>
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-medium text-[#8b5cf6]">AI Summary</span>
            </div>
            <span className="text-[10px] text-black/60">Overall sentiment: Positive (92%) — 247 responses this month</span>
          </div>
        </div>
        {/* Sentiment chart */}
        <div className="w-28 flex flex-col justify-center gap-2" style={{ opacity: s(0.1) }}>
          <div className="text-[9px] text-black/40 text-center">Sentiment</div>
          <div className="relative w-24 h-24 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="12" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray={`${92 * 2.64} 264`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dasharray 1s ease' }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-black">92%</span>
          </div>
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-[8px] text-black/40">Positive</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Connection lines SVG ── */
function EcosystemLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {[
        { x1: '23%', y1: '34%', x2: '37%', y2: '26%' },
        { x1: '37%', y1: '26%', x2: '50%', y2: '32%' },
        { x1: '50%', y1: '32%', x2: '62%', y2: '28%' },
      ].map((line, i) => (
        <g key={i}>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#2f6df6" strokeWidth="0.8" strokeDasharray="4,6" opacity={0.25} />
          <circle r="2" fill="#2f6df6" opacity={0.4}>
            <animateMotion dur={`${4 + i * 2}s`} repeatCount="indefinite" path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ── Main section ── */
export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const h = s.clientHeight - window.innerHeight;
      setProgress(clamp((window.innerHeight - r.top) / h, 0, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slidesLen = SLIDES.length;
  const cameraX = -progress * (slidesLen - 1) * 100;
  const introDone = slideProgress(progress, 0, 0.16);

  return (
    <section ref={sectionRef} className="relative bg-[#EDEEF5]" style={{ minHeight: '340vh' }}>
      <div className="sticky top-0 flex items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(47,109,246,0.03) 0%, transparent 70%)' }} />
        <EcosystemLines />
        {/* Camera container */}
        <div
          className="flex items-center justify-start transition-[transform] duration-100 ease-out"
          style={{
            transform: `translateX(${cameraX}vw)`,
            width: `${slidesLen * 100}vw`,
          }}
        >
          {/* Slide 0 — Intro */}
          <div className="flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
            <div style={{ maxWidth: 700, opacity: Math.min(1, (1 - introDone) * 2), transform: `translateY(${(1 - Math.min(1, (1 - introDone) * 2)) * 20}px)` }}>
              <div className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-4">OUR ECOSYSTEM</div>
              <div className="text-[clamp(36px,5vw,64px)] font-medium text-black leading-[1.05]" style={{ fontFamily: 'var(--font-heading)' }}>
                Every system solves<br />a different problem.<br />Together,<br />they solve the business.
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-black/60 max-w-[520px]">
                We don't build isolated software. Every application shares data, automates work, and scales with every department inside an organization.
              </p>
            </div>
          </div>

          {/* Slide 1 — BuildOS */}
          <div className="flex items-center justify-center gap-12" style={{ width: '100vw', height: '100vh' }}>
            <BuildOSPanel local={slideProgress(progress, 0.16, 0.38)} />
            <div style={{ maxWidth: 300, opacity: slideProgress(progress, 0.16, 0.24), transform: `translateY(${(1 - slideProgress(progress, 0.16, 0.24)) * 20}px)` }}>
              <div className="text-[32px] font-medium text-black leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>BuildOS<br /><span className="text-[16px] font-normal text-black/60">The operating system behind growing businesses.</span></div>
              <p className="mt-3 text-[13px] leading-relaxed text-black/50">Project management. HR. Finance. Inventory. CRM. Approvals. Reporting. Everything working together.</p>
            </div>
          </div>

          {/* Slide 2 — FreeInvoice */}
          <div className="flex items-center justify-center gap-12" style={{ width: '100vw', height: '100vh' }}>
            <FreeInvoicePanel local={slideProgress(progress, 0.38, 0.56)} />
            <div style={{ maxWidth: 280, opacity: slideProgress(progress, 0.38, 0.44), transform: `translateY(${(1 - slideProgress(progress, 0.38, 0.44)) * 20}px)` }}>
              <div className="text-[28px] font-medium text-black leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>FreeInvoice<br /><span className="text-[15px] font-normal text-black/60">Invoices without the friction.</span></div>
              <p className="mt-3 text-[13px] leading-relaxed text-black/50">Generate. Send. Track. Remind. Get paid. Everything automated.</p>
            </div>
          </div>

          {/* Slide 3 — BuyOps */}
          <div className="flex items-center justify-center gap-12" style={{ width: '100vw', height: '100vh' }}>
            <BuyOpsPanel local={slideProgress(progress, 0.56, 0.74)} />
            <div style={{ maxWidth: 280, opacity: slideProgress(progress, 0.56, 0.62), transform: `translateY(${(1 - slideProgress(progress, 0.56, 0.62)) * 20}px)` }}>
              <div className="text-[28px] font-medium text-black leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>BuyOps<br /><span className="text-[15px] font-normal text-black/60">Real estate. Without the paperwork.</span></div>
              <p className="mt-3 text-[13px] leading-relaxed text-black/50">Manage developments. Track sales. Monitor investors. Automate allocation. Visualize growth.</p>
            </div>
          </div>

          {/* Slide 4 — FeedbackOS */}
          <div className="flex items-center justify-center gap-12" style={{ width: '100vw', height: '100vh' }}>
            <FeedbackOSPanel local={slideProgress(progress, 0.74, 0.88)} />
            <div style={{ maxWidth: 260, opacity: slideProgress(progress, 0.74, 0.80), transform: `translateY(${(1 - slideProgress(progress, 0.74, 0.80)) * 20}px)` }}>
              <div className="text-[28px] font-medium text-black leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>FeedbackOS<br /><span className="text-[15px] font-normal text-black/60">Listen. Learn. Improve.</span></div>
              <p className="mt-3 text-[13px] leading-relaxed text-black/50">Collect feedback. Understand customers. Discover patterns. Ship better products.</p>
            </div>
          </div>

          {/* Slide 5 — Final ecosystem */}
          <div className="flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
            <div className="text-center" style={{ opacity: slideProgress(progress, 0.88, 0.94), transform: `translateY(${(1 - slideProgress(progress, 0.88, 0.94)) * 20}px)` }}>
              <div className="text-[40px] font-medium text-black leading-[1.1] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Different software.<br />One engineering philosophy.
              </div>
              <p className="text-[15px] text-black/50">Built independently. Designed to work together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
