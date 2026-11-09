import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Terminal, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { TechIcon } from './TechIcon';
import { VasHexadSimulator } from './VasHexadSimulator';
import { UnfoldArchitectureCard } from './UnfoldArchitectureCard';
import { WatchOrSkipCard } from './WatchOrSkipCard';
import { ScopeDiagnosticCard } from './ScopeDiagnosticCard';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Project[] = [
  {
    id: 'unfold',
    number: '01',
    title: 'UNFOLD',
    subtitle: 'Code Intelligence & Real-Time AST Decomposition',
    description:
      'Engineered a deterministic code comprehension engine that constructs semantic abstract syntax trees (ASTs) and dependency graphs in real-time. Translates massive multi-repository codebases into navigable contextual graph models for developer agents.',
    details: [
      'Recursive grammar analysis across Python, TypeScript, and C++',
      'Real-time call-graph synthesis and cyclical dependency detection',
      'Vectorized code search with sub-200ms latency across 500k+ LOC',
    ],
    stack: ['Python', 'React', 'FastAPI', 'AST', 'Tree-Sitter', 'ChromaDB'],
    metrics: { label: 'SYNTAX PROCESSING SPEED', value: '185,000 LOC/s' },
    category: 'CODE INTELLIGENCE',
    githubUrl: 'https://github.com/Adihtya/UNFOLD',
  },
  {
    id: 'vashexad',
    number: '02',
    title: 'VASHEXAD',
    subtitle: '2D Fruit-Fly Connectome & LIF Dynamics Simulator',
    description:
      'A biologically authentic computational simulation modeled on Drosophila melanogaster sensorimotor circuits. Implements Leaky Integrate-and-Fire (LIF) membrane differential equations across dense synaptic weight matrices to reproduce directional steering loops.',
    details: [
      'Numerical Euler-integration of sub-threshold voltage decay & spike thresholds',
      'Configurable synaptic delay queues with STDP plasticity mechanics',
      'Real-time membrane potential oscilloscope rendering via WebGL',
    ],
    stack: ['Python', 'C++', 'LIF', 'WebGL', 'NumPy', 'Canvas'],
    metrics: { label: 'SYNAPSE RECONSTRUCTION', value: '130,000+ CIRCUITS' },
    category: 'CONNECTOME SIMULATION',
    githubUrl: 'https://github.com/laksh1711/VasHexad',
  },
  {
    id: 'watch-or-skip',
    number: '03',
    title: 'WATCH OR SKIP',
    subtitle: 'Predictive Cinema Discovery & Sentiment Engine',
    description:
      'High-precision movie intelligence platform designed to eliminate decision paralysis. Utilizes hybrid multi-dimensional vector embeddings and narrative tone extraction to deliver instant, high-confidence film verdicts.',
    details: [
      'High-dimensional cinematic embedding space trained on critical sentiment',
      'Instantaneous zero-drift vector similarity filtering with sub-40ms cache hits',
      'Dynamic urban brutalist UI with responsive typographical density',
    ],
    stack: ['React', 'Next.js', 'FastAPI', 'Redis', 'Python'],
    metrics: { label: 'CATALOG ACCURACY SCORE', value: '98.7% CONFIDENCE' },
    category: 'RECOMMENDATION ENGINE',
    githubUrl: 'https://github.com/Adihtya/Watch_Or_Skip',
    liveUrl: 'https://adihtya.github.io/Watch_Or_Skip/',
  },
  {
    id: 'scope',
    number: '04',
    title: 'SCOPE',
    subtitle: 'High-Precision System Diagnostics & Runtime Observability',
    description:
      'Lightweight runtime instrumentation and execution profiling system engineered in C++ and Python. Captures execution bottlenecks, thread concurrency contention, and memory heap allocation patterns with sub-microsecond overhead.',
    details: [
      'Sub-microsecond function tracing and CPU instruction cycle metrics',
      'Deterministic thread locking latency and dead-lock graph detection',
      'Terminal-first visualization and real-time structured telemetry stream',
    ],
    stack: ['C++', 'Python', 'FastAPI', 'Docker', 'React'],
    metrics: { label: 'TRACE LATENCY OVERHEAD', value: '< 1.4 µs' },
    category: 'SYSTEMS OBSERVABILITY',
    githubUrl: 'https://github.com/Adihtya/Scope',
  },
];

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        const panels = gsap.utils.toArray<HTMLElement>('.work-panel');
        const totalPanels = panels.length;

        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (totalPanels - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            snap: 1 / (totalPanels - 1),
            start: 'top top',
            end: () => `+=${totalPanels * window.innerWidth * 0.9}`,
            onUpdate: (self) => {
              const index = Math.round(self.progress * (totalPanels - 1));
              setActiveProjectIndex(index);
            },
          },
        });

        return () => {
          scrollTween.kill();
        };
      } else {
        const panels = gsap.utils.toArray<HTMLElement>('.work-panel');
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveProjectIndex(i),
            onEnterBack: () => setActiveProjectIndex(i),
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] overflow-hidden paper-grid select-none"
    >
      {/* Sticky Top Telemetry Bar with Hard Shadow */}
      <div className="sticky top-12 z-30 w-full bg-[#CCFF00] border-b-2 border-[#0F0F0F] px-4 md:px-12 py-2.5 flex items-center justify-between font-mono text-xs font-bold text-[#0F0F0F] brutalist-shadow">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF2A00] border-2 border-[#0F0F0F] inline-block" />
          <span>SECTION // 01</span>
          <span>SELECTED WORK ARCHIVE</span>
        </div>

        {/* Live Index Indicators */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            {PROJECTS.map((p, idx) => (
              <span
                key={p.id}
                className={`px-2 py-0.5 text-[11px] border-2 border-[#0F0F0F] ${
                  activeProjectIndex === idx
                    ? 'bg-[#0F0F0F] text-[#CCFF00] font-bold brutalist-shadow'
                    : 'bg-[#F4F4F0] text-[#0F0F0F]'
                }`}
              >
                0{idx + 1}
              </span>
            ))}
          </div>

          <span className="bg-[#0F0F0F] text-[#F4F4F0] px-2 py-0.5 border-2 border-[#0F0F0F]">
            [0{activeProjectIndex + 1} / 0{PROJECTS.length}]
          </span>
        </div>
      </div>

      {/* Main Horizontal Panels Container */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-[calc(100vh-3.2rem)] relative"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="work-panel w-full lg:w-[100vw] min-h-screen lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-[#0F0F0F] relative bg-[#F4F4F0]"
          >
            {/* Background Watermark Index */}
            <div className="absolute right-4 bottom-2 lg:right-12 lg:bottom-8 pointer-events-none select-none font-poster text-[25vw] lg:text-[18vw] text-[#0F0F0F]/[0.05] leading-none">
              {project.number}
            </div>

            {/* Top Bar inside panel */}
            <div className="flex items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-6 font-mono text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] brutalist-shadow uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="hidden sm:inline bg-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F]">
                  ID: {project.id.toUpperCase()}
                </span>
              </div>
              <div className="text-right bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F]">
                PRODUCTION BUILD
              </div>
            </div>

            {project.id === 'unfold' ? (
              <UnfoldArchitectureCard />
            ) : project.id === 'watch-or-skip' ? (
              <WatchOrSkipCard />
            ) : project.id === 'scope' ? (
              <ScopeDiagnosticCard />
            ) : (
            /* Center Grid: Narrative + Visual Matrix */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              {/* Left Column: Loud Typography & Specs */}
              <div
                className={`${
                  project.id === 'vashexad' ? 'lg:col-span-5' : 'lg:col-span-7'
                } flex flex-col gap-5`}
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[#FF2A00] uppercase tracking-widest mb-1">
                    PROJECT ARCHIVE /{project.number}
                  </div>
                  <h2 className="font-poster text-5xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-[#0F0F0F] leading-none">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#0F0F0F]/80 uppercase font-bold tracking-wider mt-2">
                    {project.subtitle}
                  </p>
                </div>

                <p className="font-mono text-sm sm:text-base text-[#0F0F0F] leading-relaxed max-w-2xl bg-[#F4F4F0] p-4 border-2 border-[#0F0F0F] brutalist-shadow">
                  {project.description}
                </p>

                {/* Key Architectural Details */}
                <div className="space-y-2 border-l-4 border-[#FF2A00] pl-4 py-1">
                  {project.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="font-mono text-xs font-bold text-[#0F0F0F] flex items-start gap-2"
                    >
                      <span className="text-[#FF2A00] font-black">›</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips with Official Technology Logos */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-[#CCFF00] border-2 border-[#0F0F0F] brutalist-shadow text-[#0F0F0F] flex items-center gap-2"
                    >
                      <TechIcon name={t} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Brutalist Tactical HUD with Hard Shadow */}
              <div
                className={`${
                  project.id === 'vashexad' ? 'lg:col-span-7' : 'lg:col-span-5'
                } flex flex-col gap-4`}
              >
                {project.id === 'vashexad' ? (
                  <VasHexadSimulator />
                ) : (
                  <>
                    <div className="border-2 border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F4F0] p-5 sm:p-6 brutalist-shadow relative">
                      {/* Top HUD Frame */}
                      <div className="flex items-center justify-between border-b-2 border-[#F4F4F0] pb-3 mb-4 font-mono text-xs font-bold text-[#CCFF00]">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-[#FF2A00]" />
                          <span className="uppercase">SYSTEM RUNTIME // TELEMETRY</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#F4F4F0] text-[10px]">
                          LIVE
                        </span>
                      </div>

                      {/* Graphics per project */}
                      {index === 3 && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="bg-[#1a1a1a] p-3 border-2 border-[#F4F4F0]">
                            <div className="text-[#CCFF00] text-[10px] uppercase font-bold mb-1">
                              RUNTIME INSTRUCTION PROFILING // SCOPE
                            </div>
                            <div className="space-y-1 text-[11px]">
                              <div className="flex justify-between">
                                <span className="text-[#F4F4F0]/60">THREAD MUTEX LOCK:</span>
                                <span className="text-[#CCFF00] font-bold">0.34 µs [ZERO CONTENTION]</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#F4F4F0]/60">HEAP ALLOCATIONS:</span>
                                <span className="text-[#FF2A00] font-bold">0.00% DRIFT</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-[#F4F4F0]/30 font-bold">
                            <span className="text-[#F4F4F0]/60">TRACE OVERHEAD:</span>
                            <span className="text-[#CCFF00]">&lt; 1.4 µs</span>
                          </div>
                        </div>
                      )}

                      {/* Benchmark Metric Pill */}
                      <div className="mt-4 pt-3 border-t-2 border-[#F4F4F0] flex items-center justify-between font-mono font-bold">
                        <span className="text-[10px] uppercase text-[#F4F4F0]/80">
                          {project.metrics.label}
                        </span>
                        <span className="text-sm font-bold text-[#0F0F0F] bg-[#CCFF00] px-2 py-0.5 border-2 border-[#F4F4F0]">
                          {project.metrics.value}
                        </span>
                      </div>
                    </div>

                    {/* Real Action Links with Hard Shadows */}
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow flex items-center justify-center gap-2 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>CODEBASE // GITHUB</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 px-4 bg-[#CCFF00] hover:bg-[#0F0F0F] text-[#0F0F0F] hover:text-[#CCFF00] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] brutalist-shadow flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LIVE DEMO</span>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            )}

            {/* Bottom Status Footer */}
            <div className="flex flex-wrap items-center justify-between border-t-2 border-[#0F0F0F] pt-4 mt-6 font-mono text-xs font-bold text-[#0F0F0F]">
              <div className="flex items-center gap-3">
                <span className="bg-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F] brutalist-shadow">
                  GITHUB VERIFIED
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">DETERMINISTIC SYSTEMS</span>
              </div>
              <div className="bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F]">
                SCROLL FOR NEXT PROTOCOL →
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
