import { useEffect, useRef, useState, type ReactElement } from 'react';

type CardDef = {
  id: number;
  label: string;
  w: number;
  h: number;
  top: string; // % of container
  left: string; // % of container
  rotate: number; // degrees
  depth: number; // 0..1 parallax amount multiplier (smaller = moves more)
};

/*
 * depth controls how much a card drifts on scroll.
 * The smaller the `depth` value, the further the card travels upward.
 * Large hero cards (dashboard) stay almost still; tiny cards drift most.
 */
const CARDS: CardDef[] = [
  { id: 1, label: 'BuyOps Dashboard', w: 420, h: 270, top: '6%', left: '52%', rotate: -5, depth: 0.3 },
  { id: 2, label: 'Invoice Builder', w: 320, h: 220, top: '40%', left: '70%', rotate: 4, depth: 0.55 },
  { id: 3, label: 'ERP Modules', w: 340, h: 240, top: '2%', left: '20%', rotate: -2, depth: 0.4 },
  { id: 4, label: 'AI Assistant', w: 260, h: 200, top: '70%', left: '58%', rotate: 6, depth: 0.7 },
  { id: 5, label: 'Analytics', w: 280, h: 180, top: '30%', left: '40%', rotate: -2, depth: 0.65 },
  { id: 6, label: 'Task Board', w: 300, h: 200, top: '56%', left: '20%', rotate: 4, depth: 0.75 },
  { id: 7, label: 'Map', w: 240, h: 160, top: '78%', left: '36%', rotate: -3, depth: 0.85 },
  { id: 8, label: 'Pipeline', w: 260, h: 180, top: '34%', left: '6%', rotate: 2, depth: 0.8 },
  { id: 9, label: 'Notifications', w: 220, h: 200, top: '12%', left: '78%', rotate: -4, depth: 0.9 },
  { id: 10, label: 'Admin Panel', w: 250, h: 170, top: '50%', left: '82%', rotate: 5, depth: 0.95 },
];

const MAX_PARALLAX = 220; // px the fastest card travels over a full viewport pass

/* ------------------------------ UI card bodies ------------------------------ */

function Card1Dashboard() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2f6df6]" />
          <span className="text-[11px] font-semibold tracking-wide text-black/80">BuyOps</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-5 h-5 rounded-md bg-black/5" />
          <span className="w-5 h-5 rounded-md bg-black/5" />
          <span className="w-5 h-5 rounded-md bg-[#2f6df6]/20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {['8 Humber Rd', '12 Fleet St', '4 Alice Ln', '6 Park Ave'].map((p, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/[0.03]">
            <span className="w-6 h-6 rounded bg-[#2f6df6]/15" />
            <div className="flex flex-col gap-1">
              <span className="w-full h-1.5 rounded-full bg-black/15" />
              <span className="w-10 h-1 rounded-full bg-black/10" />
            </div>
            <span className="sr-only">{p}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 h-20 mb-2">
        {[30, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-[#2f6df6]/30 to-[#2f6df6]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-black/5">
        <span className="text-[9px] uppercase tracking-wider text-black/40">Revenue</span>
        <span className="text-[13px] font-semibold text-black">$1.42M</span>
      </div>
    </div>
  );
}

function Card2Invoice() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-black/70">Invoice #4821</span>
        <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/15 text-[#16a34a] text-[9px] font-medium">Paid</span>
      </div>
      <div className="rounded-lg bg-black/[0.03] p-3 flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-[8px] text-black/40">From</span>
          <span className="text-[8px] text-black/40">Due</span>
        </div>
        <div className="flex justify-between">
          <span className="w-16 h-1.5 rounded bg-black/20" />
          <span className="w-12 h-1.5 rounded bg-black/20" />
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="w-20 h-1 rounded bg-black/10" />
            <span className="w-14 h-1 rounded bg-black/10" />
          </div>
          <span className="text-[16px] font-semibold text-[#16a34a]">$8,400</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <span className="px-2 py-1 rounded-md bg-[#22c55e]/15 text-[#16a34a] text-[8px] font-medium">● Received</span>
        <span className="px-2 py-1 rounded-md bg-black/5 text-black/50 text-[8px]">Reconciled</span>
      </div>
    </div>
  );
}

