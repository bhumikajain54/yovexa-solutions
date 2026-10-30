import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Portfolio from '../components/Portfolio';
import ProjectModal from '../components/ProjectModal';
import Footer from '../components/Footer';

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portfolio & Selected Projects | Yovexa Solutions';
  }, []);

  const handleDiscussProject = (projectTitle) => {
    navigate(`/contact?project=${encodeURIComponent(projectTitle)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Dedicated Portfolio Page Hero Header */}
        <section className="bg-white border-b border-slate-200 py-16 sm:py-20 relative tech-grid-bg overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>PRODUCTION SHOWCASE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
              Engineered <span className="text-[#0284C7]">Portfolio</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore our real-world software implementations, full-stack applications, and scalable business systems.
            </p>
          </div>
        </section>

        {/* Portfolio Listing */}
        <Portfolio onSelectProject={setSelectedProject} />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDiscussProject={handleDiscussProject}
        />
      )}
    </div>
  );
}
