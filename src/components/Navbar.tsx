import React, { useState, useEffect } from 'react';
import { useLenis } from './SmoothScroll';

export const Navbar: React.FC = () => {
  const { scrollTo } = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Selected Work', target: '#work', number: '01' },
    { label: 'About', target: '#about', number: '02' },
    { label: 'Experiments', target: '#experiments', number: '03' },
    { label: 'Contact', target: '#contact', number: '04' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#2D0000]/90 backdrop-blur-md border-b border-[#757D6F]/25 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo / Identity */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-2.5 h-2.5 bg-[#6D0808] group-hover:bg-[#EEEAD7] transition-colors" />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-[#EEEAD7] group-hover:text-[#6D0808] transition-colors">
                  ADITYA CHAUDHARI
                </span>
                <span className="font-mono text-[10px] text-[#757D6F] tracking-widest hidden sm:inline">
                  SYS.ARCH // PORTFOLIO
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.target}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="group relative px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#EEEAD7] transition-all hover:bg-[#6D0808] hover:text-[#EEEAD7] border border-transparent hover:border-[#EEEAD7]/30"
              >
                <span className="text-[#757D6F] group-hover:text-[#EEEAD7] mr-1.5 font-sans">
                  [{item.number}]
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Live System Telemetry / Right Corner */}
          <div className="hidden sm:flex items-center gap-4 text-right">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-[#6D0808] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#EEEAD7]">
                  PUNE, IN
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#757D6F] tracking-wider">
                {currentTime || '15:30:00 IST'}
              </span>
            </div>
            
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-3.5 py-1.5 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] font-mono text-[11px] uppercase tracking-wider font-semibold border border-[#EEEAD7]/20 transition-colors"
            >
              INITIATE TALK
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden px-3 py-1.5 border border-[#757D6F]/40 text-[#EEEAD7] font-mono text-xs uppercase tracking-wider hover:bg-[#6D0808]"
          >
            {mobileMenuOpen ? 'CLOSE [✕]' : 'MENU [≡]'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#2D0000] flex flex-col justify-center px-8 lg:hidden border-t border-[#757D6F]/30 pt-16">
          <div className="flex flex-col gap-6">
            <div className="border-b border-[#757D6F]/30 pb-2">
              <span className="font-mono text-xs text-[#757D6F] uppercase tracking-widest">
                DIRECTORY
              </span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.target}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="group flex items-baseline justify-between py-2 border-b border-[#757D6F]/20 text-3xl font-serif text-[#EEEAD7] hover:text-[#6D0808] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono text-sm text-[#757D6F] group-hover:text-[#EEEAD7]">
                  /{item.number}
                </span>
              </a>
            ))}
            
            <div className="mt-8 pt-4 border-t border-[#757D6F]/30 flex flex-col gap-2 font-mono text-xs text-[#757D6F]">
              <div>COORDINATES: 18.5204° N, 73.8567° E</div>
              <div>EMAIL: invictableaditya@gmail.com</div>
              <div className="mt-2 text-[#EEEAD7]">
                [DARK EDITORIAL × EXPERIMENTAL BRUTALISM]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Viewport Edge Frame Accents (Corner Crosshairs) */}
      <div className="fixed top-2 left-2 z-50 pointer-events-none text-[#757D6F]/40 font-mono text-[9px] select-none hidden md:block">
        +
      </div>
      <div className="fixed top-2 right-2 z-50 pointer-events-none text-[#757D6F]/40 font-mono text-[9px] select-none hidden md:block">
        +
      </div>
      <div className="fixed bottom-2 left-2 z-50 pointer-events-none text-[#757D6F]/40 font-mono text-[9px] select-none hidden md:block">
        +
      </div>
      <div className="fixed bottom-2 right-2 z-50 pointer-events-none text-[#757D6F]/40 font-mono text-[9px] select-none hidden md:block">
        +
      </div>
    </>
  );
};

export default Navbar;
