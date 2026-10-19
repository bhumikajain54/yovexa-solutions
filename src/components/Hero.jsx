import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, CheckCircle2, ShieldCheck, Database, Layers, ArrowUpRight } from 'lucide-react';
import { contentService } from '../services/contentService';

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('architecture');

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
            <div className="lg:col-span-7 space-y-6">
              <div className="w-48 h-8 rounded-full bg-slate-200" />
              <div className="w-4/5 h-16 rounded-2xl bg-slate-200" />
              <div className="w-full h-24 rounded-2xl bg-slate-200" />
              <div className="flex gap-4 pt-2">
                <div className="w-40 h-12 rounded-xl bg-slate-200" />
                <div className="w-40 h-12 rounded-xl bg-slate-200" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full h-80 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hero?.isVisible === false) return null;

  const badge = hero?.badge || hero?.eyebrow || "Digital Engineering Studio";
  const heading = hero?.heading || hero?.headline || "Digital Products Built Around";
  const highlight = hero?.highlightedText || hero?.highlightedHeadline || "Your Business";
  const description = hero?.description || "We design and develop modern websites, web applications, and custom software that help businesses streamline operations, serve customers, and scale with confidence.";
  const primaryCta = hero?.primaryCtaText || hero?.primaryCtaLabel || "Discuss Your Project";
  const secondaryCta = hero?.secondaryCtaText || hero?.secondaryCtaLabel || "Explore Our Work";

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-38 md:pb-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 overflow-hidden tech-grid-bg"
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Value Proposition & Intentional Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.12]">
              {heading}{' '}
              <span className="text-[#0284C7]">
                {highlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
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
            <div className="mt-10 pt-6 border-t border-slate-200/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>Full-Stack Java & React</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>Clean RESTful APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>Direct Engineer Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Handcrafted Digital Architecture Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl bg-[#061225] border border-slate-800 shadow-2xl overflow-hidden text-white tech-grid-dark">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#0A1628] border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">yovexa-core-stack.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Production Live</span>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center px-4 pt-3 border-b border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'architecture'
                      ? 'border-[#0284C7] text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'api'
                      ? 'border-[#0284C7] text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  REST API Contract
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'delivery'
                      ? 'border-[#0284C7] text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Deliverables
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="p-5 font-mono text-xs leading-relaxed">
                {activeTab === 'architecture' && (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[11px] text-sky-400 uppercase tracking-wider font-bold mb-1">
                        Frontend Tier
                      </div>
                      <div className="text-slate-200 font-semibold">React 19 + Tailwind CSS + Vite</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">High-performance responsive interfaces & design systems</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-bold mb-1">
                        Backend Tier
                      </div>
                      <div className="text-slate-200 font-semibold">Java Spring Boot + Spring Security</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">Stateless JWT authentication, REST DTOs & strict validation</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <div className="text-[11px] text-amber-400 uppercase tracking-wider font-bold mb-1">
                        Persistence Tier
                      </div>
                      <div className="text-slate-200 font-semibold">MongoDB Atlas Document Database</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">Optimized collections, indexed queries & schema agility</div>
                    </div>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 text-[11px] space-y-2">
                    <div className="text-emerald-400 font-semibold">// Live Production Endpoints</div>
                    <div><span className="text-sky-400 font-bold">GET</span> /api/services &rarr; <span className="text-slate-400">Active Offerings</span></div>
                    <div><span className="text-sky-400 font-bold">GET</span> /api/projects &rarr; <span className="text-slate-400">Deployed Solutions</span></div>
                    <div><span className="text-amber-400 font-bold">POST</span> /api/inquiries &rarr; <span className="text-slate-400">Direct Consultation</span></div>
                    <div className="pt-2 text-slate-500 border-t border-slate-800 text-[10px]">
                      Response format: ApiResponse&lt;T&gt; with JWT rotation
                    </div>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-2.5 text-slate-300">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Production Deployment with SSL</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Responsive Mobile & Tablet Viewports</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Administrative CMS Control Panel</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Post-Launch Technical Support</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Metric Banner */}
              <div className="px-5 py-3 bg-[#0A1628]/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Verified Architecture</span>
                </span>
                <span className="font-semibold text-slate-300">Yovexa Solutions</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
