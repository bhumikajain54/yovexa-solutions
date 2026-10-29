import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/public/BlogCard';
import { blogService } from '../services/blogService';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([
    { id: 'all', label: 'All Articles' },
  ]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Insights, Articles & Engineering Perspectives | Yovexa Solutions';
  }, []);

  // Dynamically load categories from backend blog categories API
  useEffect(() => {
    let isMounted = true;
    blogService.getCategories()
      .then(catData => {
        if (isMounted) {
          const hasAll = Array.isArray(catData) && catData.some(c => c.id === 'all');
          setCategories(hasAll ? catData : [{ id: 'all', label: 'All Articles' }, ...(Array.isArray(catData) ? catData : [])]);
        }
      })
      .catch(err => console.warn('Failed to load blog categories:', err));
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await blogService.getPublicBlogs({
          search,
          category: activeCategory,
        });
        if (isMounted) setBlogs(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchBlogs, 200);
    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [search, activeCategory]);

  const featuredArticle = !search && activeCategory === 'all' && blogs.length > 0
    ? blogs[0]
    : null;

  const remainingArticles = featuredArticle
    ? blogs.slice(1)
    : blogs;

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
                <span>YOVEXA PERSPECTIVES</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Insights & <span className="text-[#0284C7]">Ideas</span>
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl font-normal leading-relaxed">
                Practical engineering insights, software architecture breakdowns, and digital development methodologies.
              </p>
            </div>

            {/* Compact Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0284C7] shadow-2xs border border-slate-200 transition-all"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
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

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading Skeleton */}
          {loading ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-96 rounded-2xl bg-white border border-slate-200 p-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
                    <div className="h-48 bg-slate-200 rounded-xl" />
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-6 bg-slate-200 rounded w-4/5" />
                    <div className="h-16 bg-slate-200 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : blogs.length === 0 ? (
            /* Designed Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                {search
                  ? `No published articles match "${search}". Try searching for another topic or clear your filter.`
                  : 'New engineering articles will be published shortly. Stay tuned!'}
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
              {/* Featured Lead Editorial Article */}
              {featuredArticle && (
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/50 overflow-hidden hover:border-sky-300 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Featured Image */}
                    <div className="lg:col-span-7 relative bg-slate-950 min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] flex items-center justify-center overflow-hidden group p-2 sm:p-4">
                      {featuredArticle.featuredImage ? (
                        <>
                          <img
                            src={featuredArticle.featuredImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                          />
                          <img
                            src={featuredArticle.featuredImage}
                            alt={featuredArticle.title}
                            className="relative z-10 w-full h-full max-h-[440px] object-contain rounded-xl transition-transform duration-300"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-sky-400">
                          <BookOpen className="w-16 h-16 opacity-30" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0284C7] shadow-xs border border-sky-100">
                          <Sparkles className="w-3 h-3 text-[#0284C7]" />
                          <span>Featured Article</span>
                        </span>
                      </div>
                    </div>

                    {/* Editorial Summary */}
                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                      <div>
                        {/* Metadata Bar */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-medium">
                          <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0284C7] font-bold uppercase tracking-wider text-[11px] border border-sky-100">
                            {featuredArticle.category ? featuredArticle.category.replace(/_/g, ' ') : 'Engineering'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{featuredArticle.readTime || featuredArticle.readingTime || '4 min read'}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <Link to={`/blog/${featuredArticle.slug}`}>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display hover:text-[#0284C7] transition-colors leading-tight">
                            {featuredArticle.title}
                          </h2>
                        </Link>

                        {/* Excerpt */}
                        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal line-clamp-4">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      {/* Footer Info & Action */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0B1B3A] text-white flex items-center justify-center font-bold text-xs">
                            {featuredArticle.author ? featuredArticle.author.charAt(0).toUpperCase() : 'Y'}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-tight">
                              {featuredArticle.author || 'Yovexa Solutions'}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {featuredArticle.publishedAt
                                ? new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                : 'Recent'}
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/blog/${featuredArticle.slug}`}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Articles Grid */}
              {remainingArticles.length > 0 && (
                <div>
                  {featuredArticle && (
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-slate-900 font-display">
                        Recent Articles & Engineering Analyses
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {remainingArticles.length} {remainingArticles.length === 1 ? 'Article' : 'Articles'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remainingArticles.map((blog) => (
                      <BlogCard key={blog.id || blog.slug} blog={blog} />
                    ))}
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
