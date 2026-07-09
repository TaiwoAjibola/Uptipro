import { useEffect, useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const BOOT_STEPS = [
  'Initializing...',
  'Loading Components...',
  'Compiling Interface...',
  'Connecting Services...',
  'System Ready',
];

const SIDE_NOTES = [
  'Reduced onboarding by 43%',
  'Integrated 6 external APIs',
  'Automated approval flow',
  'Optimized for mobile',
  'Supports multi-company architecture',
];

const WINDOWS = [
  {
    id: 'buildos',
    title: 'BuildOS',
    top: 10, left: 2, w: 320, h: 260, floatAmp: 6,
    content: (p: number) => (
      <div className="flex flex-col h-full">
        <div className="text-[11px] font-semibold text-black/70 mb-2">Project Timeline</div>
        {[
          { label: 'Design review', pct: clamp((p - 0.55) / 0.15, 0, 1) * 80, color: '#22c55e' },
          { label: 'Development', pct: clamp((p - 0.58) / 0.15, 0, 1) * 65, color: '#2f6df6' },
          { label: 'Testing', pct: clamp((p - 0.61) / 0.15, 0, 1) * 45, color: '#f97316' },
          { label: 'Deployment', pct: clamp((p - 0.64) / 0.15, 0, 1) * 20, color: '#8b5cf6' },
        ].map((item) => (
          <div key={item.label} className="mb-1.5">
            <div className="flex justify-between text-[9px] text-black/60 mb-0.5">
              <span>{item.label}</span>
              <span>{Math.round(item.pct)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
          </div>
        ))}
        <div className="flex gap-1 mt-auto pt-2 border-t border-black/5">
          {['#2f6df6', '#22c55e', '#f97316', '#8b5cf6'].map((c, i) => (
            <span key={i} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: c, marginLeft: i ? -8 : 0 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'invoice',
    title: 'FreeInvoice',
    top: 8, left: 45, w: 300, h: 240, floatAmp: 9,
    content: (p: number) => (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-semibold text-black/70">Invoice #4821</span>
          <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/15 text-[#16a34a] text-[8px] font-medium">Paid</span>
        </div>
        <div className="flex-1 bg-black/[0.02] rounded-lg p-3 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2 text-[9px] text-black/50 mb-2">
            <span>Client: Horizon Properties</span>
            <span className="text-right">Due: Jun 30</span>
          </div>
          <div className="text-[28px] font-semibold text-black">$12,400</div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#16a34a] mt-1" style={{ opacity: clamp((p - 0.5) / 0.1, 0, 1) }}>
            <span>✓ Payment confirmed</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2 text-[9px]">
          <span className="text-black/50">View →</span>
          <span className="text-black/50">Share →</span>
        </div>
      </div>
    ),
  },
  {
    id: 'buyops',
    title: 'BuyOps',
    top: 50, left: 38, w: 340, h: 250, floatAmp: 12,
    content: (p: number) => (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-black/70">Property Portfolio</span>
          <span className="text-[9px] text-[#2f6df6] font-medium">+12.4% ROI</span>
        </div>
        <div className="flex-1 rounded-lg bg-[#e8edf5] relative overflow-hidden mb-2">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/60" />
          <div className="absolute left-1/3 top-0 h-full w-0.5 bg-white/60" />
          {[
            { t: '22%', l: '30%' }, { t: '55%', l: '60%' }, { t: '72%', l: '25%' }, { t: '35%', l: '72%' },
          ].map((pin, i) => (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2f6df6] ring-2 ring-white" style={{ top: pin.t, left: pin.l }} />
          ))}
          <div className="absolute bottom-1 left-1 text-[7px] text-black/50 bg-white/80 rounded px-1">6 listings</div>
        </div>
        <div className="flex justify-between text-[9px] text-black/60">
          <span>Avg CAP: 7.2%</span>
          <span>Available: 3</span>
          <span style={{ opacity: clamp((p - 0.6) / 0.1, 0, 1) }}>Funded: ✓</span>
        </div>
      </div>
    ),
  },
  {
    id: 'feedback',
    title: 'FeedbackOS',
    top: 52, left: 70, w: 280, h: 240, floatAmp: 8,
    content: (p: number) => (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-black/70">Customer Sentiment</span>
          <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6] text-[8px] font-medium">AI Summary</span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {[
            { text: '"Love the new dashboard"', rating: 5 },
            { text: '"API integration is seamless"', rating: 4 },
            { text: '"Would like better mobile support"', rating: 3 },
          ].map((r, i) => (
            <div key={i} className="bg-black/[0.02] rounded-lg p-2" style={{ opacity: clamp((p - 0.6 - i * 0.05) / 0.1, 0, 1) }}>
              <div className="flex items-center gap-1 text-[8px] mb-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: j < r.rating ? '#f59e0b' : '#e2e8f0' }}>★</span>
                ))}
              </div>
              <span className="text-[9px] text-black/70">{r.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 text-[8px] text-black/40" style={{ opacity: clamp((p - 0.7) / 0.05, 0, 1) }}>Sentiment: Positive (92%)</div>
      </div>
    ),
  },
  {
    id: 'automation',
    title: 'Automation',
    top: 32, left: 72, w: 290, h: 200, floatAmp: 14,
    content: (p: number) => (
      <div className="flex flex-col h-full">
        <div className="text-[11px] font-semibold text-black/70 mb-2">Workflow Builder</div>
        <div className="flex-1 flex items-center gap-1 justify-center">
          {[['Trigger', '#2f6df6'], ['Action', '#22c55e'], ['Completed', '#8b5cf6']].map(([label, color], i) => (
            <div key={label as string} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1 px-2 py-3 rounded-lg bg-black/[0.02]" style={{ border: `1px solid ${color}20` }}>
                <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-[8px] text-black/60">{label}</span>
              </div>
              {i < 2 && <span className="text-black/20 text-[10px]">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-1 text-[9px] text-black/50 text-center" style={{ opacity: clamp((p - 0.65) / 0.1, 0, 1) }}>3 workflows active • 12 runs today</div>
      </div>
    ),
  },
];

const CONNECTIONS = [
  { from: 'invoice', to: 'buildos' },
  { from: 'buildos', to: 'feedback' },
  { from: 'feedback', to: 'buyops' },
  { from: 'buyops', to: 'automation' },
];

/* ── Floating window component ── */
function FloatingWindow({ win, progress, index: _i }: { win: (typeof WINDOWS)[number]; progress: number; index: number }) {
  const appearProgress = 0.50 + _i * 0.04;
  const opacity = clamp((progress - appearProgress) / 0.08, 0, 1);
  const visible = opacity > 0;

  return (
    <div
      className="absolute rounded-3xl border border-black/[0.05] overflow-hidden will-change-transform"
      style={{
        top: `${win.top}%`,
        left: `${win.left}%`,
        width: win.w,
        height: win.h,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        opacity: visible ? opacity : 0,
        transform: visible
          ? `translateY(0)`
          : `translateY(20px)`,
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        animation: visible ? `windowFloat${_i} ${3 + _i * 0.5}s ease-in-out infinite alternate` : 'none',
      }}
    >
      {/* macOS traffic lights */}
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-black/[0.04]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] font-medium text-black/60">{win.title}</span>
      </div>
      <div className="p-3.5" style={{ height: 'calc(100% - 36px)' }}>
        {win.content(progress)}
      </div>
    </div>
  );
}

export default function SystemsAlive() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [microTick, setMicroTick] = useState(0);
  const [, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      const h = r.height - window.innerHeight;
      setProgress(clamp((window.innerHeight - r.top) / h, 0, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (progress < 0.01) { setBootStep(0); return; }
    if (progress < 0.04) { setBootStep(1); return; }
    if (progress < 0.07) { setBootStep(2); return; }
    if (progress < 0.10) { setBootStep(3); return; }
    setBootStep(4);
  }, [progress]);

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Micro interactions every 5-8 seconds
  useEffect(() => {
    const next = () => {
      setMicroTick((t) => t + 1);
      setTimeout(next, 5000 + Math.random() * 3000);
    };
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, []);

  const step1 = clamp((progress - 0.15) / 0.10, 0, 1);
  const step2 = clamp((progress - 0.30) / 0.10, 0, 1);
  const step3 = clamp((progress - 0.45) / 0.15, 0, 1);
  const step4 = clamp((progress - 0.60) / 0.15, 0, 1);
  const zoomOut = clamp((progress - 0.92) / 0.08, 0, 1);

  const dashboardOpacity = clamp(progress / 0.05, 0, 1);
  const sidebarW = 180 + zoomOut * -40;
  const dashScale = 1 - zoomOut * 0.03;

  const bootReady = bootStep === 4;

  return (
    <section
      ref={sectionRef}
      data-systems-alive
      className="relative bg-[#EDEEF5]"
      style={{ minHeight: '220vh' }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <span className="block w-3 h-3 rounded-full bg-[#2f6df6] shadow-[0_0_12px_rgba(47,109,246,0.5)]" style={{ transform: 'translate(-50%, -50%)' }} />
      </div>

      <style>{`
        [data-systems-alive] * { cursor: none !important; }
        ${WINDOWS.map((w, i) => `
          @keyframes windowFloat${i} {
            0% { transform: translateY(0); }
            100% { transform: translateY(${-w.floatAmp}px); }
          }
        `).join('')}
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes particleTravel {
          0% { offset-distance: 0%; opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>

      {/* Sticky wrapper */}
      <div className="sticky top-0 flex items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
        <div
          className="relative"
          style={{
            width: '85vw',
            maxWidth: '1400px',
            height: '82vh',
            perspective: '2200px',
          }}
        >
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden border border-black/[0.04]"
            style={{
              background: '#f8f9fc',
              boxShadow: '0 20px 80px rgba(0,0,0,0.05)',
              transform: `perspective(2200px) rotateX(4deg) scale(${dashScale})`,
              transformOrigin: 'center bottom',
              opacity: dashboardOpacity,
              transition: 'transform 0.3s ease',
            }}
          >
            {/* ── Boot status top-left ── */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: bootReady ? '#22c55e' : '#64748b',
                  animation: bootReady ? 'pulseDot 2s ease-in-out infinite' : 'none',
                }}
              />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#64748b' }}>
                {BOOT_STEPS[bootStep]}
              </span>
            </div>

            {/* ── Copy top-left (below boot) ── */}
            <div
              className="absolute top-10 left-4 z-20"
              style={{ opacity: clamp((progress - 0.08) / 0.10, 0, 1) }}
            >
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#2f6df6] font-semibold mb-1">SYSTEM ONLINE</div>
              <div className="text-[clamp(24px,3vw,42px)] font-medium text-black leading-[1.05] max-w-[560px]" style={{ fontFamily: 'var(--font-heading)' }}>
                From sketches...<br />to software people actually use.
              </div>
              <p className="mt-3 text-[14px] leading-[1.7] text-black/60 max-w-[520px]">
                Ideas are only valuable when they become reliable systems. Every workflow. Every interaction. Every dashboard. Every automation. Designed to solve real operational problems while remaining intuitive for the people who use them.
              </p>
            </div>

            {/* ── Sidebar ── */}
            <div
              className="absolute left-0 top-0 h-full z-10 border-r border-black/[0.04] flex flex-col pt-14 pb-4 px-3"
              style={{
                width: sidebarW,
                background: `rgba(255,255,255,${0.5 + step1 * 0.5})`,
                opacity: step1,
                transform: `translateY(${(1 - step1) * 6}px)`,
              }}
            >
              {['Dashboard', 'Projects', 'Tasks', 'Users', 'Analytics', 'Settings'].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px]"
                  style={{
                    opacity: clamp((step1 * 2 - i * 0.15), 0, 1),
                    background: i === 0 ? '#2f6df610' : 'transparent',
                    color: i === 0 ? '#2f6df6' : '#000',
                  }}
                >
                  <span className="w-4 h-4 rounded bg-black/10" />
                  <span>{item}</span>
                  {i === 0 && <span className="ml-auto w-4 h-4 rounded-full bg-[#2f6df6] text-white text-[8px] flex items-center justify-center">3</span>}
                </div>
              ))}
              <div className="mt-auto pt-2 border-t border-black/5 flex items-center gap-2 px-2 py-1.5" style={{ opacity: step1 }}>
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2f6df6] to-[#8b5cf6] flex items-center justify-center text-white text-[8px] font-medium">AP</span>
                <span className="text-[11px] text-black/70">Anya Petrov</span>
              </div>
            </div>

            {/* ── Top navigation ── */}
            <div
              className="absolute top-0 left-0 right-0 h-12 z-10 flex items-center px-4 gap-4 border-b border-black/[0.04]"
              style={{
                background: `rgba(255,255,255,${0.5 + step2 * 0.5})`,
                opacity: step2,
                transform: `translateY(${(1 - step2) * 6}px)`,
                paddingLeft: sidebarW + 16,
              }}
            >
              <div className="flex-1 flex items-center gap-3">
                <span className="text-[11px] text-black/40">Projects / Enterprise ERP</span>
                <div className="flex-1 max-w-[200px] h-7 rounded-lg bg-black/[0.04] flex items-center px-2 text-[10px] text-black/30">
                  Search...
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-black/10" style={{ opacity: step2 }} />
                <div className="w-5 h-5 rounded-full bg-[#2f6df6]/20 flex items-center justify-center text-[8px] text-[#2f6df6] font-medium" style={{ opacity: step2 }}>3</div>
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2f6df6] to-[#8b5cf6]" style={{ opacity: step2 }} />
              </div>
            </div>

            {/* ── Main content area ── */}
            <div
              className="absolute inset-0"
              style={{
                paddingTop: 48,
                paddingLeft: sidebarW + 16,
                paddingRight: 16,
                paddingBottom: 16,
                opacity: step3,
              }}
            >
              {/* Stat cards */}
              <div className="flex gap-3 mb-3 mt-1">
                {[
                  ['Revenue', '$1.42M', '+12.3%', '#2f6df6'],
                  ['Active Users', '2,847', '+8.1%', '#22c55e'],
                  ['Completion', '94.2%', '+3.4%', '#f97316'],
                ].map(([label, val, chg, color], i) => (
                  <div
                    key={label as string}
                    className="flex-1 rounded-xl border border-black/[0.04] p-3"
                    style={{
                      background: 'white',
                      opacity: clamp((step3 * 2 - i * 0.3), 0, 1),
                      transform: `translateY(${(1 - clamp((step3 * 2 - i * 0.3), 0, 1)) * 8}px)`,
                      transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                  >
                    <div className="text-[10px] text-black/40 mb-1">{label}</div>
                    <div className="text-[18px] font-semibold text-black">{val}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: color as string }}>{chg}</div>
                  </div>
                ))}
              </div>

              {/* Bottom area: table + activity */}
              <div className="flex gap-3" style={{ height: 'calc(100% - 100px)' }}>
                {/* Table */}
                <div className="flex-1 rounded-xl border border-black/[0.04] bg-white p-3" style={{ opacity: step4 }}>
                  <div className="text-[11px] font-semibold text-black/70 mb-2">Recent Activity</div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      ['Deployed v2.1.0', '2 min ago', '#22c55e'],
                      ['New user registered', '15 min ago', '#2f6df6'],
                      ['Invoice paid — $8,400', '1 hour ago', '#f97316'],
                      ['Workflow completed', '3 hours ago', '#8b5cf6'],
                    ].map(([text, time, color], i) => (
                      <div key={i} className="flex items-center gap-2 py-1 border-b border-black/[0.03] last:border-0">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color as string }} />
                        <span className="flex-1 text-[11px] text-black/70">{text}</span>
                        <span className="text-[9px] text-black/40">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress / Milestones */}
                <div className="w-[200px] rounded-xl border border-black/[0.04] bg-white p-3" style={{ opacity: step4 }}>
                  <div className="text-[11px] font-semibold text-black/70 mb-2">Milestones</div>
                  {[
                    ['Q1 Planning', 100],
                    ['Q2 Development', microTick % 2 === 0 ? 75 : 78],
                    ['Q3 Testing', 45],
                  ].map(([label, pct]) => (
                    <div key={label as string} className="mb-2">
                      <div className="flex justify-between text-[9px] text-black/50 mb-0.5">
                        <span>{label}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-black/5 overflow-hidden">
                        <div className="h-full rounded-full bg-[#2f6df6] transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                  {/* Chart bars */}
                  <div className="flex items-end gap-1 h-10 mt-2 pt-2 border-t border-black/[0.04]">
                    {[40, 65, 50, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-[#2f6df6]/20" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Floating windows ── */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {WINDOWS.map((win, i) => (
              <div key={win.id} className="pointer-events-auto" style={{ opacity: clamp((progress - 0.45) / 0.15, 0, 1) }}>
                <FloatingWindow win={win} progress={progress} index={i} />
              </div>
            ))}
          </div>

          {/* ── Connection lines ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ opacity: clamp((progress - 0.75) / 0.10, 0, 1) }}>
            {CONNECTIONS.map((conn, ci) => {
              const from = WINDOWS.find((w) => w.id === conn.from);
              const to = WINDOWS.find((w) => w.id === conn.to);
              if (!from || !to) return null;
              const fcx = from.left + 8;
              const fcy = from.top + 6;
              const tcx = to.left + 6;
              const tcy = to.top + 4;
              return (
                <g key={ci}>
                  <line x1={`${fcx}%`} y1={`${fcy}%`} x2={`${tcx}%`} y2={`${tcy}%`} stroke="#2f6df6" strokeWidth="0.8" strokeDasharray="4,6" opacity={0.3} />
                </g>
              );
            })}
          </svg>

          {/* ── Side notes ── */}
          <div className="absolute bottom-4 right-4 z-30 flex flex-col items-end gap-1.5" style={{ opacity: clamp((progress - 0.65) / 0.10, 0, 1) }}>
            {SIDE_NOTES.map((note) => (
              <div
                key={note}
                className="px-3 py-1.5 rounded-lg text-[10px] text-black/60 border border-black/[0.04]"
                style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
              >
                {note}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
