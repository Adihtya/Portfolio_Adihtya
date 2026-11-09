import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Experiment, SkillItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface StickerSkill extends SkillItem {
  color: string;
  textColor: string;
  rotation: string;
  badge: string;
}

const STICKER_TOOLKIT: StickerSkill[] = [
  {
    name: 'Python',
    category: 'Core',
    level: 'Advanced Architect',
    note: 'NumPy, AST grammar parsing, LIF connectome simulations, vector embeddings, backend microservices',
    color: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotation: '-rotate-3',
    badge: '★ CORE 01',
  },
  {
    name: 'C++',
    category: 'Systems',
    level: 'Performance Kernel',
    note: 'Manual memory management, numerical solvers, low-level data structure optimization, tight loops',
    color: 'bg-[#FF2A00]',
    textColor: 'text-[#F4F4F0]',
    rotation: 'rotate-4',
    badge: '⚡ SPEED',
  },
  {
    name: 'React',
    category: 'Web',
    level: 'Interactive Systems',
    note: 'Complex reactive architectures, custom state machines, WebGL canvas integrations, high-density HUDs',
    color: 'bg-[#0033FF]',
    textColor: 'text-[#F4F4F0]',
    rotation: '-rotate-2',
    badge: '● UI SYS',
  },
  {
    name: 'Next.js',
    category: 'Web',
    level: 'Production Scale',
    note: 'Server components, edge API routes, dynamic streaming pipelines, static generation',
    color: 'bg-[#F4F4F0]',
    textColor: 'text-[#0F0F0F]',
    rotation: 'rotate-6',
    badge: '▲ EDGE',
  },
  {
    name: 'FastAPI',
    category: 'Systems',
    level: 'High-Throughput API',
    note: 'Asynchronous Python concurrency, Pydantic type safety, vector similarity inference endpoints',
    color: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotation: '-rotate-6',
    badge: '⚡ 10K REQ/S',
  },
  {
    name: 'OpenCV',
    category: 'Core',
    level: 'Computer Vision',
    note: 'Real-time gesture recognition, spatial plane projection, 21 3D hand landmark coordinate tracking',
    color: 'bg-[#FF2A00]',
    textColor: 'text-[#F4F4F0]',
    rotation: 'rotate-3',
    badge: '👁 VISION',
  },
  {
    name: 'Three.js',
    category: 'Graphics',
    level: 'WebGL Specialist',
    note: '4D hypercube projection, procedural shaders, instanced mesh transforms, responsive interactive scenes',
    color: 'bg-[#0033FF]',
    textColor: 'text-[#F4F4F0]',
    rotation: '-rotate-4',
    badge: '✦ 3D / 4D',
  },
  {
    name: 'PyTorch',
    category: 'Core',
    level: 'Deep Learning',
    note: 'Neural tensor dynamics, transformer embedding pipelines, custom mathematical loss landscapes',
    color: 'bg-[#F4F4F0]',
    textColor: 'text-[#0F0F0F]',
    rotation: 'rotate-2',
    badge: '◆ TENSOR',
  },
  {
    name: 'Docker',
    category: 'Systems',
    level: 'Deterministic DevOps',
    note: 'Multi-stage hermetic containerization, isolated reproducible development sandboxes',
    color: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotation: '-rotate-1',
    badge: '■ CONTAINER',
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
  const [selectedSkill, setSelectedSkill] = useState<StickerSkill>(STICKER_TOOLKIT[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const stickersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickersContainer = stickersRef.current;
    if (!stickersContainer) return;

    const ctx = gsap.context(() => {
      // Slap spring animation for stickers
      gsap.from('.toolkit-sticker', {
        scale: 0.2,
        opacity: 0,
        y: 40,
        rotation: () => (Math.random() - 0.5) * 45,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: stickersContainer,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-4 border-[#0F0F0F] paper-grid select-none"
    >
      {/* SECTION 01: EDITORIAL BIO POSTER */}
      <div className="border-b-2 border-[#0F0F0F] px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-3 h-3 bg-[#FF2A00] border-2 border-[#0F0F0F]" />
          <span className="bg-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
            SECTION // 02
          </span>
          <span>•</span>
          <span className="text-[#0F0F0F]">BIOGRAPHICAL MANIFESTO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-poster text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-normal text-[#0F0F0F]">
              I AM A{' '}
              <span className="bg-[#CCFF00] px-3 py-0.5 border-4 border-[#0F0F0F] shadow-hard inline-block -rotate-1">
                B.TECH CS & AI
              </span>{' '}
              STUDENT AT UPGRAD SCHOOL OF TECHNOLOGY, PUNE.
            </h2>

            <div className="mt-8 space-y-4 font-mono text-sm sm:text-base text-[#0F0F0F] leading-relaxed max-w-3xl">
              <p className="bg-[#F4F4F0] p-4 border-2 border-[#0F0F0F] shadow-hard">
                Operating at the intersection of deterministic software engineering and computational intelligence. I build high-concurrency backend services, biologically-inspired connectome simulations, and graphics-rich spatial interfaces that translate abstract computational science into tactile realities.
              </p>
              <p className="text-xs text-[#0F0F0F]/80 p-3 border-2 border-[#0F0F0F] bg-[#CCFF00]/20">
                // Rejecting generic SaaS templates: Every system I build explores foundational mechanics — from differential equations governing neuronal spikes to recursive AST grammar engines.
              </p>
            </div>
          </div>

          {/* Urban Sticker Bio Card */}
          <div className="lg:col-span-4 border-4 border-[#0F0F0F] bg-[#F4F4F0] p-6 shadow-hard-lg font-mono text-xs relative transform rotate-1">
            <div className="absolute -top-4 -right-3 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] px-3 py-1 font-bold text-xs uppercase shadow-hard-sm rotate-6">
              VERIFIED BUILDER
            </div>

            <div className="border-b-2 border-[#0F0F0F] pb-3 mb-4 flex items-center justify-between">
              <span className="font-bold uppercase">ID CARD // VOL. 2026</span>
              <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-[#0F0F0F]" />
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">NAME:</span>
                <span className="font-poster text-2xl uppercase">ADITYA CHAUDHARI</span>
              </div>
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">INSTITUTION:</span>
                <span className="font-bold">upGrad School of Technology</span>
              </div>
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">FIELD:</span>
                <span className="font-bold bg-[#CCFF00] px-1 border border-[#0F0F0F]">CS & ARTIFICIAL INTELLIGENCE</span>
              </div>
              <div>
                <span className="text-[#0F0F0F]/60 block text-[10px] font-bold">LOCATION:</span>
                <span className="font-bold">Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-[#0F0F0F] flex items-center justify-between text-[10px] font-bold">
              <span>STATUS: OPEN FOR ROLES</span>
              <span className="text-[#FF2A00]">● 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 02: SCATTERED SLAPPED STICKERS TOOLKIT */}
      <div className="border-b-2 border-[#0F0F0F] px-4 md:px-12 py-16 md:py-20 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b-2 border-[#0F0F0F]">
          <div>
            <div className="font-mono text-xs font-bold text-[#FF2A00] uppercase tracking-[0.25em] mb-1">
              PHYSICAL ARSENAL // STICKER CLUSTER
            </div>
            <h3 className="font-poster text-4xl sm:text-6xl uppercase tracking-wide text-[#0F0F0F]">
              THE TOOLKIT STICKERS
            </h3>
          </div>
          <p className="font-mono text-xs font-bold text-[#0F0F0F] bg-[#CCFF00] px-3 py-1 border-2 border-[#0F0F0F] shadow-hard-sm">
            [CLICK OR HOVER ANY STICKER TO INSPECT RUNTIME SPECS]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scattered Slapped Stickers Container (Left 8 cols) */}
          <div
            ref={stickersRef}
            className="lg:col-span-8 flex flex-wrap gap-4 sm:gap-6 p-4 sm:p-8 border-4 border-[#0F0F0F] bg-[#F4F4F0] shadow-hard-lg"
          >
            {STICKER_TOOLKIT.map((tool) => {
              const isSelected = selectedSkill.name === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setSelectedSkill(tool)}
                  onMouseEnter={() => setSelectedSkill(tool)}
                  className={`toolkit-sticker group relative p-3 sm:p-4 border-2 border-[#0F0F0F] font-mono text-left transition-all duration-150 cursor-pointer ${
                    tool.color
                  } ${tool.textColor} ${tool.rotation} ${
                    isSelected
                      ? 'scale-110 shadow-hard-lg z-30 ring-4 ring-[#0F0F0F]'
                      : 'shadow-hard hover:scale-105 hover:shadow-hard-lg hover:z-20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] font-bold mb-1 opacity-80">
                    <span>{tool.badge}</span>
                    <span>#{tool.category.toUpperCase()}</span>
                  </div>
                  <div className="font-poster text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide leading-none">
                    {tool.name}
                  </div>
                  <div className="text-[10px] font-bold mt-1 uppercase underline decoration-[#0F0F0F]">
                    {tool.level}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Skill Inspector HUD (Right 4 cols) */}
          <div className="lg:col-span-4 border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F4F0] p-6 shadow-hard-lg font-mono text-xs relative">
            <div className="flex items-center justify-between border-b-2 border-[#F4F4F0] pb-3 mb-4">
              <span className="font-bold text-[#CCFF00] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>STICKER TELEMETRY</span>
              </span>
              <span className="px-2 py-0.5 bg-[#FF2A00] text-[#F4F4F0] font-bold text-[10px] uppercase border border-[#F4F4F0]">
                {selectedSkill.category}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-[#F4F4F0]/60 block uppercase font-bold">
                  TECHNOLOGY DISCIPLINE
                </span>
                <span className="font-poster text-4xl sm:text-5xl text-[#CCFF00] uppercase tracking-wide">
                  {selectedSkill.name}
                </span>
              </div>

              <div className="p-3 border-2 border-[#F4F4F0] bg-[#1a1a1a]">
                <span className="text-[10px] text-[#CCFF00] block uppercase font-bold">
                  PROFICIENCY LEVEL
                </span>
                <span className="font-bold text-sm text-[#F4F4F0]">
                  {selectedSkill.level}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#F4F4F0]/60 block uppercase font-bold">
                  PRODUCTION WORKFLOWS
                </span>
                <p className="text-[#F4F4F0] text-xs leading-relaxed mt-1">
                  {selectedSkill.note}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t-2 border-[#F4F4F0] flex items-center justify-between text-[10px] text-[#CCFF00] font-bold">
              <span>STATE: SLAPPED ON CANVAS</span>
              <span>100% RAW</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 03: BRUTALIST EXPERIMENTS GRID */}
      <div id="experiments" className="px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b-2 border-[#0F0F0F]">
          <div>
            <div className="font-mono text-xs font-bold text-[#0033FF] uppercase tracking-[0.25em] mb-1">
              EXPERIMENTAL RESEARCH
            </div>
            <h3 className="font-poster text-4xl sm:text-6xl uppercase tracking-wide text-[#0F0F0F]">
              BRUTALIST LAB EXPERIMENTS
            </h3>
          </div>
          <div className="font-mono text-xs font-bold bg-[#FF2A00] text-[#F4F4F0] px-3 py-1 border-2 border-[#0F0F0F] shadow-hard-sm">
            4 ACTIVE EXPERIMENTAL PROTOTYPES
          </div>
        </div>

        {/* 2x2 Brutalist Grid with Hard 4px Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="border-4 border-[#0F0F0F] bg-[#F4F4F0] p-6 sm:p-8 flex flex-col justify-between shadow-hard-lg hover:-translate-y-1 transition-transform duration-150 relative"
            >
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-6 font-mono text-xs font-bold">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#0F0F0F] text-[#CCFF00]">
                    {exp.code}
                  </span>
                  <span className="text-[#0F0F0F]/60">[{exp.year}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 border border-[#0F0F0F] ${
                      exp.status === 'ACTIVE'
                        ? 'bg-[#FF2A00] animate-pulse'
                        : 'bg-[#CCFF00]'
                    }`}
                  />
                  <span className="text-[11px] uppercase tracking-wider">
                    {exp.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-8">
                <h4 className="font-poster text-3xl sm:text-5xl uppercase text-[#0F0F0F]">
                  {exp.title}
                </h4>
                <p className="font-mono text-xs sm:text-sm text-[#0F0F0F] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Tech Stack Chips & Link */}
              <div className="pt-4 border-t-2 border-[#0F0F0F] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#CCFF00] border-2 border-[#0F0F0F] text-[#0F0F0F] text-[10px] font-bold uppercase shadow-hard-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/adityachaudhari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#0F0F0F] hover:bg-[#FF2A00] text-[#F4F4F0] font-bold uppercase tracking-wider text-xs border-2 border-[#0F0F0F] shadow-hard-sm flex items-center gap-1.5 transition-colors"
                >
                  <span>SOURCE CODE</span>
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
