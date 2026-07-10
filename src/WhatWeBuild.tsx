import { useEffect, useRef, useState } from 'react';

const ACCENTS = {
  blue: '#2f6df6',
  green: '#22c55e',
  orange: '#f97316',
  purple: '#8b5cf6',
  slate: '#94a3b8',
};

const CAPABILITIES = [
  'Enterprise Platforms',
  'AI Automation',
  'Internal Systems',
  'Customer Products',
  'Business Intelligence',
];

/* ── Primitives ──────────────────── */
const Bar = ({ w = 'w-full', h = 'h-1.5', tone = 'bg-black/15' }: { w?: string; h?: string; tone?: string }) => (
  <span className={`block ${w} ${h} rounded-full ${tone}`} />
);
const Dot = ({ color, size = 'w-2.5 h-2.5' }: { color: string; size?: string }) => (
  <span className={`${size} rounded-full`} style={{ background: color }} />
);
const Pill = ({ children, tone = 'bg-black/5 text-black/50' }: { children: React.ReactNode; tone?: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-[8px] font-medium ${tone}`}>{children}</span>
);
const CardHeader = ({ title, right }: { title: string; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-[10px] font-semibold text-black/80">{title}</span>
    {right}
  </div>
);

/* ── Card bodies ──────────────────── */
const DashboardCard = () => (
  <div className="flex h-full flex-col">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Dot color={ACCENTS.blue} />
        <span className="text-[11px] font-semibold text-black/80">BuyOps</span>
      </div>
      <div className="flex gap-1">
        <span className="h-5 w-5 rounded-md bg-black/5" />
        <span className="h-5 w-5 rounded-md bg-black/5" />
        <span className="h-5 w-5 rounded-md" style={{ background: `${ACCENTS.blue}33` }} />
      </div>
    </div>
    <div className="mb-4 grid grid-cols-2 gap-2">
      {['8 Humber Rd', '12 Fleet St', '4 Alice Ln', '6 Park Ave'].map((l) => (
        <div key={l} className="flex items-center gap-2 rounded-lg bg-black/[0.03] p-2">
          <span className="h-6 w-6 rounded" style={{ background: `${ACCENTS.blue}26` }} />
          <div className="flex flex-col gap-1">
            <Bar w="w-full" />
            <Bar w="w-10" h="h-1" tone="bg-black/10" />
          </div>
        </div>
      ))}
    </div>
    <div className="mb-2 flex h-16 items-end gap-1.5">
      {[30, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${ACCENTS.blue}4d, ${ACCENTS.blue})` }} />
      ))}
    </div>
    <div className="flex items-center justify-between border-t border-black/5 pt-2">
      <span className="text-[9px] uppercase tracking-wider text-black/40">Revenue</span>
      <span className="text-[13px] font-semibold text-black">$1.42M</span>
    </div>
  </div>
);

const ERPCard = () => {
  const modules = ['Finance', 'CRM', 'Projects', 'Inventory'];
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <Dot color={ACCENTS.orange} />
        <span className="text-[10px] font-semibold text-black/80">ERP Modules</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {modules.map((name) => (
          <div key={name} className="flex flex-col gap-1.5 rounded-lg p-2" style={{ background: `${ACCENTS.orange}14` }}>
            <span className="h-5 w-5 rounded-md" style={{ background: `${ACCENTS.orange}40` }} />
            <span className="text-[9px] font-medium text-black/70">{name}</span>
            <div className="flex items-center gap-1">
              <Bar w="w-6" h="h-1" tone="" />
              <Bar w="w-3" h="h-1" tone="bg-black/10" />
            </div>
          </div>
        ))}
      </div>
      <span className="mt-2 text-[8px] text-black/40">12 modules · 3 active</span>
    </div>
  );
};

