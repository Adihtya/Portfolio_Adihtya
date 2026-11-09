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
      color: 'bg-[#0F0F0F] text-[#F4F4F0]',
      icon: Github,
    },
    {
      name: 'LINKEDIN',
      url: 'https://linkedin.com/in/adityachaudhari',
      handle: '/in/adityachaudhari',
      color: 'bg-[#0033FF] text-[#F4F4F0]',
      icon: Linkedin,
    },
    {
      name: 'X (TWITTER)',
      url: 'https://x.com',
      handle: '@adityac_dev',
      color: 'bg-[#CCFF00] text-[#0F0F0F]',
      icon: Twitter,
    },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[#F4F4F0] text-[#0F0F0F] border-t-4 border-[#0F0F0F] pt-16 md:pt-24 pb-12 overflow-hidden paper-grid select-none"
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        {/* Top Header Strip */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-10 font-mono text-xs font-bold">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#FF2A00] border border-[#0F0F0F]" />
            <span className="bg-[#CCFF00] px-2 py-0.5 border border-[#0F0F0F]">
              SECTION // 04
            </span>
            <span>CONTACT TERMINAL PROTOCOL</span>
          </div>
          <div className="bg-[#0F0F0F] text-[#F4F4F0] px-3 py-1 border border-[#0F0F0F]">
            OPEN TO DEEP TECH COLLABORATION & RESEARCH
          </div>
        </div>

        {/* Massive Urban Poster Statement */}
        <div className="my-8 md:my-14">
          <div className="inline-block bg-[#FF2A00] text-[#F4F4F0] font-mono text-xs font-bold uppercase px-3 py-1 mb-4 border-2 border-[#0F0F0F] shadow-hard-sm -rotate-1">
            FINAL DISPATCH // 2026
          </div>

          <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl lg:text-[9.5vw] xl:text-[10.5vw] uppercase leading-[0.86] tracking-tight text-[#0F0F0F]">
            THE NEXT SYSTEM <br />
            STARTS WITH <br className="hidden sm:inline" />
            <span className="inline-block bg-[#CCFF00] px-4 py-1 border-4 border-[#0F0F0F] shadow-hard transform -rotate-1 hover:rotate-1 transition-transform my-1">
              AN IDEA
            </span>
            <span className="text-[#FF2A00]">.</span>
          </h2>
        </div>

        {/* Primary Interactive Email Box (Thick 4px border with 8px hard shadow) */}
        <div className="my-12 border-4 border-[#0F0F0F] bg-[#F4F4F0] p-6 sm:p-10 lg:p-12 shadow-hard-xl relative">
          <div className="flex items-center justify-between border-b-2 border-[#0F0F0F] pb-4 mb-6 font-mono text-xs font-bold">
            <span className="uppercase text-[#0F0F0F]/60">TRANSMISSION DIRECTORY</span>
            <span className="bg-[#CCFF00] text-[#0F0F0F] px-2 py-0.5 border border-[#0F0F0F]">
              ACTIVE CHANNEL
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#FF2A00] block uppercase tracking-widest mb-1">
                COMMUNICATION ADDRESS
              </span>
              <a
                href={`mailto:${email}`}
                className="font-poster text-3xl sm:text-5xl lg:text-6xl text-[#0F0F0F] hover:text-[#FF2A00] transition-colors tracking-wide uppercase break-all"
              >
                {email}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="px-6 py-3.5 bg-[#FF2A00] hover:bg-[#CCFF00] text-[#F4F4F0] hover:text-[#0F0F0F] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] shadow-hard flex items-center gap-2 btn-brutal transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="px-6 py-3.5 bg-[#CCFF00] hover:bg-[#0F0F0F] text-[#0F0F0F] hover:text-[#CCFF00] font-mono text-xs uppercase tracking-wider font-bold border-2 border-[#0F0F0F] shadow-hard flex items-center gap-2 btn-brutal transition-all"
              >
                <span>SEND MAIL</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Social Stickers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`border-4 border-[#0F0F0F] p-6 flex flex-col justify-between shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all duration-150 ${link.color}`}
              >
                <div className="flex items-center justify-between border-b-2 border-current pb-3 mb-4 font-mono text-xs font-bold">
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6" />
                  <span className="font-mono text-base font-bold">
                    {link.handle}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Credits & Jump to Top */}
        <div className="border-t-2 border-[#0F0F0F] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs font-bold">
          <div className="space-y-1">
            <div className="text-sm font-poster uppercase tracking-wide">
              ADITYA CHAUDHARI // 2026 EDITION
            </div>
            <div className="text-[#0F0F0F]/70">
              B.TECH CS & AI • UPGRAD SCHOOL OF TECHNOLOGY, PUNE
            </div>
            <div className="text-[10px] text-[#0F0F0F]/50">
              URBAN BRUTALIST ARCHITECTURE • HARD SHADOWS • ZERO SOFT CORNERS
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline bg-[#CCFF00] px-2 py-1 border border-[#0F0F0F]">
              STRIKE.UNO INSPIRED
            </span>

            <button
              onClick={() => scrollTo('#hero')}
              className="p-3 bg-[#0F0F0F] hover:bg-[#FF2A00] text-[#F4F4F0] border-2 border-[#0F0F0F] shadow-hard-sm transition-colors flex items-center gap-2 uppercase font-bold"
            >
              <ArrowUp className="w-4 h-4" />
              <span>BACK TO TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
