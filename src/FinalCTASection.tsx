import { useEffect, useRef, useState } from 'react';

export default function FinalCTASection() {
  const [copied, setCopied] = useState(false);
  const [cursorDot, setCursorDot] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@uptipro.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  // Cursor dot: on click anywhere in section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      setCursorDot({ x: e.clientX, y: e.clientY });
      setTimeout(() => setCursorDot(null), 1200);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '120vh', background: '#FFFFFF' }}
    >
      {/* Cursor point that fades */}
      {cursorDot && (
        <div
          className="fixed pointer-events-none z-[999]"
          style={{
            left: cursorDot.x,
            top: cursorDot.y,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#2f6df6',
            transform: 'translate(-50%, -50%)',
            animation: 'cursorDotFade 1.2s ease-out forwards',
          }}
        />
      )}

      <div className="text-center px-6 max-w-[800px]">
        <div
          className="text-[clamp(40px,6vw,80px)] font-medium text-black leading-[0.9] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Let's build<br />something<br />worth remembering.
        </div>

        <p className="text-[17px] leading-relaxed text-black/60 max-w-[560px] mx-auto mb-10">
          Whether you're building an internal platform, a customer-facing product, or the next ambitious idea, we'd love to help engineer the system behind it.
        </p>

        <a
          href="#"
          className="inline-flex items-center justify-center text-white font-medium rounded-full no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(47,109,246,0.25)]"
          style={{
            background: '#2f6df6',
            height: 64,
            paddingLeft: 56,
            paddingRight: 56,
            fontSize: 16,
          }}
        >
          Start a Conversation
        </a>

        <div className="mt-6">
          <button
            onClick={handleCopy}
            className="text-[17px] underline underline-offset-2 text-black/50 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
          >
            hello@uptipro.com
          </button>
          {copied && <span className="ml-2 text-[11px] text-[#22c55e]">Copied!</span>}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 text-[12px] text-black/30">
        <span className="font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>UPTIPRO</span>
        <span className="text-center hidden sm:block">Systems engineered for scale.</span>
        <span>© 2026</span>
      </footer>

      <style>{`
        @keyframes cursorDotFade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
      `}</style>
    </section>
  );
}
