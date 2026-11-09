import React from 'react';
import { useLenis } from './SmoothScroll';
import { ArrowDownRight, Sparkles } from 'lucide-react';

export const Bio: React.FC = () => {
  const { scrollTo } = useLenis();

  return (
    <section
      id="about"
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] paper-grid select-none"
    >
      <div className="px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest mb-8 border-b-2 border-[#0F0F0F] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FF2A00] border-2 border-[#0F0F0F]" />
            <span className="bg-[#CCFF00] px-2.5 py-0.5 border-2 border-[#0F0F0F] brutalist-shadow">
              SECTION // 01
            </span>
            <span>•</span>
            <span className="text-[#0F0F0F]">BIOGRAPHICAL MANIFESTO</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#0F0F0F]/60">ACADEMIC BASE:</span>
            <span className="bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F]">
              UPGRAD TECH // PUNE
            </span>
          </div>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Big Headline & Narrative */}
          <div className="lg:col-span-8">
            <h2 className="font-poster text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-normal text-[#0F0F0F]">
              I AM A{' '}
              <span className="bg-[#CCFF00] px-3 py-0.5 border-2 border-[#0F0F0F] brutalist-shadow inline-block -rotate-1">
                B.TECH CS & AI
              </span>{' '}
              STUDENT AT UPGRAD SCHOOL OF TECHNOLOGY, PUNE.
            </h2>

            <div className="mt-8 space-y-4 font-mono text-sm sm:text-base text-[#0F0F0F] leading-relaxed max-w-3xl">
              <p className="bg-[#F4F4F0] p-4 sm:p-5 border-2 border-[#0F0F0F] brutalist-shadow">
                Operating at the intersection of deterministic software engineering and computational intelligence. I build high-concurrency backend services, biologically-inspired connectome simulations, and graphics-rich spatial interfaces that translate abstract computational science into tactile realities.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollTo('#work')}
                  className="px-5 py-2.5 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow flex items-center gap-2 transition-colors"
                >
                  <span>EXPLORE SELECTED WORK</span>
                  <ArrowDownRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('#toolkit')}
                  className="px-5 py-2.5 bg-[#CCFF00] hover:bg-[#0F0F0F] text-[#0F0F0F] hover:text-[#CCFF00] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow flex items-center gap-2 transition-colors"
                >
                  <span>INSPECT TOOLKIT</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Physical ID Card Sticker with Small Photo */}
          <div className="lg:col-span-4 border-2 border-[#0F0F0F] bg-[#F4F4F0] p-6 brutalist-shadow font-mono text-xs relative transform rotate-1">
            <div className="absolute -top-3.5 -right-3 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] px-3 py-1 font-bold text-xs uppercase brutalist-shadow rotate-6">
              VERIFIED BUILDER
            </div>

            {/* ID Card Header */}
            <div className="border-b-2 border-[#0F0F0F] pb-3 mb-4 flex items-center justify-between">
              <span className="font-bold uppercase">ID CARD // VOL. 2026</span>
              <span className="w-2.5 h-2.5 bg-[#CCFF00] border-2 border-[#0F0F0F]" />
            </div>

            {/* Small Photo Badge + Name/Institution Layout */}
            <div className="flex items-start gap-4 mb-4">
              {/* The Small Brutalist Portrait Photo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 border-2 border-[#0F0F0F] brutalist-shadow flex-shrink-0 -rotate-2 bg-[#0F0F0F] overflow-hidden group">
                <img
                  src="/aditya-avatar.jpg"
                  alt="Aditya Chaudhari Portrait"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#0F0F0F]/90 text-[#CCFF00] font-mono text-[8px] text-center font-bold uppercase py-0.5 border-t border-[#0F0F0F]">
                  STRIKE #010
                </div>
              </div>

              {/* Identity Fields beside Photo */}
              <div className="flex-1 space-y-2">
                <div>
                  <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">NAME:</span>
                  <span className="font-poster text-xl sm:text-2xl uppercase leading-none block">
                    ADITYA CHAUDHARI
                  </span>
                </div>
                <div>
                  <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">INSTITUTION:</span>
                  <span className="font-bold text-xs leading-tight block">
                    upGrad School of Technology
                  </span>
                </div>
              </div>
            </div>

            {/* Field & Location Details */}
            <div className="space-y-2.5 pt-3 border-t-2 border-[#0F0F0F]">
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">FIELD:</span>
                <span className="font-bold bg-[#CCFF00] px-1.5 py-0.5 border-2 border-[#0F0F0F] text-xs inline-block">
                  CS & ARTIFICIAL INTELLIGENCE
                </span>
              </div>
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">LOCATION:</span>
                <span className="font-bold text-xs">Pune, Maharashtra, India</span>
              </div>
            </div>

            {/* Footer Telemetry */}
            <div className="mt-4 pt-3 border-t-2 border-[#0F0F0F] flex items-center justify-between text-[10px] font-bold">
              <span>STATUS: OPEN FOR ROLES</span>
              <span className="text-[#FF2A00]">● 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
