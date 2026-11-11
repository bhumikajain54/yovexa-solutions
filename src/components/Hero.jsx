import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const badge = "Digital Engineering & Software Solutions";
  const heading = "We Build Digital Solutions That Drive";
  const highlight = "Business Growth";
  const description = "At Yovexa Solutions, we design and develop modern websites, web applications, and custom software that help businesses streamline operations, serve customers, and scale with confidence.";

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 overflow-hidden tech-grid-bg font-sans"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-24 right-1/4 w-96 h-96 bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>{badge}</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-[#0B1B3A] leading-[1.14]">
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
          <Link
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <Link
            to="/portfolio"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#0B1B3A] bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            <span>Explore Our Work</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </Link>
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
