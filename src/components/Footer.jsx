import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { SERVICES_DATA } from '../data/services';
import Logo from './Logo';

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

            {/* Social Links */}
            {COMPANY_INFO.socials && COMPANY_INFO.socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {COMPANY_INFO.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-[#0284C7] hover:text-[#0284C7] text-slate-600 transition-colors shadow-xs"
                    aria-label={`Visit our ${social.platform} page`}
                  >
                    <span className="text-xs font-semibold">{social.platform}</span>
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
