import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { contentService } from '../services/contentService';

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    contentService.getHeroContent()
      .then(data => {
        if (isMounted) {
          setHero(data || null);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to load active hero:', err);
        if (isMounted) {
          setHero(null);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const scrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-pulse flex flex-col items-center text-center space-y-6">
          <div className="w-48 h-8 rounded-full bg-slate-200" />
          <div className="w-4/5 h-16 rounded-2xl bg-slate-200" />
          <div className="w-full max-w-2xl h-24 rounded-2xl bg-slate-200" />
          <div className="flex gap-4 pt-2 justify-center">
            <div className="w-40 h-12 rounded-xl bg-slate-200" />
            <div className="w-40 h-12 rounded-xl bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (hero?.isVisible === false) return null;

  const badge = hero?.badge || hero?.eyebrow || "Digital Engineering & Software Solutions";
  const heading = hero?.heading || hero?.headline || "We Build Digital Solutions That Drive";
  const highlight = hero?.highlightedText || hero?.highlightedHeadline || "Business Growth";
  const description = hero?.description || "We design and develop modern websites, web applications, and custom software that help businesses streamline operations, serve customers, and scale with confidence.";
  const primaryCta = hero?.primaryCtaText || hero?.primaryCtaLabel || "Discuss Your Project";
  const secondaryCta = hero?.secondaryCtaText || hero?.secondaryCtaLabel || "Explore Our Work";

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-38 md:pb-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 overflow-hidden tech-grid-bg"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.14]">
          {heading}{' '}
          <span className="text-[#0284C7]">
            {highlight}
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
          {description}
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{primaryCta}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => scrollTo('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
          >
            <span>{secondaryCta}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Verified Capabilities Checklist */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 w-full max-w-2xl flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>Custom Web & Mobile Apps</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>E-Commerce & Portals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
            <span>Scalable Software Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