function Card3Erp() {
  const rows = [
    ['Finance', '#f97316'],
    ['CRM', '#f97316'],
    ['Projects', '#f97316'],
    ['Inventory', '#f97316'],
  ];
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
        <span className="text-[10px] font-semibold text-black/80">ERP Modules</span>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {rows.map(([label]) => (
          <div key={label} className="flex flex-col gap-1.5 p-2 rounded-lg bg-[#f97316]/8">
            <span className="w-5 h-5 rounded-md bg-[#f97316]/25" />
            <span className="text-[9px] font-medium text-black/70">{label}</span>
            <div className="flex items-center gap-1">
              <span className="w-6 h-1 rounded-full bg-[#f97316]/40" />
              <span className="w-3 h-1 rounded-full bg-black/10" />
            </div>
          </div>
        ))}
      </div>
      <span className="mt-2 text-[8px] text-black/40">12 modules · 3 active</span>
    </div>
  );
}

function Card4Assistant() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
        <span className="text-[10px] font-semibold text-black/80">A.R.I.A</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="self-end max-w-[70%] rounded-2xl rounded-br-sm bg-[#8b5cf6]/15 px-2.5 py-1.5">
          <span className="text-[9px] text-black/70">Summarize last week's leads</span>
        </div>
        <div className="self-start max-w-[70%] rounded-2xl rounded-bl-sm bg-black/5 px-2.5 py-1.5">
          <span className="text-[9px] text-black/70">42 leads · 18 qualified · 6 demos booked.</span>
        </div>
        <div className="self-end max-w-[60%] rounded-2xl rounded-br-sm bg-[#8b5cf6]/15 px-2.5 py-1.5">
          <span className="text-[9px] text-black/70">Draft follow-ups</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2 rounded-lg bg-black/5 px-2 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
        <span className="text-[8px] text-black/40 flex-1">Ask anything…</span>
        <span className="w-4 h-4 rounded bg-[#8b5cf6]/30" />
      </div>
    </div>
  );
}

