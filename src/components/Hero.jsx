import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ArrowUpRight, Globe, Smartphone, ShoppingBag, Lock, Laptop } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="w-48 h-8 rounded-full bg-slate-200" />
              <div className="w-4/5 h-16 rounded-2xl bg-slate-200" />
              <div className="w-full h-24 rounded-2xl bg-slate-200" />
              <div className="flex gap-4 pt-2">
                <div className="w-40 h-12 rounded-xl bg-slate-200" />
                <div className="w-40 h-12 rounded-xl bg-slate-200" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-80 rounded-2xl bg-slate-200" />
            </div>
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
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Value Proposition & Intentional Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight font-display text-slate-900 leading-[1.12]">
              {heading}{' '}
              <span className="text-[#0284C7]">
                {highlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              {description}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => scrollTo('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <span>{secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Verified Capabilities Checklist */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
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

          {/* Right Column: Premium Digital Product Showcase */}
          <div className="lg:col-span-6 w-full relative">
            {/* Ambient subtle backdrops */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Main Browser Mockup Frame */}
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/70 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/60">
              {/* Browser Window Chrome */}
              <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>

                {/* Clean URL bar */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-500 font-mono shadow-2xs max-w-[210px] sm:max-w-xs w-full justify-center">
                  <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">yovexasolutions.in/preview</span>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Preview</span>
                </div>
              </div>

              {/* Showcase Content Canvas */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-slate-50/60">
                {/* App Header within Mockup */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                      Y
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">Yovexa Studio</div>
                      <div className="text-[10px] text-slate-500">Digital Solutions & Software</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-100 text-[11px] font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>Digital Craftsmanship</span>
                  </span>
                </div>

                {/* Hero Presentation Banner Card Inside Canvas */}
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white mb-4 shadow-sm relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                      Custom Digital Platform
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      Modern Systems Built for Business Operations
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-sm">
                      Automated workflows, responsive interfaces, and custom software engineered for reliability.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* 2-Column Product Solutions Showcase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] mb-2">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Web Applications</div>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-normal">
                      High-speed responsive business portals and internal tools.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">E-Commerce Platforms</div>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-normal">
                      Conversion-focused stores, catalogs, and customer checkouts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Badge: Mobile & Multi-Device Card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-4 -left-4 p-3 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-lg shadow-slate-200/80 z-20">
              <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-[#0284C7] shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Responsive Everywhere</div>
                <div className="text-[11px] text-slate-500">Mobile, tablet & desktop optimized</div>
              </div>
            </div>

            {/* Overlapping Floating Badge: Production Ready */}
            <div className="hidden sm:flex items-center gap-2 absolute -top-3 -right-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-200 shadow-md z-20">
              <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
              <span className="text-xs font-bold text-slate-800">Production-Ready Code</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
