import { useEffect, useRef, useState } from 'react';

const METRICS_DATA = [
  { label: 'Screens',      target: 421 },
  { label: 'Workflows',    target: 98 },
  { label: 'Components',   target: 1280 },
  { label: 'Integrations', target: 62 },
];

const NOTES = [
  { done: true, text: 'Navigation approved' },
  { done: true, text: 'Workflow simplified' },
  { done: true, text: 'API connected' },
  { done: false, text: 'Authentication pending' },
  { done: true, text: 'UI validated' },
];

const SPEC_TAGS = [
  { label: 'API Layer',       x: 68,  y: 12 },
  { label: 'Authentication',  x: 12,  y: 36 },
  { label: 'Analytics',       x: 82,  y: 30 },
  { label: 'Automation',      x: 18,  y: 72 },
  { label: 'Permissions',     x: 76,  y: 68 },
  { label: 'Payments',        x: 52,  y: 4 },
  { label: 'Notifications',   x: 4,   y: 58 },
  { label: 'CRM',             x: 90,  y: 48 },
  { label: 'Inventory',       x: 34,  y: 82 },
  { label: 'Reporting',       x: 62,  y: 88 },
];

/* ── Blueprint SVG paths ─────────── */
// Each path: d string + start/end progress for drawing
const BLUEPRINT_PATHS = [
  // ── Outer frame
  { d: 'M 40,60 L 1160,60 L 1160,660 L 40,660 Z',                        start: 0.25, end: 0.30 },
  // ── Top navigation bar
  { d: 'M 40,60 L 1160,60 L 1160,110 L 40,110 Z',                       start: 0.45, end: 0.48 },
  // ── Logo area
  { d: 'M 60,72 L 120,72 L 120,98 L 60,98 Z',                           start: 0.48, end: 0.50 },
  { d: 'M 60,85 L 100,85',                                                start: 0.50, end: 0.51 },
  // ── Nav items
  { d: 'M 180,80 L 230,80 L 230,90 L 180,90 Z',                         start: 0.50, end: 0.52 },
  { d: 'M 250,80 L 300,80 L 300,90 L 250,90 Z',                         start: 0.50, end: 0.52 },
  { d: 'M 320,80 L 370,80 L 370,90 L 320,90 Z',                         start: 0.50, end: 0.52 },
  { d: 'M 390,80 L 440,80 L 440,90 L 390,90 Z',                         start: 0.50, end: 0.52 },
  // ── Avatar area
  { d: 'M 1140,70 A 15,15 0 1,1 1140,99',                                start: 0.52, end: 0.53 },
  // ── Sidebar
  { d: 'M 40,110 L 200,110 L 200,660 L 40,660 Z',                       start: 0.35, end: 0.40 },
  // ── Sidebar items
  { d: 'M 60,140 L 180,140',                                              start: 0.40, end: 0.42 },
  { d: 'M 60,170 L 180,170',                                              start: 0.40, end: 0.42 },
  { d: 'M 60,200 L 150,200',                                              start: 0.42, end: 0.43 },
  { d: 'M 60,230 L 180,230',                                              start: 0.42, end: 0.43 },
  { d: 'M 60,260 L 160,260',                                              start: 0.42, end: 0.44 },
  { d: 'M 60,290 L 140,290',                                              start: 0.42, end: 0.44 },
  { d: 'M 60,320 L 170,320',                                              start: 0.44, end: 0.45 },
  // ── Content cards
  { d: 'M 230,140 L 700,140 L 700,340 L 230,340 Z',                      start: 0.55, end: 0.58 },
  { d: 'M 730,140 L 1140,140 L 1140,340 L 730,340 Z',                    start: 0.58, end: 0.60 },
  { d: 'M 230,370 L 1140,370 L 1140,630 L 230,630 Z',                    start: 0.60, end: 0.63 },
  // ── Card 1 inner elements
  { d: 'M 250,165 L 680,165',                                             start: 0.63, end: 0.64 },
  { d: 'M 250,190 L 450,190',                                             start: 0.64, end: 0.65 },
  { d: 'M 250,215 L 400,215',                                             start: 0.65, end: 0.66 },
  { d: 'M 250,240 L 500,240',                                             start: 0.65, end: 0.66 },
  { d: 'M 250,265 L 380,265',                                             start: 0.65, end: 0.66 },
  // ── Card 2 inner (right panel)
  { d: 'M 750,165 L 1120,165',                                            start: 0.66, end: 0.67 },
  { d: 'M 750,195 L 850,195',                                             start: 0.67, end: 0.68 },
  { d: 'M 750,225 L 900,225',                                             start: 0.67, end: 0.68 },
  { d: 'M 750,255 L 880,255',                                             start: 0.68, end: 0.69 },
  // ── Chart bars (card 2)
  { d: 'M 900,170 L 900,310 L 910,310 L 910,170 Z',                      start: 0.69, end: 0.71 },
  { d: 'M 930,200 L 930,310 L 940,310 L 940,200 Z',                      start: 0.69, end: 0.71 },
  { d: 'M 960,180 L 960,310 L 970,310 L 970,180 Z',                      start: 0.70, end: 0.71 },
  { d: 'M 990,230 L 990,310 L 1000,310 L 1000,230 Z',                    start: 0.70, end: 0.71 },
  { d: 'M 1020,190 L 1020,310 L 1030,310 L 1030,190 Z',                  start: 0.71, end: 0.72 },
  { d: 'M 1050,240 L 1050,310 L 1060,310 L 1060,240 Z',                  start: 0.71, end: 0.72 },
  // ── Pie/donut chart
  { d: 'M 1130,165 A 20,20 0 1,1 1130,204',                               start: 0.72, end: 0.73 },
  { d: 'M 1130,165 A 20,20 0 1,0 1130,204',                               start: 0.72, end: 0.73 },
  // ── Table (card 3 - wide bottom)
  { d: 'M 250,395 L 1120,395',                                            start: 0.73, end: 0.74 },
  { d: 'M 250,425 L 1120,425',                                            start: 0.73, end: 0.74 },
  { d: 'M 250,455 L 1120,455',                                            start: 0.74, end: 0.75 },
  { d: 'M 250,485 L 1120,485',                                            start: 0.74, end: 0.75 },
  { d: 'M 250,515 L 1120,515',                                            start: 0.74, end: 0.75 },
  { d: 'M 250,545 L 1120,545',                                            start: 0.74, end: 0.75 },
  // ── Table columns
  { d: 'M 400,395 L 400,575',                                              start: 0.75, end: 0.76 },
  { d: 'M 550,395 L 550,575',                                              start: 0.75, end: 0.76 },
  { d: 'M 700,395 L 700,575',                                              start: 0.75, end: 0.76 },
  { d: 'M 850,395 L 850,575',                                              start: 0.75, end: 0.76 },
  { d: 'M 1000,395 L 1000,575',                                            start: 0.75, end: 0.76 },
  // ── Buttons / toggles
  { d: 'M 1050,155 C 1050,155 1065,155 1065,165 C 1065,175 1050,175 1050,175', start: 0.65, end: 0.66 },
  { d: 'M 250,570 L 350,570 L 350,585 L 250,585 Z',                      start: 0.77, end: 0.78 },
  { d: 'M 370,570 L 470,570 L 470,585 L 370,585 Z',                      start: 0.77, end: 0.78 },
  // ── Status dots
  { d: 'M 270,605 A 5,5 0 1,1 270,614',                                   start: 0.79, end: 0.80 },
  { d: 'M 295,605 A 5,5 0 1,1 295,614',                                   start: 0.79, end: 0.80 },
  { d: 'M 320,605 A 5,5 0 1,1 320,614',                                   start: 0.79, end: 0.80 },
  // ── Small icons
  { d: 'M 60,360 L 70,370 M 70,360 L 60,370',                             start: 0.43, end: 0.44 },
  { d: 'M 60,400 L 72,400 M 66,394 L 66,406',                             start: 0.43, end: 0.44 },
  { d: 'M 62,440 L 72,440 M 67,435 L 67,445 M 62,445 L 72,445',           start: 0.43, end: 0.44 },
];

