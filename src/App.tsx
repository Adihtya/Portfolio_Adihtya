import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Bio } from './components/Bio';
import { SelectedWork } from './components/SelectedWork';
import { Toolkit } from './components/Toolkit';
import { Experiments } from './components/Experiments';
import { Contact } from './components/Contact';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F4F4F0] text-[#0F0F0F] selection:bg-[#CCFF00] selection:text-[#0F0F0F] font-mono overflow-x-hidden antialiased">
        {/* Urban Brutalist Navigation Bar */}
        <Navbar />

        {/* Content Stream: Hero -> Bio -> Projects (Selected Work) -> Toolkit -> Experiments -> Contact */}
        <main className="w-full">
          {/* Section 01: Hero with 3D Sketched Wireframe & Slapped Stickers */}
          <Hero />

          {/* Section 02: Biographical Manifesto & Physical ID Card */}
          <Bio />

          {/* Section 03: Selected Work (Project part - situated directly below Bio) */}
          <SelectedWork />

          {/* Section 04: Scattered Physical Toolkit Stickers & Telemetry HUD */}
          <Toolkit />

          {/* Section 05: Brutalist Lab Experiments Grid */}
          <Experiments />

          {/* Section 06: Contact Protocol & Massive Poster Footer */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default App;
