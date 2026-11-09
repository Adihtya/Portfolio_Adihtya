import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { TechIcon } from './TechIcon';

interface ToolkitSticker {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  rotationClass: string;
  subtext: string;
  spec: string;
  note: string;
}

const TOOLKIT_STICKERS: ToolkitSticker[] = [
  {
    id: '01',
    name: 'Python',
    bgColor: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: '-rotate-2',
    subtext: 'ADVANCED ARCHITECT',
    spec: 'V3.12+',
    note: 'NumPy, AST grammar decomposition, LIF connectome simulations, vector embeddings, high-throughput microservices.',
  },
  {
    id: '02',
    name: 'C++',
    bgColor: 'bg-[#FF2A00]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: 'rotate-3',
    subtext: 'PERFORMANCE KERNEL',
    spec: 'C++20',
    note: 'Low-latency execution loops, memory management, deterministic data structures, numerical Euler integrators.',
  },
  {
    id: '03',
    name: 'React',
    bgColor: 'bg-[#0033FF]',
    textColor: 'text-[#FFFFFF]',
    rotationClass: '-rotate-1',
    subtext: 'INTERACTIVE SYSTEMS',
    spec: 'V18/19',
    note: 'Complex state trees, canvas hooks, high-density telemetry dashboards, custom gesture controllers.',
  },
  {
    id: '04',
    name: 'Next.js',
    bgColor: 'bg-[#FFFFFF]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: 'rotate-2',
    subtext: 'PRODUCTION SCALE',
    spec: 'APP ROUTER',
    note: 'Server components, edge API streaming, dynamic ISR architectures, high-performance static rendering.',
  },
  {
    id: '05',
    name: 'FastAPI',
    bgColor: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: '-rotate-3',
    subtext: 'HIGH-THROUGHPUT API',
    spec: 'ASGI ASYNC',
    note: 'Asynchronous event loops, OpenAPI schema generation, vector retrieval inference pipelines, microsecond caching.',
  },
  {
    id: '06',
    name: 'OpenCV',
    bgColor: 'bg-[#FF2A00]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: 'rotate-1',
    subtext: 'COMPUTER VISION',
    spec: 'REAL-TIME',
    note: 'Spatial plane projection, 21 3D hand keypoint tracking, frame matrix transformation, gesture classification.',
  },
  {
    id: '07',
    name: 'Three.js',
    bgColor: 'bg-[#0033FF]',
    textColor: 'text-[#FFFFFF]',
    rotationClass: '-rotate-2',
    subtext: 'WEBGL SPECIALIST',
    spec: 'R3F + DREI',
    note: '4D hypercube projections, procedural materials, instanced matrix transforms, camera viewport math.',
  },
  {
    id: '08',
    name: 'PyTorch',
    bgColor: 'bg-[#FFFFFF]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: 'rotate-2',
    subtext: 'DEEP LEARNING',
    spec: 'CUDA ACCEL',
    note: 'Tensor algebra, neural connectomics, embedding spaces, loss function engineering, transformer models.',
  },
  {
    id: '09',
    name: 'Docker',
    bgColor: 'bg-[#CCFF00]',
    textColor: 'text-[#0F0F0F]',
    rotationClass: '-rotate-1',
    subtext: 'DETERMINISTIC DEVOPS',
    spec: 'HERMETIC',
    note: 'Multi-stage hermetic containerization, reproducible development sandboxes, isolated compute environments.',
  },
];

export const Toolkit: React.FC = () => {
  const [activeSticker, setActiveSticker] = useState<ToolkitSticker>(TOOLKIT_STICKERS[0]);

  return (
    <section
      id="toolkit"
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-b-2 border-[#0F0F0F] paper-grid select-none"
    >
      <div className="px-4 md:px-12 py-16 md:py-20 max-w-[1800px] mx-auto">
        {/* Section Header */}
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
          {/* Main Container on Left: flex-wrap with specific classes requested */}
          <div className="lg:col-span-8 border-2 border-[#0F0F0F] bg-[#F4F4F0] brutalist-shadow min-h-[520px]">
            <div className="flex flex-wrap gap-8 p-12 justify-center items-center content-start h-full w-full overflow-y-auto relative">
              {TOOLKIT_STICKERS.map((sticker) => (
                <div
                  key={sticker.id}
                  onClick={() => setActiveSticker(sticker)}
                  onMouseEnter={() => setActiveSticker(sticker)}
                  className={`relative flex flex-col justify-between w-64 h-40 p-4 border-[3px] border-[#0F0F0F] brutalist-shadow transition-transform cursor-pointer hover:z-50 hover:scale-105 ${sticker.rotationClass} ${sticker.bgColor} ${sticker.textColor}`}
                >
                  {/* Top row: micro metadata */}
                  <div className="flex justify-between text-xs font-mono font-bold tracking-tighter uppercase">
                    <span>{sticker.id}</span>
                    <span>#CORE</span>
                  </div>

                  {/* Center: Massive Title & Logo */}
                  <div className="flex items-center gap-3">
                    <TechIcon name={sticker.name} size={32} className="w-8 h-8 flex-shrink-0" />
                    <span className="text-4xl font-black uppercase tracking-tighter leading-none font-poster">
                      {sticker.name}
                    </span>
                  </div>

                  {/* Bottom row: subtext */}
                  <div className="text-sm font-bold uppercase tracking-tight border-b-2 border-current pb-1 w-max font-mono">
                    {sticker.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sticker Inspector HUD on Right */}
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
                  <TechIcon name={activeSticker.name} size={32} className="w-8 h-8 text-[#CCFF00]" />
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
    </section>
  );
};

export default Toolkit;
