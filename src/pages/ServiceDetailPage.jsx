import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DynamicIcon from '../components/DynamicIcon';
import { SERVICES_DATA } from '../data/services';
import { projectService } from '../services/projectService';
import { PROCESS_STEPS } from '../data/process';

export default function ServiceDetailPage() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const matched = SERVICES_DATA.find(s => s.slug === slug || s.id === slug);
    if (!matched) {
      setNotFound(true);
      return;
    }

    setService(matched);
    setNotFound(false);
    document.title = `${matched.title} | Yovexa Solutions`;

    let isMounted = true;
    projectService.getProjects({ publishedOnly: true })
      .then(projects => {
        if (isMounted) {
          setRelatedProjects(Array.isArray(projects) ? projects.slice(0, 2) : []);
        }
      })
      .catch(err => {
        console.warn('Failed to load related projects:', err);
      });

    return () => {
      isMounted = false;
      document.title = 'Yovexa Solutions | Digital Solutions & Software Development';
    };
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-32 px-4 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 font-display">404</h1>
            <h2 className="text-xl font-bold text-slate-900">Service Not Found</h2>
            <p className="text-sm text-slate-600">
              The service category you are looking for might have been updated or moved.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const featuresList = Array.isArray(service.features)
    ? service.features
    : (typeof service.features === 'string' ? service.features.split('\n').filter(Boolean) : []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services Directory</span>
            </Link>
          </div>

          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="w-9 h-9 rounded-xl bg-[#0B1B3A] text-sky-400 flex items-center justify-center shadow-xs">
              <DynamicIcon name={service.icon || 'Globe'} className="w-4 h-4" />
            </span>
            {service.popularTag && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-50 text-[#0284C7] border border-sky-200">
                {service.popularTag}
              </span>
            )}
            <span className="text-xs font-mono font-bold text-slate-400">
              Service Ref {service.serviceCode || '01'}
            </span>
          </div>

          {/* Service Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
            {service.title}
          </h1>

          {/* Overview Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {service.shortDescription || service.description}
          </p>

          {/* Deliverables Card */}
          {featuresList.length > 0 && (
            <div className="mt-10 p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card">
              <h3 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-2">
                What This Service Includes
              </h3>
              <h2 className="text-xl font-bold text-slate-900 font-display mb-6">
                Standard Deliverables & Architectural Scope
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Development Approach */}
          <div className="mt-12 p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card">
            <h3 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-2">
              Our Development Approach
            </h3>
            <h2 className="text-xl font-bold text-slate-900 font-display mb-6">
              How We Build & Launch This Solution
            </h2>

            <div className="space-y-4">
              {PROCESS_STEPS.slice(0, 4).map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-7 h-7 rounded-lg bg-[#0B1B3A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Case Studies or Projects (Dynamic) */}
          {relatedProjects.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 font-display mb-4">
                Relevant Engineering Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.slug || p.id}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-xs transition-all group block"
                  >
                    <span className="text-[10px] font-bold uppercase text-[#0284C7] tracking-wider">
                      {p.category ? p.category.replace(/_/g, ' ') : 'Project'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors mt-1 font-display">
                      {p.title || p.projectName}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {p.summary || p.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Project Inquiry CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-[#061225] text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 tech-grid-dark">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0284C7]/20 text-sky-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready To Build?</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">Start With {service.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tell us about your requirements and we will prepare an architecture scope and timeline.
              </p>
            </div>

            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm"
            >
              Discuss This Service
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
