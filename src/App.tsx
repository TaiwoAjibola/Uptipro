import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from './useTypewriter';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'] as const;
const WHITE_PILLS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
] as const;

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0"
    >
      <rect
        x="2.5"
        y="3.5"
        width="6"
        height="6"
        rx="0.8"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="3.5"
        y="2.5"
        width="6"
        height="6"
        rx="0.8"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.06"
      />
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 no-underline">
          <span
            className="text-black text-[21px] sm:text-[26px] tracking-tight select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-black text-[25px] sm:text-[30px] select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center text-black text-[23px]">
          {NAV_LINKS.map((link, i) => (
            <span key={link} className="flex items-center">
              {i > 0 && <span className="text-black">,&nbsp;</span>}
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-black text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2"
        >
          <span
            className="block w-6 h-[2px] bg-black transition-transform duration-300"
            style={{
              transform: open
                ? 'rotate(45deg) translateY(7px)'
                : 'rotate(0deg) translateY(0)',
            }}
          />
          <span
            className="block w-6 h-[2px] bg-black transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-black transition-transform duration-300"
            style={{
              transform: open
                ? 'rotate(-45deg) translateY(-7px)'
                : 'rotate(0deg) translateY(0)',
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 9,
        }}
      >
        <div className="flex flex-col gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-black text-[32px] font-medium"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-black text-[32px] font-medium underline underline-offset-2"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);
  const prevXRef = useRef<number | null>(null);
  const seekingRef = useRef(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const text =
    'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
  const { displayed, done } = useTypewriter(text, 38, 600);

  // Fade-in pills 400ms after mount.
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Mouse-scrub video control.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;
      const currentX = e.clientX;
      const prevX = prevXRef.current;
      prevXRef.current = currentX;
      if (prevX === null) return;
      if (!video.duration || isNaN(video.duration)) return;

      const delta = currentX - prevX;
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let target = targetTimeRef.current + offset;
      if (target < 0) target = 0;
      if (target > video.duration) target = video.duration;
      targetTimeRef.current = target;

      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = target;
      }
    };

    const handleSeeked = () => {
      const video = videoRef.current;
      if (!video) {
        seekingRef.current = false;
        return;
      }
      seekingRef.current = false;
      const target = targetTimeRef.current;
      if (Math.abs(target - video.currentTime) > 0.01) {
        seekingRef.current = true;
        video.currentTime = target;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const video = videoRef.current;
    if (video) video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (video) video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@mainframe.co');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative h-screen flex flex-col overflow-hidden px-5 sm:px-8 md:px-10 justify-end pb-12 md:justify-center md:pb-0">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full z-0 object-cover"
        style={{ objectPosition: '70% center' }}
      />
      <div className="max-w-xl relative z-10">
        {/* Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </div>

        {/* Typewriter text */}
        <p
          className="text-black mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          )}
        </p>

        {/* Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {WHITE_PILLS.map((label) => (
            <a
              key={label}
              href="#"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap no-underline transition-colors duration-200 hover:bg-black hover:text-white"
            >
              {label}
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200 hover:bg-white hover:text-black"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                hello@mainframe.co
              </span>
            </span>
            <CopyIcon />
            {copied && (
              <span className="ml-1 text-[10px] opacity-70">Copied!</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <Navbar />
      <Hero />
    </div>
  );
}