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
    githubUrl: 'https://github.com/adityachaudhari',
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
    stack: ['Python', 'C++', 'LIF Dynamics', 'WebGL', 'NumPy', 'Canvas API'],
    metrics: { label: 'SYNAPSE RECONSTRUCTION', value: '130,000+ CIRCUITS' },
    category: 'CONNECTOME SIMULATION',
    githubUrl: 'https://github.com/adityachaudhari',
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
      'Dynamic urban brutalist UI with aggressive typography',
    ],
    stack: ['React', 'Next.js', 'FastAPI', 'Redis', 'Vector Search', 'Tailwind'],
    metrics: { label: 'CATALOG ACCURACY SCORE', value: '98.7% CONFIDENCE' },
    category: 'RECOMMENDATION ENGINE',
    githubUrl: 'https://github.com/adityachaudhari',
  },
  {
    id: 'brazil-ecommerce',
    number: '04',
    title: 'BRAZIL E-COMM',
    subtitle: 'Spatial Logistics Analytics & Route Optimization',
    description:
      'End-to-end data analytics and predictive logistics pipeline operating on over 100,000 multi-regional Brazilian marketplace transactions. Identifies distribution bottlenecks and forecasts delivery latency across continental geography.',
    details: [
      'Geospatial customer and seller route clustering across 27 federal states',
      'Random Forest regression predicting delivery delays with 94.2% precision',
      'High-density telemetry dashboard visualizing order throughput',
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
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-4 border-[#0F0F0F] overflow-hidden paper-grid select-none"
    >
      {/* Sticky Top Telemetry Bar */}
      <div className="sticky top-12 z-30 w-full bg-[#CCFF00] border-b-2 border-[#0F0F0F] px-4 md:px-12 py-2.5 flex items-center justify-between font-mono text-xs font-bold text-[#0F0F0F] shadow-hard-sm">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#FF2A00] border border-[#0F0F0F] inline-block" />
          <span>SECTION // 01</span>
          <span>SELECTED WORK</span>
        </div>

        {/* Live Index Indicators */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            {PROJECTS.map((p, idx) => (
              <span
                key={p.id}
                className={`px-2 py-0.5 text-[11px] border border-[#0F0F0F] ${
                  activeProjectIndex === idx
                    ? 'bg-[#0F0F0F] text-[#CCFF00] font-bold shadow-hard-sm'
                    : 'bg-[#F4F4F0] text-[#0F0F0F]'
                }`}
              >
                0{idx + 1}
              </span>
            ))}
          </div>

          <span className="bg-[#0F0F0F] text-[#F4F4F0] px-2 py-0.5 border border-[#0F0F0F]">
            [0{activeProjectIndex + 1} / 0{PROJECTS.length}]
          </span>
        </div>
      </div>

      {/* Main Container: Horizontal on desktop, Vertical on mobile */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-[calc(100vh-3.2rem)] relative"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="work-panel w-full lg:w-[100vw] min-h-screen lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F] relative bg-[#F4F4F0]"
          >
            {/* Background Watermark Index */}
            <div className="absolute right-4 bottom-2 lg:right-12 lg:bottom-8 pointer-events-none select-none font-poster text-[25vw] lg:text-[18vw] text-[#0F0F0F]/[0.05] leading-none">
              {project.number}
            </div>

            {/* Top Bar inside panel */}
            <div className="flex items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-6 font-mono text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] shadow-hard-sm uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="hidden sm:inline bg-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
                  ID: {project.id.toUpperCase()}
                </span>
              </div>
              <div className="text-right bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
                RELEASE // 2025–2026
              </div>
            </div>

            {/* Center Grid: Narrative + Visual Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              {/* Left Column: Loud Typography & Specs */}
              <div className="lg:col-span-7 flex flex-col gap-5">
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

                <p className="font-mono text-sm sm:text-base text-[#0F0F0F] leading-relaxed max-w-2xl bg-[#F4F4F0] p-4 border-2 border-[#0F0F0F] shadow-hard">
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

                {/* Tech Stack Chips (Slapped sticker tags) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider bg-[#CCFF00] border-2 border-[#0F0F0F] shadow-hard-sm text-[#0F0F0F] hover:rotate-2 transition-transform"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Brutalist Tactical HUD */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F4F0] p-5 sm:p-6 shadow-hard-lg relative">
                  {/* Top HUD Frame */}
                  <div className="flex items-center justify-between border-b-2 border-[#F4F4F0] pb-3 mb-4 font-mono text-xs font-bold text-[#CCFF00]">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#FF2A00]" />
                      <span className="uppercase">SYSTEM RUNTIME // TELEMETRY</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#FF2A00] text-[#F4F4F0] border border-[#F4F4F0] text-[10px]">
                      LIVE
                    </span>
                  </div>

                  {/* Graphics per project */}
                  {index === 0 && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="bg-[#1a1a1a] p-3 border-2 border-[#F4F4F0]">
                        <div className="text-[#CCFF00] text-[10px] uppercase font-bold mb-1">
                          AST PARSER TRACE // UNFOLD
                        </div>
                        <div className="text-[#F4F4F0] font-bold text-xs">
                          Root &gt; Module &gt; FunctionDef [unfold_parser]
                        </div>
                        <div className="text-[#F4F4F0]/70 pl-3 text-[11px] mt-1 leading-tight">
                          ├── Call: ast.parse(source_code)<br />
                          ├── Visitor: CyclicDependencyResolver()<br />
                          └── Output: Graph(Nodes=4210, Edges=9840)
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1 border-t border-[#F4F4F0]/30 font-bold">
                        <span className="text-[#F4F4F0]/60">PARSING LATENCY:</span>
                        <span className="text-[#CCFF00]">0.82 ms/module</span>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="bg-[#1a1a1a] p-3 border-2 border-[#F4F4F0]">
                        <div className="text-[#CCFF00] text-[10px] uppercase font-bold mb-1 flex justify-between">
                          <span>MEMBRANE POTENTIAL (LIF)</span>
                          <span className="text-[#FF2A00]">-55 mV [THRESHOLD]</span>
                        </div>
                        <div className="text-[11px] tracking-widest text-[#F4F4F0] font-mono leading-tight py-1 font-bold">
                          V(t) |__/\_||__/\/\_|||__/\_||<br />
                          I(t) |░░▒▒▓▓██▓▓▒▒░░▒▒▓▓██▓▓▒▒<br />
                          Spk  |  *   **   *  ***   *  *
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1 border-t border-[#F4F4F0]/30 font-bold">
                        <span className="text-[#F4F4F0]/60">INTEGRATION TIMESTEP:</span>
                        <span className="text-[#CCFF00]">dt = 0.05 ms</span>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="bg-[#1a1a1a] p-3 border-2 border-[#F4F4F0]">
                        <div className="text-[#CCFF00] text-[10px] uppercase font-bold mb-1">
                          VECTOR SIMILARITY CLUSTER
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 border border-[#F4F4F0]/40">
                            <div className="text-[#F4F4F0]/60 text-[10px]">EMBEDDING:</div>
                            <div className="text-[#F4F4F0] font-bold">Dark × Existential</div>
                          </div>
                          <div className="p-2 border border-[#F4F4F0]/40">
                            <div className="text-[#F4F4F0]/60 text-[10px]">COSINE MATCH:</div>
                            <div className="text-[#FF2A00] font-bold">0.9642</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-[#F4F4F0]/80 mt-2 font-bold">
                          RECOMMENDED: Blade Runner 2049 (98%), Solaris (94%)
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1 border-t border-[#F4F4F0]/30 font-bold">
                        <span className="text-[#F4F4F0]/60">INFERENCE SPEED:</span>
                        <span className="text-[#CCFF00]">24 ms</span>
                      </div>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="bg-[#1a1a1a] p-3 border-2 border-[#F4F4F0]">
                        <div className="text-[#CCFF00] text-[10px] uppercase font-bold mb-1">
                          SPATIAL ROUTING // BR
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-[#F4F4F0]/60">SP → RJ HUB:</span>
                            <span className="text-[#CCFF00] font-bold">1.2 DAYS [OPTIMAL]</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#F4F4F0]/60">SP → AM REGION:</span>
                            <span className="text-[#FF2A00] font-bold">4.8 DAYS [DELAY]</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1 border-t border-[#F4F4F0]/30 font-bold">
                        <span className="text-[#F4F4F0]/60">MODEL SCORE:</span>
                        <span className="text-[#CCFF00]">RMSE = 0.148</span>
                      </div>
                    </div>
                  )}

                  {/* Benchmark Metric Pill */}
                  <div className="mt-4 pt-3 border-t-2 border-[#F4F4F0] flex items-center justify-between font-mono font-bold">
                    <span className="text-[10px] uppercase text-[#F4F4F0]/80">
                      {project.metrics.label}
                    </span>
                    <span className="text-sm font-bold text-[#0F0F0F] bg-[#CCFF00] px-2 py-0.5 border border-[#F4F4F0]">
                      {project.metrics.value}
                    </span>
                  </div>
                </div>

                {/* Action Links with Hard Shadows */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl || 'https://github.com/adityachaudhari'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] shadow-hard flex items-center justify-center gap-2 btn-brutal transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE // GITHUB</span>
                  </a>
                  <a
                    href="#contact"
                    className="py-3 px-4 bg-[#F4F4F0] hover:bg-[#0F0F0F] text-[#0F0F0F] hover:text-[#F4F4F0] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] shadow-hard flex items-center justify-center gap-1 btn-brutal transition-colors"
                  >
                    <span>AUDIT</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Status Footer */}
            <div className="flex flex-wrap items-center justify-between border-t-2 border-[#0F0F0F] pt-4 mt-6 font-mono text-xs font-bold text-[#0F0F0F]">
              <div className="flex items-center gap-3">
                <span className="bg-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
                  PRODUCTION READY
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">RECURRENT DETERMINISTIC</span>
              </div>
              <div className="bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
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
