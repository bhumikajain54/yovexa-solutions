import React from 'react';
import { Cpu, ShieldCheck, Layout, TrendingUp } from 'lucide-react';
import { TRUST_PILLARS } from '../data/values';

export default function TrustStrip() {
  if (!TRUST_PILLARS || TRUST_PILLARS.length === 0) {
    return null;
  }

  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#0284C7]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#0284C7]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#0284C7]" />;
      case 'TrendingUp':
      default:
        return <TrendingUp className="w-5 h-5 text-[#0284C7]" />;
    }
  };

  return (
    <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id || pillar.label}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 hover:border-sky-300 hover:bg-white hover:shadow-sm transition-all duration-200 group"
            >
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-200">
                {getPillarIcon(pillar.icon)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1B3A] font-display tracking-tight">
                  {pillar.label}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
