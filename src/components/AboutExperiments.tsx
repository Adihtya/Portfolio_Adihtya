import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Experiment, SkillItem } from '../types';

const TOOLKIT: SkillItem[] = [
  {
    name: 'Python',
    category: 'Core',
    level: 'Advanced',
    note: 'NumPy, AST grammar parsing, LIF connectome simulations, vector embeddings, backend architectures',
  },
  {
    name: 'C++',
    category: 'Systems',
    level: 'Core Systems',
    note: 'Memory management, deterministic data structures, algorithm optimization, numerical routines',
  },
  {
    name: 'React',
    category: 'Web',
    level: 'Production',
    note: 'Complex reactive architectures, custom hooks, canvas wrappers, high-density dashboard layouts',
  },
  {
    name: 'Next.js',
    category: 'Web',
    level: 'Production',
    note: 'Server components, dynamic streaming architectures, API routes, edge caching',
  },
  {
    name: 'FastAPI',
    category: 'Systems',
    level: 'Production',
    note: 'Async high-throughput microservices, OpenAPI serialization, vector retrieval endpoints',
  },
  {
    name: 'OpenCV',
    category: 'Core',
    level: 'Computer Vision',
    note: 'Spatial plane projection, gesture extraction, edge detection matrices, real-time video frames',
  },
  {
    name: 'Three.js',
    category: 'Graphics',
    level: 'WebGL Specialist',
    note: '4D hypercube projections, procedural shaders, instanced rendering, dynamic buffer geometries',
  },
  {
    name: 'PyTorch',
    category: 'Core',
    level: 'Deep Learning',
    note: 'Tensor algebra, neural modeling, transformer embedding spaces, custom loss functions',
  },
  {
    name: 'Docker',
    category: 'Systems',
    level: 'Infrastructure',
    note: 'Multi-stage deterministic containerization, isolated computational sandboxes',
  },
];

const EXPERIMENTS: Experiment[] = [
  {
    id: 'airkeyboard',
    code: 'EXP_01',
    title: 'AIRKEYBOARD',
    description:
      'Touchless gestural typing interface. Uses real-time computer vision to track 21 3D hand keypoints and calculates continuous spatial intersection rays with a virtual planar keyboard matrix.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    status: 'ACTIVE',
    year: '2025',
  },
  {
    id: 'neural-simulation',
    code: 'EXP_02',
    title: 'NEURAL SIMULATION',
    description:
      'Real-time numerical integrator for biological Leaky Integrate-and-Fire (LIF) neural circuits. Simulates sub-threshold membrane decay, threshold depolarization, and refractory recovery periods.',
    tech: ['WebGL', 'Python', 'Three.js', 'LIF Dynamics'],
    status: 'STABLE',
    year: '2025',
  },
  {
    id: 'latent-atlas',
    code: 'EXP_03',
    title: 'LATENT ATLAS',
    description:
      'High-dimensional semantic embedding projection. Visualizes dense vector clustering in 3D space using instanced geometry and interactive cosine distance heatmaps.',
    tech: ['Three.js', 'FastAPI', 'ChromaDB', 'TypeScript'],
    status: 'EXPERIMENTAL',
    year: '2026',
  },
  {
    id: 'syntax-compiler',
    code: 'EXP_04',
    title: 'SYNTAX KERNEL',
    description:
      'Deterministic BNF grammar parsing engine converting source token streams into directed acyclic dependency graphs with cycle detection and dead-code elimination.',
    tech: ['C++', 'Python', 'AST', 'Compiler Design'],
    status: 'ACTIVE',
    year: '2026',
  },
];

