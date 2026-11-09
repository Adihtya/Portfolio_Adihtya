import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Experiment } from '../types';
import { TechIcon } from './TechIcon';

gsap.registerPlugin(ScrollTrigger);

interface ToolkitSticker {
  id: string;
  name: string;
  bg: string;
  text: string;
  subtext: string;
  tag: string;
  spec: string;
  rotation: string;
  note: string;
}

const TOOLKIT_STICKERS: ToolkitSticker[] = [
  {
    id: '01',
    name: 'PYTHON',
    bg: 'bg-[#CCFF00]',
    text: 'text-[#0F0F0F]',
    subtext: 'ADVANCED ARCHITECT',
    tag: 'SYS // CORE',
    spec: 'V3.12+',
    rotation: '-rotate-2',
    note: 'NumPy, AST grammar decomposition, LIF connectome simulations, vector embeddings, high-throughput microservices.',
  },
  {
    id: '02',
    name: 'C++',
    bg: 'bg-[#FF2A00]',
    text: 'text-[#F4F4F0]',
    subtext: 'PERFORMANCE KERNEL',
    tag: 'SYS // KERNEL',
    spec: 'C++20',
    rotation: 'rotate-3',
    note: 'Low-latency execution loops, memory management, deterministic data structures, numerical Euler integrators.',
  },
  {
    id: '03',
    name: 'REACT',
    bg: 'bg-[#0033FF]',
    text: 'text-[#FFFFFF]',
    subtext: 'INTERACTIVE SYSTEMS',
    tag: 'UI // REACTIVE',
    spec: 'V18/19',
    rotation: '-rotate-1',
    note: 'Complex state trees, canvas hooks, high-density telemetry dashboards, custom gesture controllers.',
  },
  {
    id: '04',
    name: 'NEXT.JS',
    bg: 'bg-[#FFFFFF]',
    text: 'text-[#0F0F0F]',
    subtext: 'PRODUCTION SCALE',
    tag: 'WEB // EDGE',
    spec: 'APP ROUTER',
    rotation: 'rotate-4',
    note: 'Server components, edge API streaming, dynamic ISR architectures, high-performance static rendering.',
  },
  {
    id: '05',
    name: 'FASTAPI',
    bg: 'bg-[#CCFF00]',
    text: 'text-[#0F0F0F]',
    subtext: 'HIGH-THROUGHPUT API',
    tag: 'API // ASYNC',
    spec: 'ASGI ASYNC',
    rotation: '-rotate-3',
    note: 'Asynchronous event loops, OpenAPI schema generation, vector retrieval inference pipelines, microsecond caching.',
  },
  {
    id: '06',
    name: 'OPENCV',
    bg: 'bg-[#FF2A00]',
    text: 'text-[#F4F4F0]',
    subtext: 'COMPUTER VISION',
    tag: 'CV // SPATIAL',
    spec: 'REAL-TIME',
    rotation: 'rotate-2',
    note: 'Spatial plane projection, 21 3D hand keypoint tracking, frame matrix transformation, gesture classification.',
  },
  {
    id: '07',
    name: 'THREE.JS',
    bg: 'bg-[#0033FF]',
    text: 'text-[#FFFFFF]',
    subtext: 'WEBGL SPECIALIST',
    tag: '3D // SHADERS',
    spec: 'R3F + DREI',
    rotation: '-rotate-2',
    note: '4D hypercube projections, procedural materials, instanced matrix transforms, camera viewport math.',
  },
  {
    id: '08',
    name: 'PYTORCH',
    bg: 'bg-[#FFFFFF]',
    text: 'text-[#0F0F0F]',
    subtext: 'DEEP LEARNING',
    tag: 'AI // TENSOR',
    spec: 'CUDA ACCEL',
    rotation: 'rotate-3',
    note: 'Tensor algebra, neural connectomics, embedding spaces, loss function engineering, transformer models.',
  },
  {
    id: '09',
    name: 'DOCKER',
    bg: 'bg-[#CCFF00]',
    text: 'text-[#0F0F0F]',
    subtext: 'DETERMINISTIC DEVOPS',
    tag: 'OPS // ISOLATION',
    spec: 'HERMETIC',
    rotation: '-rotate-1',
    note: 'Multi-stage hermetic containerization, reproducible development sandboxes, isolated compute environments.',
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
    tech: ['WebGL', 'Python', 'Three.js', 'LIF'],
    status: 'STABLE',
    year: '2025',
  },
  {
    id: 'latent-atlas',
    code: 'EXP_03',
    title: 'LATENT ATLAS',
    description:
      'High-dimensional semantic embedding projection. Visualizes dense vector clustering in 3D space using instanced geometry and interactive cosine distance heatmaps.',
    tech: ['Three.js', 'FastAPI', 'ChromaDB', 'Python'],
    status: 'EXPERIMENTAL',
    year: '2026',
  },
  {
    id: 'syntax-compiler',
    code: 'EXP_04',
    title: 'SYNTAX KERNEL',
    description:
      'Deterministic BNF grammar parsing engine converting source token streams into directed acyclic dependency graphs with cycle detection and dead-code elimination.',
    tech: ['C++', 'Python', 'AST', 'Compiler'],
    status: 'ACTIVE',
    year: '2026',
  },
];

