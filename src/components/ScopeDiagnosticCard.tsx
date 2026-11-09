import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Check,
  Cpu,
  Database,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';

type DiagnosticMode = 'code' | 'metrics';
type DiagnosticStatus = 'ACTIVE INSPECTION' | 'SCANNING TARGET' | 'TARGET VERIFIED';

const CODE_LINES = [
  { number: '01', parts: [{ text: 'class ', color: 'text-[#FF2A00]' }, { text: 'TraceResolver:', color: 'text-[#CCFF00]' }] },
  { number: '02', parts: [{ text: '    def ', color: 'text-[#FF2A00]' }, { text: 'inspect(', color: 'text-[#F4F4F0]' }, { text: 'target', color: 'text-[#CCFF00]' }, { text: '):', color: 'text-[#F4F4F0]' }] },
  { number: '03', parts: [{ text: '        spans = profiler.capture(target)', color: 'text-[#F4F4F0]' }] },
  { number: '04', parts: [{ text: '        graph = build_call_graph(spans)', color: 'text-[#F4F4F0]' }] },
  { number: '05', parts: [{ text: '        metrics = analyze(graph)', color: 'text-[#F4F4F0]' }] },
  { number: '06', parts: [{ text: '        return ', color: 'text-[#FF2A00]' }, { text: 'TraceReport(metrics)', color: 'text-[#CCFF00]' }] },
];

const METRICS = [
  { label: 'CPU UTILIZATION', value: 68, unit: '%', icon: Cpu, color: '#CCFF00' },
  { label: 'MEMORY ALLOCATIONS', value: 42, unit: 'MB', icon: Database, color: '#FF2A00' },
  { label: 'TRACE LATENCY', value: 1.4, unit: 'µs', icon: Activity, color: '#0033FF' },
];

const LOGS = [
  { time: '00:00:12.084', level: 'TRACE', message: 'scope.profiler.attach(pid=8421)' },
  { time: '00:00:12.089', level: 'INFO', message: 'callgraph.nodes_resolved=1284' },
  { time: '00:00:12.092', level: 'WARN', message: 'mutex.wait detected // worker-03' },
  { time: '00:00:12.096', level: 'INFO', message: 'report.status=inspection_ready' },
];