/* ── Guide lines ── */
const GUIDE_H = [130, 160, 190, 220, 250, 280, 310, 360, 390, 420, 450, 480, 510, 540, 570];
const GUIDE_V = [80, 120, 160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 880, 940, 1000, 1060, 1120];

/* ── Utility ── */
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/* ── Build Metrics counter ──────── */
function AnimatedNumber({ target, progress }: { target: number; progress: number }) {
  const val = Math.round(target * clamp(progress * 1.3, 0, 1));
  return <span>{val}</span>;
}

/* ── Corner Construction Marks SVG ── */
function CornerMarks() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="none">
      {/* Top-left */}
      <path d="M 0,0 L 40,0 M 0,0 L 0,40 M 6,10 L 10,6 M 30,6 L 34,10 M 10,30 L 6,34" stroke="#94a3b8" strokeWidth="0.8" fill="none" />
      <line x1="18" y1="0" x2="18" y2="8" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="0" y1="18" x2="8" y2="18" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Top-right */}
      <path d="M 1200,0 L 1160,0 M 1200,0 L 1200,40 M 1194,10 L 1190,6 M 1170,6 L 1166,10 M 1190,30 L 1194,34" stroke="#94a3b8" strokeWidth="0.8" fill="none" />
      <line x1="1182" y1="0" x2="1182" y2="8" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="1200" y1="18" x2="1192" y2="18" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Bottom-left */}
      <path d="M 0,700 L 40,700 M 0,700 L 0,660 M 6,690 L 10,694 M 30,694 L 34,690 M 10,670 L 6,666" stroke="#94a3b8" strokeWidth="0.8" fill="none" />
      <line x1="18" y1="700" x2="18" y2="692" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="0" y1="682" x2="8" y2="682" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Bottom-right */}
      <path d="M 1200,700 L 1160,700 M 1200,700 L 1200,660 M 1194,690 L 1190,694 M 1170,694 L 1166,690 M 1190,670 L 1194,666" stroke="#94a3b8" strokeWidth="0.8" fill="none" />
      <line x1="1182" y1="700" x2="1182" y2="692" stroke="#94a3b8" strokeWidth="0.5" />
      <line x1="1200" y1="682" x2="1192" y2="682" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Registration circles */}
      <circle cx="20" cy="20" r="3" stroke="#94a3b8" strokeWidth="0.4" fill="none" />
      <circle cx="1180" cy="20" r="3" stroke="#94a3b8" strokeWidth="0.4" fill="none" />
      <circle cx="20" cy="680" r="3" stroke="#94a3b8" strokeWidth="0.4" fill="none" />
      <circle cx="1180" cy="680" r="3" stroke="#94a3b8" strokeWidth="0.4" fill="none" />
      {/* Dimension arrows top */}
      <line x1="40" y1="14" x2="1160" y2="14" stroke="#94a3b8" strokeWidth="0.4" />
      <polyline points="40,10 44,14 40,18" fill="none" stroke="#94a3b8" strokeWidth="0.4" />
      <polyline points="1160,10 1156,14 1160,18" fill="none" stroke="#94a3b8" strokeWidth="0.4" />
    </svg>
  );
}

