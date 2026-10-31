import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Sparkles, ChevronRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogContent from '../components/public/BlogContent';
import BlogCard from '../components/public/BlogCard';
import { blogService } from '../services/blogService';
import { imageKitService } from '../services/imageKitService';
import { useToast } from '../context/ToastContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    const fetchArticle = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const article = await blogService.getBlogBySlug(slug);
        if (!isMounted) return;

        setBlog(article);

        // Update document SEO Title
        document.title = `${article.seoTitle || article.title} | Yovexa Insights`;

        // Fetch related articles
        const allPublished = await blogService.getPublicBlogs();
        const related = allPublished
          .filter((b) => b.id !== article.id && b.slug !== article.slug)
          .slice(0, 2);
        if (isMounted) setRelatedBlogs(related);
      } catch (err) {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
      document.title = 'Yovexa Solutions | Digital Solutions & Software Development';
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      addToast('Article link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-32 px-4 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900 font-display">404</h1>
            <h2 className="text-xl font-bold text-slate-900">Article Not Found</h2>
            <p className="text-sm text-slate-600">
              The article you are looking for might have been moved or is currently in draft.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-36 pb-24 space-y-6 animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-10 bg-slate-200 rounded w-4/5" />
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-96 bg-slate-200 rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = blog.publishedAt || blog.createdAt
    ? new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Published';

  const readTime = blog.readTime || blog.readingTime || '4 min read';
  const categoryLabel = blog.category ? blog.category.replace(/_/g, ' ') : 'Engineering';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        
        {/* Article Reading Column (680–760px optimized measure) */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8 overflow-x-auto no-scrollbar">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/blog" className="hover:text-slate-900 transition-colors">Insights</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{blog.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category Pill */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
                {categoryLabel}
              </span>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                title="Share article"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.16]">
              {blog.title}
            </h1>

            {/* Excerpt as Lead In */}
            {blog.excerpt && (
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {blog.excerpt}
              </p>
            )}

            {/* Author & Publication Metadata */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B1B3A] text-white flex items-center justify-center font-bold text-xs">
                  {blog.author ? blog.author.charAt(0).toUpperCase() : 'Y'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    {blog.author || 'Yovexa Engineering Team'}
                  </div>
                  <div className="text-[11px] text-slate-500">Technical Perspectives</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formattedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{readTime}</span>
                </span>
              </div>
            </div>
          </header>

          {/* Featured Large Article Image */}
          {blog.featuredImage && (
            <div className="my-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-950 relative flex items-center justify-center p-2 sm:p-4">
              <img
                src={imageKitService.getLqipUrl(blog.featuredImage)}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
              />
              <img
                src={imageKitService.getDetailUrl(blog.featuredImage, 1400)}
                alt={blog.title}
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full h-auto max-h-[560px] object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Sanitized Rich Content */}
          <article className="py-4">
            <BlogContent htmlContent={blog.content} />
          </article>

          {/* Tags Chips */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-900 mr-2">Tags:</span>
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Sign-off Card */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0284C7] text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs">
              Y
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Published by Yovexa Solutions
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
                Yovexa Solutions designs and builds modern web applications, mobile platforms, and custom software systems for startups and scaling businesses.
              </p>
              <div className="mt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
                >
                  <span>Discuss an engineering project with our team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* In-Article Conversion Prompt */}
          <div className="mt-10 p-8 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0284C7]/20 text-sky-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Engineering</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Have a project or challenge in mind?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Let's discuss requirements, architecture approach, and timelines with our senior engineers.
              </p>
            </div>

            <Link
              to="/contact"
              className="shrink-0 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm relative z-10"
            >
              Discuss Your Project
            </Link>
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 font-display mb-8">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedBlogs.map((item) => (
                  <BlogCard key={item.id || item.slug} blog={item} />
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
