import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogContent from '../components/public/BlogContent';
import BlogCard from '../components/public/BlogCard';
import { blogService } from '../services/blogService';
import { useToast } from '../context/ToastContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

        // Update document SEO Title & Meta tags
        document.title = `${article.seoTitle || article.title} | Yovexa Solutions`;

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
      addToast('Article link copied to clipboard!', 'success');
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
              The blog article you are looking for might have been moved or is currently in draft.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3A] text-white text-xs font-bold hover:bg-[#183B75] transition-colors"
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
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-36 pb-24 space-y-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-12 bg-slate-200 rounded w-4/5" />
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        
        {/* Article Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Share</span>
            </button>
          </div>

          {/* Category Pill */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0284C7] border border-sky-200">
              {blog.category || 'Engineering'}
            </span>
          </div>

          {/* Article Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.18]">
            {blog.title}
          </h1>

          {/* Meta Bar */}
          <div className="mt-6 pb-6 border-b border-slate-200 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0B1B3A] text-white flex items-center justify-center font-bold text-xs">
                {blog.author?.charAt(0) || 'Y'}
              </div>
              <span className="font-bold text-slate-900">{blog.author || 'Yovexa Solutions'}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284C7]" />
              <span>{blog.readingTime || '5 min read'}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 max-h-[480px]">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Article Formatted Content */}
          <article className="py-2">
            <BlogContent htmlContent={blog.content} />
          </article>

          {/* Tags */}
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

          {/* In-Article CTA Banner */}
          <div className="mt-14 p-8 rounded-2xl bg-[#061225] text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 tech-grid-dark">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0284C7]/20 text-sky-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Partner With Yovexa</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">Have a project in mind?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Let's discuss how our software engineering team can build your solution.
              </p>
            </div>

            <a
              href="/#contact"
              className="shrink-0 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-sm"
            >
              Discuss Your Project
            </a>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-20 pt-10 border-t border-slate-200">
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