/* ── Component ── */
export default function BlueprintSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const height = rect.height;
      const vh = window.innerHeight;
      const p = clamp((vh - top) / (height - vh), 0, 1);
      setProgress(p);
      if (p > 0.75) setMetricsVisible(true);
      if (p > 0.78) setNotesVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse tracking for label attraction
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // SVG path drawing via stroke-dashoffset
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>('[data-start]');
    paths.forEach((path) => {
      const start = parseFloat(path.dataset.start || '0');
      const end = parseFloat(path.dataset.end || '1');
      const localP = clamp((progress - start) / (end - start), 0, 1);
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len * (1 - localP));
    });
  }, [progress]);

  // Label attraction from cursor
  useEffect(() => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      const label = SPEC_TAGS[i];
      // compute label center in viewport
      const cx = rect.left + rect.width * label.x / 100;
      const cy = rect.top + rect.height * label.y / 100;
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 60;
      if (dist < maxDist) {
        const pull = (1 - dist / maxDist) * 4;
        const angle = Math.atan2(dy, dx);
        el.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
      } else {
        el.style.transform = '';
      }
    });
  }, [mouse]);

  // Periodic redraw of a random blueprint line
  useEffect(() => {
    const interval = setInterval(() => {
      const paths = svgRef.current?.querySelectorAll<SVGPathElement>('[data-start]');
      if (!paths || paths.length === 0) return;
      const idx = Math.floor(Math.random() * paths.length);
      const path = paths[idx];
      const len = path.getTotalLength();
      path.style.transition = 'stroke-dashoffset 3s ease';
      path.style.strokeDashoffset = String(len);
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 0.1s ease';
        const start = parseFloat(path.dataset.start || '0');
        const end = parseFloat(path.dataset.end || '1');
        const localP = clamp((progress - start) / (end - start), 0, 1);
        path.style.strokeDashoffset = String(len * (1 - localP));
      }, 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, [progress]);

  // Occasional measurement line extension
  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.querySelector('.measurement-line');
      if (el) {
        el.classList.add('active');
        setTimeout(() => el.classList.remove('active'), 1500);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const liftOffset = progress > 0.95 ? clamp((progress - 0.95) / 0.05, 0, 1) * 30 : 0;

  return (
    <section ref={sectionRef} className="relative bg-[#EDEEF5]" style={{ minHeight: '180vh' }}>
      {/* Sticky wrapper pinned for first 80vh */}
      <div className="sticky top-0 flex items-center justify-center" style={{ height: '100vh' }}>
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative overflow-hidden rounded-[34px]"
          style={{
            width: 'min(92vw, 1440px)',
            height: '78vh',
            background: '#f8f9fc',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.06)',
            transform: `translateY(${-liftOffset}px)`,
            transition: 'transform 0.8s ease',
          }}
        >
          {/* ── Canvas inner ── */}

          {/* Construction grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: clamp((progress - 0) / 0.15, 0, 1) * 0.28,
              backgroundImage:
                'linear-gradient(to right, #d9dde6 1px, transparent 1px), linear-gradient(to bottom, #d9dde6 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              transform: 'translate(0.3px, 0.15px)',
              transition: 'opacity 0.5s ease',
            }}
          />
          {/* Thicker guides every 128px */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: clamp((progress - 0) / 0.15, 0, 1) * 0.45,
              backgroundImage:
                'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
              backgroundSize: '128px 128px',
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Corner construction marks */}
          <CornerMarks />

          {/* ── Header top-left ── */}
          <div
            className="absolute top-6 left-6 z-10"
            style={{
              opacity: clamp((progress - 0) / 0.2, 0, 1),
              transition: 'opacity 0.8s ease',
            }}
          >
            <div className="text-[12px] uppercase tracking-[0.3em] text-black/50 mb-1">
              PROJECT
            </div>
            <div className="text-[clamp(28px,4vw,44px)] font-medium text-black leading-[1]" style={{ fontFamily: 'var(--font-heading)' }}>
              Blueprint
            </div>
            <p className="mt-3 text-[17px] leading-relaxed text-black/60" style={{ maxWidth: '420px' }}>
              Every product begins long before a single line of code is written. We map systems, simplify complexity, and design software that scales with the people using it.
            </p>
          </div>

          {/* ── Right metadata ── */}
          <div
            className="absolute top-6 right-6 z-10 text-right"
            style={{
              opacity: clamp((progress - 0.05) / 0.15, 0, 1),
              transition: 'opacity 0.8s ease',
            }}
          >
              {[
                ['Project', 'Enterprise ERP'],
                ['Status', 'In Design'],
                ['Complexity', '128 Modules'],
              ].map(([k, v]) => (
                <div key={k as string} className="mb-2">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-black/40">{k}</div>
                  <div className="text-[17px] font-medium text-black">{v}</div>
                </div>
              ))}
          </div>

          {/* ── Guide lines ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet" style={{ opacity: clamp((progress - 0.25) / 0.1, 0, 1) * 0.3 }}>
            {GUIDE_H.map((y, i) => (
              <line key={`gh-${i}`} x1="40" y1={y} x2="1160" y2={y} stroke="#a5b4fc" strokeWidth="0.6" strokeDasharray="4,8" />
            ))}
            {GUIDE_V.map((x, i) => (
              <line key={`gv-${i}`} x1={x} y1="60" x2={x} y2="660" stroke="#a5b4fc" strokeWidth="0.6" strokeDasharray="4,8" />
            ))}
            {/* Measurement labels */}
            {[0, 128, 256, 384, 512, 640, 768, 896, 1024].map((n, i) => (
              <text key={`mx-${i}`} x={40 + n + 4} y="54" fill="#94a3b8" fontSize="6" fontFamily="monospace">{n}</text>
            ))}
          </svg>

          {/* ── Blueprint SVG drawing ── */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid meet"
            style={{ opacity: clamp((progress - 0.3) / 0.05, 0, 1) }}
          >
            {BLUEPRINT_PATHS.map((p, i) => (
              <path
                key={i}
                d={p.d}
                data-start={p.start}
                data-end={p.end}
                stroke="#1e293b"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            ))}
          </svg>

          {/* ── Floating spec labels ── */}
          {SPEC_TAGS.map((tag, i) => {
            const tagProgress = clamp((progress - 0.75) / 0.1, 0, 1);
            return (
              <div key={tag.label} className="absolute z-20" style={{ top: `${tag.y}%`, left: `${tag.x}%`, opacity: tagProgress, transition: 'opacity 0.6s ease' }}>
                {/* Leader line */}
                <svg className="absolute pointer-events-none" style={{ width: 80, height: 30, top: -10, left: -20 }}>
                  <line x1="0" y1="15" x2="60" y2="15" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,3" opacity={tagProgress} />
                  <circle cx="60" cy="15" r="2" fill="#94a3b8" opacity={tagProgress * 0.5} />
                </svg>
                {/* Label pill */}
                <div
                  ref={(el) => { labelRefs.current[i] = el; }}
                  className="rounded-full bg-white px-3 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/5 text-[12px] text-black/70 whitespace-nowrap transition-transform duration-300"
                >
                  {tag.label}
                </div>
              </div>
            );
          })}

          {/* ── Build Metrics ── */}
          <div
            className="absolute bottom-5 left-6 z-10"
            style={{
              opacity: metricsVisible ? 1 : 0,
              transform: metricsVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/40 mb-2">Build Metrics</div>
            <div className="flex gap-6">
              {METRICS_DATA.map((m) => (
                <div key={m.label}>
                  <div className="text-[17px] font-semibold text-black tabular-nums">
                    <AnimatedNumber target={m.target} progress={progress} />
                  </div>
                  <div className="text-[12px] text-black/50 uppercase tracking-[0.05em]">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Engineering Notes ── */}
          <div
            className="absolute bottom-5 right-6 z-10"
            style={{
              opacity: notesVisible ? 1 : 0,
              transform: notesVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/40 mb-1.5 text-right">Engineering Notes</div>
            <div className="bg-white/70 backdrop-blur rounded-xl border border-black/5 p-3 shadow-sm">
              {NOTES.map((note, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] leading-relaxed">
                  <span style={{ color: note.done ? '#22c55e' : '#94a3b8', fontFamily: 'serif' }}>
                    {note.done ? '✓' : '○'}
                  </span>
                  <span style={{ textDecoration: note.done ? 'none' : 'none', color: note.done ? '#000' : '#000' }}>
                    {note.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Measurement line animation ── */}
          <div
            className="measurement-line absolute pointer-events-none"
            style={{
              bottom: '30%',
              left: '20%',
              width: 0,
              height: 1,
              background: '#a5b4fc',
              transition: 'width 1.5s ease',
              opacity: 0.4,
            }}
          />

        </div>
      </div>
    </section>
  );
}
