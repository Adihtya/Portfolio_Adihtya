import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Play, RotateCw, Star } from 'lucide-react';

type Vote = 'watch' | 'skip';

interface Movie {
  title: string;
  year: string;
  genres: string[];
  rating: string;
  runtime: string;
  synopsis: string;
  accent: string;
  motif: string;
}

const MOVIES: Movie[] = [
  {
    title: 'BLADE RUNNER 2049',
    year: '2017',
    genres: ['SCI-FI', 'THRILLER'],
    rating: '8.0',
    runtime: '2H 44M',
    synopsis:
      'A young blade runner uncovers a buried secret that could pull what remains of society into chaos.',
    accent: '#FF2A00',
    motif: '2049',
  },
  {
    title: 'ARRIVAL',
    year: '2016',
    genres: ['SCI-FI', 'DRAMA'],
    rating: '7.9',
    runtime: '1H 56M',
    synopsis:
      'A linguist races to understand an alien language before the first contact becomes the last.',
    accent: '#CCFF00',
    motif: '07',
  },
  {
    title: 'EX MACHINA',
    year: '2014',
    genres: ['SCI-FI', 'THRILLER'],
    rating: '7.7',
    runtime: '1H 48M',
    synopsis:
      'A programmer is invited to test an artificial intelligence whose answers raise new questions.',
    accent: '#0033FF',
    motif: 'AVA',
  },
  {
    title: 'ANNIHILATION',
    year: '2018',
    genres: ['SCI-FI', 'MYSTERY'],
    rating: '6.8',
    runtime: '1H 55M',
    synopsis:
      'An expedition enters a shifting landscape where familiar rules of life no longer apply.',
    accent: '#FF2A00',
    motif: 'X-09',
  },
];

const clampScore = (score: number) => Math.min(98, Math.max(62, score));