export const AboutExperiments: React.FC = () => {
  const [activeSticker, setActiveSticker] = useState<ToolkitSticker>(TOOLKIT_STICKERS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const stickersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stickersContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.from('.brutalist-sticker-item', {
        scale: 0.3,
        opacity: 0,
        y: 40,
        rotation: () => (Math.random() - 0.5) * 40,
        duration: 0.65,
        stagger: 0.07,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: container,
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
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] paper-grid select-none"
    >
      {/* SECTION 01: EDITORIAL BIO POSTER */}
      <div className="border-b-2 border-[#0F0F0F] px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-3 h-3 bg-[#FF2A00] border-2 border-[#0F0F0F]" />
          <span className="bg-[#CCFF00] px-2 py-0.5 border-2 border-[#0F0F0F] brutalist-shadow">
            SECTION // 02
          </span>
          <span>•</span>
          <span className="text-[#0F0F0F]">BIOGRAPHICAL MANIFESTO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-poster text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-normal text-[#0F0F0F]">
              I AM A{' '}
              <span className="bg-[#CCFF00] px-3 py-0.5 border-2 border-[#0F0F0F] brutalist-shadow inline-block -rotate-1">
                B.TECH CS & AI
              </span>{' '}
              STUDENT AT UPGRAD SCHOOL OF TECHNOLOGY, PUNE.
            </h2>

            <div className="mt-8 space-y-4 font-mono text-sm sm:text-base text-[#0F0F0F] leading-relaxed max-w-3xl">
              <p className="bg-[#F4F4F0] p-4 border-2 border-[#0F0F0F] brutalist-shadow">
                Operating at the intersection of deterministic software engineering and computational intelligence. I build high-concurrency backend services, biologically-inspired connectome simulations, and graphics-rich spatial interfaces that translate abstract computational science into tactile realities.
              </p>
              <p className="text-xs text-[#0F0F0F]/80 p-3 border-2 border-[#0F0F0F] bg-[#CCFF00]/20 brutalist-shadow">
                // Rejecting generic SaaS templates: Every system I build explores foundational mechanics — from differential equations governing neuronal spikes to recursive AST grammar engines.
              </p>
            </div>
          </div>

          {/* Urban Sticker Bio Card */}
          <div className="lg:col-span-4 border-2 border-[#0F0F0F] bg-[#F4F4F0] p-6 brutalist-shadow font-mono text-xs relative transform rotate-1">
            <div className="absolute -top-3.5 -right-3 bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] px-3 py-1 font-bold text-xs uppercase brutalist-shadow rotate-6">
              VERIFIED BUILDER
            </div>

            <div className="border-b-2 border-[#0F0F0F] pb-3 mb-4 flex items-center justify-between">
              <span className="font-bold uppercase">ID CARD // VOL. 2026</span>
              <span className="w-2.5 h-2.5 bg-[#CCFF00] border-2 border-[#0F0F0F]" />
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
                <span className="font-bold bg-[#CCFF00] px-1 border-2 border-[#0F0F0F]">CS & ARTIFICIAL INTELLIGENCE</span>
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

      {/* SECTION 02: SCATTERED PHYSICAL BRUTALIST TOOLKIT STICKERS */}
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
          <p className="font-mono text-xs font-bold text-[#0F0F0F] bg-[#CCFF00] px-3 py-1 border-2 border-[#0F0F0F] brutalist-shadow">
            [CLICK OR HOVER ANY STICKER TO INSPECT RUNTIME SPECS]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scattered Physical Stickers Container (Slightly overlapping flex-wrap layout) */}
          <div
            ref={stickersContainerRef}
            className="lg:col-span-8 p-4 sm:p-8 border-2 border-[#0F0F0F] bg-[#F4F4F0] brutalist-shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {TOOLKIT_STICKERS.map((sticker) => {
                const isSelected = activeSticker.id === sticker.id;
                return (
                  <button
                    key={sticker.id}
                    onClick={() => setActiveSticker(sticker)}
                    onMouseEnter={() => setActiveSticker(sticker)}
                    className={`brutalist-sticker-item group relative p-4 sm:p-5 border-2 border-[#0F0F0F] brutalist-shadow text-left cursor-pointer flex flex-col justify-between transition-all duration-200 ${
                      sticker.bg
                    } ${sticker.text} ${sticker.rotation} ${
                      isSelected
                        ? 'scale-105 z-30 ring-4 ring-[#0F0F0F]'
                        : 'hover:scale-105 hover:z-20 hover:rotate-0'
                    }`}
                  >
                    {/* Top-left / top-right micro-metadata row */}
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider opacity-80 mb-2 border-b border-current pb-1.5">
                      <span>{sticker.tag}</span>
                      <span>{sticker.spec}</span>
                    </div>

                    {/* Massive center title with official tech logo */}
                    <div className="flex items-center gap-2.5 my-3">
                      <TechIcon name={sticker.name} className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0" />
                      <span className="font-poster text-3xl sm:text-4xl uppercase tracking-wide leading-none">
                        {sticker.name}
                      </span>
                    </div>

                    {/* Bottom subtext row */}
                    <div className="pt-2 border-t border-current flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider">
                      <span className="bg-[#0F0F0F] text-[#F4F4F0] px-1.5 py-0.5">
                        {sticker.subtext}
                      </span>
                      <span className="text-[10px] opacity-75">#{sticker.id}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Sticker Inspector HUD */}
          <div className="lg:col-span-4 border-2 border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F4F0] p-6 brutalist-shadow font-mono text-xs relative sticky top-24">
            <div className="flex items-center justify-between border-b-2 border-[#F4F4F0] pb-3 mb-4">
              <span className="font-bold text-[#CCFF00] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>STICKER TELEMETRY</span>
              </span>
              <span className="px-2 py-0.5 bg-[#FF2A00] text-[#F4F4F0] font-bold text-[10px] uppercase border-2 border-[#F4F4F0]">
                {activeSticker.spec}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-[#F4F4F0]/60 block uppercase font-bold">
                  ACTIVE TECHNOLOGICAL SPEC
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <TechIcon name={activeSticker.name} className="w-8 h-8 text-[#CCFF00]" />
                  <span className="font-poster text-4xl sm:text-5xl text-[#CCFF00] uppercase tracking-wide">
                    {activeSticker.name}
                  </span>
                </div>
              </div>

              <div className="p-3 border-2 border-[#F4F4F0] bg-[#1a1a1a]">
                <span className="text-[10px] text-[#CCFF00] block uppercase font-bold">
                  CORE ROLE / SPECIALIZATION
                </span>
                <span className="font-bold text-sm text-[#F4F4F0]">
                  {activeSticker.subtext}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#F4F4F0]/60 block uppercase font-bold">
                  PRODUCTION WORKFLOW CAPABILITIES
                </span>
                <p className="text-[#F4F4F0] text-xs leading-relaxed mt-1">
                  {activeSticker.note}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t-2 border-[#F4F4F0] flex items-center justify-between text-[10px] text-[#CCFF00] font-bold">
              <span>STATUS: PRODUCTION LOADED</span>
              <span>100% DETERMINISTIC</span>
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
          <div className="font-mono text-xs font-bold bg-[#FF2A00] text-[#F4F4F0] px-3 py-1 border-2 border-[#0F0F0F] brutalist-shadow">
            4 ACTIVE EXPERIMENTAL PROTOTYPES
          </div>
        </div>

        {/* 2x2 Brutalist Grid with Hard 4px Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="border-2 border-[#0F0F0F] bg-[#F4F4F0] p-6 sm:p-8 flex flex-col justify-between brutalist-shadow relative"
            >
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-6 font-mono text-xs font-bold">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#0F0F0F] text-[#CCFF00] border-2 border-[#0F0F0F]">
                    {exp.code}
                  </span>
                  <span className="text-[#0F0F0F]/60">[{exp.year}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 border-2 border-[#0F0F0F] ${
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

              {/* Tech Stack Chips with Official Tech Logos */}
              <div className="pt-4 border-t-2 border-[#0F0F0F] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#CCFF00] border-2 border-[#0F0F0F] text-[#0F0F0F] text-[10px] font-bold uppercase brutalist-shadow flex items-center gap-1.5"
                    >
                      <TechIcon name={t} className="w-3 h-3 flex-shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>

                <a
                  href="https://github.com/Adihtya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#0F0F0F] hover:bg-[#FF2A00] text-[#F4F4F0] font-bold uppercase tracking-wider text-xs border-2 border-[#0F0F0F] brutalist-shadow flex items-center gap-1.5 transition-colors"
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
