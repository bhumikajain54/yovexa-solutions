import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { caseStudyService } from '../services/caseStudyService';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams();

  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedStudies, setRelatedStudies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await caseStudyService.getCaseStudyBySlug(slug);
        if (!isMounted) return;
        setCaseStudy(data);

        // Update document title for SEO
        document.title = `${data.title} — Case Study | Yovexa Solutions`;

        // Fetch related studies
        const allPublished = await caseStudyService.getCaseStudies({ publishedOnly: true });
        const related = allPublished.filter(cs => cs.id !== data.id && cs.slug !== data.slug).slice(0, 2);
        if (isMounted) setRelatedStudies(related);
      } catch (err) {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCaseStudy();

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
            <h2 className="text-xl font-bold text-slate-900">Case Study Not Found</h2>
            <p className="text-sm text-slate-600">
              The technical case study you requested could not be found or has been moved.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Case Studies</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading || !caseStudy) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-36 pb-24 space-y-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-12 bg-slate-200 rounded w-4/5" />
          <div className="h-96 bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="md:col-span-2 h-64 bg-slate-200 rounded-2xl" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const featuresList = Array.isArray(caseStudy.features)
    ? caseStudy.features
    : (typeof caseStudy.features === 'string' ? caseStudy.features.split('\n').map(s => s.trim()).filter(Boolean) : []);

  const techList = Array.isArray(caseStudy.technologies)
    ? caseStudy.technologies
    : (typeof caseStudy.technologies === 'string' ? caseStudy.technologies.split(',').map(s => s.trim()).filter(Boolean) : []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8 overflow-x-auto no-scrollbar">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/case-studies" className="hover:text-slate-900 transition-colors">Case Studies</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{caseStudy.title}</span>
          </nav>

          {/* Editorial Case Study Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
                {caseStudy.category ? caseStudy.category.replace(/_/g, ' ') : 'Case Study'}
              </span>
              {caseStudy.clientLabel && (
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Client: {caseStudy.clientLabel}
                </span>
              )}
              {caseStudy.projectReference && (
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Ref: {caseStudy.projectReference}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
              {caseStudy.title}
            </h1>

            {caseStudy.subtitle && (
              <p className="mt-3 text-lg sm:text-xl text-[#0284C7] font-semibold leading-relaxed">
                {caseStudy.subtitle}
              </p>
            )}
          </header>

          {/* Featured Large Project Screenshot Display */}
          {caseStudy.featuredImage && (
            <div className="my-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-950 relative flex items-center justify-center p-2 sm:p-4">
              <img
                src={caseStudy.featuredImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
              />
              <img
                src={caseStudy.featuredImage}
                alt={caseStudy.title}
                className="relative z-10 w-full h-auto max-h-[560px] object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Two-Column Structured Deep-Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Main Editorial Narrative */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Executive Overview */}
              {caseStudy.summary && (
                <section className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card">
                  <h2 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-3">
                    Project Overview & Business Context
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {caseStudy.summary}
                  </p>
                </section>
              )}

              {/* The Business Challenge */}
              {caseStudy.problem && (
                <section className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 mb-4">
                    <span>The Challenge & Problem Statement</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                    {caseStudy.problem}
                  </p>
                </section>
              )}

              {/* Implemented Technical Architecture */}
              {caseStudy.solution && (
                <section className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 mb-4">
                    <span>Architecture & Solution Implemented</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                    {caseStudy.solution}
                  </p>
                </section>
              )}

              {/* Key Features & Capabilities List */}
              {featuresList.length > 0 && (
                <section className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 font-display">
                    Key Implemented Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {featuresList.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Meta Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Project Meta Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                  Project Specifications
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Category</span>
                    <span className="text-slate-900 font-bold">
                      {caseStudy.category ? caseStudy.category.replace(/_/g, ' ') : 'Web Application'}
                    </span>
                  </div>

                  {caseStudy.clientLabel && (
                    <div>
                      <span className="text-slate-400 block font-medium">Client / Industry</span>
                      <span className="text-slate-900 font-bold">{caseStudy.clientLabel}</span>
                    </div>
                  )}

                  {caseStudy.projectReference && (
                    <div>
                      <span className="text-slate-400 block font-medium">Project Reference</span>
                      <span className="text-slate-900 font-bold">{caseStudy.projectReference}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-400 block font-medium">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Verified Production</span>
                    </span>
                  </div>
                </div>

                {/* Live Links */}
                {(caseStudy.liveUrl || caseStudy.githubUrl) && (
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {caseStudy.liveUrl && (
                      <a
                        href={caseStudy.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Live System</span>
                      </a>
                    )}
                    {caseStudy.githubUrl && (
                      <a
                        href={caseStudy.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3A] hover:bg-[#183B75] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-sky-400" />
                        <span>Source Architecture</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Technologies Applied */}
              {techList.length > 0 && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card">
                  <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">
                    Technologies Applied
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {techList.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-mono font-medium border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contextual Consultation Card */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                    Custom Development
                  </span>
                  <h4 className="text-base font-bold font-display text-white">
                    Need a Similar Solution?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our engineering team designs and delivers robust digital solutions tailored to your workflows.
                  </p>
                  <Link
                    to={`/contact?project=${encodeURIComponent(caseStudy.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              </div>

            </aside>

          </div>

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <div className="mt-20 pt-10 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 font-display mb-8">
                Related Technical Case Studies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedStudies.map((study) => (
                  <Link
                    key={study.id || study.slug}
                    to={`/case-studies/${study.slug || study.id}`}
                    className="group rounded-2xl bg-white border border-slate-200 p-6 shadow-card hover:shadow-card-hover hover:border-sky-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {study.category ? study.category.replace(/_/g, ' ') : 'Case Study'}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#0284C7] transition-colors mt-2">
                        {study.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                        {study.subtitle || study.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7]">
                      <span>Read Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
