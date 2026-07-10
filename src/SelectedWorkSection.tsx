import { useEffect, useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rng = (seed: number) => (Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1;

interface Fragment {
  id: number;
  w: number; h: number;
  tx: number; ty: number; tr: number; // target x, y, rotate
  ox: number; oy: number; or: number; // origin offset (scattered)
  color: string;
  borderRadius: number;
}

function generateFragments(caseIdx: number, count: number): Fragment[] {
  return Array.from({ length: count }, (_, i) => {
    const s = rng(caseIdx * 1000 + i);
    return {
      id: i,
      w: 40 + s * 120,
      h: 20 + (1 - s) * 80,
      tx: 10 + (s * 80) % 70,
      ty: 10 + ((s * 100 + i * 13) % 75),
      tr: (s - 0.5) * 4,
      ox: 60 + (s - 0.5) * 80,
      oy: 40 + (s - 0.5) * 80,
      or: (s - 0.5) * 25,
      color: ['#2f6df6', '#22c55e', '#f97316', '#8b5cf6', '#94a3b8', '#000'][Math.floor(s * 6)],
      borderRadius: 4 + s * 16,
    };
  });
}

const CASES = [
  {
    num: '01', name: 'BuildOS',
    challenge: 'Growing organizations were drowning in disconnected software. Approvals were slow. Projects became invisible. Reporting took days.',
    solution: 'We designed a modular ERP platform that connected every department through one shared workflow.',
    impact: ['Faster approvals', 'Centralized reporting', 'Unified operations', 'Scalable architecture'],
    metrics: { color: '#2f6df6', items: [['Departments', 12], ['Users', 3400], ['Uptime', '99.97%']] },
  },
  {
    num: '02', name: 'FreeInvoice',
    challenge: 'Finance teams spent over 60% of their time on manual invoice processing and reconciliation.',
    solution: 'We built an automated invoicing engine that generates, sends, tracks, and reconciles invoices without human intervention.',
    impact: ['60% time saved', 'Zero reconciliation errors', '2.4× faster payments', 'Automated reminders'],
    metrics: { color: '#22c55e', items: [['Invoice/mo', '12.4k'], ['Avg payment', '4.2d'], ['Accuracy', '100%']] },
  },
  {
    num: '03', name: 'BuyOps',
    challenge: 'Real estate firms managed investments across spreadsheets, PDFs, and disconnected platforms with no unified view.',
    solution: 'We created a portfolio management system with real-time market data, automated reporting, and investor dashboards.',
    impact: ['Real-time portfolio view', 'Automated investor reporting', '40% faster deal flow', 'Unified data'],
    metrics: { color: '#f97316', items: [['Properties', 340], ['AUM', '$2.1B'], ['Investors', 1800]] },
  },
  {
    num: '04', name: 'FeedbackOS',
    challenge: 'Product teams had no centralized way to collect, analyze, and act on customer feedback across channels.',
    solution: 'We developed an AI-powered feedback platform that aggregates, analyzes, and prioritizes customer insights.',
    impact: ['247% more responses', 'AI-powered insights', 'Real-time sentiment', 'Direct product integration'],
    metrics: { color: '#8b5cf6', items: [['Responses', '47k'], ['Sentiment', '92%'], ['NPS', '+24']] },
  },
];

const PROJECT_FRAGMENTS = CASES.map((_, i) => generateFragments(i, 14));

function localP(global: number, start: number, end: number) {
  return clamp((global - start) / (end - start), 0, 1);
}

export default function SelectedWorkSection() {
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

  const caseCount = CASES.length;
  const caseHeight = 1 / caseCount; // each case takes 1/4 of progress

  return (
    <section ref={sectionRef} className="relative bg-[#EDEEF5]" style={{ minHeight: '500vh' }}>
      {/* Intro — takes first 3% of scroll */}
      <div className="sticky top-0 flex flex-col items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: clamp(1 - progress / 0.04, 0, 1) }}
        >
          <div className="text-[12px] uppercase tracking-[0.35em] text-black/40 mb-4">SELECTED WORK</div>
          <div className="text-[clamp(40px,6vw,80px)] font-medium text-black leading-[1.05] max-w-[600px]" style={{ fontFamily: 'var(--font-heading)' }}>
            Software that solved<br />real problems.
          </div>
          <p className="mt-4 text-[17px] text-black/60 max-w-[480px]">
            Every product starts with a challenge. Every challenge becomes an opportunity to rethink how people work.
          </p>
        </div>

        {/* ── Project containers (stacked, each ~25% of scroll) ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          {CASES.map((c, ci) => {
            const start = 0.04 + ci * caseHeight;
            const end = start + caseHeight;
            const lp = localP(progress, start, end);
            const visible = lp > 0;

            if (!visible) return null;

            const titleOpacity = clamp(lp / 0.15, 0, 1);
            const challengeOpacity = clamp((lp - 0.12) / 0.12, 0, 1);
            const solutionOpacity = clamp((lp - 0.25) / 0.12, 0, 1);
            const impactOpacity = clamp((lp - 0.38) / 0.10, 0, 1);
            const assembleProgress = clamp((lp - 0.42) / 0.35, 0, 1);
            const rotatePhase = clamp((lp - 0.82) / 0.10, 0, 1);
            const breakPhase = clamp((lp - 0.95) / 0.05, 0, 1);
            const overallRotate = rotatePhase * 2 - breakPhase * 8;

            const fragments = PROJECT_FRAGMENTS[ci];

            return (
              <div key={c.num} className="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
                {/* Left column */}
                <div className="w-[420px] shrink-0 mr-12" style={{ opacity: titleOpacity }}>
                  <div className="text-[64px] font-medium text-black/[0.06] leading-[0.8] mb-1">{c.num}</div>
                  <div className="text-[clamp(28px,4vw,44px)] font-medium text-black mb-4" style={{ fontFamily: 'var(--font-heading)', transform: `translateY(${(1 - titleOpacity) * 12}px)` }}>
                    {c.name}
                  </div>

                  <div className="mb-4" style={{ opacity: challengeOpacity, transform: `translateY(${(1 - challengeOpacity) * 10}px)` }}>
                    <div className="text-[12px] uppercase tracking-[0.2em] text-black/40 mb-1.5">Challenge</div>
                    <p className="text-[17px] leading-[1.6] text-black/70">{c.challenge}</p>
                  </div>

                  <div className="mb-4" style={{ opacity: solutionOpacity, transform: `translateY(${(1 - solutionOpacity) * 10}px)` }}>
                    <div className="text-[12px] uppercase tracking-[0.2em] text-black/40 mb-1.5">Solution</div>
                    <p className="text-[17px] leading-[1.6] text-black/70">{c.solution}</p>
                  </div>

                  <div style={{ opacity: impactOpacity, transform: `translateY(${(1 - impactOpacity) * 10}px)` }}>
                    <div className="text-[12px] uppercase tracking-[0.2em] text-black/40 mb-1.5">Impact</div>
                    <div className="flex flex-col gap-1">
                      {c.impact.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[17px] text-black/70">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.metrics.color }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-4 mt-4" style={{ opacity: clamp((lp - 0.72) / 0.08, 0, 1) }}>
                    {c.metrics.items.map(([l, v]) => (
                      <div key={l as string}>
                        <div className="text-[18px] font-semibold text-black">{v}</div>
                        <div className="text-[12px] uppercase tracking-[0.1em] text-black/40">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column — fragments */}
                <div
                  className="relative flex-1"
                  style={{
                    height: '70vh',
                    maxWidth: 720,
                    perspective: 1200,
                    transform: `rotateX(${overallRotate}deg)`,
                  }}
                >
                  {fragments.map((f) => {
                    const t = easeOutBack(assembleProgress);
                    const scatterT = easeInQuad(breakPhase);
                    const x = lerp(f.ox, f.tx, t) + scatterT * 40 * (f.id % 3 === 0 ? 1 : -1);
                    const y = lerp(f.oy, f.ty, t) + scatterT * 50 * ((f.id % 2 === 0) ? 1 : -1);
                    const r = lerp(f.or, f.tr, t) + scatterT * 20 * ((f.id % 4 === 0) ? 1 : -1);
                    const opacity = assembleProgress > 0.1 ? clamp((assembleProgress - breakPhase) / 0.1, 0, 1) : clamp(assembleProgress / 0.1, 0, 1);
                    const scale = 1 - breakPhase * 0.3 + (1 - assembleProgress) * 0.5;

                    return (
                      <div
                        key={f.id}
                        className="absolute transition-shadow duration-300"
                        style={{
                          width: `${f.w}px`,
                          height: `${f.h}px`,
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: `rotate(${r}deg) scale(${scale})`,
                          opacity,
                          background: 'white',
                          borderRadius: f.borderRadius,
                          border: '1px solid rgba(0,0,0,0.04)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        }}
                      >
                        {/* Mini content inside fragment */}
                        <div className="p-2 w-full h-full flex flex-col justify-between">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                            <span className="w-12 h-1 rounded bg-black/10" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="w-full h-1 rounded bg-black/8" />
                            <span className="w-2/3 h-1 rounded bg-black/5" />
                          </div>
                          {f.id % 3 === 0 && (
                            <div className="flex items-end gap-0.5 h-8">
                              {[30, 55, 40, 70].map((h, i) => (
                                <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `${f.color}30` }} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Final screen ── */}
        <div
          className="absolute inset-0 flex items-center justify-center text-center px-4"
          style={{ opacity: clamp((progress - 0.92) / 0.08, 0, 1) }}
        >
          <div>
            <div className="text-[clamp(28px,4vw,44px)] font-medium text-black leading-[1.1] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Great software isn't measured by features.<br />It's measured by how effortlessly people use it.
            </div>
            <p className="text-[17px] text-black/50 max-w-[560px] mx-auto">
              Every screen has a purpose. Every interaction solves a problem. Every product begins with understanding people first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Easing helpers */
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInQuad(t: number) {
  return t * t;
}