export const AboutExperiments: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(TOOLKIT[0]);

  return (
    <section id="about" className="relative bg-[#2D0000] text-[#EEEAD7] border-b border-[#757D6F]/30">
      {/* Editorial Statement Header */}
      <div className="border-b border-[#757D6F]/25 px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-[#757D6F] uppercase tracking-widest mb-6">
          <span className="w-2.5 h-2.5 bg-[#6D0808]" />
          <span>SECTION // 03</span>
          <span>•</span>
          <span className="text-[#EEEAD7]">SYSTEM IDENTITY & BACKGROUND</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase text-[#EEEAD7]">
              I am a <span className="italic font-serif text-[#EEEAD7] underline decoration-[#6D0808] decoration-2 underline-offset-8">B.Tech CS & AI</span> student at upGrad School of Technology, Pune.
            </h2>

            <div className="mt-8 space-y-4 font-sans text-lg sm:text-xl text-[#EEEAD7]/80 leading-relaxed max-w-3xl">
              <p>
                My work centers on the synthesis of deterministic software engineering and computational intelligence. I build high-concurrency backend services, biologically-inspired connectome simulations, and graphics-rich spatial interfaces that translate abstract computational science into tactile interactive realities.
              </p>
              <p className="text-base text-[#757D6F]">
                Rejecting superficial abstractions, I study how underlying computational models function: from the differential equations governing neuronal membrane potentials to the recursive grammar trees structuring production codebases.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 border border-[#757D6F]/30 bg-[#2D0000] p-6 space-y-4 font-mono text-xs">
            <div className="border-b border-[#757D6F]/25 pb-3 flex items-center justify-between">
              <span className="text-[#757D6F] uppercase">BIOGRAPHICAL REGISTRY</span>
              <span className="text-[#6D0808] font-bold">VERIFIED</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#757D6F] block">NAME:</span>
                <span className="text-[#EEEAD7] font-semibold">Aditya Chaudhari</span>
              </div>
              <div>
                <span className="text-[#757D6F] block">AFFILIATION:</span>
                <span className="text-[#EEEAD7]">upGrad School of Technology</span>
              </div>
              <div>
                <span className="text-[#757D6F] block">PROGRAM:</span>
                <span className="text-[#EEEAD7]">Bachelor of Technology (CS & AI)</span>
              </div>
              <div>
                <span className="text-[#757D6F] block">BASE:</span>
                <span className="text-[#EEEAD7]">Pune, Maharashtra, India</span>
              </div>
              <div>
                <span className="text-[#757D6F] block">PRIMARY RESEARCH:</span>
                <span className="text-[#EEEAD7]">Connectomics, AST Parsing, WebGL</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#757D6F]/25 text-[10px] text-[#757D6F]">
              SYSTEM PARADIGM: DARK EDITORIAL × BRUTALISM
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PART B: TOOLKIT INTERACTIVE TEXT CLUSTER */}
      <div className="border-b border-[#757D6F]/25 px-4 md:px-12 py-16 md:py-20 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#757D6F]/25">
          <div>
            <div className="font-mono text-xs text-[#6D0808] uppercase tracking-[0.25em] mb-1">
              COMPUTATIONAL ARSENAL
            </div>
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#EEEAD7]">
              THE TOOLKIT
            </h3>
          </div>
          <p className="font-mono text-xs text-[#757D6F] max-w-md">
            [HOVER OVER OR SELECT A DISCIPLINE TO INSPECT RUNTIME CAPABILITIES]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Text Cluster (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-6 items-baseline select-none">
            {TOOLKIT.map((tool) => {
              const isSelected = selectedSkill.name === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setSelectedSkill(tool)}
                  onMouseEnter={() => setSelectedSkill(tool)}
                  className={`group relative text-left font-serif transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? 'text-[#EEEAD7] scale-105'
                      : 'text-[#757D6F] hover:text-[#EEEAD7]'
                  }`}
                >
                  <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight inline-block">
                    {tool.name}
                    {isSelected && (
                      <span className="text-[#6D0808] font-mono text-lg ml-1 font-bold">
                        *
                      </span>
                    )}
                  </span>
                  <span
                    className={`block h-0.5 mt-1 transition-all duration-300 ${
                      isSelected
                        ? 'w-full bg-[#6D0808]'
                        : 'w-0 group-hover:w-full bg-[#EEEAD7]/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Skill Readout Inspector HUD (Right 4 cols) */}
          <div className="lg:col-span-4 border-2 border-[#6D0808] bg-[#2D0000] p-6 font-mono text-xs relative">
            <div className="flex items-center justify-between border-b border-[#757D6F]/30 pb-3 mb-4">
              <span className="text-[#757D6F] uppercase">RUNTIME INSPECTOR</span>
              <span className="px-2 py-0.5 bg-[#6D0808] text-[#EEEAD7] font-bold text-[10px] tracking-wider uppercase">
                {selectedSkill.category}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-[#757D6F] block uppercase">DISCIPLINE</span>
                <span className="font-serif text-3xl text-[#EEEAD7] font-normal uppercase">
                  {selectedSkill.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#757D6F] block uppercase">PROFICIENCY DEPTH</span>
                <span className="text-[#EEEAD7] font-semibold text-sm">
                  {selectedSkill.level}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#757D6F] block uppercase">PRACTICAL DOMAINS & PIPELINES</span>
                <p className="text-[#EEEAD7]/90 text-xs leading-relaxed mt-1 font-sans">
                  {selectedSkill.note}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#757D6F]/30 flex items-center justify-between text-[10px] text-[#757D6F]">
              <span>ALLOCATION: CORE STACK</span>
              <span className="text-[#EEEAD7]">STATE: LOADED</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PART C: BRUTALIST EXPERIMENTS GRID */}
      <div id="experiments" className="px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#757D6F]/25">
          <div>
            <div className="font-mono text-xs text-[#6D0808] uppercase tracking-[0.25em] mb-1">
              EXPERIMENTAL LAB & PROTOTYPES
            </div>
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#EEEAD7]">
              RESEARCH & EXPERIMENTS
            </h3>
          </div>
          <div className="font-mono text-xs text-[#757D6F]">
            TOTAL REPOSITORIES: 04 // REAL-TIME BENCHMARKS
          </div>
        </div>

        {/* 2x2 Brutalist Grid with Hard Edges (Zero Border Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="group border border-[#757D6F]/30 hover:border-[#EEEAD7] bg-[#2D0000] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative"
            >
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between border-b border-[#757D6F]/25 pb-4 mb-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[#6D0808] font-bold">{exp.code}</span>
                  <span className="text-[#757D6F]">[{exp.year}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 ${
                      exp.status === 'ACTIVE'
                        ? 'bg-[#6D0808] animate-pulse'
                        : 'bg-[#EEEAD7]'
                    }`}
                  />
                  <span className="text-[#EEEAD7] text-[11px] font-semibold uppercase tracking-wider">
                    {exp.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-8">
                <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase text-[#EEEAD7] group-hover:text-[#6D0808] transition-colors">
                  {exp.title}
                </h4>
                <p className="font-sans text-sm sm:text-base text-[#EEEAD7]/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Tech Stack Chips & Link */}
              <div className="pt-4 border-t border-[#757D6F]/25 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 bg-[#1f0000] border border-[#757D6F]/30 text-[#EEEAD7] text-[10px] uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/adityachaudhari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#EEEAD7] hover:text-[#6D0808] font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  <span>INSPECT SOURCE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutExperiments;
