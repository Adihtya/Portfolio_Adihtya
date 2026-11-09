import React, { useState, useEffect } from 'react';
import { useLenis } from './SmoothScroll';

export const Navbar: React.FC = () => {
  const { scrollTo } = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('#about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'ABOUT & BIO', target: '#about', number: '01' },
    { label: 'SELECTED WORK', target: '#work', number: '02' },
    { label: 'TOOLKIT', target: '#toolkit', number: '03' },
    { label: 'EXPERIMENTS', target: '#experiments', number: '04' },
    { label: 'CONTACT', target: '#contact', number: '05' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setActiveTab(target);
    scrollTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Fixed Brutalist Header with 2px black border and brutalist shadow */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-[#F4F4F0] border-b-2 border-[#0F0F0F] transition-all duration-200 ${
          scrolled
            ? 'translate-y-0 opacity-100 brutalist-shadow'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between">
          {/* Brand Sticker */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2 border-2 border-[#0F0F0F] bg-[#CCFF00] px-2.5 py-1 brutalist-shadow"
            >
              <div className="w-2.5 h-2.5 bg-[#FF2A00] border-2 border-[#0F0F0F]" />
              <span className="font-poster text-base uppercase tracking-wider text-[#0F0F0F]">
                ADITYA.DEV
              </span>
            </a>
            <span className="font-mono text-[10px] font-bold text-[#0F0F0F]/60 hidden sm:inline">
              // URBAN BRUTALISM
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.target;
              return (
                <a
                  key={item.target}
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#0F0F0F] transition-all ${
                    isActive
                      ? 'bg-[#CCFF00] text-[#0F0F0F] brutalist-shadow -rotate-1'
                      : 'bg-[#F4F4F0] text-[#0F0F0F] hover:bg-[#CCFF00] brutalist-shadow'
                  }`}
                >
                  <span className="text-[#FF2A00] mr-1.5 font-bold">
                    /{item.number}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Live System Telemetry / Right Corner */}
          <div className="hidden sm:flex items-center gap-3 text-right">
            <div className="border-2 border-[#0F0F0F] bg-[#F4F4F0] px-2.5 py-1 text-[11px] font-mono font-bold brutalist-shadow">
              <span className="inline-block w-2 h-2 bg-[#CCFF00] border border-[#0F0F0F] mr-1.5" />
              <span>{currentTime || '16:15:00 IST'}</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-1.5 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#0F0F0F] brutalist-shadow transition-colors"
            >
              CONTACT ↗
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden px-3 py-1.5 border-2 border-[#0F0F0F] bg-[#CCFF00] text-[#0F0F0F] font-mono font-bold text-xs uppercase brutalist-shadow"
          >
            {mobileMenuOpen ? 'CLOSE [✕]' : 'MENU [≡]'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F4F4F0] flex flex-col justify-center px-8 lg:hidden border-b-2 border-[#0F0F0F] pt-16">
          <div className="flex flex-col gap-4">
            <div className="border-b-2 border-[#0F0F0F] pb-2">
              <span className="font-mono text-xs font-bold text-[#FF2A00] uppercase tracking-widest">
                DIRECTORY NAVIGATION
              </span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.target}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="group flex items-baseline justify-between py-2.5 px-3 border-2 border-[#0F0F0F] bg-[#F4F4F0] hover:bg-[#CCFF00] font-poster text-3xl text-[#0F0F0F] brutalist-shadow"
              >
                <span>{item.label}</span>
                <span className="font-mono text-sm font-bold text-[#FF2A00]">
                  /{item.number}
                </span>
              </a>
            ))}

            <div className="mt-4 p-4 border-2 border-[#0F0F0F] bg-[#0033FF] text-[#F4F4F0] font-mono text-xs font-bold brutalist-shadow">
              <div>LOCATION: PUNE, INDIA (18.52° N)</div>
              <div>EMAIL: invictableaditya@gmail.com</div>
              <div className="mt-1 text-[#CCFF00]">
                URBAN BRUTALISM × STRIKE AESTHETIC
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
