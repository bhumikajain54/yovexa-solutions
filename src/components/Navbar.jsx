import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Layers, Globe, Cpu, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and dropdown on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }

  const isLinkActive = (href) => {
    const path = location.pathname;
    if (href === '/') return path === '/';
    if (href === '/services') return path.startsWith('/services');
    if (href === '/portfolio') return path.startsWith('/portfolio') || path.startsWith('/projects');
    if (href === '/case-studies') return path.startsWith('/case-studies');
    if (href === '/careers') return path.startsWith('/careers');
    if (href === '/blog') return path.startsWith('/blog');
    if (href === '/about') return path.startsWith('/about');
    if (href === '/contact') return path.startsWith('/contact');
    return path === href;
  };

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-2.5 border-b border-slate-200/90 shadow-xs'
          : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg"
            aria-label="Yovexa Solutions Home"
          >
            <Logo variant="light" size="lg" showText={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-xs">
            {COMPANY_INFO.navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              // Services with interactive dropdown
              if (link.label === 'Services') {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isActive || servicesDropdownOpen
                          ? 'bg-[#0B1B3A] text-white shadow-xs'
                          : 'text-slate-700 hover:text-[#0B1B3A] hover:bg-white/80'
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {servicesDropdownOpen && (
                      <div
                        onMouseLeave={() => setServicesDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 p-2.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Capabilities
                        </div>
                        <div className="space-y-1 pt-1.5">
                          <Link
                            to="/services/website-development"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                                Website Development
                              </div>
                              <div className="text-[11px] text-slate-500">Fast, SEO-engineered platforms</div>
                            </div>
                          </Link>

                          <Link
                            to="/services/web-applications"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                              <Cpu className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                                Web Applications & SaaS
                              </div>
                              <div className="text-[11px] text-slate-500">React + Spring Boot architecture</div>
                            </div>
                          </Link>

                          <Link
                            to="/services/rest-apis"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                                REST APIs & Integrations
                              </div>
                              <div className="text-[11px] text-slate-500">High-throughput microservices</div>
                            </div>
                          </Link>

                          <Link
                            to="/services/admin-dashboards"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                                Admin Dashboards & CMS
                              </div>
                              <div className="text-[11px] text-slate-500">Internal tooling & data management</div>
                            </div>
                          </Link>

                          <Link
                            to="/services"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-center justify-between p-2.5 mt-1 rounded-xl bg-sky-50/70 text-[#0284C7] hover:bg-sky-100/70 text-xs font-bold transition-colors"
                          >
                            <span>Explore All Services</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0B1B3A] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#0B1B3A] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-xs hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] text-slate-900 bg-slate-100 border-slate-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#0284C7]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl px-5 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            {COMPANY_INFO.navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1B3A] text-white'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0284C7]" />}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleNavigate('/contact')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-sm cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
