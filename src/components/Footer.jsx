import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { SERVICES_DATA } from '../data/services';
import Logo from './Logo';

function renderSocialIcon(platform) {
  const p = platform?.toLowerCase();
  if (p === 'linkedin') {
    return (
      <svg className="w-4 h-4 fill-current text-[#0A66C2] group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
      </svg>
    );
  }
  if (p === 'instagram') {
    return (
      <svg className="w-4 h-4 text-[#E4405F] group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  return <Mail className="w-4 h-4 text-[#0284C7] group-hover:scale-110 transition-transform shrink-0" aria-hidden="true" />;
}

export default function Footer() {
  const displayDescription = COMPANY_INFO.footerDescription || COMPANY_INFO.description;
  const displayEmail = COMPANY_INFO.email;
  const displayLocation = COMPANY_INFO.location;
  const displayCopyright = COMPANY_INFO.copyright;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">

          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg"
              aria-label="Yovexa Solutions Home"
            >
              <Logo variant="light" size="lg" showText={false} />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
              {displayDescription}
            </p>

            {/* Social Links (Icon Only) */}
            {COMPANY_INFO.socials && COMPANY_INFO.socials.length > 0 && (
              <div className="flex items-center gap-2.5 pt-2">
                {COMPANY_INFO.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-[#0284C7] hover:bg-sky-50/50 flex items-center justify-center text-slate-700 transition-all shadow-xs group"
                    aria-label={`Visit our ${social.platform} page`}
                    title={social.platform}
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#0B1B3A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {COMPANY_INFO.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-slate-600 hover:text-[#0284C7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#0B1B3A]">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id || service.slug || service.title}>
                  <Link
                    to={`/services/${service.slug || service.id}`}
                    onClick={scrollToTop}
                    className="text-slate-600 hover:text-[#0284C7] transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#0B1B3A]">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {displayEmail && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <a href={`mailto:${displayEmail}`} className="hover:text-[#0284C7] transition-colors truncate">
                    {displayEmail}
                  </a>
                </div>
              )}

              {displayLocation && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>{displayLocation}</span>
                </div>
              )}

              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] text-[11px] font-mono font-semibold border border-sky-200">
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
            <Link to="/about" onClick={scrollToTop} className="hover:text-[#0284C7] transition-colors">
              About
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="hover:text-[#0284C7] transition-colors">
              Contact
            </Link>
            <Link to="/login" className="hover:text-slate-700 text-slate-400 transition-colors text-[11px]">
              Admin
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="text-[11px] font-bold">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
