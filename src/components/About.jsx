import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function About() {
  const scrollTo = (target) => {
    const id = target?.replace('#', '') || 'contact';
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const title = "Engineering Pragmatic Digital Solutions";
  const titleHighlight = "For Modern Businesses";
  const sectionLabel = "WHO WE ARE";
  const primaryDesc = "Yovexa Solutions is a digital solutions and software development company dedicated to engineering modern, scalable, and practical digital products.";
  const secondaryDesc = "We build websites, enterprise web applications, and custom backend systems that help businesses streamline workflows, connect with their customers, and scale reliably.";
  const focusAreas = [
    "Custom Web Application Development",
    "Modern Responsive Business Websites",
    "REST API Design & Backend Integration",
    "Database Architecture & Optimization",
    "Cloud Deployment & Secure Authentication",
    "Admin Dashboard & CMS Engineering"
  ];

  return (
    <section id="about" className="py-24 sm:py-28 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
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

        {/* 2-Column Main Layout: Left Story + Right Showcase Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Business Story & Capabilities */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-left">
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {primaryDesc}
              </p>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {secondaryDesc}
              </p>
            </div>

            {/* Focus Capabilities Grid */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 mb-2.5">
                What We Deliver For Our Clients:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {focusAreas.map((area, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-800 font-semibold leading-snug">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0B1B3A] hover:bg-[#183B75] transition-all shadow-sm transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start A Conversation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 hover:text-[#0284C7] hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Explore Services</span>
              </button>

              <Link
                to="/about"
                className="inline-flex items-center gap-1 px-2 py-3 text-xs sm:text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors"
              >
                <span>Company Story</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: WebP Showcase Image (Proportioned to match left content) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative group w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0284C7]/20 via-[#0EA5E9]/15 to-[#38BDF8]/25 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#06101E] shadow-2xl transition-all duration-300 group-hover:shadow-sky-500/10">
                <img
                  src="/about-showcase.svg"
                  alt="Yovexa Solutions - Engineering the Future of Digital Excellence"
                  className="w-full h-auto aspect-[16/9] object-contain transform transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                  width={1024}
                  height={576}
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
