import React, { useState } from 'react';
import { Activity, ArrowUpRight, Play, Workflow } from 'lucide-react';

type ViewMode = 'graph' | 'parser' | 'nodes';

interface GraphNode {
  id: string;
  type: 'MODULE' | 'CLASS' | 'TEST';
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  source: string;
  target: string;
}

const NODES: GraphNode[] = [
  { id: 'main', type: 'MODULE', label: 'src/main.py', x: 90, y: 205 },
  { id: 'api', type: 'MODULE', label: 'api/routes.py', x: 250, y: 95 },
  { id: 'parser', type: 'CLASS', label: 'core/parser.py', x: 250, y: 205 },
  { id: 'tests', type: 'TEST', label: 'tests/test_graph.py', x: 250, y: 325 },
  { id: 'visitor', type: 'CLASS', label: 'ast/visitor.py', x: 420, y: 95 },
  { id: 'resolver', type: 'CLASS', label: 'graph/resolver.py', x: 420, y: 205 },
  { id: 'search', type: 'MODULE', label: 'search/index.py', x: 420, y: 325 },
  { id: 'models', type: 'CLASS', label: 'graph/nodes.py', x: 590, y: 155 },
  { id: 'chroma', type: 'MODULE', label: 'storage/chroma.py', x: 590, y: 295 },
];

const EDGES: GraphEdge[] = [
  { source: 'main', target: 'api' },
  { source: 'main', target: 'parser' },
  { source: 'api', target: 'resolver' },
  { source: 'parser', target: 'visitor' },
  { source: 'visitor', target: 'models' },
  { source: 'resolver', target: 'models' },
  { source: 'resolver', target: 'search' },
  { source: 'search', target: 'chroma' },
  { source: 'tests', target: 'resolver' },
  { source: 'tests', target: 'parser' },
];

const MODES: { id: ViewMode; label: string }[] = [
  { id: 'graph', label: 'DEPENDENCY GRAPH' },
  { id: 'parser', label: 'AST PARSER' },
  { id: 'nodes', label: 'AST NODES' },
];

const nodeById = new Map(NODES.map((node) => [node.id, node]));

