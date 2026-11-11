import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';

export default function Process() {
  if (!PROCESS_STEPS || PROCESS_STEPS.length === 0) return null;

  return (
    <section id="process" className="py-20 sm:py-28 bg-white text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3A] tracking-tight font-display">
            A Disciplined Engineering Lifecycle
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every project follows a transparent, phased engineering approach designed to de-risk delivery and maintain high quality.
          </p>
        </div>

        {/* Phased Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-sky-300 hover:bg-white hover:shadow-sm transition-all duration-300 group"
            >
              <div>
                {/* Step Number & Line */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0B1B3A] flex items-center justify-center font-mono font-bold text-sm shadow-xs group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7] transition-colors">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Phase {idx + 1}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="text-base font-bold text-[#0B1B3A] font-display leading-snug">
                  {step.title}
                </h3>
                <div className="text-xs font-semibold text-[#0284C7] mt-1">
                  {step.tagline}
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              {step.deliverables && step.deliverables.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">
                    Deliverables:
                  </div>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                      <span className="leading-tight">{del}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Process Note Banner (Pure Light Mode) */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-sky-50/70 border border-sky-200 text-[#0B1B3A] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="text-base font-bold text-[#0B1B3A] font-display">
              Need a tailored development roadmap?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We can draft a milestone proposal and architecture scope based on your specification.
            </p>
          </div>
          <Link
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md"
          >
            <span>Request Project Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
