import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projectService } from '../services/projectService';
import DynamicIcon from './DynamicIcon';

export default function Portfolio({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories dynamically from backend API on mount
  useEffect(() => {
    let isMounted = true;
    projectService.getCategories()
      .then(catData => {
        if (isMounted && Array.isArray(catData) && catData.length > 0) {
          setCategories(catData);
        }
      })
      .catch(err => console.warn('Using default categories', err));
    return () => { isMounted = false; };
  }, []);

  // Fetch projects from backend whenever activeCategory changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const filterCategory = activeCategory !== 'all' ? activeCategory : undefined;
    projectService.getProjects({ publishedOnly: true, category: filterCategory })
      .then(projData => {
        if (isMounted) {
          setProjects(projData);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch projects for category:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeCategory]);

  const normalizeCategory = (cat) => {
    if (!cat) return 'WEB_APPLICATIONS';
    const clean = cat.toString().trim().toUpperCase().replace(/[\s-]+/g, '_');
    const map = {
      'WEB': 'WEB_APPLICATIONS',
      'WEB_APP': 'WEB_APPLICATIONS',
      'WEB_APPLICATION': 'WEB_APPLICATIONS',
      'MOBILE': 'MOBILE_APPS',
      'MOBILE_APP': 'MOBILE_APPS',
      'ECOMMERCE': 'E_COMMERCE',
    };
    return map[clean] || clean;
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => {
        const pCat = normalizeCategory(p.category);
        const aCat = normalizeCategory(activeCategory);
        if (pCat === aCat) return true;
        if (Array.isArray(p.secondaryCategories)) {
          return p.secondaryCategories.some(sc => normalizeCategory(sc) === aCat);
        }
        return false;
      });

  return (
    <section id="portfolio" className="py-28 sm:py-32 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>ENGINEERED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              Selected Projects & Case Work
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
              A curated look at production applications, e-commerce stores, and enterprise management platforms engineered by Yovexa Solutions.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 shrink-0 ${
                    isActive
                      ? 'bg-[#0B1B3A] text-white shadow-xs ring-2 ring-[#0284C7]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Showcase */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 animate-pulse">
                <div className="h-48 bg-slate-200 rounded-xl w-full" />
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-8 bg-slate-200 rounded w-3/4" />
                <div className="h-16 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center">
            <h3 className="text-base font-bold text-slate-900">
              {projects.length === 0 ? 'No projects published yet' : 'No projects found in this category'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {projects.length === 0
                ? 'Check back soon for our latest software projects.'
                : 'Select another category to view related projects.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const projectTitle = project.title || project.name || project.projectName || 'Untitled Project';
              const projectImage = project.image || project.featuredImage;
              const projectDesc = project.shortDescription || project.description || project.summary || '';
              const liveLink = project.liveUrl || project.projectUrl;
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : (typeof project.technologies === 'string' ? project.technologies.split(',').map(s => s.trim()).filter(Boolean) : []);

              return (
                <div
                  key={project.id || project._id || project.slug}
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                >
                  {/* Thumbnail Banner */}
                  {projectImage ? (
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                      <img
                        src={projectImage}
                        alt={projectTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.parentElement.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : null}

                  {/* Card Content Header */}
                  <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                        {project.projectType || (project.category ? project.category.replace(/_/g, ' ') : 'Project')}
                      </span>

                      {liveLink && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Live
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-1">
                      {projectTitle}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">
                      {project.subtitle || project.clientLabel || 'Engineered Digital Solution'}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                        {projectDesc}
                      </p>

                      {/* Technology Chips */}
                      {technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold border border-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 4 && (
                            <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-mono font-semibold border border-slate-200">
                              +{technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] transition-transform group-hover:translate-x-1" />
                      </span>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/projects/${project.slug || project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold text-slate-500 hover:text-[#0284C7] transition-colors"
                        >
                          Full Case
                        </Link>
                        {liveLink && (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:text-[#0369A1]"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
