import React from 'react';
import { Target, Cpu, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VALUES_DATA } from '../data/values';

export default function WhyYovexa() {
  if (!VALUES_DATA || VALUES_DATA.length === 0) {
    return null;
  }

  const getIcon = (id) => {
    switch (id) {
      case 'business-focused':
        return <Target className="w-6 h-6 text-[#0284C7]" />;
      case 'scalable-architecture':
        return <Cpu className="w-6 h-6 text-[#0284C7]" />;
      case 'modern-ux':
        return <Sparkles className="w-6 h-6 text-[#0284C7]" />;
      case 'transparent-collaboration':
      default:
        return <ShieldCheck className="w-6 h-6 text-[#0284C7]" />;
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="py-28 sm:py-32 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 scroll-mt-20 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>ENGINEERING PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Why Work With <span className="text-[#0284C7]">Yovexa Solutions?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We operate as an extension of your product team, delivering pragmatic digital systems with engineering clarity and genuine accountability.
          </p>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {VALUES_DATA.map((value) => (
            <div
              key={value.id}
              className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors">
                  {getIcon(value.id)}
                </div>

                <div className="text-[11px] font-mono font-bold text-[#0284C7] uppercase tracking-wider mb-1.5">
                  {value.highlight}
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                  {value.title}
                </h3>

                <p className="text-xs text-[#0369A1] font-semibold mt-1">
                  {value.subtitle}
                </p>

                <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {value.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-[#0284C7] transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Engineered for long-term maintainability</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Partner With Yovexa On Your Next Project</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}
