import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { useLenis } from './SmoothScroll';

export const Contact: React.FC = () => {
  const { scrollTo } = useLenis();
  const [copied, setCopied] = useState(false);
  const email = 'invictableaditya@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const socialLinks = [
    {
      name: 'GITHUB',
      url: 'https://github.com/adityachaudhari',
      handle: '@adityachaudhari',
      icon: Github,
    },
    {
      name: 'LINKEDIN',
      url: 'https://linkedin.com/in/adityachaudhari',
      handle: '/in/adityachaudhari',
      icon: Linkedin,
    },
    {
      name: 'X (TWITTER)',
      url: 'https://x.com',
      handle: '@adityac_dev',
      icon: Twitter,
    },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[#2D0000] text-[#EEEAD7] border-t border-[#757D6F]/30 pt-16 md:pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        {/* Top Header Strip */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#757D6F]/25 pb-4 mb-12 font-mono text-xs text-[#757D6F]">
          <div className="flex items-center gap-3">
            <span className="text-[#6D0808] font-bold">● SECTION // 04</span>
            <span className="text-[#EEEAD7]">TERMINAL CONTACT PROTOCOL</span>
          </div>
          <div className="flex items-center gap-4">
            <span>ACCEPTING COLLABORATIONS & DEEP TECH ROLES</span>
          </div>
        </div>

        {/* Massive Serif Statement */}
        <div className="my-8 md:my-14">
          <p className="font-mono text-xs md:text-sm text-[#6D0808] uppercase tracking-[0.3em] mb-4">
            INITIATE SYSTEM DIALOGUE
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[7.25rem] xl:text-[8.5rem] leading-[0.92] tracking-tight uppercase font-normal text-[#EEEAD7]">
            THE NEXT SYSTEM <br />
            STARTS WITH <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#EEEAD7] hover:text-[#6D0808] transition-colors">
              AN IDEA
            </span>
            <span className="text-[#6D0808]">.</span>
          </h2>
        </div>

        {/* Primary Interactive Email Box */}
        <div className="my-12 border-2 border-[#6D0808] bg-[#2D0000] p-6 sm:p-10 lg:p-12 relative group">
          <div className="flex items-center justify-between border-b border-[#757D6F]/30 pb-4 mb-6 font-mono text-xs">
            <span className="text-[#757D6F] uppercase">DIRECT TRANSMISSION CHANNEL</span>
            <span className="text-[#6D0808] font-bold">[ACTIVE INBOX]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#757D6F] block uppercase tracking-widest mb-1">
                CONTACT EMAIL ADDRESS
              </span>
              <a
                href={`mailto:${email}`}
                className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#EEEAD7] hover:text-[#6D0808] transition-colors tracking-tight font-normal break-all"
              >
                {email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="px-6 py-3.5 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] font-mono text-xs uppercase tracking-wider font-semibold border border-[#EEEAD7]/20 flex items-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="px-6 py-3.5 bg-transparent hover:bg-[#EEEAD7]/10 text-[#EEEAD7] font-mono text-xs uppercase tracking-wider border border-[#757D6F]/50 hover:border-[#EEEAD7] flex items-center gap-2 transition-all"
              >
                <span>OPEN CLIENT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Brutalist Social & Network Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-[#757D6F]/30 hover:border-[#EEEAD7] bg-[#2D0000] p-6 flex flex-col justify-between transition-all duration-200"
              >
                <div className="flex items-center justify-between border-b border-[#757D6F]/20 pb-3 mb-4 font-mono text-xs text-[#757D6F]">
                  <span className="group-hover:text-[#6D0808] transition-colors">
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#EEEAD7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#EEEAD7] group-hover:text-[#6D0808] transition-colors" />
                  <span className="font-mono text-sm text-[#EEEAD7] font-semibold">
                    {link.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Architectural Credits & Top Scroll */}
        <div className="border-t border-[#757D6F]/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#757D6F]">
          <div className="space-y-1">
            <div className="text-[#EEEAD7]">
              ADITYA CHAUDHARI // PORTFOLIO 2026
            </div>
            <div>
              B.TECH CS & AI • UPGRAD SCHOOL OF TECHNOLOGY, PUNE
            </div>
            <div className="text-[10px] text-[#757D6F]/80">
              BUILT WITH REACT 18 • THREE.JS (R3F) • GSAP SCROLLTRIGGER • LENIS • TAILWIND CSS
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div>ZERO ROUNDED EDGES</div>
              <div className="text-[#6D0808]">DARK EDITORIAL × BRUTALISM</div>
            </div>

            <button
              onClick={() => scrollTo('#hero')}
              className="p-3 bg-[#6D0808] hover:bg-[#EEEAD7] text-[#EEEAD7] hover:text-[#2D0000] border border-[#EEEAD7]/20 transition-colors flex items-center gap-2 uppercase tracking-wider font-mono text-xs"
            >
              <ArrowUp className="w-4 h-4" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
