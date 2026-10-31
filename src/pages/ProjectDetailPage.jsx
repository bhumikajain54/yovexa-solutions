import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import { imageKitService } from '../services/imageKitService';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    const fetchProject = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await projectService.getProjectBySlug(slug);
        if (!isMounted) return;
        setProject(data);

        // Update document title for SEO
        document.title = `${data.title || data.projectName} - Project | Yovexa Solutions`;

        // Fetch related projects
        const allPublished = await projectService.getProjects({ publishedOnly: true });
        const related = allPublished.filter(p => p.id !== data.id && p.slug !== data.slug).slice(0, 2);
        if (isMounted) setRelatedProjects(related);
      } catch (err) {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProject();

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
            <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
            <p className="text-sm text-slate-600">
              The project you are looking for might have been moved or is currently unavailable.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-36 pb-24 space-y-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-12 bg-slate-200 rounded w-4/5" />
          <div className="h-64 bg-slate-200 rounded-2xl" />
          <div className="space-y-3 pt-6">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const projectTitle = project.title || project.projectName || project.name || 'Untitled Project';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumbs */}
          <div className="mb-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
              {project.category ? project.category.replace(/_/g, ' ') : 'Project'}
            </span>
            {project.clientLabel && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {project.clientLabel}
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
            {projectTitle}
          </h1>
          {project.subtitle && (
            <p className="mt-2 text-base sm:text-lg text-[#0284C7] font-semibold">
              {project.subtitle}
            </p>
          )}

          {/* Featured Image */}
          {project.featuredImage && (
            <div className="my-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-950 relative flex items-center justify-center p-2 sm:p-4">
              <img
                src={imageKitService.getLqipUrl(project.featuredImage)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
              />
              <img
                src={imageKitService.getDetailUrl(project.featuredImage, 1400)}
                alt={projectTitle}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-auto max-h-[560px] object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Project Overview Card */}
          <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card mb-10">
            <h3 className="text-xs font-mono font-bold uppercase text-[#0284C7] tracking-wider mb-2.5">
              Project Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {project.summary || project.shortDescription || project.description}
            </p>

            {/* Action buttons */}
            {(project.projectUrl || project.githubUrl || project.caseStudyUrl) && (
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Live Platform</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3A] hover:bg-[#183B75] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Repository</span>
                  </a>
                )}
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Case Study</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Detailed Description */}
          {project.description &&
           project.description !== project.summary &&
           project.description !== project.shortDescription && (
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm mb-10">
              <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
                Architectural Implementation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                {project.description}
              </p>
            </div>
          )}

          {/* Technology Stack Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm mb-10">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                Technologies & Architecture Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold border border-slate-200"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="p-8 rounded-2xl bg-[#061225] text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 tech-grid-dark">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0284C7]/20 text-sky-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Engineering</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">Need a similar architecture built?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our developers can engineer high-performance systems for your organization.
              </p>
            </div>

            <Link
              to={`/contact?project=${encodeURIComponent(projectTitle)}`}
              className="shrink-0 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm"
            >
              Discuss Your Project
            </Link>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
                Explore More Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.slug || p.id}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-xs transition-all group"
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

        </div>
      </main>

      <Footer />
    </div>
  );
}
