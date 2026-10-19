import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ShieldCheck, Cpu, Target, Users, Code2, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contentService } from '../services/contentService';
import { projectService } from '../services/projectService';

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Yovexa Solutions - Software Engineering & Digital Solutions';

    let isMounted = true;
    Promise.all([
      contentService.getAboutContent(),
      projectService.getProjects({ publishedOnly: true })
    ])
      .then(([aboutData, projData]) => {
        if (isMounted) {
          setAbout(aboutData);
          setFeaturedProjects(Array.isArray(projData) ? projData.slice(0, 2) : []);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to load about page data:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const title = about?.title || "Engineering Pragmatic Digital Solutions";
  const titleHighlight = about?.titleHighlight || about?.highlightedTitle || "For Modern Businesses";
  const primaryDesc = about?.description || about?.primaryParagraph || "Yovexa Solutions is an Indian digital solutions and software development company dedicated to engineering modern, scalable, and practical digital products.";
  const secondaryDesc = about?.additionalDescription || about?.secondaryParagraph || "We build websites, enterprise web applications, and custom backend systems that help businesses streamline workflows, serve customers, and scale reliably.";
  const focusAreas = Array.isArray(about?.highlights) && about.highlights.length > 0
    ? about.highlights
    : [
        "Custom Web Application Development",
        "Modern Responsive Business Websites",
        "REST API Design & Backend Integration",
        "Database Architecture & Optimization",
        "Cloud Deployment & Secure Authentication",
        "Admin Dashboard & CMS Engineering"
      ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-24">
        
        {/* Page Hero Header */}
        <section className="bg-white border-b border-slate-200 py-16 sm:py-20 relative tech-grid-bg overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>COMPANY STORY & CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display max-w-4xl mx-auto leading-tight">
              {title}{' '}
              <span className="text-[#0284C7]">{titleHighlight}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              {primaryDesc}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
          
          {/* Mission & Purpose Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">Our Purpose</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                To engineer modern digital tools, web platforms, and custom software that solve genuine business friction. We believe great software should be intuitive, dependable under load, and built without unnecessary technical debt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">Engineering Quality</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                We combine strictly typed backend APIs in Java Spring Boot with reactive frontends in React 19. Our systems are backed by optimized MongoDB schemas and standardized deployment configurations.
              </p>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-card">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-2">
                Technical Capabilities
              </h3>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                What We Engineer For Our Clients
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                {secondaryDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Working Principles */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-2">
                How We Collaborate
              </h3>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Our Working Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
                <Code2 className="w-6 h-6 text-[#0284C7] mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-2 font-display">Maintainable Codebases</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clean modular structures, comprehensive documentation, and predictable interfaces so your systems can be maintained for years.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
                <Users className="w-6 h-6 text-[#0284C7] mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-2 font-display">Direct Engineer Access</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clear, timely communication without confusing sales jargon. You work directly with technical specialists who understand the code.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
                <Layers className="w-6 h-6 text-[#0284C7] mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-2 font-display">Phased Milestones</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Transparent deliverable schedules and staging previews at every phase so you always see exactly what is being built.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Works Link */}
          {featuredProjects.length > 0 && (
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl tech-grid-dark">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block mb-1">
                    Verified Work
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white">See Our Engineering In Action</h3>
                </div>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold hover:bg-[#0369A1] transition-colors shrink-0"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.slug || p.id}`}
                    className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-sky-400 transition-colors group block"
                  >
                    <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                      {p.category ? p.category.replace(/_/g, ' ') : 'Project'}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mt-1">
                      {p.title || p.projectName}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {p.summary || p.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold font-display text-slate-900">Ready to build your digital product?</h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Let's discuss your project requirements, technical architecture, and implementation timeline.
              </p>
            </div>
            <Link
              to="/#contact"
              className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm"
            >
              Start a Conversation
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
