import { useEffect, useRef, useState } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const QUOTES = [
  { text: 'Automation\nwithout friction.', x: 12, y: 20 },
  { text: 'Software\nthat disappears.', x: 72, y: 35 },
  { text: 'Complexity,\nbeautifully simplified.', x: 18, y: 60 },
  { text: 'Designed\nto outgrow itself.', x: 68, y: 72 },
];

const BLOCKS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 17.3 + 5) % 100,
  y: (i * 9.7 + 2) % 100,
  size: 6 + (i % 5) * 3,
  speed: 40 + (i % 7) * 20,
  delay: i * 0.3,
  opacity: 0.03 + (i % 10) * 0.008,
}));

export default function FutureSection() {
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

  const finalDrift = clamp((progress - 0.88) / 0.12, 0, 1);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ minHeight: '220vh', background: 'linear-gradient(to bottom, #EDEEF5 0%, #FFFFFF 100%)' }}
    >
      <div className="sticky top-0 flex items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
        {/* Floating geometric blocks */}
        <div className="absolute inset-0 pointer-events-none">
          {BLOCKS.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-sm"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                background: '#2f6df6',
                opacity: b.opacity,
                animation: `blockFloat${b.id} ${b.speed}s ease-in-out infinite alternate`,
                transform: `translateY(${finalDrift * 200}px)`,
                transition: 'transform 0.5s ease',
              }}
            />
          ))}
        </div>

        {/* Intro */}
        <div
          className="absolute text-center px-4"
          style={{
            opacity: clamp(1 - progress / 0.12, 0, 1),
            transform: `translateY(${(1 - clamp(1 - progress / 0.12, 0, 1)) * (-40)}px)`,
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-4">LOOKING FORWARD</div>
          <div className="text-[clamp(32px,5vw,60px)] font-medium text-black leading-[0.95] max-w-[680px] mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>
            The future belongs to systems that think.
          </div>
          <p className="mt-4 text-[14px] text-black/60 max-w-[500px] mx-auto">
            Tomorrow's software won't simply respond. It will anticipate. Adapt. Automate. Learn. Our goal isn't just to build applications — it's to build software that helps organizations make better decisions every day.
          </p>
        </div>

        {/* Quotes */}
        {QUOTES.map((q, i) => {
          const qp = clamp((progress - 0.15 - i * 0.08) / 0.08, 0, 1);
          return (
            <div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${q.x}%`,
                top: `${q.y}%`,
                opacity: qp,
                transform: `translateY(${(1 - qp) * 30}px)`,
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <div className="text-[clamp(20px,2.5vw,36px)] font-medium text-black/20 leading-[1.2] whitespace-pre-line" style={{ fontFamily: 'var(--font-heading)' }}>
                {q.text}
              </div>
            </div>
          );
        })}

        {/* Particles moving upward */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-[#2f6df6]/30"
              style={{
                left: `${(i * 7 + 3) % 100}%`,
                top: '100%',
                animation: `particleRise${i} ${3 + (i % 5) * 1.5}s linear infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Final drift text */}
        <div
          className="absolute text-center px-4"
          style={{
            opacity: clamp((progress - 0.80) / 0.10, 0, 1),
            transform: `translateY(${-finalDrift * 60}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          <div className="text-[clamp(20px,3vw,40px)] font-medium text-black leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            Ideas become systems.
          </div>
          <p className="text-[13px] text-black/50 mt-2">Systems become solutions. Solutions become businesses.</p>
        </div>
      </div>

      <style>{`
        ${BLOCKS.map((b) => `
          @keyframes blockFloat${b.id} {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(${(b.id % 3 - 1) * 30}px, ${(-10 - (b.id % 5) * 8)}px) rotate(${(b.id % 7 - 3) * 10}deg); }
          }
        `).join('')}
        ${Array.from({ length: 20 }).map((_, i) => `
          @keyframes particleRise${i} {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-120vh); opacity: 0; }
          }
        `).join('')}
      `}</style>
    </section>
  );
}
