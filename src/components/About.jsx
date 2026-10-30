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
    <section id="about" className="py-20 sm:py-24 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Narrative & Action */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{sectionLabel}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
                {title}{' '}
                <span className="text-[#0284C7]">
                  {titleHighlight}
                </span>
              </h2>
            </div>

            <div className="space-y-4 font-normal leading-relaxed">
              <p className="text-base sm:text-lg text-slate-700">
                {primaryDesc}
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                {secondaryDesc}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1B3A] hover:bg-[#183B75] transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start A Conversation</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 hover:text-[#0284C7] hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Explore Services</span>
              </button>

              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-semibold text-[#0284C7] hover:text-[#0369A1] transition-colors"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: What We Deliver Capability Matrix Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 shadow-card relative overflow-hidden">
              {/* Subtle decorative background gradient glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 mb-6">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#0284C7] font-mono block mb-1">
                  Core Deliverables
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  What We Deliver For Our Clients:
                </h3>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusAreas.map((area, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-sky-400 hover:shadow-card-hover transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-200">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 leading-snug block group-hover:text-slate-900 transition-colors">
                        {area}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Production Standards
                </span>
                <span className="text-[#0284C7] font-semibold">Reliable & Scalable</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
