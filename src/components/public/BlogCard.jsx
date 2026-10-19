import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

export default function BlogCard({ blog, layout = 'grid' }) {
  const formattedDate = blog.publishedAt || blog.createdAt
    ? new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const readTime = blog.readTime || blog.readingTime || '4 min read';
  const categoryLabel = blog.category ? blog.category.replace(/_/g, ' ') : 'Engineering';

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Featured Image */}
      <Link to={`/blog/${blog.slug}`} className="block relative aspect-16/10 overflow-hidden bg-slate-100 border-b border-slate-100">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-sky-400">
            <BookOpen className="w-8 h-8 opacity-40 mb-1" />
            <span className="text-[11px] font-mono text-slate-400">Yovexa Engineering</span>
          </div>
        )}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0284C7] border border-sky-100 shadow-xs">
            {categoryLabel}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-3 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readTime}</span>
            </span>
          </div>

          {/* Title */}
          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors font-display line-clamp-2 leading-snug">
              {blog.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
            {blog.excerpt}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0B1B3A] text-white flex items-center justify-center font-bold text-[10px]">
              {blog.author ? blog.author.charAt(0).toUpperCase() : 'Y'}
            </div>
            <span className="text-xs text-slate-600 font-medium truncate max-w-[120px]">
              {blog.author || 'Yovexa Team'}
            </span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
