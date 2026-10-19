import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

export default function BlogCard({ blog }) {
  const formattedDate = blog.publishedAt || blog.createdAt
    ? new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Featured Image */}
      <Link to={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden bg-slate-100">
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
          <div className="w-full h-full flex items-center justify-center bg-[#061225] text-sky-400">
            <BookOpen className="w-8 h-8 opacity-30" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0284C7] border border-sky-200 shadow-xs">
            {blog.category || 'Engineering'}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
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

          {/* Title */}
          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors font-display line-clamp-2 leading-snug">
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
          <span className="text-xs text-slate-500 font-medium truncate max-w-[140px]">
            By {blog.author || 'Yovexa Team'}
          </span>

          <Link
            to={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
