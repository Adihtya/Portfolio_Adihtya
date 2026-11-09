import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TesseractCanvas } from './Tesseract';
import { useLenis } from './SmoothScroll';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        skewY: 2,
        duration: 1.4,
        delay: 0.2,
      })
        .from(
          subtextRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          '-=0.8'
        )
        .from(
          metaRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          bottomBarRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#2D0000] flex flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-12 px-4 md:px-12 border-b border-[#757D6F]/30"
    >
      {/* 3D WebGL Canvas Layer */}
      <TesseractCanvas />

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none grain-overlay z-10 opacity-60" />

      {/* Top Editorial Metadata Banner */}
      <div
        ref={metaRef}
        className="relative z-20 max-w-[1800px] w-full mx-auto flex flex-wrap items-center justify-between border-b border-[#757D6F]/25 pb-4 text-xs font-mono tracking-widest text-[#757D6F]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#6D0808] font-bold">● REC_01</span>
          <span>FOLIO_EDITION: 2026.1</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>SPEC: COMPUTE × CONNECTOMICS × SYNTAX</span>
          <span className="text-[#EEEAD7]/40">|</span>
          <span>INDEX: 01 // 04</span>
        </div>
      </div>

      {/* Center Giant Statement */}
      <div className="relative z-20 max-w-[1800px] w-full mx-auto my-auto py-12 md:py-16">
        <div className="max-w-7xl">
          <p className="font-mono text-xs md:text-sm text-[#757D6F] uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#6D0808]" />
            MANIFESTO & CORE THESIS
          </p>

          <h1
            ref={headlineRef}
            className="font-serif text-[#EEEAD7] text-4xl sm:text-6xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] leading-[0.92] tracking-[-0.03em] font-normal uppercase select-none drop-shadow-sm"
          >
            I BUILD WHAT I <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#EEEAD7] hover:text-[#6D0808] transition-colors duration-300">
              CAN&apos;T STOP
            </span>{' '}
            <br />
            THINKING ABOUT<span className="text-[#6D0808]">.</span>
          </h1>
        </div>

        {/* Subtext and Credentials */}
        <div
          ref={subtextRef}
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
        >
          <div className="md:col-span-7 lg:col-span-6">
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#EEEAD7]/90 font-light leading-relaxed">
              <strong className="font-semibold text-[#EEEAD7]">Aditya Chaudhari</strong> — Exploring the intersection of{' '}
              <span className="text-[#EEEAD7] border-b border-[#6D0808]">software engineering</span>,{' '}
              <span className="text-[#EEEAD7] border-b border-[#6D0808]">artificial intelligence</span>, and{' '}
              <span className="text-[#EEEAD7] border-b border-[#6D0808]">computational science</span>.
            </p>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex flex-col md:items-end justify-between h-full gap-4">
            <div className="font-mono text-xs text-[#757D6F] space-y-1 md:text-right">
              <div>INSTITUTION: upGrad School of Technology, Pune</div>
              <div>DEGREE: B.Tech Computer Science & Artificial Intelligence</div>
              <div>OPERATIONAL FOCUS: Deterministic Systems & Deep Tech</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('#work')}
                className="px-6 py-3 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] font-mono text-xs uppercase tracking-widest font-semibold border border-[#EEEAD7]/20 transition-all duration-200"
              >
                SELECTED WORK ↓
              </button>
              <button
                onClick={() => scrollTo('#about')}
                className="px-6 py-3 bg-transparent hover:bg-[#EEEAD7]/10 text-[#EEEAD7] font-mono text-xs uppercase tracking-widest border border-[#757D6F]/40 hover:border-[#EEEAD7] transition-all duration-200"
              >
                SYS.BIO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Strip */}
      <div
        ref={bottomBarRef}
        className="relative z-20 max-w-[1800px] w-full mx-auto pt-6 border-t border-[#757D6F]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#757D6F]"
      >
        <div className="flex items-center gap-4">
          <span className="text-[#EEEAD7]">4D CHROME TESSERACT</span>
          <span className="text-[#757D6F]/60">[R3F × DREI]</span>
          <span className="hidden lg:inline text-[#757D6F]/80">ROTATION: XW/YW HYPERPLANE</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo('#work')}
            className="group flex items-center gap-2 text-[#EEEAD7] hover:text-[#6D0808] transition-colors"
          >
            <span>SCROLL TO ENGAGE</span>
            <span className="inline-block transform group-hover:translate-y-1 transition-transform">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
