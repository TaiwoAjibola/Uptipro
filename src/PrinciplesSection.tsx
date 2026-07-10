import { useEffect, useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const PRINCIPLES = [
  {
    num: '01', title: 'Clarity over complexity.',
    desc: 'Complex software doesn\'t have to feel complicated. The best interfaces remove decisions instead of adding them. Every screen should answer one question: "What does this person need right now?"',
    range: [0.10, 0.32] as [number, number],
  },
  {
    num: '02', title: 'Systems, not screens.',
    desc: 'Interfaces are only the surface. Real software lives beneath them. Every workflow, every permission, every approval, every automation must work together as one system.',
    range: [0.32, 0.54] as [number, number],
  },
  {
    num: '03', title: 'Designed for people first.',
    desc: 'Technology succeeds when people stop thinking about technology. Every interaction should feel obvious. Every workflow should reduce effort. Every product should become invisible.',
    range: [0.54, 0.76] as [number, number],
  },
  {
    num: '04', title: 'Built to evolve.',
    desc: 'Businesses grow. Software should grow with them. Every product we build is modular, adaptable, and ready for what\'s next.',
    range: [0.76, 0.92] as [number, number],
  },
];

function localP(global: number, [start, end]: [number, number]) {
  return clamp((global - start) / (end - start), 0, 1);
}

function PrincipleAnimation({ principle, progress, index }: { principle: (typeof PRINCIPLES)[number]; progress: number; index: number }) {
  const p = localP(progress, principle.range);

  switch (index) {
    case 0:
      // UI clutter fading away: random boxes disappear
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[320px] h-[280px] rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm">
            {['w-3/4', 'w-1/2', 'w-2/3'].map((w, i) => (
              <div key={i} className={`h-3 ${i > 0 ? 'mt-3' : ''} ${w} rounded bg-black/8`} style={{ opacity: p < 0.5 ? clamp(1 - p * 2, 0, 1) : 0, transition: 'opacity 0.3s' }} />
            ))}
            <div className="flex gap-2 mt-3">
              {[0, 1, 2].map((j) => (
                <div key={j} className="flex-1 h-16 rounded-lg bg-black/[0.03] p-1.5 flex flex-col gap-1" style={{ opacity: p < 0.7 ? clamp(1 - p * 1.5, 0, 1) : 0 }}>
                  <span className="w-full h-1 rounded bg-black/10" />
                  <span className="w-1/2 h-1 rounded bg-black/5" />
                </div>
              ))}
            </div>
            {/* Final simple interface */}
            <div className="absolute inset-4 flex items-center justify-center" style={{ opacity: clamp((p - 0.5) / 0.4, 0, 1) }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#2f6df6]/20 mx-auto mb-2" />
                <div className="w-24 h-2 rounded bg-black/20 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      );
    case 1:
      // Nodes connecting: SVG lines appearing between dots
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-[280px] h-[280px]">
            {[
              [[30, 30], [170, 30]],
              [[170, 30], [150, 170]],
              [[150, 170], [30, 30]],
              [[30, 30], [50, 170]],
              [[50, 170], [150, 170]],
              [[170, 30], [100, 100]],
              [[100, 100], [30, 30]],
            ].map(([[x1, y1], [x2, y2]], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2f6df6" strokeWidth="1.2" strokeDasharray="4,4" opacity={p * 0.4} />
            ))}
            {[[30, 30], [170, 30], [150, 170], [50, 170], [100, 100]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="5" fill="#2f6df6" opacity={p * (0.4 + i * 0.1)}>
                {i === 0 && <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />}
              </circle>
            ))}
          </svg>
        </div>
      );
    case 2:
      // Gentle breathing movement: a card that subtly moves
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[260px] h-[240px] rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm flex flex-col gap-2" style={{ opacity: p, transform: `scale(${0.9 + p * 0.1})` }}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#2f6df6]/20" style={{ animation: p > 0.5 ? 'principlePulse 3s ease-in-out infinite' : 'none' }} />
              <div className="flex flex-col gap-1">
                <span className="w-20 h-1.5 rounded bg-black/15" />
                <span className="w-12 h-1 rounded bg-black/8" />
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-black/[0.02] p-2 flex flex-col gap-1.5">
              <span className="w-full h-1 rounded bg-black/8" />
              <span className="w-3/4 h-1 rounded bg-black/5" />
              <span className="w-1/2 h-1 rounded bg-black/5" />
            </div>
            <div className="flex gap-1.5">
              <span className="flex-1 h-6 rounded bg-[#2f6df6]/10" />
              <span className="flex-1 h-6 rounded bg-[#22c55e]/10" />
            </div>
          </div>
        </div>
      );
    case 3:
      // Modules expanding/collapsing
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex gap-2 items-end">
            {[
              { h: 80, w: 60, delay: 0 },
              { h: 120, w: 80, delay: 0.2 },
              { h: 60, w: 50, delay: 0.4 },
              { h: 100, w: 70, delay: 0.6 },
            ].map((mod, i) => {
              const expand = p > 0.3 ? Math.sin((p - 0.3) * Math.PI * 4 + i * 1.2) * 0.15 + 0.85 : 0.7 + p * 0.3;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-black/[0.06] bg-white flex items-center justify-center text-[8px] text-black/30 transition-all"
                  style={{
                    width: mod.w,
                    height: mod.h * expand,
                    opacity: p,
                    transform: `scale(${expand})`,
                    transition: 'height 0.8s ease, transform 0.8s ease',
                  }}
                >
                  {mod.w < 60 ? '' : 'Module'}
                </div>
              );
            })}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function PrinciplesSection() {
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

  const endPhase = clamp((progress - 0.92) / 0.08, 0, 1);

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: '300vh', background: '#EDEEF5' }}>
      {/* Paper grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '256px 256px' }} />

      <div className="sticky top-0 flex items-center justify-center" style={{ height: '100vh' }}>
        {/* Intro — fades out in first 10% */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4" style={{ opacity: clamp(1 - progress / 0.10, 0, 1) }}>
          <div>
            <div className="text-[12px] uppercase tracking-[0.35em] text-black/40 mb-4">OUR PRINCIPLES</div>
            <div className="text-[clamp(40px,6vw,80px)] font-medium text-black leading-[0.95] max-w-[760px]" style={{ fontFamily: 'var(--font-heading)' }}>
              Every product is guided<br />by the same beliefs.
            </div>
            <p className="mt-4 text-[17px] text-black/60 max-w-[560px] mx-auto">
              Technology changes. Design trends change. Great systems don't. Everything we build is shaped by a small set of principles that remain true regardless of language, framework or platform.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {PRINCIPLES.map((p, i) => {
            const active = progress >= p.range[0] && progress <= p.range[1] + 0.08;
            const lp = localP(progress, p.range);
            if (!active && lp <= 0) return null;

            return (
              <div
                key={p.num}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: lp > 0 ? clamp(1 - (progress - p.range[1]) / 0.10, 0, 1) : 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <div className="flex items-start gap-16 max-w-[1200px] w-full px-8">
                  {/* Left: text */}
                  <div className="w-[460px] shrink-0" style={{ transform: `translateY(${(1 - Math.min(lp * 2, 1)) * 20}px)` }}>
                    <div className="text-[100px] font-medium text-black/[0.04] leading-[0.8] select-none">{p.num}</div>
                    <div className="text-[28px] font-medium text-black mt-[-8px] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                      {p.title}
                    </div>
                    <p className="text-[17px] leading-[1.7] text-black/60">{p.desc}</p>
                  </div>
                  {/* Right: animation */}
                  <div className="flex-1" style={{ opacity: Math.min(lp * 2, 1), transform: `translateY(${(1 - Math.min(lp * 2, 1)) * 20}px)` }}>
                    <PrincipleAnimation principle={p} progress={progress} index={i} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End: blue connecting line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: endPhase }}>
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
            <line x1="600" y1="100" x2="600" y2="700" stroke="#2f6df6" strokeWidth="1.5" opacity={endPhase * 0.5} />
            {[120, 280, 440, 600].map((y, i) => (
              <circle key={i} cx="600" cy={y} r="4" fill="#2f6df6" opacity={endPhase} />
            ))}
            <text x="600" y="740" textAnchor="middle" fill="#2f6df6" fontSize="10" letterSpacing="4" opacity={endPhase} style={{ fontFamily: 'var(--font-body)' }}>
              BELOW
            </text>
            <animateTransform attributeName="transform" type="translate" values="0,-10;0,10;0,-10" dur="2s" repeatCount="indefinite" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes principlePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
