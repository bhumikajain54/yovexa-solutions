import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import DynamicIcon from './DynamicIcon';

export default function Services({ onSelectService }) {
  const navigate = useNavigate();

  const handleServiceSelect = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    navigate(`/contact?service=${encodeURIComponent(serviceTitle)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3A] tracking-tight font-display">
              Software Solutions Built To Scale
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
              From responsive business websites to full-stack enterprise web applications and high-throughput REST APIs.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/services"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <span>View All Services Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const featuresList = Array.isArray(service.features)
              ? service.features
              : (typeof service.features === 'string' ? service.features.split('\n').filter(Boolean) : []);

            return (
              <div
                key={service.id || idx}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Top Eyebrow & Service Code */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-200">
                      <DynamicIcon name={service.icon || 'Globe'} className="w-6 h-6" />
                    </div>
                    <div>
                      {service.popularTag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284C7] text-[11px] font-bold border border-sky-200">
                          {service.popularTag}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-[#0284C7] transition-colors">
                    {service.serviceCode || `0${service.displayOrder || idx + 1}`}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-[#0B1B3A] group-hover:text-[#0284C7] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Features list */}
                  {featuresList.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <div className="text-[11px] uppercase tracking-wider font-extrabold text-[#0B1B3A] mb-3 font-mono">
                        Key Deliverables
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {featuresList.slice(0, 4).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleServiceSelect(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Inquire About This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={`/services/${service.slug || service.id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
                  >
                    <span>Service Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
