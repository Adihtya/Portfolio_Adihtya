import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Terminal, ChevronRight } from 'lucide-react';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: Project[] = [
  {
    id: 'unfold',
    number: '01',
    title: 'UNFOLD',
    subtitle: 'Autonomous Code Intelligence & AST Decomposition Platform',
    description:
      'Engineered a deterministic code comprehension engine that constructs semantic abstract syntax trees (ASTs) and dependency graphs in real-time. Translates massive multi-repository codebases into navigable contextual graph models for developer agents.',
    details: [
      'Recursive language grammar analysis across Python, TypeScript, and C++',
      'Real-time call-graph synthesis and cyclical dependency detection',
      'Vectorized code search with sub-200ms latency across 500k+ lines of code',
    ],
    stack: ['Python', 'React', 'FastAPI', 'AST', 'Tree-Sitter', 'ChromaDB'],
    metrics: { label: 'SYNTAX PROCESSING SPEED', value: '185,000 LOC/s' },
    category: 'CODE INTELLIGENCE PLATFORM',
    githubUrl: 'https://github.com/adityachaudhari',
  },
  {
    id: 'vashexad',
    number: '02',
    title: 'VASHEXAD',
    subtitle: '2D Fruit-Fly Connectome & LIF Dynamics Simulator',
    description:
      'A biologically authentic computational simulation modeled on Drosophila melanogaster sensorimotor circuits. Implements Leaky Integrate-and-Fire (LIF) membrane differential equations across dense synaptic weight matrices to reproduce directional steering reflex loops.',
    details: [
      'Numerical Euler-integration of sub-threshold voltage decay and spike thresholds',
      'Configurable synaptic delay queues with STDP plasticity mechanics',
      'Real-time membrane potential oscilloscope and raster plot rendering via WebGL',
    ],
    stack: ['Python', 'C++', 'LIF Dynamics', 'WebGL', 'NumPy', 'Canvas API'],
    metrics: { label: 'SYNAPSE RECONSTRUCTION', value: '130,000+ CIRCUITS' },
    category: 'NEUROMORPHIC SIMULATION',
    githubUrl: 'https://github.com/adityachaudhari',
  },
  {
    id: 'watch-or-skip',
    number: '03',
    title: 'WATCH OR SKIP',
    subtitle: 'Real-Time Predictive Cinema Discovery Engine',
    description:
      'High-precision movie intelligence platform designed to eliminate decision paralysis. Utilizes hybrid multi-dimensional vector embeddings and narrative tone extraction to deliver instant, high-confidence film verdicts.',
    details: [
      'High-dimensional cinematic embedding space trained on critical sentiment',
      'Instantaneous zero-drift vector similarity filtering with sub-40ms cache hits',
      'Dynamic editorial UI featuring responsive typographic density',
    ],
    stack: ['React', 'Next.js', 'FastAPI', 'Redis', 'Vector Search', 'Tailwind CSS'],
    metrics: { label: 'CATALOG ACCURACY SCORE', value: '98.7% CONFIDENCE' },
    category: 'RECOMMENDATION ENGINE',
    githubUrl: 'https://github.com/adityachaudhari',
  },
  {
    id: 'brazil-ecommerce',
    number: '04',
    title: 'BRAZIL E-COMMERCE',
    subtitle: 'Spatial Logistics Analytics & Route Optimization Dashboard',
    description:
      'End-to-end data analytics and predictive logistics pipeline operating on over 100,000 multi-regional Brazilian marketplace transactions. Identifies distribution bottlenecks and forecasts delivery latency across continental geography.',
    details: [
      'Geospatial customer and seller route clustering across 27 federal states',
      'Random Forest regression predicting delivery delays with 94.2% precision',
      'High-density brutalist telemetry dashboard visualizing order throughput',
    ],
    stack: ['Python', 'Pandas', 'Scikit-Learn', 'BigQuery', 'D3.js', 'Tailwind'],
    metrics: { label: 'RECORD SET ANALYZED', value: '100K+ TRANSACTIONS' },
    category: 'DATA SYSTEMS & ML',
    githubUrl: 'https://github.com/adityachaudhari',
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

    // Check if desktop for horizontal wipe
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
        // Mobile fallback: vertical reveal triggers
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
      className="relative bg-[#2D0000] text-[#EEEAD7] border-b border-[#757D6F]/30 overflow-hidden"
    >
      {/* Top Section Sticky Header / Telemetry Bar */}
      <div className="sticky top-12 z-30 w-full bg-[#2D0000]/95 backdrop-blur border-b border-[#757D6F]/25 px-4 md:px-12 py-3 flex items-center justify-between font-mono text-xs text-[#757D6F]">
        <div className="flex items-center gap-3">
          <span className="text-[#6D0808] font-bold">SECTION // 02</span>
          <span className="text-[#EEEAD7]">SELECTED ARCHITECTURAL WORKS</span>
        </div>

        {/* Live Index Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            {PROJECTS.map((p, idx) => (
              <span
                key={p.id}
                className={`px-2 py-0.5 text-[11px] transition-colors ${
                  activeProjectIndex === idx
                    ? 'bg-[#6D0808] text-[#EEEAD7] font-bold'
                    : 'text-[#757D6F] border border-[#757D6F]/30'
                }`}
              >
                0{idx + 1}
              </span>
            ))}
          </div>

          <span className="text-[#EEEAD7]">
            [0{activeProjectIndex + 1} / 0{PROJECTS.length}]
          </span>
        </div>
      </div>

      {/* Main Container: Horizontal on desktop, Stacked on mobile */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-[calc(100vh-3.2rem)] relative"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="work-panel w-full lg:w-[100vw] min-h-screen lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#757D6F]/25 relative"
          >
            {/* Background Massive Project Number Watermark */}
            <div className="absolute right-6 bottom-4 lg:right-16 lg:bottom-12 pointer-events-none select-none font-serif text-[18vw] lg:text-[14vw] text-[#EEEAD7]/[0.03] leading-none font-black">
              {project.number}
            </div>

            {/* Top Bar inside panel */}
            <div className="flex items-center justify-between border-b border-[#757D6F]/25 pb-4 mb-6 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#6D0808] text-[#EEEAD7] font-semibold text-[10px] tracking-widest uppercase">
                  {project.category}
                </span>
                <span className="text-[#757D6F] hidden sm:inline">
                  SYS_ID: {project.id.toUpperCase()}
                </span>
              </div>
              <div className="text-right text-[#757D6F]">
                RELEASE // 2025–2026
              </div>
            </div>

            {/* Center Grid: Narrative + Visual Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              {/* Left Column: Typography & System Specs */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="font-mono text-xs text-[#6D0808] tracking-[0.25em] uppercase mb-2">
                    PROJECT ARCHIVE /{project.number}
                  </div>
                  <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight uppercase text-[#EEEAD7] leading-none">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#757D6F] uppercase tracking-wider mt-2">
                    {project.subtitle}
                  </p>
                </div>

                <p className="font-sans text-base sm:text-lg text-[#EEEAD7]/90 leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {/* Key Architectural Details */}
                <div className="space-y-2 border-l-2 border-[#6D0808] pl-4 py-1">
                  {project.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="font-mono text-xs text-[#EEEAD7]/80 flex items-start gap-2"
                    >
                      <span className="text-[#6D0808] font-bold">›</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips (Strict Brutalist zero border-radius) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider bg-[#2D0000] border border-[#757D6F]/40 text-[#EEEAD7] hover:border-[#EEEAD7] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Brutalist Interactive Technical HUD */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="border border-[#757D6F]/40 bg-[#2D0000] p-5 sm:p-6 relative group hover:border-[#EEEAD7]/60 transition-colors">
                  {/* Top HUD Frame */}
                  <div className="flex items-center justify-between border-b border-[#757D6F]/20 pb-3 mb-4 font-mono text-[11px] text-[#757D6F]">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#6D0808]" />
                      <span className="uppercase text-[#EEEAD7]">SYSTEM TELEMETRY</span>
                    </div>
                    <span className="text-[#6D0808] animate-pulse">LIVE</span>
                  </div>

                  {/* Dynamic Graphic representation per project */}
                  {index === 0 && (
                    <div className="space-y-3 font-mono text-xs text-[#EEEAD7]/80">
                      <div className="bg-[#1f0000] p-3 border border-[#757D6F]/20">
                        <div className="text-[#757D6F] text-[10px] uppercase mb-1">AST SYNTAX TREE [SIMULATED]</div>
                        <div className="text-[#EEEAD7] font-semibold text-[11px]">
                          Root &gt; Module &gt; FunctionDef [unfold_parser]
                        </div>
                        <div className="text-[#757D6F] pl-4 text-[10px] mt-1">
                          ├── Call: ast.parse(source_stream)<br />
                          ├── NodeVisitor: ResolveCyclicDependencies()<br />
                          └── Return: DirectedGraph(nodes=4210, edges=9840)
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#757D6F]/20">
                        <span className="text-[#757D6F]">PARSING LATENCY:</span>
                        <span className="text-[#EEEAD7] font-bold">0.82 ms/module</span>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="space-y-3 font-mono text-xs text-[#EEEAD7]/80">
                      <div className="bg-[#1f0000] p-3 border border-[#757D6F]/20">
                        <div className="text-[#757D6F] text-[10px] uppercase mb-1 flex items-center justify-between">
                          <span>MEMBRANE POTENTIAL (LIF)</span>
                          <span className="text-[#6D0808]">-55 mV [THRESHOLD]</span>
                        </div>
                        {/* ASCII Spike Train Oscilloscope */}
                        <div className="text-[10px] tracking-widest text-[#EEEAD7] font-mono leading-tight py-1">
                          V(t) |__/\_||__/\/\_|||__/\_||<br />
                          I(t) |░░▒▒▓▓██▓▓▒▒░░▒▒▓▓██▓▓▒▒<br />
                          Spk  |  *   **   *  ***   *  *
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#757D6F]/20">
                        <span className="text-[#757D6F]">INTEGRATION TIMESTEP:</span>
                        <span className="text-[#EEEAD7] font-bold">dt = 0.05 ms</span>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="space-y-3 font-mono text-xs text-[#EEEAD7]/80">
                      <div className="bg-[#1f0000] p-3 border border-[#757D6F]/20">
                        <div className="text-[#757D6F] text-[10px] uppercase mb-1">LATENT VECTOR SIMILARITY</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 border border-[#757D6F]/20">
                            <div className="text-[#757D6F]">TONAL VECTOR:</div>
                            <div className="text-[#EEEAD7] font-bold">Dark × Existential</div>
                          </div>
                          <div className="p-2 border border-[#757D6F]/20">
                            <div className="text-[#757D6F]">COSINE MATCH:</div>
                            <div className="text-[#6D0808] font-bold">0.9642</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-[#757D6F] mt-2">
                          RECOMMENDED: Blade Runner 2049 (98%), Solaris (94%)
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#757D6F]/20">
                        <span className="text-[#757D6F]">INFERENCE TIME:</span>
                        <span className="text-[#EEEAD7] font-bold">24 ms</span>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="space-y-3 font-mono text-xs text-[#EEEAD7]/80">
                      <div className="bg-[#1f0000] p-3 border border-[#757D6F]/20">
                        <div className="text-[#757D6F] text-[10px] uppercase mb-1">SPATIAL TRANSIT ROUTING</div>
                        <div className="space-y-1 text-[10px]">
                          <div className="flex justify-between">
                            <span className="text-[#757D6F]">SP → RJ HUB:</span>
                            <span className="text-[#EEEAD7]">1.2 DAYS [OPTIMAL]</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757D6F]">SP → AM REGION:</span>
                            <span className="text-[#6D0808]">4.8 DAYS [DELAY DETECTED]</span>
                          </div>
                          <div className="w-full bg-[#2D0000] h-1.5 border border-[#757D6F]/30 mt-2">
                            <div className="bg-[#6D0808] h-full w-[94%]" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#757D6F]/20">
                        <span className="text-[#757D6F]">MODEL METRIC:</span>
                        <span className="text-[#EEEAD7] font-bold">RMSE = 0.148</span>
                      </div>
                    </div>
                  )}

                  {/* Benchmark Metric Pill */}
                  <div className="mt-4 pt-3 border-t border-[#757D6F]/30 flex items-center justify-between font-mono">
                    <span className="text-[10px] uppercase text-[#757D6F]">
                      {project.metrics.label}
                    </span>
                    <span className="text-sm font-bold text-[#EEEAD7] bg-[#6D0808]/40 px-2 py-0.5 border border-[#6D0808]">
                      {project.metrics.value}
                    </span>
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl || 'https://github.com/adityachaudhari'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] font-mono text-xs uppercase tracking-wider font-semibold border border-[#EEEAD7]/20 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>CODEBASE // GITHUB</span>
                  </a>
                  <a
                    href="#contact"
                    className="py-3 px-4 bg-transparent hover:bg-[#EEEAD7]/10 text-[#EEEAD7] font-mono text-xs uppercase tracking-wider border border-[#757D6F]/40 hover:border-[#EEEAD7] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>AUDIT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Panel Status Footer */}
            <div className="flex flex-wrap items-center justify-between border-t border-[#757D6F]/25 pt-4 mt-6 font-mono text-xs text-[#757D6F]">
              <div className="flex items-center gap-4">
                <span>SYSTEM MATURITY: PRODUCTION READY</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">ARCH: RECURRENT / DETERMINISTIC</span>
              </div>
              <div className="text-[#EEEAD7]">
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
