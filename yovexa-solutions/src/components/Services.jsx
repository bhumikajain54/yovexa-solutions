import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import DynamicIcon from './DynamicIcon';

export default function Services({ onSelectService }) {
  const handleServiceClick = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-white text-[#0B1B3A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3A] tracking-tight font-display">
              What We Build
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] max-w-2xl font-normal">
              Technology solutions designed around real business needs. Clean, maintainable, and built to scale.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B3A] hover:text-[#0284C7] p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <span>Have a custom requirement? Let's talk</span>
              <ArrowRight className="w-4 h-4 text-[#0284C7]" />
            </button>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.title)}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Popular Tag */}
              {service.popularTag && (
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-xs font-bold text-[#0369A1] tracking-wide">
                  {service.popularTag}
                </div>
              )}

              <div>
                {/* Top Icon & Code */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#0B1B3A] text-[#38BDF8] flex items-center justify-center group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <DynamicIcon name={service.icon} className="w-7 h-7" />
                  </div>
                  <span className="text-2xl font-black font-display text-[#CBD5E1] group-hover:text-[#0284C7] transition-colors">
                    {service.serviceCode}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0B1B3A] group-hover:text-[#0284C7] transition-colors font-display">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Features List */}
                <ul className="mt-6 space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action */}
              <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0B1B3A] group-hover:text-[#0284C7]">
                <span>Start with this service</span>
                <div className="w-7 h-7 rounded-full bg-[#F1F5F9] group-hover:bg-[#0284C7] group-hover:text-white flex items-center justify-center transition-all duration-200 transform group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
