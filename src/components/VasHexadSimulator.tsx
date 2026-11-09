import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Zap, Activity, Cpu } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
  type: 'sensory' | 'inter' | 'motor' | 'central';
  spikeTimer: number;
}

interface Edge {
  from: number;
  to: number;
  pulseProgress: number; // 0 to 1
  active: boolean;
}

export const VasHexadSimulator: React.FC = () => {
  const [isStimulated, setIsStimulated] = useState<boolean>(false);
  const [currentInjection, setCurrentInjection] = useState<number>(28);
  const [membranePotential, setMembranePotential] = useState<number>(-55.0);
  const [firingRate, setFiringRate] = useState<number>(38.4);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const vRef = useRef<number>(-65.0);
  const spikePhaseRef = useRef<number>(0);

  // Biological Drosophila connectome node topology (Normalized 0..1 coordinates)
  const nodesRef = useRef<Node[]>([
    { id: 0, x: 0.18, y: 0.25, label: 'AL_L', type: 'sensory', spikeTimer: 0 },
    { id: 1, x: 0.82, y: 0.25, label: 'AL_R', type: 'sensory', spikeTimer: 0 },
    { id: 2, x: 0.35, y: 0.40, label: 'MB_L', type: 'inter', spikeTimer: 0 },
    { id: 3, x: 0.65, y: 0.40, label: 'MB_R', type: 'inter', spikeTimer: 0 },
    { id: 4, x: 0.50, y: 0.32, label: 'EB_CORE', type: 'central', spikeTimer: 0 },
    { id: 5, x: 0.42, y: 0.58, label: 'FB_1', type: 'central', spikeTimer: 0 },
    { id: 6, x: 0.58, y: 0.58, label: 'FB_2', type: 'central', spikeTimer: 0 },
    { id: 7, x: 0.25, y: 0.78, label: 'MN_STEER_L', type: 'motor', spikeTimer: 0 },
    { id: 8, x: 0.75, y: 0.78, label: 'MN_STEER_R', type: 'motor', spikeTimer: 0 },
    { id: 9, x: 0.50, y: 0.85, label: 'THORACIC_VNC', type: 'motor', spikeTimer: 0 },
  ]);

  const edgesRef = useRef<Edge[]>([
    { from: 0, to: 2, pulseProgress: 0, active: false },
    { from: 1, to: 3, pulseProgress: 0, active: false },
    { from: 0, to: 4, pulseProgress: 0, active: false },
    { from: 1, to: 4, pulseProgress: 0, active: false },
    { from: 2, to: 5, pulseProgress: 0, active: false },
    { from: 3, to: 6, pulseProgress: 0, active: false },
    { from: 4, to: 5, pulseProgress: 0, active: false },
    { from: 4, to: 6, pulseProgress: 0, active: false },
    { from: 5, to: 6, pulseProgress: 0, active: false },
    { from: 5, to: 7, pulseProgress: 0, active: false },
    { from: 6, to: 8, pulseProgress: 0, active: false },
    { from: 7, to: 9, pulseProgress: 0, active: false },
    { from: 8, to: 9, pulseProgress: 0, active: false },
  ]);

  // Real-time LIF differential equation integration loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05); // seconds
      lastTime = time;

      const effectiveCurrent = currentInjection + (isStimulated ? 35 : 0) + (isHovered ? 12 : 0);
      const computedHz = Math.max(0, effectiveCurrent * 1.5 + (Math.sin(time * 0.005) * 2));
      setFiringRate(Number(computedHz.toFixed(1)));

      // LIF biological parameters tuned for Drosophila neuron kinetics
      // Membrane potential typically rests between -55 mV and -45 mV with threshold at -40 mV
      const baseRest = -55.0 + (effectiveCurrent / 60) * 12.0; // -55 mV up to -43 mV
      const vThresh = -40.0;
      const vReset = -56.0;
      const tau = 0.025; // 25ms membrane time constant
      const R = 0.45;

      // Numerical Euler Integration
      let v = vRef.current;
      if (v >= 10.0) {
        // Was spiking in previous frame -> reset
        v = vReset;
      } else {
        const dv = (-(v - baseRest) + R * effectiveCurrent) / tau * dt;
        v += dv + (Math.random() - 0.5) * 0.9; // stochastic thermal ion noise

        if (v >= vThresh) {
          // Action potential triggered!
          v = 18.0 + Math.random() * 4.0; // peak spike +18..+22 mV

          // Trigger pulse wave on active edges
          edgesRef.current.forEach((edge) => {
            if (Math.random() > 0.3) {
              edge.active = true;
              edge.pulseProgress = 0;
            }
          });

          // Spike Drosophila neuropil nodes
          nodesRef.current.forEach((node) => {
            if (Math.random() > 0.3) {
              node.spikeTimer = 1.0;
            }
          });
        }
      }
      vRef.current = v;
      setMembranePotential(Number(v.toFixed(1)));

      // Render 2D Connectome Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const targetW = Math.floor(rect.width);
          const targetH = Math.floor(rect.height);
          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
          }
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;

          // Clear with dark technical grid background
          ctx.fillStyle = '#0F0F0F';
          ctx.fillRect(0, 0, w, h);

          // Subtle coordinate grid lines
          ctx.strokeStyle = '#1e1e1e';
          ctx.lineWidth = 1;
          for (let x = 0; x < w; x += 24) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
          }
          for (let y = 0; y < h; y += 24) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
          }

          // Draw Synaptic Pathway Edges
          edgesRef.current.forEach((edge) => {
            const p1 = nodesRef.current[edge.from];
            const p2 = nodesRef.current[edge.to];
            const x1 = p1.x * w;
            const y1 = p1.y * h;
            const x2 = p2.x * w;
            const y2 = p2.y * h;

            // Base connection wire
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Action Potential Pulse Wave Propagation
            if (edge.active) {
              edge.pulseProgress += dt * 3.5;
              if (edge.pulseProgress >= 1) {
                edge.active = false;
                edge.pulseProgress = 0;
                // Target node lights up upon arrival
                nodesRef.current[edge.to].spikeTimer = 1.0;
              } else {
                const pulseX = x1 + (x2 - x1) * edge.pulseProgress;
                const pulseY = y1 + (y2 - y1) * edge.pulseProgress;

                // Glowing traveling charge
                ctx.fillStyle = edge.from % 2 === 0 ? '#CCFF00' : '#FF2A00';
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });

          // Draw Drosophila Connectome Nodes
          nodesRef.current.forEach((node) => {
            const nx = node.x * w;
            const ny = node.y * h;

            if (node.spikeTimer > 0) {
              node.spikeTimer -= dt * 4.0;
              if (node.spikeTimer < 0) node.spikeTimer = 0;
            }

            const isSpiking = node.spikeTimer > 0;
            const radius = isSpiking ? 7 + node.spikeTimer * 5 : 5;

            // Halo glow on spike
            if (isSpiking) {
              ctx.fillStyle = node.type === 'motor' ? 'rgba(255, 42, 0, 0.4)' : 'rgba(204, 255, 0, 0.4)';
              ctx.beginPath();
              ctx.arc(nx, ny, radius * 1.8, 0, Math.PI * 2);
              ctx.fill();
            }

            // Node Core
            ctx.fillStyle = isSpiking
              ? node.type === 'motor'
                ? '#FF2A00'
                : '#CCFF00'
              : '#F4F4F0';
            ctx.strokeStyle = '#0F0F0F';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(nx, ny, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Monospace Node Label
            ctx.fillStyle = isSpiking ? '#CCFF00' : '#888888';
            ctx.font = '9px monospace';
            ctx.fillText(node.label, nx + 9, ny + 3);
          });

          // Raster Oscilloscope Spark Line in Bottom Corner
          spikePhaseRef.current += dt * computedHz * 0.4;
          ctx.strokeStyle = '#CCFF00';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          const oscY = h - 16;
          const oscW = 80;
          const oscX = w - oscW - 12;
          for (let i = 0; i < oscW; i++) {
            const sample = Math.sin((i * 0.3) + spikePhaseRef.current * 4) * (computedHz > 10 ? 6 : 1);
            const py = oscY + (i % 12 === 0 && computedHz > 15 ? -10 : sample);
            if (i === 0) ctx.moveTo(oscX + i, py);
            else ctx.lineTo(oscX + i, py);
          }
          ctx.stroke();
          ctx.fillStyle = '#CCFF00';
          ctx.font = '8px monospace';
          ctx.fillText('LIF_OSC', oscX, oscY - 10);
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [currentInjection, isStimulated, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full border-[3px] border-[#0F0F0F] bg-[#0F0F0F] text-[#F4F4F0] shadow-[6px_6px_0px_0px_#0F0F0F] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Technical Control Header */}
      <div className="border-b-[3px] border-[#0F0F0F] bg-[#CCFF00] text-[#0F0F0F] px-4 py-2.5 flex flex-wrap items-center justify-between font-mono text-xs font-bold">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF2A00]" />
          <span className="uppercase tracking-wider">VASHEXAD // 2D CONNECTOME KERNEL</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="bg-[#0F0F0F] text-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
            LIF DYNAMICS: ACTIVE
          </span>
          <span className="text-[#FF2A00] animate-pulse">● LIVE_FEED</span>
        </div>
      </div>

      {/* Editorial Split Layout: Left Controls & Stats, Right Dynamic Neural Mesh */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#0F0F0F] bg-[#0F0F0F]">
        {/* LEFT SIDE: Interactive Live Controls & Monospace Telemetry */}
        <div className="md:col-span-6 p-5 flex flex-col justify-between gap-5 bg-[#0F0F0F]">
          {/* Stimulation Toggle Button */}
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] text-[#F4F4F0]/60 uppercase mb-2 font-bold">
              <span>SYNTHETIC CURRENT INJECTION</span>
              <span className={isStimulated ? 'text-[#FF2A00]' : 'text-[#CCFF00]'}>
                {isStimulated ? 'STIMULATED' : 'RESTING'}
              </span>
            </div>

            <button
              onClick={() => setIsStimulated(!isStimulated)}
              className={`w-full py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#F4F4F0] flex items-center justify-center gap-2 transition-all ${
                isStimulated
                  ? 'bg-[#FF2A00] text-[#F4F4F0] shadow-[2px_2px_0px_0px_#CCFF00]'
                  : 'bg-[#1a1a1a] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#0F0F0F]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isStimulated ? 'animate-bounce' : ''}`} />
              <span>[STATE: {isStimulated ? 'STIMULATED' : 'RESTING'}]</span>
            </button>
          </div>

          {/* Current Injection Slider */}
          <div className="space-y-2 font-mono">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#F4F4F0]/70 uppercase">I_inj (CURRENT INJECTION):</span>
              <span className="text-[#CCFF00]">{currentInjection} nA</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={currentInjection}
              onChange={(e) => setCurrentInjection(Number(e.target.value))}
              className="w-full h-2 bg-[#262626] border border-[#F4F4F0] appearance-none cursor-pointer accent-[#CCFF00]"
            />
            <div className="flex justify-between text-[10px] text-[#F4F4F0]/50 font-mono">
              <span>0 nA (SUB-THRESHOLD)</span>
              <span>60 nA (SATURATED)</span>
            </div>
          </div>

          {/* Monospace Live Telemetry Stats */}
          <div className="space-y-2 border-2 border-[#262626] bg-[#141414] p-3.5 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#262626] pb-1.5">
              <span className="text-[#F4F4F0]/60">MEMBRANE POTENTIAL:</span>
              <span
                className={`font-bold text-sm ${
                  membranePotential >= -45 ? 'text-[#FF2A00] animate-pulse' : 'text-[#CCFF00]'
                }`}
              >
                {membranePotential > 0 ? `+${membranePotential}` : membranePotential} mV
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#262626] pb-1.5">
              <span className="text-[#F4F4F0]/60">FIRING FREQUENCY:</span>
              <span className="text-[#F4F4F0] font-bold text-sm">
                {firingRate} Hz
              </span>
            </div>

            <div className="flex justify-between items-center pt-0.5">
              <span className="text-[#F4F4F0]/60">CONNECTOME SCALE:</span>
              <span className="text-[#CCFF00] font-bold">
                130,000+ CIRCUITS
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Dynamic 2D Drosophila Connectome Canvas Mesh */}
        <div className="md:col-span-6 relative min-h-[260px] flex flex-col justify-between bg-[#0F0F0F]">
          <div className="absolute top-2 left-3 z-10 font-mono text-[9px] text-[#F4F4F0]/50 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#CCFF00]" />
            <span>2D DROSOPHILA SENSORIMOTOR CIRCUIT</span>
          </div>

          <canvas
            ref={canvasRef}
            width={340}
            height={260}
            className="w-full h-full block cursor-crosshair"
          />

          <div className="absolute bottom-2 left-3 z-10 font-mono text-[9px] text-[#CCFF00]/80">
            [HOVER OVER CANVAS TO INDUCE SYNAPTIC FIELD]
          </div>
        </div>
      </div>

      {/* 4. BRUTALIST ACTION FOOTER: Full-width stark action bar */}
      <a
        href="https://github.com/laksh1711/VasHexad"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 px-6 bg-[#CCFF00] hover:bg-[#FF2A00] text-[#0F0F0F] hover:text-[#F4F4F0] font-mono text-xs sm:text-sm font-black uppercase tracking-wider border-t-[3px] border-[#0F0F0F] flex items-center justify-center gap-3 transition-colors group cursor-pointer"
      >
        <span>[ ACCESS VASHEXAD_1.0 KERNEL // GITHUB ]</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </div>
  );
};

export default VasHexadSimulator;
