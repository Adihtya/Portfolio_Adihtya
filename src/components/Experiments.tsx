import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Experiment } from '../types';
import { TechIcon } from './TechIcon';

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

export const Experiments: React.FC = () => {
  return (
    <section
      id="experiments"
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] paper-grid select-none"
    >
      <div className="px-4 md:px-12 py-16 md:py-24 max-w-[1800px] mx-auto">
        {/* Section Header */}
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

export default Experiments;
