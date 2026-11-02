import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { SERVICES_DATA } from '../data/services';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const displayDescription = COMPANY_INFO.footerDescription || COMPANY_INFO.description;
  const displayEmail = COMPANY_INFO.email;
  const displayLocation = COMPANY_INFO.location;
  const displayCopyright = COMPANY_INFO.copyright;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();

    if (href === '/' || href === '/#hero') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }
    if (href === '/about' || href === '/about/' || href === '/#about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/services' || href === '/services/' || href === '/#services') {
      navigate('/services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/blog' || href === '/blog/') {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/case-studies' || href === '/case-studies/') {
      navigate('/case-studies');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/portfolio' || href === '/portfolio/' || href === '/#portfolio') {
      navigate('/portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '/contact' || href === '/contact/' || href === '/#contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('/#', '').replace('#', '');

    if (location.pathname === '/') {
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/#hero');
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const navHeight = 76;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - navHeight),
          behavior: 'smooth'
        });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  return (
    <footer className="bg-[#081A33] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">

          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/#hero" onClick={(e) => handleNavClick(e, '#hero')} className="inline-block">
              <Logo variant="dark" size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {displayDescription}
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/yovexa-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] transition-all duration-150"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#38BDF8]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {COMPANY_INFO.footerCompany.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#38BDF8]">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {SERVICES_DATA.map((service) => (
                <li key={service.id || service.slug || service.title}>
                  <Link
                    to={`/services/${service.slug || service.id}`}
                    className="hover:text-white transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#38BDF8]">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              {displayEmail && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors truncate">
                    {displayEmail}
                  </a>
                </div>
              )}

              {displayLocation && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <span>{displayLocation}</span>
                </div>
              )}
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 text-[#38BDF8] text-[11px] font-mono font-semibold border border-slate-800">
                  Open for Project Discussions
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>{displayCopyright}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link to="/#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link to="/login" className="hover:text-slate-400 text-slate-600 transition-colors text-[11px]">
              Admin
            </Link>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#0284C7] text-white border border-slate-800 hover:border-[#0284C7] transition-all flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
