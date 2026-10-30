import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicIcon from '../components/DynamicIcon';
import { SERVICES_DATA } from '../data/services';

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Services Directory & Technical Capabilities | Yovexa Solutions';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-24">
        
        {/* Page Hero Header */}
        <section className="bg-white border-b border-slate-200 py-16 sm:py-20 relative tech-grid-bg overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>SERVICES DIRECTORY</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display max-w-4xl mx-auto leading-tight">
              Software Solutions <span className="text-[#0284C7]">Engineered for Growth</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore our comprehensive software engineering services. Built on modern Java Spring Boot and React architectures for long-term reliability.
            </p>
          </div>
        </section>

        {/* Services Directory Content (Static & Instant) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((service, idx) => {
              const featuresList = Array.isArray(service.features)
                ? service.features
                : (typeof service.features === 'string' ? service.features.split('\n').filter(Boolean) : []);

              return (
                <div
                  key={service.id || idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Code & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1B3A] text-sky-400 flex items-center justify-center shadow-xs">
                        <DynamicIcon name={service.icon || 'Globe'} className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black font-mono text-slate-300">
                        {service.serviceCode || `0${service.displayOrder || idx + 1}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {service.popularTag && (
                        <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0284C7] text-[11px] font-bold border border-sky-200">
                          {service.popularTag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {service.shortDescription || service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    {featuresList.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-slate-100">
                        <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-900 mb-3">
                          Key Deliverables & Specifications
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {featuresList.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      <span>Start With This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/services/${service.slug || service.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#0284C7] transition-colors"
                    >
                      <span>View Detailed Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-[#061225] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 tech-grid-dark">
            <div>
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block mb-1">
                Custom Architecture
              </span>
              <h3 className="text-2xl font-bold font-display text-white">Have a unique system requirement?</h3>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                We design custom architectures, specialized REST APIs, third-party integrations, and private business portals.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm"
            >
              Discuss Custom Requirement
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