export const ScopeDiagnosticCard: React.FC = () => {
  const [mode, setMode] = useState<DiagnosticMode>('code');
  const [status, setStatus] = useState<DiagnosticStatus>('ACTIVE INSPECTION');
  const [scanCount, setScanCount] = useState(0);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [activityPulse, setActivityPulse] = useState(false);
  const scanTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!activityPulse) return undefined;
    const timeout = window.setTimeout(() => setActivityPulse(false), 900);
    return () => window.clearTimeout(timeout);
  }, [activityPulse]);

  useEffect(
    () => () => {
      if (scanTimeout.current !== null) {
        window.clearTimeout(scanTimeout.current);
      }
    },
    [],
  );

  const runScan = () => {
    if (scanTimeout.current !== null) {
      window.clearTimeout(scanTimeout.current);
    }
    setStatus('SCANNING TARGET');
    setScanCount((count) => count + 1);
    setActivityPulse(true);
    scanTimeout.current = window.setTimeout(() => {
      setStatus('ACTIVE INSPECTION');
      scanTimeout.current = null;
    }, 850);
  };

  const verifyTarget = () => {
    if (scanTimeout.current !== null) {
      window.clearTimeout(scanTimeout.current);
      scanTimeout.current = null;
    }
    setStatus('TARGET VERIFIED');
    setActivityPulse(true);
  };

  return (
    <article
      aria-label="SCOPE interactive diagnostics dashboard"
      className="w-full border-[3px] border-[#0F0F0F] bg-[#F4F4F0] text-[#0F0F0F]"
      style={{ boxShadow: '6px 6px 0px 0px #0F0F0F' }}
    >
      <header className="flex flex-col gap-3 border-b-[3px] border-[#0F0F0F] bg-[#CCFF00] p-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            SYSTEMS OBSERVABILITY // DIAGNOSTIC CONSOLE
          </div>
          <h2 className="font-poster text-4xl uppercase leading-none sm:text-5xl">
            SCOPE
          </h2>
        </div>
        <div className="flex w-fit items-center gap-2 border-2 border-[#0F0F0F] bg-[#F4F4F0] px-3 py-2 font-mono text-[10px] font-bold uppercase sm:text-xs">
          <span className="text-[#0033FF]">TARGET REPO:</span>
          <span>Adihtya/Scope</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
        <section className="flex flex-col gap-5 border-b-[3px] border-[#0F0F0F] p-4 sm:p-6 xl:border-b-0 xl:border-r-[3px]">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest">
              <ScanLine className="h-4 w-4 text-[#0033FF]" />
              DIAGNOSTIC MODE
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                aria-pressed={mode === 'code'}
                onClick={() => setMode('code')}
                className={`min-h-11 border-2 border-[#0F0F0F] px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF] ${
                  mode === 'code'
                    ? 'bg-[#0033FF] text-white'
                    : 'bg-[#F4F4F0] hover:bg-[#CCFF00]'
                }`}
              >
                [MODE: CODE_ANALYSIS]
              </button>
              <button
                type="button"
                aria-pressed={mode === 'metrics'}
                onClick={() => setMode('metrics')}
                className={`min-h-11 border-2 border-[#0F0F0F] px-3 py-2 font-mono text-[10px] font-bold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF] ${
                  mode === 'metrics'
                    ? 'bg-[#0033FF] text-white'
                    : 'bg-[#F4F4F0] hover:bg-[#CCFF00]'
                }`}
              >
                [MODE: METRICS_FEED]
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={runScan}
              className="flex min-h-12 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#0F0F0F] px-3 py-2 font-mono text-[10px] font-bold uppercase text-[#CCFF00] transition-colors hover:bg-[#0033FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <ScanLine className={`h-4 w-4 ${activityPulse ? 'animate-pulse motion-reduce:animate-none' : ''}`} />
              RUN SCAN
            </button>
            <button
              type="button"
              onClick={verifyTarget}
              className="flex min-h-12 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#FF2A00] px-3 py-2 font-mono text-[10px] font-bold uppercase text-white transition-colors hover:bg-[#CCFF00] hover:text-[#0F0F0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <ShieldCheck className="h-4 w-4" />
              VERIFY TARGET
            </button>
          </div>

          <dl className="space-y-3 border-t-2 border-[#0F0F0F] pt-4 font-mono text-[10px] sm:text-[11px]">
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                TARGET REPO:
              </dt>
              <dd className="font-bold">Adihtya/Scope</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                DIAGNOSTIC STATUS:
              </dt>
              <dd className="flex items-center gap-2 font-bold" aria-live="polite">
                <span
                  className={`inline-block h-2 w-2 ${
                    status === 'TARGET VERIFIED' ? 'bg-[#CCFF00]' : 'bg-[#FF2A00]'
                  } ${status === 'SCANNING TARGET' ? 'animate-pulse motion-reduce:animate-none' : ''}`}
                />
                {status}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                RESOLVER ENGINE:
              </dt>
              <dd className="font-bold">PARSER V1.0</dd>
            </div>
          </dl>

          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#0F0F0F]/30 pt-3 font-mono text-[9px] font-bold uppercase">
            <div className="border-2 border-[#0F0F0F] bg-white p-2">
              <span className="block text-[#0F0F0F]/60">SCAN CYCLES</span>
              <span className="text-lg text-[#0033FF]">{String(scanCount).padStart(2, '0')}</span>
            </div>
            <div className="border-2 border-[#0F0F0F] bg-white p-2">
              <span className="block text-[#0F0F0F]/60">ACTIVE VIEW</span>
              <span className="text-xs">{mode === 'code' ? 'CODE / AST' : 'LIVE METRICS'}</span>
            </div>
          </div>
        </section>

        <section className="min-w-0 bg-[#0F0F0F] p-4 text-[#F4F4F0] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#F4F4F0]/30 pb-3 font-mono text-[10px] font-bold uppercase tracking-widest">
            <span className="text-[#CCFF00]">
              {mode === 'code' ? 'INSPECTOR // TRACE_RESOLVER.PY' : 'METRICS FEED // PID 8421'}
            </span>
            <span className="flex items-center gap-2 text-[#F4F4F0]/60">
              <span className={`h-2 w-2 bg-[#FF2A00] ${activityPulse ? 'animate-ping motion-reduce:animate-none' : 'animate-pulse motion-reduce:animate-none'}`} />
              SIMULATED TELEMETRY
            </span>
          </div>

          {mode === 'code' ? (
            <div
              className={`overflow-x-auto border border-[#F4F4F0]/30 bg-[#161616] p-3 transition-colors duration-300 sm:p-5 ${
                activityPulse ? 'ring-2 ring-[#CCFF00]' : ''
              }`}
              aria-label="Simulated parser source preview; hover or focus a line to highlight it"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#F4F4F0]/20 pb-3 font-mono text-[9px] font-bold uppercase text-[#F4F4F0]/55">
                <span>scope/core/resolver.py</span>
                <span>PYTHON // UTF-8</span>
              </div>
              <pre className="min-w-[420px] font-mono text-[10px] leading-8 sm:text-xs">
                {CODE_LINES.map((line, index) => (
                  <button
                    key={line.number}
                    type="button"
                    aria-label={`Highlight code line ${line.number}`}
                    onFocus={() => setHighlightedLine(index)}
                    onBlur={() => setHighlightedLine(null)}
                    onMouseEnter={() => setHighlightedLine(index)}
                    onMouseLeave={() => setHighlightedLine(null)}
                    className={`block w-full text-left transition-colors ${
                      highlightedLine === index
                        ? 'bg-[#CCFF00] text-[#0F0F0F]'
                        : 'hover:bg-[#F4F4F0]/10'
                    }`}
                  >
                    <span className="mr-5 inline-block w-5 select-none text-right text-[#F4F4F0]/35">
                      {line.number}
                    </span>
                    {line.parts.map((part, partIndex) => (
                      <span
                        key={`${line.number}-${partIndex}`}
                        className={highlightedLine === index ? 'text-[#0F0F0F]' : part.color}
                      >
                        {part.text}
                      </span>
                    ))}
                  </button>
                ))}
              </pre>
              <div className="mt-4 border-t border-[#F4F4F0]/20 pt-3 font-mono text-[9px] font-bold uppercase text-[#F4F4F0]/55">
                {highlightedLine === null
                  ? 'HOVER OR FOCUS A LINE // INSPECT SYMBOL'
                  : `SYMBOL FOCUS // LINE ${CODE_LINES[highlightedLine]?.number}`}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {METRICS.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="border border-[#F4F4F0]/35 bg-[#161616] p-3 transition-colors hover:border-[#CCFF00]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Icon className="h-4 w-4" style={{ color: metric.color }} />
                        <span className="font-mono text-[8px] font-bold uppercase text-[#F4F4F0]/60">
                          {metric.label}
                        </span>
                      </div>
                      <div className="mt-3 font-poster text-3xl">
                        {metric.value}
                        <span className="ml-1 font-mono text-xs">{metric.unit}</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-[#F4F4F0]/15">
                        <div
                          className="h-full transition-[width] duration-500"
                          style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border border-[#F4F4F0]/30 bg-[#161616] font-mono text-[9px] sm:text-[10px]">
                <div className="flex items-center justify-between border-b border-[#F4F4F0]/25 px-3 py-2 font-bold uppercase text-[#CCFF00]">
                  <span>EVENT STREAM // LAST 4</span>
                  <span>LOCAL SIMULATION</span>
                </div>
                {LOGS.map((log) => (
                  <div
                    key={`${log.time}-${log.message}`}
                    className="grid grid-cols-[auto_auto_1fr] gap-2 border-b border-[#F4F4F0]/10 px-3 py-2 last:border-b-0 hover:bg-[#F4F4F0]/10"
                  >
                    <span className="text-[#F4F4F0]/45">{log.time}</span>
                    <span
                      className={`font-bold ${
                        log.level === 'WARN' ? 'text-[#FF2A00]' : 'text-[#CCFF00]'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="truncate text-[#F4F4F0]/85">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#F4F4F0]/25 pt-3 font-mono text-[9px] font-bold uppercase">
            <span className="text-[#F4F4F0]/55">TRACE ID // SC-8421-01</span>
            <span className="flex items-center gap-1.5 text-[#CCFF00]">
              <Check className="h-3 w-3" />
              OUTPUT READY
            </span>
          </div>
        </section>
      </div>

      <a
        href="https://github.com/Adihtya/Scope"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-between gap-3 border-t-[3px] border-[#0F0F0F] bg-[#CCFF00] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#0F0F0F] transition-colors hover:bg-[#FF2A00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#0033FF] sm:px-6 sm:text-xs"
      >
        <span>[ INSPECT SCOPE KERNEL // GITHUB ]</span>
        <ArrowUpRight className="h-5 w-5 shrink-0" />
      </a>
    </article>
  );
};

export default ScopeDiagnosticCard;
