import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, BookOpen, ArrowRight, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { caseStudyService } from '../services/caseStudyService';
import { imageKitService } from '../services/imageKitService';

export default function CaseStudyListingPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Case Studies & Architectural Breakdowns | Yovexa Solutions';
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const [data, catData] = await Promise.all([
          caseStudyService.getCaseStudies({
            publishedOnly: true,
            search,
            category: activeCategory,
          }),
          caseStudyService.getCategories(),
        ]);
        if (isMounted) {
          setCaseStudies(data);
          const hasAll = Array.isArray(catData) && catData.some(c => c.id === 'all');
          setCategories(hasAll ? catData : [{ id: 'all', label: 'All Case Studies' }, ...(Array.isArray(catData) ? catData : [])]);
        }
      } catch (err) {
        console.error('Failed to load case studies:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCaseStudies, 200);
    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [search, activeCategory]);

  const featuredCaseStudy = !search && activeCategory === 'all'
    ? (caseStudies.find(cs => cs.featured) || caseStudies[0])
    : null;

  const remainingCaseStudies = featuredCaseStudy
    ? caseStudies.filter(cs => (cs.id || cs.slug) !== (featuredCaseStudy.id || featuredCaseStudy.slug))
    : caseStudies;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        {/* Streamlined Publication Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100/80 border border-sky-200/80 text-[#0284C7] text-[10px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#0284C7]" />
                <span>PROJECT BREAKDOWNS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Technical <span className="text-[#0284C7]">Case Studies</span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
                Explore in-depth engineering breakdowns of real business challenges solved, architectural decisions, and verified production outcomes.
              </p>
            </div>

            {/* Compact Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search case studies..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0284C7] shadow-2xs border border-slate-200 transition-all"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 shrink-0 ${
                      isActive
                        ? 'bg-[#0B1B3A] text-white shadow-xs ring-2 ring-[#0284C7]'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading Skeleton */}
          {loading ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-96 rounded-2xl bg-white border border-slate-200 p-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-80 rounded-2xl bg-white border border-slate-200" />
                <div className="h-80 rounded-2xl bg-white border border-slate-200" />
              </div>
            </div>
          ) : caseStudies.length === 0 ? (
            /* Designed Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {search ? 'No matching case studies found' : 'No case studies available yet.'}
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                {search
                  ? `No case studies match "${search}". Try searching for another keyword or clear your filter.`
                  : 'Our engineering team is currently documenting our latest enterprise architectures. Check back soon!'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Case Study Hero Feature */}
              {featuredCaseStudy && (
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 overflow-hidden hover:border-sky-300 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Visual Project Preview */}
                    <div className="lg:col-span-7 relative bg-slate-900 min-h-[320px] lg:min-h-[460px] flex items-center justify-center overflow-hidden group">
                      {featuredCaseStudy.featuredImage ? (
                        <>
                          <img
                            src={imageKitService.getLqipUrl(featuredCaseStudy.featuredImage)}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                          />
                          <img
                            src={imageKitService.getDetailUrl(featuredCaseStudy.featuredImage, 1000)}
                            alt={featuredCaseStudy.title}
                            loading="lazy"
                            decoding="async"
                            className="relative z-10 w-full h-full max-h-[460px] object-contain rounded-xl p-2 transition-transform duration-300"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-sky-400">
                          <Layers className="w-16 h-16 opacity-40 mb-3" />
                          <span className="text-sm font-semibold text-slate-300">Technical Architecture Overview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider bg-white/95 text-[#0284C7] shadow-xs border border-sky-100">
                          <Sparkles className="w-3 h-3 text-[#0284C7]" />
                          <span>Featured Architecture</span>
                        </span>
                      </div>
                    </div>

                    {/* Editorial Details */}
                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                            {featuredCaseStudy.category ? featuredCaseStudy.category.replace(/_/g, ' ') : 'Enterprise Platform'}
                          </span>
                          {featuredCaseStudy.projectReference && (
                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              Ref: {featuredCaseStudy.projectReference}
                            </span>
                          )}
                        </div>

                        <Link to={`/case-studies/${featuredCaseStudy.slug || featuredCaseStudy.id}`}>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display hover:text-[#0284C7] transition-colors leading-tight">
                            {featuredCaseStudy.title}
                          </h2>
                        </Link>

                        {featuredCaseStudy.subtitle && (
                          <p className="mt-2 text-sm font-medium text-slate-600 line-clamp-2">
                            {featuredCaseStudy.subtitle}
                          </p>
                        )}

                        {featuredCaseStudy.summary && (
                          <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {featuredCaseStudy.summary}
                          </p>
                        )}

                        {/* Problem Excerpt Callout */}
                        {featuredCaseStudy.problem && (
                          <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              The Core Challenge:
                            </div>
                            <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed italic">
                              "{featuredCaseStudy.problem}"
                            </p>
                          </div>
                        )}

                        {/* Technologies Tags */}
                        {featuredCaseStudy.technologies && (
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {(Array.isArray(featuredCaseStudy.technologies)
                              ? featuredCaseStudy.technologies
                              : String(featuredCaseStudy.technologies).split(',')
                            ).slice(0, 5).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200/80"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/case-studies/${featuredCaseStudy.slug || featuredCaseStudy.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
                        >
                          <span>Read Full Case Study</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        {featuredCaseStudy.liveUrl && (
                          <a
                            href={featuredCaseStudy.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-500" />
                            <span>Live System</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Case Studies (Editorial 2-Column / Structured Cards) */}
              {remainingCaseStudies.length > 0 && (
                <div>
                  {featuredCaseStudy && (
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-slate-900 font-display">
                        Additional Architectural Studies
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {remainingCaseStudies.length} {remainingCaseStudies.length === 1 ? 'Project' : 'Projects'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {remainingCaseStudies.map((cs) => {
                      const technologies = Array.isArray(cs.technologies)
                        ? cs.technologies
                        : (typeof cs.technologies === 'string' ? cs.technologies.split(',').map(s => s.trim()).filter(Boolean) : []);

                      return (
                        <article
                          key={cs.id || cs.slug}
                          className="group rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
                        >
                          <div>
                            {/* Image Header */}
                            {cs.featuredImage ? (
                              <div className="relative h-56 w-full overflow-hidden bg-slate-950 border-b border-slate-200 flex items-center justify-center p-2">
                                <img
                                  src={imageKitService.getLqipUrl(cs.featuredImage)}
                                  alt=""
                                  aria-hidden="true"
                                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                                />
                                <img
                                  src={imageKitService.getCardUrl(cs.featuredImage, 600)}
                                  alt={cs.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 w-full h-full object-contain rounded-lg transition-transform duration-300"
                                  onError={(e) => {
                                    e.currentTarget.parentElement.style.display = 'none';
                                  }}
                                />
                                <div className="absolute top-4 left-4">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-white/95 px-2.5 py-1 rounded-md border border-sky-200 shadow-xs">
                                    {cs.category ? cs.category.replace(/_/g, ' ') : 'Case Study'}
                                  </span>
                                </div>
                              </div>
                            ) : null}

                            {/* Content Block */}
                            <div className="p-6 sm:p-7">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                {!cs.featuredImage && (
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                                    {cs.category ? cs.category.replace(/_/g, ' ') : 'Case Study'}
                                  </span>
                                )}
                                {cs.projectReference && (
                                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                    {cs.projectReference}
                                  </span>
                                )}
                              </div>

                              <Link to={`/case-studies/${cs.slug || cs.id}`}>
                                <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-[#0284C7] transition-colors line-clamp-2 leading-snug">
                                  {cs.title}
                                </h3>
                              </Link>

                              {cs.subtitle && (
                                <p className="text-xs font-semibold text-[#0284C7] mt-1 line-clamp-1">
                                  {cs.subtitle}
                                </p>
                              )}

                              <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                {cs.summary || cs.problem}
                              </p>

                              {/* Tech Stack Chips */}
                              {technologies.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                  {technologies.slice(0, 4).map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-mono border border-slate-200"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link
                              to={`/case-studies/${cs.slug || cs.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors"
                            >
                              <span>Read Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            {cs.liveUrl && (
                              <a
                                href={cs.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                                title="View live system"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
