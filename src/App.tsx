import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { AboutExperiments } from './components/AboutExperiments';
import { Contact } from './components/Contact';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F4F4F0] text-[#0F0F0F] selection:bg-[#CCFF00] selection:text-[#0F0F0F] font-mono overflow-x-hidden antialiased">
        {/* Urban Brutalist Navigation Bar */}
        <Navbar />

        {/* Content Stream */}
        <main className="w-full">
          {/* Section 01: Hero with 3D Sketched Wireframe & Slapped Stickers */}
          <Hero />

          {/* Section 02: Selected Work with Pinned ScrollTrigger Panels */}
          <SelectedWork />

          {/* Section 03: Editorial Statement, Tactile Sticker Toolkit, & Lab Grid */}
          <AboutExperiments />

          {/* Section 04: Contact Protocol & Massive Poster Footer */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default App;
