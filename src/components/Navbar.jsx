import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Sparkles, MessageSquare, Layers, Globe, Cpu, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import Logo from './Logo';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scrollspy active section on homepage
      if (location.pathname === '/') {
        if (window.scrollY < 120) {
          setActiveSection('hero');
          return;
        }

        const sections = ['hero', 'about', 'services', 'process', 'portfolio', 'why-us', 'contact'];
        const scrollPosition = window.scrollY + 140;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else if (location.pathname.startsWith('/services')) {
        setActiveSection('services');
      } else if (location.pathname.startsWith('/portfolio') || location.pathname.startsWith('/projects')) {
        setActiveSection('portfolio');
      } else if (location.pathname.startsWith('/case-studies')) {
        setActiveSection('case-studies');
      } else if (location.pathname.startsWith('/blog')) {
        setActiveSection('blog');
      } else if (location.pathname.startsWith('/about')) {
        setActiveSection('about');
      } else if (location.pathname.startsWith('/contact')) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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

  // Handle URL hash on initial load or route transition
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const navHeight = 76;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - navHeight),
            behavior: 'smooth'
          });
          setActiveSection(targetId);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    // Direct standalone routes
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
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/#hero');
        setActiveSection('hero');
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
        setActiveSection(targetId);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200/90 shadow-sm'
          : 'bg-white/85 backdrop-blur-sm py-4 border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg p-0.5"
            aria-label="Yovexa Solutions Home"
          >
            <Logo variant="light" size="default" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/80">
            {COMPANY_INFO.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '').replace('/#', '').replace(/^\//, '');
              const isActive = activeSection === sectionId;

              // Services with quick dropdown
              if (link.label === 'Services') {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        isActive || servicesDropdownOpen
                          ? 'bg-[#0B1B3A] text-white shadow-xs'
                          : 'text-slate-700 hover:text-[#0B1B3A] hover:bg-white/70'
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {servicesDropdownOpen && (
                      <div
                        onMouseLeave={() => setServicesDropdownOpen(false)}
                        className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-mono font-bold uppercase text-slate-400">
                          Core Capabilities
                        </div>
                        <div className="space-y-1 pt-1">
                          <a
                            href="/#services"
                            onClick={(e) => handleNavClick(e, '#services')}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Website Development</div>
                              <div className="text-[11px] text-slate-500">Business & brand platforms</div>
                            </div>
                          </a>

                          <a
                            href="/#services"
                            onClick={(e) => handleNavClick(e, '#services')}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                              <Cpu className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">Web Applications</div>
                              <div className="text-[11px] text-slate-500">React + Spring Boot systems</div>
                            </div>
                          </a>

                          <a
                            href="/#services"
                            onClick={(e) => handleNavClick(e, '#services')}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
                          >
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">REST APIs & Integrations</div>
                              <div className="text-[11px] text-slate-500">Scalable data exchange</div>
                            </div>
                          </a>

                          <Link
                            to="/services"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-center justify-between p-2 mt-1 rounded-xl bg-slate-50 text-[#0284C7] hover:bg-sky-50 text-xs font-bold transition-colors"
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0B1B3A] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#0B1B3A] hover:bg-white/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-xs transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] text-slate-900 bg-slate-100/90 border-slate-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#0284C7]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-5 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            {COMPANY_INFO.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '').replace('/#', '').replace(/^\//, '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0B1B3A] text-white'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200">
              <button
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#0284C7] hover:bg-[#0369A1] transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Discuss Your Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
