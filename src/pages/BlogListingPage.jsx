import React, { useState, useEffect } from 'react';
import { Sparkles, Search, BookOpen } from 'lucide-react';
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
    document.title = 'Insights, Articles & Engineering Ideas | Yovexa Solutions';
  }, []);

  // Dynamically load categories from backend blog categories API
  useEffect(() => {
    let isMounted = true;
    blogService.getCategories()
      .then(catData => {
        if (isMounted && Array.isArray(catData) && catData.length > 0) {
          setCategories(catData);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-24">
        {/* Blog Hero Header */}
        <section className="bg-white border-b border-slate-200 py-16 sm:py-20 relative tech-grid-bg overflow-hidden mb-12 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>YOVEXA PERSPECTIVES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
              Insights & <span className="text-[#0284C7]">Ideas</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Explore practical engineering insights, software architecture breakdowns, and web development methodologies.
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-lg mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by topic, title, or tag..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white shadow-xs border border-slate-300"
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
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
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Blog Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-xl" />
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5" />
                  <div className="h-16 bg-slate-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-xs max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                {search
                  ? `No published articles match "${search}". Try searching for another topic.`
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