export const WatchOrSkipCard: React.FC = () => {
  const [movieIndex, setMovieIndex] = useState(0);
  const [matchScore, setMatchScore] = useState(87);
  const [watchVotes, setWatchVotes] = useState(0);
  const [skipVotes, setSkipVotes] = useState(0);
  const [lastVote, setLastVote] = useState<Vote | null>(null);

  const movie = MOVIES[movieIndex];

  const vote = (choice: Vote) => {
    setLastVote(choice);
    setMatchScore((score) => clampScore(score + (choice === 'watch' ? 5 : -4)));
    if (choice === 'watch') {
      setWatchVotes((count) => count + 1);
    } else {
      setSkipVotes((count) => count + 1);
    }
    setMovieIndex((index) => (index + 1) % MOVIES.length);
  };

  const resetSession = () => {
    setMovieIndex(0);
    setMatchScore(87);
    setWatchVotes(0);
    setSkipVotes(0);
    setLastVote(null);
  };

  return (
    <article
      aria-label="Watch or Skip interactive movie discovery dashboard"
      className="w-full border-[3px] border-[#0F0F0F] bg-[#F4F4F0] text-[#0F0F0F]"
      style={{ boxShadow: '6px 6px 0px 0px #0F0F0F' }}
    >
      <header className="flex flex-col gap-3 border-b-[3px] border-[#0F0F0F] bg-[#CCFF00] p-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            PERSONALIZED CINEMA // DISCOVERY ENGINE
          </div>
          <h2 className="font-poster text-3xl uppercase leading-none sm:text-5xl">
            WATCH <span className="text-[#0033FF]">OR</span> SKIP
          </h2>
        </div>
        <span className="w-fit border-2 border-[#0F0F0F] bg-[#F4F4F0] px-3 py-1.5 font-mono text-[10px] font-bold uppercase">
          SESSION // DEMO-001
        </span>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,0.86fr)_minmax(0,1.14fr)]">
        <section className="flex flex-col gap-5 border-b-[3px] border-[#0F0F0F] p-4 sm:p-6 xl:border-b-0 xl:border-r-[3px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0033FF]">
                YOUR NEXT WATCH
              </div>
              <p className="mt-1 font-mono text-xs leading-relaxed">
                Vote on each title. Your signal tunes the next recommendation.
              </p>
            </div>
            <button
              type="button"
              onClick={resetSession}
              aria-label="Reset movie voting session"
              className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#0F0F0F] bg-[#F4F4F0] transition-colors hover:bg-[#CCFF00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          <div className="border-2 border-[#0F0F0F] bg-white p-3 font-mono text-[10px]">
            <div className="flex items-center justify-between gap-2 font-bold uppercase">
              <span>LIVE RECOMMENDATION SCORE</span>
              <span aria-live="polite" className="text-lg text-[#0033FF]">
                {matchScore}%
              </span>
            </div>
            <div
              className="mt-2 h-3 border-2 border-[#0F0F0F] bg-[#F4F4F0]"
              role="progressbar"
              aria-label="Recommendation match score"
              aria-valuenow={matchScore}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-[#0033FF] transition-[width] duration-300"
                style={{ width: `${matchScore}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[9px] font-bold uppercase text-[#0F0F0F]/60">
              <span>TASTE MATCH // NOT A CRITIC SCORE</span>
              <span>DEMO MODEL</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => vote('watch')}
              className="flex min-h-14 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#CCFF00] px-3 py-3 font-mono text-xs font-black uppercase tracking-wide transition-colors hover:bg-[#0033FF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <ArrowUpRight className="h-4 w-4" />
              WATCH IT
            </button>
            <button
              type="button"
              onClick={() => vote('skip')}
              className="flex min-h-14 items-center justify-center gap-2 border-2 border-[#0F0F0F] bg-[#FF2A00] px-3 py-3 font-mono text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0F0F0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0033FF]"
            >
              <ArrowDownRight className="h-4 w-4" />
              SKIP
            </button>
          </div>

          <div className="min-h-8 border-l-4 border-[#0033FF] bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase">
            <span aria-live="polite">
              {lastVote === 'watch'
                ? 'SIGNAL LOGGED // WATCH IT'
                : lastVote === 'skip'
                  ? 'SIGNAL LOGGED // SKIP'
                  : 'AWAITING YOUR FIRST SIGNAL'}
            </span>
          </div>

          <dl className="space-y-3 border-t-2 border-[#0F0F0F] pt-4 font-mono text-[10px] sm:text-[11px]">
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                API INTEGRATION:
              </dt>
              <dd className="font-bold">TMDB v3 / YouTube Trailers</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                DISCOVERY ENGINE:
              </dt>
              <dd className="font-bold">Next.js / React Client</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-bold uppercase tracking-widest text-[#0033FF]">
                CURATION STATUS:
              </dt>
              <dd className="flex items-center gap-2 font-bold">
                <span className="inline-block h-2 w-2 animate-pulse bg-[#FF2A00]" />
                ACTIVE / LIVE
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex items-center justify-between border-t border-[#0F0F0F]/30 pt-3 font-mono text-[9px] font-bold uppercase">
            <span>SESSION SIGNALS</span>
            <span>
              <span className="text-[#0033FF]">+{watchVotes} WATCH</span>
              <span className="mx-2">/</span>
              <span className="text-[#FF2A00]">{skipVotes} SKIP</span>
            </span>
          </div>
        </section>

        <section className="min-w-0 p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#0F0F0F] pb-3 font-mono text-[10px] font-bold uppercase tracking-widest">
            <span className="text-[#0033FF]">FEATURED PICK // {movie.year}</span>
            <span className="bg-[#0F0F0F] px-2 py-1 text-[#CCFF00]">
              TITLE {String(movieIndex + 1).padStart(2, '0')} / 04
            </span>
          </div>

          <div
            role="group"
            tabIndex={0}
            aria-label={`${movie.title}, ${movie.genres.join(' / ')}, rating ${movie.rating} out of 10. Focus or hover for synopsis.`}
            className="group relative isolate flex min-h-[310px] flex-col justify-between overflow-hidden border-[3px] border-[#0F0F0F] bg-[#0F0F0F] p-5 text-[#F4F4F0] outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#0033FF] sm:min-h-[360px] sm:p-7"
          >
            <div
              className="absolute inset-0 -z-10 opacity-90 transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60"
              style={{
                background: `radial-gradient(circle at 75% 30%, ${movie.accent} 0%, transparent 36%), linear-gradient(135deg, #0F0F0F 10%, #1a1a1a 65%, #0F0F0F 100%)`,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-0.06em] top-[-0.22em] -z-10 select-none font-poster text-[clamp(7rem,20vw,15rem)] leading-none opacity-20 transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110"
              style={{ color: movie.accent }}
            >
              {movie.motif}
            </div>

            <div className="flex items-start justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-widest">
              <span className="border-2 border-[#F4F4F0] bg-[#0F0F0F] px-2 py-1">
                NOW SCREENING
              </span>
              <span className="flex items-center gap-1 border-2 border-[#F4F4F0] bg-[#CCFF00] px-2 py-1 text-[#0F0F0F]">
                <Star className="h-3 w-3 fill-current" />
                {movie.rating} / 10
              </span>
            </div>

            <div className="relative z-10 mt-16">
              <div className="mb-2 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="border border-[#F4F4F0] bg-[#0F0F0F]/80 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <h3 className="max-w-[13ch] font-poster text-4xl uppercase leading-[0.9] sm:text-6xl">
                {movie.title}
              </h3>
              <div className="mt-3 flex items-center gap-3 font-mono text-[10px] font-bold uppercase text-[#F4F4F0]/75">
                <span>{movie.year}</span>
                <span aria-hidden="true">/</span>
                <span>{movie.runtime}</span>
                <span aria-hidden="true">/</span>
                <span>TMDB SIM</span>
              </div>
              <div className="mt-3 h-2 max-w-xs border border-[#F4F4F0] bg-[#0F0F0F]/70">
                <div
                  className="h-full bg-[#CCFF00]"
                  style={{ width: `${Number(movie.rating) * 10}%` }}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 flex items-end bg-[#CCFF00] p-5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:p-7">
              <div className="translate-y-3 transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#FF2A00]">
                  <Play className="h-4 w-4 fill-current" />
                  QUICK SYNOPSIS // PREVIEW
                </div>
                <p className="max-w-lg font-poster text-2xl uppercase leading-tight text-[#0F0F0F] sm:text-4xl">
                  {movie.synopsis}
                </p>
                <div className="mt-4 font-mono text-[9px] font-bold uppercase tracking-widest text-[#0F0F0F]/70">
                  HOVER OR FOCUS TO PREVIEW // TRAILER NOT PLAYING
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[9px] font-bold uppercase">
            <span className="text-[#0F0F0F]/60">RATING BAR // COMMUNITY SCORE</span>
            <span className="border-2 border-[#0F0F0F] bg-white px-2 py-1">
              {Math.round(Number(movie.rating) * 10)} / 100
            </span>
          </div>
        </section>
      </div>

      <footer className="grid grid-cols-1 border-t-[3px] border-[#0F0F0F] sm:grid-cols-2">
        <a
          href="https://adihtya.github.io/Watch_Or_Skip/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-between gap-3 border-b-2 border-[#0F0F0F] bg-[#0033FF] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#CCFF00] hover:text-[#0F0F0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#F4F4F0] sm:border-b-0 sm:border-r-[3px] sm:px-6 sm:text-xs"
        >
          <span>[ LAUNCH LIVE DEMO ]</span>
          <ArrowUpRight className="h-5 w-5 shrink-0" />
        </a>
        <a
          href="https://github.com/Adihtya/Watch_Or_Skip"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-between gap-3 bg-[#FF2A00] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0F0F0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#CCFF00] sm:px-6 sm:text-xs"
        >
          <span>[ REPOSITORY // GITHUB ]</span>
          <ArrowUpRight className="h-5 w-5 shrink-0" />
        </a>
      </footer>
    </article>
  );
};

export default WatchOrSkipCard;
