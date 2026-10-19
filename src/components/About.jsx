import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles, Code2, Users, Layers } from 'lucide-react';
import { contentService } from '../services/contentService';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    contentService.getAboutContent()
      .then(data => {
        if (isMounted) {
          setAbout(data || null);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to load active about content:', err);
        if (isMounted) {
          setAbout(null);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const scrollTo = (target) => {
    const id = target?.replace('#', '') || 'contact';
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section id="about" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-7 bg-slate-200 rounded-full w-40 mb-6" />
          <div className="h-12 bg-slate-200 rounded-xl w-3/4 mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-20 bg-slate-200 rounded-xl" />
              <div className="h-20 bg-slate-200 rounded-xl" />
            </div>
            <div className="lg:col-span-5">
              <div className="h-72 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (about?.isVisible === false) return null;

  const title = about?.title || "Engineering Pragmatic Digital Solutions";
  const titleHighlight = about?.titleHighlight || about?.highlightedTitle || "For Modern Businesses";
  const sectionLabel = about?.sectionLabel || about?.eyebrow || "WHO WE ARE";
  const primaryDesc = about?.description || about?.primaryParagraph || "Yovexa Solutions is a digital solutions and software development company dedicated to engineering modern, scalable, and practical digital products.";
  const secondaryDesc = about?.additionalDescription || about?.secondaryParagraph || "We build websites, enterprise web applications, and custom backend systems that help businesses streamline workflows, connect with their customers, and scale reliably.";
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
    <section id="about" className="py-28 sm:py-32 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{sectionLabel}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display max-w-4xl">
            {title}{' '}
            <span className="text-[#0284C7]">
              {titleHighlight}
            </span>
          </h2>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Business Story & Capabilities */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {primaryDesc}
            </p>
            
            {secondaryDesc && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {secondaryDesc}
              </p>
            )}

            {/* Focus Capabilities Grid */}
            <div className="pt-4">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-4">
                What We Deliver For Our Clients:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusAreas.map((area, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-800 font-semibold leading-tight">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo(about?.primaryCtaLink || 'contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1B3A] hover:bg-[#183B75] transition-all shadow-sm transform hover:-translate-y-0.5"
              >
                <span>{about?.primaryCtaText || "Start A Conversation"}</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>

              <button
                onClick={() => scrollTo(about?.secondaryCtaLink || 'services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 hover:text-[#0284C7] hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                <span>{about?.secondaryCtaText || "Explore Services"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Element or Technical Showcase Card */}
          <div className="lg:col-span-5">
            {about?.image ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md">
                <img
                  src={about.image}
                  alt={about.imageAlt || about.title || "Yovexa Solutions"}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {(about.imageCategory || about.imageTitle || about.imageBadge) && (
                  <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between">
                    <div>
                      {about.imageCategory && (
                        <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider block">
                          {about.imageCategory}
                        </span>
                      )}
                      {about.imageTitle && (
                        <h5 className="text-xs font-bold text-slate-900 mt-0.5">
                          {about.imageTitle}
                        </h5>
                      )}
                    </div>
                    {about.imageBadge && (
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0284C7] text-xs font-mono font-bold border border-sky-200">
                        {about.imageBadge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6 tech-grid-dark">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                    Engineering Discipline
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Production Standards</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-slate-300">
                  <div className="flex items-start gap-3">
                    <Code2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-sans text-sm">Full-Stack Precision</strong>
                      <span className="text-slate-400">Strictly typed DTOs, reactive frontends, and indexed MongoDB collections.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-sans text-sm">Direct Collaboration</strong>
                      <span className="text-slate-400">You interact directly with senior product engineers rather than sales intermediaries.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-sans text-sm">Pragmatic Execution</strong>
                      <span className="text-slate-400">Focused on clear business outcomes, maintainable architectures, and high uptime.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Based in India</span>
                  <span className="text-slate-300 font-semibold">Serving Growing Businesses</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
