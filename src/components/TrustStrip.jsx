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
    <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id || pillar.label}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-card transition-all duration-200"
            >
              <div className="p-2.5 rounded-xl bg-sky-100/70 border border-sky-200/80 shrink-0 mt-0.5">
                {getPillarIcon(pillar.icon)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display tracking-tight">
                  {pillar.label}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
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
