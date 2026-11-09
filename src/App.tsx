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
      <div className="relative min-h-screen bg-[#2D0000] text-[#EEEAD7] selection:bg-[#6D0808] selection:text-[#EEEAD7] font-sans overflow-x-hidden antialiased">
        {/* Navigation Bar */}
        <Navbar />

        {/* Core Content Flow */}
        <main className="w-full">
          {/* Section 01: Hero with 3D Chrome Wireframe Tesseract */}
          <Hero />

          {/* Section 02: Selected Work with Pinned ScrollTrigger Panels */}
          <SelectedWork />

          {/* Section 03: About Statement, Interactive Toolkit, & Brutalist Experiments Grid */}
          <AboutExperiments />

          {/* Section 04: Contact Protocol & Massive Footer */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default App;