export const UnfoldArchitectureCard: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('graph');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState('READY FOR INSPECTION');
  const [runCount, setRunCount] = useState(0);

  const runParser = () => {
    setMode('parser');
    setSelectedNode('parser');
    setAnalysis('PARSER COMPLETE // 0.82 MS');
    setRunCount((count) => count + 1);
  };

  const analyzeEdges = () => {
    setMode('graph');
    setSelectedNode('resolver');
    setAnalysis('EDGE TRAVERSAL COMPLETE');
    setRunCount((count) => count + 1);
  };

  const selectNode = (nodeId: string) => {
    setSelectedNode((current) => (current === nodeId ? null : nodeId));
  };

  const handleNodeKeyDown = (
    event: React.KeyboardEvent<SVGGElement>,
    nodeId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectNode(nodeId);
    }
  };

  return (
    <article
      className="w-full border-[3px] border-[#0F0F0F] bg-[#F4F4F0] text-[#0F0F0F]"
      style={{ boxShadow: '6px 6px 0px 0px #0F0F0F' }}
      aria-label="UNFOLD interactive architecture dashboard"
    >
      <header className="flex flex-col gap-4 border-b-[3px] border-[#0F0F0F] bg-[#CCFF00] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="inline-block h-2.5 w-2.5 border-2 border-[#0F0F0F] bg-[#0033FF]" />
            CODE INTELLIGENCE // LIVE ARCHITECTURE
          </div>
          <h2 className="font-poster text-4xl uppercase leading-none sm:text-5xl">
            UNFOLD
          </h2>
        </div>
        <div className="flex w-fit items-center gap-2 border-2 border-[#0F0F0F] bg-[#F4F4F0] px-3 py-2 font-mono text-[11px] font-bold uppercase sm:text-xs">
          <span className="text-[#0033FF]">TARGET:</span>
          <span>/Adihtya/UNFOLD</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(275px,0.82fr)_minmax(0,1.65fr)]">
        <section className="flex flex-col gap-5 border-b-[3px] border-[#0F0F0F] p-4 sm:p-6 xl:border-b-0 xl:border-r-[3px]">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest">
              <Workflow className="h-4 w-4 text-[#0033FF]" />
              INSPECTION MODE
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1">
              {MODES.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={mode === view.id}
                  onClick={() => setMode(view.id)}
                  className={`border-2 border-[#0F0F0F] px-3 py-2.5 text-left font-mono text-[10px] font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF] ${
                    mode === view.id
                      ? 'bg-[#0033FF] text-[#F4F4F0]'
                      : 'bg-[#F4F4F0] text-[#0F0F0F] hover:bg-[#CCFF00]'
                  }`}
                >
                  <span className="mr-2">{mode === view.id ? '▸' : '□'}</span>
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={runParser}
              className="flex min-h-11 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#0F0F0F] px-3 py-2 font-mono text-[10px] font-bold uppercase text-[#CCFF00] transition-colors hover:bg-[#0033FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <Play className="h-3.5 w-3.5" />
              RUN PARSER
            </button>
            <button
              type="button"
              onClick={analyzeEdges}
              className="flex min-h-11 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#CCFF00] px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors hover:bg-[#0033FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <Activity className="h-3.5 w-3.5" />
              ANALYZE EDGES
            </button>
          </div>

          <dl className="space-y-3 border-t-2 border-[#0F0F0F] pt-4 font-mono text-[10px] sm:text-[11px]">
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                PARSER ENGINE:
              </dt>
              <dd className="font-bold">Python 3.11+ / FastAPI AST</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                NODES RESOLVED:
              </dt>
              <dd className="font-bold">48 modules / 1,420 edges</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                INTELLIGENCE STATUS:
              </dt>
              <dd className="flex items-center gap-2 font-bold">
                <span className="inline-block h-2 w-2 animate-pulse bg-[#CCFF00] ring-1 ring-[#0F0F0F]" />
                {analysis}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex items-center justify-between border-t border-[#0F0F0F]/30 pt-3 font-mono text-[9px] font-bold uppercase">
            <span>ANALYSIS RUNS</span>
            <span className="bg-[#0F0F0F] px-2 py-1 text-[#CCFF00]">
              {String(runCount).padStart(2, '0')}
            </span>
          </div>
        </section>

        <section className="min-w-0 bg-[#0F0F0F] p-3 text-[#F4F4F0] sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#F4F4F0]/30 pb-3 font-mono text-[9px] font-bold uppercase tracking-widest sm:text-[10px]">
            <span className="text-[#CCFF00]">
              {mode === 'graph'
                ? 'DEPENDENCY TOPOLOGY'
                : mode === 'parser'
                  ? 'AST PARSER TRACE'
                  : 'RESOLVED AST NODES'}
            </span>
            <span className="text-[#F4F4F0]/60">
              {mode === 'graph' ? '09 SHOWN / 48 TOTAL' : 'PYTHON // FASTAPI'}
            </span>
          </div>

          {mode === 'graph' && (
            <div>
              <svg
                viewBox="0 0 700 420"
                role="group"
                aria-label="Interactive dependency graph. Select a node to highlight its inbound and outbound edges."
                className="h-auto max-h-[440px] w-full"
              >
                <defs>
                  <pattern
                    id="unfold-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="#F4F4F0"
                      strokeOpacity="0.08"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="700" height="420" fill="url(#unfold-grid)" />
                <text
                  x="16"
                  y="22"
                  fill="#F4F4F0"
                  fillOpacity="0.45"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  SELECT A NODE // MAP IMPORT FLOW
                </text>

                {EDGES.map((edge) => {
                  const source = nodeById.get(edge.source);
                  const target = nodeById.get(edge.target);
                  if (!source || !target) return null;

                  const isOutbound = selectedNode === edge.source;
                  const isInbound = selectedNode === edge.target;
                  const isActive = isOutbound || isInbound;

                  return (
                    <line
                      key={`${edge.source}-${edge.target}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={
                        isOutbound
                          ? '#0033FF'
                          : isInbound
                            ? '#CCFF00'
                            : '#F4F4F0'
                      }
                      strokeOpacity={isActive ? 1 : 0.28}
                      strokeWidth={isActive ? 3 : 1.5}
                      strokeDasharray={isActive ? '7 5' : 'none'}
                      className={isActive ? 'animate-pulse' : undefined}
                    />
                  );
                })}

                {NODES.map((node) => {
                  const isSelected = selectedNode === node.id;
                  const isConnected = EDGES.some(
                    (edge) =>
                      selectedNode !== null &&
                      ((edge.source === selectedNode &&
                        edge.target === node.id) ||
                        (edge.target === selectedNode &&
                          edge.source === node.id)),
                  );
                  const nodeColor = isSelected
                    ? '#0033FF'
                    : isConnected
                      ? '#CCFF00'
                      : '#0F0F0F';

                  return (
                    <g
                      key={node.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${node.type.toLowerCase()} ${node.label}`}
                      aria-pressed={isSelected}
                      onClick={() => selectNode(node.id)}
                      onKeyDown={(event) => handleNodeKeyDown(event, node.id)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <rect
                          x={node.x - 64}
                          y={node.y - 29}
                          width="128"
                          height="58"
                          fill="none"
                          stroke="#CCFF00"
                          strokeWidth="2"
                          className="animate-ping"
                        />
                      )}
                      <rect
                        x={node.x - 58}
                        y={node.y - 23}
                        width="116"
                        height="46"
                        fill={nodeColor}
                        stroke={isSelected || isConnected ? nodeColor : '#F4F4F0'}
                        strokeWidth={isSelected || isConnected ? 2 : 1}
                      />
                      <text
                        x={node.x}
                        y={node.y - 5}
                        textAnchor="middle"
                        fill={
                          isSelected
                            ? '#F4F4F0'
                            : isConnected
                              ? '#0F0F0F'
                              : '#CCFF00'
                        }
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {node.type}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 9}
                        textAnchor="middle"
                        fill={isConnected ? '#0F0F0F' : '#F4F4F0'}
                        fontSize="8"
                        fontFamily="monospace"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] font-bold uppercase text-[#F4F4F0]/70">
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 bg-[#0033FF]" />
                  OUTBOUND
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 bg-[#CCFF00]" />
                  INBOUND
                </span>
                <span className="ml-auto">
                  {selectedNode
                    ? `FOCUS // ${nodeById.get(selectedNode)?.label}`
                    : 'NO NODE SELECTED'}
                </span>
              </div>
            </div>
          )}

          {mode === 'parser' && (
            <div className="flex min-h-[260px] flex-col justify-center border border-[#F4F4F0]/25 bg-[#161616] p-4 font-mono text-[10px] leading-7 sm:p-6 sm:text-xs">
              <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#CCFF00]">
                ROOT // MODULE: UNFOLD
              </div>
              <div className="text-[#F4F4F0]/80">
                <div><span className="text-[#0033FF]">├──</span> ImportFrom [fastapi]</div>
                <div><span className="text-[#0033FF]">├──</span> ClassDef [ASTVisitor]</div>
                <div className="pl-5 text-[#F4F4F0]/60">├── visit_Import(node)</div>
                <div className="pl-5 text-[#F4F4F0]/60">└── visit_Call(node)</div>
                <div><span className="text-[#CCFF00]">├──</span> ClassDef [DependencyResolver]</div>
                <div className="pl-5 text-[#F4F4F0]/60">├── resolve_edges(graph)</div>
                <div className="pl-5 text-[#F4F4F0]/60">└── detect_cycles(graph)</div>
                <div><span className="text-[#0033FF]">└──</span> Return [DirectedGraph]</div>
              </div>
              <div className="mt-4 border-t border-[#F4F4F0]/25 pt-3 text-[9px] font-bold uppercase text-[#CCFF00]">
                {analysis.includes('PARSER COMPLETE')
                  ? 'PARSE FINISHED // 0.82 MS PER MODULE'
                  : 'READY // PRESS RUN PARSER TO TRACE AST'}
              </div>
            </div>
          )}

          {mode === 'nodes' && (
            <div className="grid min-h-[260px] grid-cols-1 content-start gap-2 sm:grid-cols-2">
              {NODES.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectNode(node.id)}
                  className={`flex min-h-12 items-center justify-between gap-2 border px-3 py-2 text-left font-mono text-[9px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CCFF00] ${
                    selectedNode === node.id
                      ? 'border-[#CCFF00] bg-[#0033FF] text-white'
                      : 'border-[#F4F4F0]/30 bg-[#161616] text-[#F4F4F0] hover:border-[#CCFF00]'
                  }`}
                >
                  <span>
                    <span className="mr-2 text-[#CCFF00]">{node.type}</span>
                    <span>{node.label}</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      <a
        href="https://github.com/Adihtya/UNFOLD"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-between gap-3 border-t-[3px] border-[#0F0F0F] bg-[#CCFF00] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#0F0F0F] transition-colors hover:bg-[#0033FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#F4F4F0] sm:px-6 sm:text-xs"
      >
        <span>[ LAUNCH UNFOLD ARCHITECTURE ENGINE // GITHUB ]</span>
        <ArrowUpRight className="h-5 w-5 shrink-0" />
      </a>
    </article>
  );
};

export default UnfoldArchitectureCard;