const InvoiceCard = () => (
  <div className="flex h-full flex-col">
    <CardHeader title="Invoice #4821" right={<Pill tone="bg-[#22c55e]/15 text-[#16a34a]">Paid</Pill>} />
    <div className="flex flex-1 flex-col gap-2 rounded-lg bg-black/[0.03] p-3">
      <div className="flex justify-between text-[8px] text-black/40"><span>From</span><span>Due</span></div>
      <div className="flex justify-between">
        <Bar w="w-16" tone="bg-black/20" />
        <Bar w="w-12" tone="bg-black/20" />
      </div>
      <div className="mt-auto flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <Bar w="w-20" h="h-1" tone="bg-black/10" />
          <Bar w="w-14" h="h-1" tone="bg-black/10" />
        </div>
        <span className="text-[16px] font-semibold text-[#16a34a]">$8,400</span>
      </div>
    </div>
    <div className="mt-2 flex gap-2">
      <Pill tone="bg-[#22c55e]/15 text-[#16a34a]">● Received</Pill>
      <Pill>Reconciled</Pill>
    </div>
  </div>
);

const AIAssistantCard = () => (
  <div className="flex h-full flex-col">
    <div className="mb-3 flex items-center gap-2">
      <Dot color={ACCENTS.purple} />
      <span className="text-[10px] font-semibold text-black/80">A.R.I.A</span>
    </div>
    <div className="flex flex-1 flex-col gap-2">
      {[
        { from: 'user', text: "Summarize last week's leads" },
        { from: 'ai', text: '42 leads · 18 qualified · 6 demos booked.' },
        { from: 'user', text: 'Draft follow-ups' },
      ].map((msg, i) => (
        <div key={i} className={`max-w-[70%] rounded-2xl px-2.5 py-1.5 text-[9px] text-black/70 ${msg.from === 'user' ? 'self-end rounded-br-sm' : 'self-start rounded-bl-sm bg-black/5'}`} style={msg.from === 'user' ? { background: `${ACCENTS.purple}26` } : undefined}>
          {msg.text}
        </div>
      ))}
    </div>
    <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-black/5 px-2 py-1.5">
      <Dot color={ACCENTS.purple} size="w-1.5 h-1.5" />
      <span className="flex-1 text-[8px] text-black/40">Ask anything…</span>
      <span className="h-4 w-4 rounded" style={{ background: `${ACCENTS.purple}4d` }} />
    </div>
  </div>
);

