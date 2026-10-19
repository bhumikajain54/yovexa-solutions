import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { siteSettingsService } from '../services/siteSettingsService';
import { servicesService } from '../services/servicesService';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    siteSettingsService.getSettings().then(data => {
      if (isMounted) setSettings(data);
    });
    servicesService.getServices({ activeOnly: true })
      .then(data => {
        if (isMounted && Array.isArray(data)) setServices(data);
      })
      .catch(err => console.warn('Failed to load footer services:', err));
    return () => { isMounted = false; };
  }, []);

  const displayDescription = settings?.footerDescription || settings?.description || 'Yovexa Solutions is an engineering-driven digital solutions company building robust websites, web applications, and custom software for growing businesses.';
  const displayEmail = settings?.email || 'support@yovexasolutions.in';
  const displayPhone = settings?.phone || '7828255442';
  const displayLocation = settings?.location || 'India · Serving Clients Globally';
  const displayCopyright = settings?.copyrightText || settings?.copyright || '';
  const displaySocials = settings?.socials || [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();

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
    if (href === '/portfolio' || href === '/portfolio/') {
      navigate('/portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('/#', '').replace('#', '');

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const getSocialSvg = (name) => {
    switch (name?.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
    }
  };

  return (
    <footer className="bg-[#061225] text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Background Soft Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

          {/* Col 1: Identity & Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="inline-block focus:outline-none focus:ring-2 focus:ring-[#0284C7] rounded-lg p-0.5"
            >
              <Logo variant="dark" size="default" />
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              {displayDescription}
            </p>

            {/* Social Links */}
            {displaySocials.length > 0 && (
              <div className="pt-2 flex items-center gap-2.5">
                {displaySocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] transition-all duration-150"
                    aria-label={`Yovexa on ${social.name}`}
                  >
                    {getSocialSvg(social.name)}
                  </a>
                ))}
              </div>
            )}
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
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id || service.slug || service.title}>
                    <Link
                      to={`/services/${service.slug || service.id}`}
                      className="hover:text-white transition-colors line-clamp-1"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="/#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white">Website Development</a></li>
                  <li><a href="/#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white">Web Applications</a></li>
                  <li><a href="/#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white">REST API Integration</a></li>
                  <li><a href="/#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white">Admin Dashboards</a></li>
                </>
              )}
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
              {displayPhone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <a href={`tel:${displayPhone}`} className="hover:text-white transition-colors">
                    +91 {displayPhone}
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
            {displayCopyright ? (
              <span>{displayCopyright}</span>
            ) : (
              <span>
                &copy; {new Date().getFullYear()} <strong className="text-slate-300">Yovexa Solutions</strong>. All rights reserved.
              </span>
            )}
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
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#0284C7] text-white border border-slate-800 hover:border-[#0284C7] transition-all flex items-center gap-1"
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
