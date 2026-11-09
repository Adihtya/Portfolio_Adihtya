import React, { useRef } from 'react';
import { TesseractCanvas } from './Tesseract';
import { useLenis } from './SmoothScroll';
import { ArrowDownRight, Terminal, Sparkles, Code2, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] paper-grid select-none"
    >
      {/* 3D WebGL Canvas Layer - High Contrast Wireframe Tesseract */}
      <TesseractCanvas />

      {/* TOP HEADER: Urban Brutalist Grid Frame with Hard Shadow */}
      <header className="relative z-10 w-full border-2 border-[#0F0F0F] bg-[#F4F4F0] brutalist-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0F0F0F] items-stretch">
          {/* Top-Left: Name Tag */}
          <div className="md:col-span-5 p-3 sm:p-4 flex items-center justify-between bg-[#F4F4F0]">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 bg-[#FF2A00] border-2 border-[#0F0F0F] inline-block animate-pulse" />
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#0F0F0F]/60 block font-bold">
                  STRIKE // EDITION 01
                </span>
                <h1 className="font-poster text-2xl sm:text-3xl tracking-wide uppercase text-[#0F0F0F] leading-none">
                  ADITYA CHAUDHARI
                </h1>
              </div>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#CCFF00] border-2 border-[#0F0F0F] -rotate-2 brutalist-shadow">
              PROD
            </span>
          </div>

          {/* Top-Center: Discipline */}
          <div className="md:col-span-4 p-3 sm:p-4 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#FF2A00] block">
                SPECIALIZATION
              </span>
              <span className="font-bold text-[#0F0F0F]">
                CS & ARTIFICIAL INTELLIGENCE
              </span>
            </div>
            <span className="text-[11px] text-[#0F0F0F]/60 hidden sm:inline">
              PUNE, IN
            </span>
          </div>

          {/* Top-Right: Quick Nav Jump Button */}
          <div className="md:col-span-3 p-2 sm:p-3 flex items-center justify-end gap-2 bg-[#F4F4F0]">
            <button
              onClick={() => scrollTo('#about')}
              className="w-full py-2 px-3 bg-[#0F0F0F] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#0F0F0F] brutalist-shadow flex items-center justify-center gap-1.5"
            >
              <span>EXPLORE BIO</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING TACTILE STICKERS WITH HARD SHADOWS */}
      {/* Sticker 1: AI Enthusiast */}
      <div className="absolute top-28 sm:top-32 right-4 sm:right-12 z-20 pointer-events-auto transform rotate-6">
        <div className="bg-[#CCFF00] text-[#0F0F0F] border-2 border-[#0F0F0F] brutalist-shadow px-3 py-1.5 sm:px-4 sm:py-2 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer">
          <Sparkles className="w-4 h-4 fill-[#0F0F0F]" />
          <span>★ AI ENTHUSIAST</span>
        </div>
      </div>

      {/* Sticker 2: Dev Core */}
      <div className="absolute top-44 sm:top-56 left-4 sm:left-10 z-20 pointer-events-auto transform -rotate-6">
        <div className="bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] brutalist-shadow px-3 py-1.5 sm:px-4 sm:py-2 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer">
          <Terminal className="w-4 h-4" />
          <span>● DEV // ARCHITECT</span>
        </div>
      </div>

      {/* Sticker 3: Raw Code Certified */}
      <div className="hidden lg:flex absolute bottom-44 right-16 z-20 pointer-events-auto transform -rotate-3">
        <div className="bg-[#0033FF] text-[#F4F4F0] border-2 border-[#0F0F0F] brutalist-shadow px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
          <Code2 className="w-4 h-4" />
          <span>⚡ 100% RAW CODE</span>
        </div>
      </div>

      {/* Sticker 4: UpGrad Tech Pune Stamp */}
      <div className="hidden md:flex absolute bottom-48 left-16 z-20 pointer-events-auto transform rotate-3">
        <div className="bg-[#F4F4F0] text-[#0F0F0F] border-2 border-[#0F0F0F] brutalist-shadow px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer">
          <Cpu className="w-3.5 h-3.5 text-[#FF2A00]" />
          <span>UPGRAD TECH // PUNE</span>
        </div>
      </div>

      {/* CENTER: Massive Loud Poster Headline */}
      <div className="relative z-10 my-auto w-full py-8 sm:py-12">
        <div className="max-w-[1700px] mx-auto">
          <div className="inline-block bg-[#0F0F0F] text-[#CCFF00] font-mono text-xs sm:text-sm font-bold uppercase px-3 py-1 mb-4 border-2 border-[#0F0F0F] brutalist-shadow -rotate-1">
            CORE MANIFESTO // VOL. 01
          </div>

          <h2 className="font-poster text-[#0F0F0F] text-6xl sm:text-8xl md:text-9xl lg:text-[10.5vw] xl:text-[11.5vw] uppercase leading-[0.86] tracking-tight">
            I BUILD WHAT I <br />
            <span className="relative inline-block bg-[#CCFF00] text-[#0F0F0F] px-3 sm:px-5 py-1 border-2 border-[#0F0F0F] brutalist-shadow transform -rotate-2 my-1">
              CAN&apos;T STOP
            </span> <br />
            THINKING ABOUT<span className="text-[#FF2A00]">.</span>
          </h2>
        </div>
      </div>

      {/* BOTTOM FOOTER: High-Contrast Urban Grid Strip with Hard Shadows */}
      <footer className="relative z-10 w-full border-2 border-[#0F0F0F] bg-[#F4F4F0] brutalist-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0F0F0F] items-stretch">
          {/* Bottom Left: Navigation Buttons with Hard Shadows */}
          <div className="md:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-3 font-mono text-xs bg-[#F4F4F0]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F0F0F]">QUICK DIRECTORY</span>
              <span className="bg-[#FF2A00] text-[#F4F4F0] px-2 py-0.5 text-[10px] font-bold border-2 border-[#0F0F0F] brutalist-shadow">
                [01 // 04]
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => scrollTo('#about')}
                className="px-4 py-2 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow"
              >
                ABOUT & BIO ↓
              </button>
              <button
                onClick={() => scrollTo('#work')}
                className="px-4 py-2 bg-[#CCFF00] hover:bg-[#0F0F0F] text-[#0F0F0F] hover:text-[#CCFF00] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow"
              >
                SELECTED WORK ↓
              </button>
              <button
                onClick={() => scrollTo('#toolkit')}
                className="px-4 py-2 bg-[#F4F4F0] hover:bg-[#CCFF00] text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow"
              >
                TOOLKIT
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-4 py-2 bg-[#0033FF] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow"
              >
                CONTACT
              </button>
            </div>
          </div>

          {/* Bottom Center: Raw Engine Metadata */}
          <div className="hidden lg:flex md:col-span-2 p-4 sm:p-5 flex-col justify-between font-mono text-[11px] bg-[#F4F4F0]">
            <span className="text-[#0F0F0F]/60 font-bold uppercase">WIRE ENGINE</span>
            <div className="font-bold text-[#0F0F0F]">
              THREE.JS / 4D CAD
            </div>
            <div className="text-[#0033FF] font-bold">
              ● REALTIME RENDER
            </div>
          </div>

          {/* Bottom Right: Subtext Description */}
          <div className="md:col-span-7 lg:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-2 bg-[#F4F4F0]">
            <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[#0F0F0F]/60 uppercase">
              <span>RESEARCH & ENGINEERING</span>
              <span className="text-[#FF2A00]">PUNE, INDIA</span>
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#0F0F0F] leading-snug font-bold">
              Aditya Chaudhari — Exploring the intersection of{' '}
              <span className="bg-[#CCFF00] px-1 border-2 border-[#0F0F0F]">software engineering</span>,{' '}
              <span className="bg-[#FF2A00] text-[#F4F4F0] px-1 border-2 border-[#0F0F0F]">artificial intelligence</span>, and{' '}
              <span className="bg-[#0033FF] text-[#F4F4F0] px-1 border-2 border-[#0F0F0F]">computational science</span>.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Hero;
