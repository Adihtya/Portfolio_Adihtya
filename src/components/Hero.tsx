import React from 'react';
import { TesseractCanvas } from './Tesseract';
import { useLenis } from './SmoothScroll';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="h-screen w-full relative overflow-hidden flex flex-col justify-between p-8 bg-[#2D0000] text-[#EEEAD7] border-b border-[#757D6F]"
    >
      {/* Three.js WebGL Canvas Layer - Strictly Pushed to Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TesseractCanvas />
      </div>

      {/* TOP HEADER: Editorial Grid Structure with Strict 1px Borders */}
      <header className="relative z-10 w-full border border-[#757D6F] bg-[#2D0000]/95">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#757D6F]">
          {/* Top-Left: Name & Identity */}
          <div className="md:col-span-5 p-4 sm:p-5 flex flex-col justify-between">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#757D6F] block mb-1">
              PORTFOLIO // VOL. 01
            </span>
            <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] uppercase text-[#EEEAD7] leading-none">
              ADITYA CHAUDHARI
            </h1>
          </div>

          {/* Top-Center: Academic & Program Specs */}
          <div className="md:col-span-4 p-4 sm:p-5 flex flex-col justify-between font-mono text-xs text-[#757D6F]">
            <span className="text-[10px] tracking-[0.25em] uppercase block mb-1 text-[#6D0808]">
              ACADEMIC SPECIFICATION
            </span>
            <div className="text-[#EEEAD7] leading-tight">
              B.TECH CS & ARTIFICIAL INTELLIGENCE
            </div>
            <div className="text-[#757D6F] text-[11px] mt-1">
              upGrad School of Technology, Pune
            </div>
          </div>

          {/* Top-Right: Telemetry Status */}
          <div className="md:col-span-3 p-4 sm:p-5 flex flex-col justify-between font-mono text-xs text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="inline-block w-2 h-2 bg-[#6D0808]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#EEEAD7]">
                SYS.STATUS: ONLINE
              </span>
            </div>
            <div className="text-[#757D6F] text-[11px] tracking-wider mt-1">
              18.5204° N, 73.8567° E // PUNE
            </div>
          </div>
        </div>
      </header>

      {/* CENTER: Massive, Aggressive Typographic Poster Headline */}
      <div className="relative z-10 my-auto w-full py-4 select-none">
        <p className="font-mono text-xs sm:text-sm text-[#757D6F] uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
          <span className="w-4 h-[2px] bg-[#6D0808]" />
          MANIFESTO & THESIS
        </p>

        <h2 className="font-serif text-[#EEEAD7] text-6xl sm:text-7xl md:text-[8vw] xl:text-[8.2vw] font-normal uppercase leading-none tracking-tight">
          I BUILD WHAT I <br />
          <span className="italic font-serif text-[#EEEAD7] hover:text-[#6D0808] transition-colors duration-150">
            CAN&apos;T STOP
          </span>{' '}
          <br />
          THINKING ABOUT<span className="text-[#6D0808]">.</span>
        </h2>
      </div>

      {/* BOTTOM FOOTER: Strict Editorial Grid with Subtext Pushed to Bottom Right */}
      <footer className="relative z-10 w-full border border-[#757D6F] bg-[#2D0000]/95">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#757D6F] items-stretch">
          {/* Bottom Left: Navigation & Action Protocol */}
          <div className="md:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[#757D6F]">
              <span>DIRECTORY // 01</span>
              <span className="text-[#EEEAD7] font-bold">[SCROLL DOWN ↓]</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => scrollTo('#work')}
                className="px-4 py-2 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] font-mono text-xs uppercase tracking-wider font-semibold border border-[#757D6F] transition-colors"
              >
                SELECTED WORK ↓
              </button>
              <button
                onClick={() => scrollTo('#about')}
                className="px-4 py-2 bg-transparent hover:bg-[#6D0808] text-[#EEEAD7] font-mono text-xs uppercase tracking-wider border border-[#757D6F] transition-colors"
              >
                ABOUT & LAB
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-4 py-2 bg-transparent hover:bg-[#6D0808] text-[#EEEAD7] font-mono text-xs uppercase tracking-wider border border-[#757D6F] transition-colors"
              >
                TRANSMIT
              </button>
            </div>
          </div>

          {/* Bottom Center: System Coordinates */}
          <div className="hidden lg:flex md:col-span-2 p-4 sm:p-5 flex-col justify-between font-mono text-[10px] text-[#757D6F]">
            <span>CANVAS KERNEL</span>
            <div className="text-[#EEEAD7] uppercase font-bold">
              CHROME TESSERACT [3D/4D]
            </div>
            <div className="text-[#6D0808]">
              DEPTH: PASS-THROUGH
            </div>
          </div>

          {/* Bottom Right: Subtext Pushed to Bottom Right */}
          <div className="md:col-span-7 lg:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-2 text-right">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#757D6F] block">
              RESEARCH DOMAIN
            </span>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#EEEAD7] font-normal leading-snug text-left md:text-right">
              <strong className="font-bold text-[#EEEAD7]">Aditya Chaudhari</strong> — Exploring the intersection of{' '}
              <span className="text-[#EEEAD7] underline decoration-[#6D0808] decoration-1 underline-offset-4">software engineering</span>,{' '}
              <span className="text-[#EEEAD7] underline decoration-[#6D0808] decoration-1 underline-offset-4">artificial intelligence</span>, and{' '}
              <span className="text-[#EEEAD7] underline decoration-[#6D0808] decoration-1 underline-offset-4">computational science</span>.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Hero;
