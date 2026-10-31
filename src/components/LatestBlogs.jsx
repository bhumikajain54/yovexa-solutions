import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { blogService } from '../services/blogService';
import { imageKitService } from '../services/imageKitService';

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    blogService.getPublicBlogs()
      .then(data => {
        if (isMounted) {
          setBlogs(Array.isArray(data) ? data.slice(0, 3) : []);
          setLoading(false);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch latest blogs:', err);
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="py-28 sm:py-32 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>KNOWLEDGE & INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              Latest Engineering Perspectives
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
              Practical guides, architectural analysis, and web development methodologies from our engineering team.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-16 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const formattedDate = blog.publishedAt || blog.createdAt
                ? new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent';

              return (
                <article
                  key={blog.id || blog.slug}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <Link to={`/blog/${blog.slug}`} className="block relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center p-1.5">
                    {blog.featuredImage ? (
                      <>
                        <img
                          src={imageKitService.getLqipUrl(blog.featuredImage)}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                        />
                        <img
                          src={imageKitService.getCardUrl(blog.featuredImage, 600)}
                          alt={blog.title}
                          className="relative z-10 w-full h-full object-contain rounded-lg transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-sky-400">
                        <BookOpen className="w-8 h-8 opacity-40" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0284C7] border border-sky-200 shadow-xs">
                        {blog.category || 'Engineering'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                          {blog.readingTime || '4 min read'}
                        </span>
                      </div>

                      <Link to={`/blog/${blog.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors font-display line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium truncate max-w-[140px]">
                        By {blog.author || 'Yovexa Team'}
                      </span>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