const AnalyticsCard = () => (
  <div className="flex h-full flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold text-black/80">Analytics</span>
      <div className="flex gap-1">
        <span className="rounded bg-black/5 px-1.5 py-0.5 text-[7px]">7d</span>
        <span className="rounded bg-black px-1.5 py-0.5 text-[7px] text-white">30d</span>
      </div>
    </div>
    <div className="flex flex-1 gap-2">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-[6px] border-black/10" />
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent" style={{ borderTopColor: ACCENTS.blue, borderRightColor: ACCENTS.blue, transform: 'rotate(45deg)' }} />
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold">64%</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {[['Active', '1.2k'], ['Conv.', '4.8%'], ['Goal', '$48k']].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-md bg-black/[0.03] px-1.5 py-1">
            <span className="text-[7px] text-black/50">{k}</span>
            <span className="text-[8px] font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex h-6 items-end gap-1">
      {[40, 65, 50, 80, 60, 90].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-black/15" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

const TaskBoardCard = () => {
  const cols = [{ l: 'To Do', c: 2 }, { l: 'Doing', c: 1 }, { l: 'Done', c: 2 }];
  return (
    <div className="flex h-full flex-col">
      <CardHeader title="Task Board" right={<span className="text-[8px] text-black/40">Sprint 14</span>} />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {cols.map((col) => (
          <div key={col.l} className="flex flex-col gap-1">
            <span className="text-[7px] uppercase tracking-wide text-black/50">{col.l}</span>
            {Array.from({ length: col.c }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1 rounded-md bg-black/[0.04] p-1.5">
                <Bar w="w-full" h="h-1" />
                <Bar w="w-2/3" h="h-1" tone="bg-black/10" />
                <div className="mt-0.5 flex items-center justify-between">
                  <Dot color={`${ACCENTS.blue}4d`} size="w-3 h-3" />
                  <Bar w="w-4" h="h-1" tone="bg-black/10" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── 6 cards, positioned cleanly ──── */
const FLOATING_CARDS = [
  { id: 'erp', label: 'ERP Modules', top: '-5%', left: '-2%', w: 340, h: 240, rotate: -3, z: 10, Content: ERPCard },
  { id: 'dashboard', label: 'BuyOps Dashboard', top: '4%', left: '30%', w: 420, h: 270, rotate: 1, z: 14, Content: DashboardCard },
  { id: 'analytics', label: 'Analytics', top: '-2%', left: '70%', w: 280, h: 180, rotate: -2, z: 12, Content: AnalyticsCard },
  { id: 'invoice', label: 'Invoice Builder', top: '47%', left: '42%', w: 320, h: 220, rotate: 3, z: 16, Content: InvoiceCard },
  { id: 'tasks', label: 'Task Board', top: '50%', left: '2%', w: 290, h: 200, rotate: -1, z: 13, Content: TaskBoardCard },
  { id: 'ai', label: 'AI Assistant', top: '30%', left: '72%', w: 260, h: 200, rotate: 2, z: 15, Content: AIAssistantCard },
];

/* ── Hook ──── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect(); } }, { threshold });
    ob.observe(node);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function FloatingCard({ card, delay }: { card: (typeof FLOATING_CARDS)[number]; delay: number }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className="absolute rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] will-change-transform"
      style={{
        width: card.w,
        height: card.h,
        top: card.top,
        left: card.left,
        zIndex: card.z,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) rotate(0deg)' : 'translateY(50px) rotate(0deg)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div className="absolute left-4 top-3 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.16em] text-black/40">
        <span className="h-1 w-1 rounded-full bg-black/25" />
        {card.label}
      </div>
      <div className="h-full w-full pt-4">
        <card.Content />
      </div>
    </div>
  );
}

/* ── Section ──── */
export default function WhatWeBuild() {
  const [textRef, textInView] = useInView(0.25);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!textInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    [0, 150, 300, 450, 550, 650, 750, 850].forEach((d, i) => timers.push(setTimeout(() => setStep(i + 1), d)));
    return () => timers.forEach(clearTimeout);
  }, [textInView]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#EDEEF5] px-6 py-28 sm:px-8" style={{ minHeight: '110vh' }}>
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-0 md:grid-cols-[5fr_7fr] md:gap-24 md:px-12">
        {/* Copy */}
        <div ref={textRef} className="md:order-1">
          <p
            className="mb-7 text-[12px] font-semibold uppercase tracking-[0.32em]"
            style={{
              color: '#000',
              opacity: step >= 1 ? 0.45 : 0,
              transform: step >= 1 ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            What we build
          </p>
          <h2
            className="max-w-[580px] font-medium leading-[0.95]"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Not websites.
            <br />
            Complete digital businesses.
          </h2>
          <p
            className="mt-8 max-w-[540px] text-[17px] leading-relaxed"
            style={{
              color: '#555',
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            We design and engineer software that powers real businesses — from
            internal operations and AI automation to customer platforms used
            every day. Every product begins as a problem worth solving.
          </p>
          <ul className="mt-8 flex flex-col">
            {CAPABILITIES.map((item, idx) => (
              <li
                key={item}
                className="flex items-center gap-4 py-3 text-[17px]"
                style={{
                  opacity: step >= 4 + idx ? 1 : 0,
                  transform: step >= 4 + idx ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)`,
                  transitionDelay: `${idx * 60}ms`,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-black/20" />
                <span className="text-black/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cards wall */}
        <div className="relative hidden h-[600px] w-full md:block" style={{ perspective: 1800 }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          {FLOATING_CARDS.map((card, i) => (
            <FloatingCard key={card.id} card={card} delay={i * 70} />
          ))}
        </div>

        {/* Mobile fallback */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {FLOATING_CARDS.map((card) => (
            <div key={card.id} className="rounded-[20px] border border-black/[0.06] bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <div className="mb-3 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.16em] text-black/40">
                <span className="h-1 w-1 rounded-full bg-black/25" />
                {card.label}
              </div>
              <div className="h-[160px] w-full">
                <card.Content />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}