function Card5Analytics() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-black/80">Analytics</span>
        <div className="flex gap-1">
          <span className="px-1.5 py-0.5 rounded bg-black/5 text-[7px]">7d</span>
          <span className="px-1.5 py-0.5 rounded bg-black text-white text-[7px]">30d</span>
        </div>
      </div>
      <div className="flex gap-2 flex-1">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[6px] border-black/10" />
          <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-[#2f6df6] border-r-[#2f6df6]" style={{ transform: 'rotate(45deg)' }} />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold">64%</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          {[
            ['Active', '1.2k'],
            ['Conv.', '4.8%'],
            ['Goal', '$48k'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-md bg-black/[0.03] px-1.5 py-1">
              <span className="text-[7px] text-black/50">{k}</span>
              <span className="text-[8px] font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-1 h-6">
        {[40, 65, 50, 80, 60, 90].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-black/15" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function Card6Tasks() {
  const cols = [['To Do', 2], ['Doing', 1], ['Done', 2]];
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-black/80">Task Board</span>
        <span className="text-[8px] text-black/40">Sprint 14</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {cols.map(([label, count]) => (
          <div key={label as string} className="flex flex-col gap-1">
            <span className="text-[7px] uppercase tracking-wide text-black/50">{label}</span>
            {Array.from({ length: count as number }).map((_, i) => (
              <div key={i} className="rounded-md bg-black/[0.04] p-1.5 flex flex-col gap-1">
                <span className="w-full h-1 rounded bg-black/20" />
                <span className="w-2/3 h-1 rounded bg-black/10" />
                <div className="flex items-center justify-between mt-0.5">
                  <span className="w-3 h-3 rounded-full bg-[#2f6df6]/30" />
                  <span className="w-4 h-1 rounded bg-black/10" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card7Map() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-[#e8edf5]" />
      <div className="absolute inset-x-2 top-6 h-px bg-black/10" />
      <div className="absolute inset-x-2 top-12 h-px bg-black/10" />
      <div className="absolute inset-y-2 left-8 w-px bg-black/10" />
      <div className="absolute inset-y-2 left-16 w-px bg-black/10" />
      {/* a road */}
      <div className="absolute left-0 top-1/3 w-full h-1 bg-white/70" />
      <div className="absolute left-1/4 top-0 w-1 h-full bg-white/70" />
      {[
        ['18%', '30%'],
        ['55%', '55%'],
        ['72%', '25%'],
        ['35%', '70%'],
      ].map(([t, l], i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: t, left: l }}>
          <span className="block w-2.5 h-2.5 rounded-full bg-[#2f6df6] ring-2 ring-white shadow" />
        </div>
      ))}
      <div className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5">
        <span className="text-[7px] text-black/60">4 listings</span>
      </div>
    </div>
  );
}

function Card8Pipeline() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-black/80">Pipeline</span>
        <span className="text-[8px] text-black/40">Q3 · $240k</span>
      </div>
      {[
        ['Discovery', '#cbd5e1', 5],
        ['Proposal', '#a5b4fc', 3],
        ['Negotiation', '#fbbf24', 2],
        ['Closing', '#86efac', 1],
      ].map(([label, color, n]) => (
        <div key={label as string} className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-sm" style={{ background: color as string }} />
          <div className="flex-1 flex items-center justify-between rounded-md bg-black/[0.03] px-1.5 py-1">
            <span className="text-[8px] text-black/70">{label}</span>
            <span className="text-[8px] font-semibold text-black/60">{n}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card9Notifications() {
  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-black/80">Activity</span>
        <span className="px-1.5 py-0.5 rounded-full bg-[#2f6df6]/15 text-[#2f6df6] text-[7px] font-medium">3 new</span>
      </div>
      {[
        ['AP', '#2f6df6', 'Payment received'],
        ['JD', '#22c55e', 'Lead assigned'],
        ['MK', '#f97316', 'Invoice overdue'],
        ['RS', '#8b5cf6', 'New signup'],
      ].map(([ini, c, msg], i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-semibold text-white" style={{ background: c as string }}>{ini}</span>
          <span className="text-[8px] text-black/70 flex-1">{msg}</span>
          <span className="text-[7px] text-black/35">{i + 1}h</span>
        </div>
      ))}
    </div>
  );
}

function Card10Admin() {
  return (
    <div className="w-full h-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-black/80">Admin</span>
        <span className="text-[7px] text-black/40">settings</span>
      </div>
      <div className="flex gap-1">
        <span className="px-1.5 py-0.5 rounded bg-black text-white text-[7px]">Users</span>
        <span className="px-1.5 py-0.5 rounded bg-black/5 text-black/60 text-[7px]">Roles</span>
        <span className="px-1.5 py-0.5 rounded bg-black/5 text-black/60 text-[7px]">Audit</span>
      </div>
      {[
        ['Anya Petrov', 'Owner', '#2f6df6'],
        ['Mason Lee', 'Editor', '#22c55e'],
        ['Iris Cole', 'Viewer', '#94a3b8'],
      ].map(([name, role, c]) => (
        <div key={name as string} className="flex items-center gap-2 rounded-md bg-black/[0.03] px-1.5 py-1">
          <span className="w-4 h-4 rounded-full text-[6px] font-semibold text-white flex items-center justify-center" style={{ background: c as string }}>
            {(name as string).slice(0, 1)}
          </span>
          <span className="text-[8px] text-black/70 flex-1">{name}</span>
          <span className="text-[7px] text-black/40">{role}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-1.5 rounded bg-black/[0.03] px-1.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
        <span className="text-[7px] text-black/50">Audit log · 2,481 events</span>
      </div>
    </div>
  );
}

const CARD_BODY: Record<number, () => ReactElement> = {
  1: Card1Dashboard,
  2: Card2Invoice,
  3: Card3Erp,
  4: Card4Assistant,
  5: Card5Analytics,
  6: Card6Tasks,
  7: Card7Map,
  8: Card8Pipeline,
  9: Card9Notifications,
  10: Card10Admin,
};

const MINI_LIST = [
  'Enterprise Platforms',
  'AI Automation',
  'Internal Systems',
  'Customer Products',
  'Business Intelligence',
];

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  // Viewport fade-in
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.18 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // Stagger card reveal once visible (80ms between each card)
  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= CARDS.length; i++) {
      timers.push(setTimeout(() => setRevealedCount(i), (i - 1) * 80));
    }
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Combined scroll parallax + mouse rotation rAF loop
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    let targetMx = 0;
    let targetMy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetMx = (e.clientX - cx) / (rect.width / 2);
      targetMy = (e.clientY - cy) / (rect.height / 2);
    };

    const onScroll = () => {
      // trigger rAF
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      raf = 0;
      // smooth mouse toward target (springy)
      mx += (targetMx - mx) * 0.08;
      my += (targetMy - my) * 0.08;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress = -1 when section top at viewport bottom, +1 when section bottom at viewport top
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / ((vh + rect.height) / 2);

      // Text fade
      if (textRef.current) {
        const fade = Math.max(0, Math.min(1, 1 - (rect.top < 0 ? Math.abs(rect.top) / rect.height : 0) * 1.4));
        textRef.current.style.opacity = String(fade);
      }

      CARDS.forEach((c, i) => {
        const node = cardRefs.current[i];
        if (!node) return;
        // parallax: depth 0..1; smaller depth -> moves MORE
        const amount = (1 - c.depth) * MAX_PARALLAX;
        const py = -progress * amount;
        const ry = mx * 6 * (0.4 + c.depth * 0.4);
        const rx = -my * 5 * (0.4 + c.depth * 0.4);
        const isHover = hovered === c.id;
        const hoverY = isHover ? -12 : 0;
        const scale = isHover ? 1.02 : 1;
        node.style.transform = `translate3d(0, ${py + hoverY}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${c.rotate}deg) scale(${scale})`;
        node.style.boxShadow = isHover
          ? '0 40px 100px rgba(0,0,0,0.18)'
          : '0 20px 70px rgba(0,0,0,0.08)';
      });

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hovered]);

  return (
    <section
      ref={sectionRef}
      className="relative flex justify-center items-center overflow-hidden"
      style={{
        minHeight: '110vh',
        paddingTop: '120px',
        paddingBottom: '120px',
        background: '#EDEEF5',
      }}
    >
      <div
        className="max-w-[1500px] w-full mx-auto px-6 sm:px-8"
        style={{ paddingLeft: 48, paddingRight: 48 }}
      >
        <div
          data-wwb-grid=""
          className="grid grid-cols-1 md:grid-cols-[5fr_7fr] items-center gap-[60px] md:gap-[90px] w-full"
        >
          {/* LEFT column */}
          <div ref={textRef} className="md:order-1">
            <div
              className="uppercase font-semibold mb-7"
              style={{ fontSize: '13px', letterSpacing: '.32em', opacity: 0.45 }}
            >
              WHAT WE BUILD
            </div>

            <h2
              style={{
                fontSize: 'clamp(42px, 5vw, 82px)',
                lineHeight: 0.95,
                fontWeight: 500,
                maxWidth: '580px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Not websites. Complete digital businesses.
            </h2>

            <p
              className="mt-9"
              style={{ fontSize: '20px', lineHeight: 1.6, maxWidth: '540px', color: '#555' }}
            >
              We design and engineer software that powers real businesses—from
              internal operations and AI automation to customer platforms used
              every day. Every product begins as a problem worth solving.
            </p>

            <div className="mt-8 flex flex-col">
              {MINI_LIST.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-[18px]"
                  style={{ fontSize: '15px', padding: '12px 0' }}
                >
                  <span className="w-2 h-2 rounded-full bg-black opacity-20" />
                  <span className="text-black/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column — floating wall of interface cards */}
          <div
            className="relative w-full"
            style={{ height: 720, perspective: '1800px' }}
          >
            {/* construction grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.03,
                backgroundImage:
                  'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {CARDS.map((c, i) => {
              const Body = CARD_BODY[c.id];
              const steppedIn = visible && i < revealedCount;
              return (
                <div
                  key={c.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute"
                  style={{
                    width: c.w,
                    height: c.h,
                    top: c.top,
                    left: c.left,
                    background: 'white',
                    borderRadius: '24px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 20px 70px rgba(0,0,0,0.08)',
                    padding: '24px',
                    backdropFilter: 'blur(20px)',
                    transformStyle: 'preserve-3d',
                    transition:
                      'opacity 0.7s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
                    opacity: steppedIn ? 1 : 0,
                    zIndex: 10 + i,
                  }}
                >
                  {/* label chip */}
                  <div
                    className="absolute top-3 left-4 flex items-center gap-1.5"
                    style={{
                      fontSize: '8px',
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,.4)',
                    }}
                  >
                    <span
                      style={{
                        background: '#000',
                        width: 4,
                        height: 4,
                        borderRadius: 99,
                        opacity: 0.25,
                      }}
                    />
                    {c.label}
                  </div>
                  <div className="w-full h-full pt-4">
                    <Body />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          [data-wwb-grid] { display: block !important; }
          [data-wwb-grid] > div { transform: none !important; }
        }
      `}</style>
    </section>
  );
}