import { useEffect, useRef, useState } from 'react';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DESIGN TOKENS
 * ─────────────────────────────────────────────────────────────────────────
 */
const ACCENTS = {
  blue: '#2f6df6',
  green: '#22c55e',
  greenDark: '#16a34a',
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

/**
 * ─────────────────────────────────────────────────────────────────────────
 * PRIMITIVES
 * ─────────────────────────────────────────────────────────────────────────
 */
const Bar = ({ w = 'w-full', h = 'h-1.5', tone = 'bg-black/15' }) => (
  <span className={`block ${w} ${h} rounded-full ${tone}`} />
);

const Dot = ({ color, size = 'w-2.5 h-2.5' }: { color: string; size?: string }) => (
  <span className={`${size} rounded-full`} style={{ background: color }} />
);

const Avatar = ({ initials, color }: { initials: string; color: string }) => (
  <span
    className="flex items-center justify-center rounded-full text-[7px] font-semibold text-white shrink-0"
    style={{ background: color, width: 20, height: 20 }}
  >
    {initials}
  </span>
);

const Pill = ({ children, tone = 'bg-black/5 text-black/50' }: { children: React.ReactNode; tone?: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-[8px] font-medium ${tone}`}>
    {children}
  </span>
);

const CardHeader = ({ title, right }: { title: string; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-[10px] font-semibold text-black/80">{title}</span>
    {right}
  </div>
);

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CARD CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 */
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
    <div className="mb-4 grid grid-cols-2 gap-3">
      {['8 Humber Rd', '12 Fleet St', '4 Alice Ln', '6 Park Ave'].map((label) => (
        <div key={label} className="flex items-center gap-2 rounded-lg bg-black/[0.03] p-2">
          <span className="h-6 w-6 rounded" style={{ background: `${ACCENTS.blue}26` }} />
          <div className="flex flex-col gap-1">
            <Bar w="w-full" />
            <Bar w="w-10" h="h-1" tone="bg-black/10" />
          </div>
        </div>
      ))}
    </div>
    <div className="mb-2 flex h-20 items-end gap-2">
      {[30, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md"
          style={{ height: `${h}%`, background: `linear-gradient(to top, ${ACCENTS.blue}4d, ${ACCENTS.blue})` }}
        />
      ))}
    </div>
    <div className="flex items-center justify-between border-t border-black/5 pt-2">
      <span className="text-[9px] uppercase tracking-wider text-black/40">Revenue</span>
      <span className="text-[13px] font-semibold text-black">$1.42M</span>
    </div>
  </div>
);

const InvoiceCard = () => (
  <div className="flex h-full flex-col">
    <CardHeader
      title="Invoice #4821"
      right={<Pill tone="bg-[#22c55e]/15 text-[#16a34a]">Paid</Pill>}
    />
    <div className="flex flex-1 flex-col gap-2 rounded-lg bg-black/[0.03] p-3">
      <div className="flex justify-between text-[8px] text-black/40">
        <span>From</span>
        <span>Due</span>
      </div>
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
        <div
          key={i}
          className={`max-w-[70%] rounded-2xl px-2.5 py-1.5 text-[9px] text-black/70 ${
            msg.from === 'user' ? 'self-end rounded-br-sm' : 'self-start rounded-bl-sm bg-black/5'
          }`}
          style={msg.from === 'user' ? { background: `${ACCENTS.purple}26` } : undefined}
        >
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
        <div
          className="absolute inset-0 rounded-full border-[6px] border-transparent"
          style={{ borderTopColor: ACCENTS.blue, borderRightColor: ACCENTS.blue, transform: 'rotate(45deg)' }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold">64%</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {[
          ['Active', '1.2k'],
          ['Conv.', '4.8%'],
          ['Goal', '$48k'],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-md bg-black/[0.03] px-1.5 py-1">
            <span className="text-[7px] text-black/50">{label}</span>
            <span className="text-[8px] font-semibold">{value}</span>
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
  const columns = [
    { label: 'To Do', count: 2 },
    { label: 'Doing', count: 1 },
    { label: 'Done', count: 2 },
  ];
  return (
    <div className="flex h-full flex-col">
      <CardHeader title="Task Board" right={<span className="text-[8px] text-black/40">Sprint 14</span>} />
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col gap-1">
            <span className="text-[7px] uppercase tracking-wide text-black/50">{col.label}</span>
            {Array.from({ length: col.count }).map((_, i) => (
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

const MapCard = () => {
  const pins = [
    { top: '18%', left: '30%' },
    { top: '55%', left: '55%' },
    { top: '72%', left: '25%' },
    { top: '35%', left: '70%' },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#e8edf5]">
      <div className="absolute inset-x-2 top-6 h-px bg-black/10" />
      <div className="absolute inset-x-2 top-12 h-px bg-black/10" />
      <div className="absolute inset-y-2 left-8 w-px bg-black/10" />
      <div className="absolute inset-y-2 left-16 w-px bg-black/10" />
      <div className="absolute left-0 top-1/3 h-1 w-full bg-white/70" />
      <div className="absolute left-1/4 top-0 h-full w-1 bg-white/70" />
      {pins.map((pin, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={pin}>
          <Dot color={ACCENTS.blue} size="w-2.5 h-2.5" />
        </div>
      ))}
      <div className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 py-0.5">
        <span className="text-[7px] text-black/60">4 listings</span>
      </div>
    </div>
  );
};

const PipelineCard = () => {
  const stages = [
    { label: 'Discovery', count: 5, color: '#cbd5e1' },
    { label: 'Proposal', count: 3, color: '#a5b4fc' },
    { label: 'Negotiation', count: 2, color: '#fbbf24' },
    { label: 'Closing', count: 1, color: '#86efac' },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-black/80">Pipeline</span>
        <span className="text-[8px] text-black/40">Q3 · $240k</span>
      </div>
      {stages.map((stage) => (
        <div key={stage.label} className="flex items-center gap-2">
          <span className="h-4 w-1.5 rounded-sm" style={{ background: stage.color }} />
          <div className="flex flex-1 items-center justify-between rounded-md bg-black/[0.03] px-1.5 py-1">
            <span className="text-[8px] text-black/70">{stage.label}</span>
            <span className="text-[8px] font-semibold text-black/60">{stage.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const NotificationsCard = () => {
  const events = [
    { initials: 'AP', color: ACCENTS.blue, text: 'Payment received', time: '1h' },
    { initials: 'JD', color: ACCENTS.green, text: 'Lead assigned', time: '2h' },
    { initials: 'MK', color: ACCENTS.orange, text: 'Invoice overdue', time: '3h' },
    { initials: 'RS', color: ACCENTS.purple, text: 'New signup', time: '4h' },
  ];
  return (
    <div className="flex h-full flex-col gap-1.5">
      <CardHeader title="Activity" right={<Pill tone="bg-[#2f6df6]/15 text-[#2f6df6]">3 new</Pill>} />
      {events.map((e) => (
        <div key={e.text} className="flex items-center gap-2">
          <Avatar initials={e.initials} color={e.color} />
          <span className="flex-1 text-[8px] text-black/70">{e.text}</span>
          <span className="text-[7px] text-black/35">{e.time}</span>
        </div>
      ))}
    </div>
  );
};

const AdminCard = () => {
  const users = [
    { initials: 'A', color: ACCENTS.blue, name: 'Anya Petrov', role: 'Owner' },
    { initials: 'M', color: ACCENTS.green, name: 'Mason Lee', role: 'Editor' },
    { initials: 'I', color: ACCENTS.slate, name: 'Iris Cole', role: 'Viewer' },
  ];
  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-black/80">Admin</span>
        <span className="text-[7px] text-black/40">settings</span>
      </div>
      <div className="flex gap-1">
        <span className="rounded bg-black px-1.5 py-0.5 text-[7px] text-white">Users</span>
        <span className="rounded bg-black/5 px-1.5 py-0.5 text-[7px] text-black/60">Roles</span>
        <span className="rounded bg-black/5 px-1.5 py-0.5 text-[7px] text-black/60">Audit</span>
      </div>
      {users.map((u) => (
        <div key={u.name} className="flex items-center gap-2 rounded-md bg-black/[0.03] px-1.5 py-1">
          <Avatar initials={u.initials} color={u.color} />
          <span className="flex-1 text-[8px] text-black/70">{u.name}</span>
          <span className="text-[7px] text-black/40">{u.role}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-1.5 rounded bg-black/[0.03] px-1.5 py-1">
        <Dot color={ACCENTS.green} size="w-1.5 h-1.5" />
        <span className="text-[7px] text-black/50">Audit log · 2,481 events</span>
      </div>
    </div>
  );
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 * LAYOUT
 * ─────────────────────────────────────────────────────────────────────────
 */
const FLOATING_CARDS = [
  { id: 'dashboard', label: 'BuyOps Dashboard', top: '2%', left: '28%', w: 420, h: 270, rotate: -2, z: 10, Content: DashboardCard },
  { id: 'erp', label: 'ERP Modules', top: '2%', left: '0%', w: 340, h: 240, rotate: -1, z: 12, Content: ERPCard },
  { id: 'analytics', label: 'Analytics', top: '1%', left: '68%', w: 280, h: 180, rotate: -3, z: 14, Content: AnalyticsCard },
  { id: 'invoice', label: 'Invoice Builder', top: '42%', left: '40%', w: 320, h: 220, rotate: 3, z: 11, Content: InvoiceCard },
  { id: 'pipeline', label: 'Pipeline', top: '32%', left: '64%', w: 260, h: 180, rotate: 2, z: 17, Content: PipelineCard },
  { id: 'notifications', label: 'Notifications', top: '32%', left: '80%', w: 220, h: 200, rotate: -4, z: 18, Content: NotificationsCard },
  { id: 'tasks', label: 'Task Board', top: '54%', left: '4%', w: 300, h: 200, rotate: 2, z: 15, Content: TaskBoardCard },
  { id: 'ai', label: 'AI Assistant', top: '58%', left: '48%', w: 260, h: 200, rotate: 4, z: 13, Content: AIAssistantCard },
  { id: 'map', label: 'Map', top: '62%', left: '70%', w: 240, h: 160, rotate: -2, z: 16, Content: MapCard },
  { id: 'admin', label: 'Admin Panel', top: '72%', left: '22%', w: 250, h: 170, rotate: 3, z: 19, Content: AdminCard },
];

/**
 * ─────────────────────────────────────────────────────────────────────────
 * REVEAL HOOK
 * ─────────────────────────────────────────────────────────────────────────
 */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function FloatingCard({ card, delay }: { card: (typeof FLOATING_CARDS)[number]; delay: number }) {
  const [ref, inView] = useInView();
  const noPadding = card.id === 'map';

  return (
    <div
      ref={ref}
      className="absolute rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-700 ease-out motion-reduce:transition-none"
      style={{
        width: card.w,
        height: card.h,
        top: card.top,
        left: card.left,
        zIndex: card.z,
        opacity: inView ? 1 : 0,
        transform: inView
          ? `rotate(${card.rotate}deg)`
          : `translateY(40px) rotate(${card.rotate}deg)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="absolute left-4 top-3 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.16em] text-black/40">
        <span className="h-1 w-1 rounded-full bg-black/25" />
        {card.label}
      </div>
      <div className={`h-full w-full ${noPadding ? '' : 'pt-4'}`}>
        <card.Content />
      </div>
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * SECTION
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function WhatWeBuild() {
  const [textRef, textInView] = useInView(0.3);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-[#EDEEF5] px-6 py-28 sm:px-8"
      style={{ minHeight: '110vh' }}
    >
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-[60px] px-0 md:grid-cols-[5fr_7fr] md:gap-[90px] md:px-12">
        {/* ── Copy column ───────────────────────────────────────────── */}
        <div
          ref={textRef}
          className={`transition-all duration-700 ease-out md:order-1 ${
            textInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="mb-7 text-[13px] font-semibold uppercase tracking-[0.32em] text-black/45">
            What we build
          </p>
          <h2
            className="max-w-[580px] font-medium leading-[0.95]"
            style={{ fontSize: 'clamp(42px, 5vw, 82px)' }}
          >
            Not websites. Complete digital businesses.
          </h2>
          <p className="mt-9 max-w-[540px] text-xl leading-relaxed text-[#555]">
            We design and engineer software that powers real businesses — from
            internal operations and AI automation to customer platforms used
            every day. Every product begins as a problem worth solving.
          </p>
          <ul className="mt-8 flex flex-col">
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-center gap-[18px] py-3 text-[15px]">
                <span className="h-2 w-2 rounded-full bg-black/20" />
                <span className="text-black/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Floating product cards ───────────────────────────────── */}
        <div className="relative hidden h-[720px] w-full md:block" style={{ perspective: 1800 }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {FLOATING_CARDS.map((card, i) => (
            <FloatingCard key={card.id} card={card} delay={i * 60} />
          ))}
        </div>

        {/* ── Mobile fallback ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {FLOATING_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
            >
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