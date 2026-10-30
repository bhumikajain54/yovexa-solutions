import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Sparkles,
  Code2,
  Users,
  Globe,
  Smartphone,
  ShoppingCart,
  Briefcase,
  TrendingUp,
  Terminal,
  Activity
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('web');

  const scrollTo = (target) => {
    const id = target?.replace('#', '') || 'contact';
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const title = "Engineering Pragmatic Digital Solutions";
  const titleHighlight = "For Modern Businesses";
  const sectionLabel = "WHO WE ARE";
  const primaryDesc = "Yovexa Solutions is a digital solutions and software development company dedicated to engineering modern, scalable, and practical digital products.";
  const secondaryDesc = "We build websites, enterprise web applications, and custom backend systems that help businesses streamline workflows, connect with their customers, and scale reliably.";
  const focusAreas = [
    "Custom Web Application Development",
    "Modern Responsive Business Websites",
    "REST API Design & Backend Integration",
    "Database Architecture & Optimization",
    "Cloud Deployment & Secure Authentication",
    "Admin Dashboard & CMS Engineering"
  ];

  const servicesData = [
    {
      id: 'web',
      name: 'Website Development',
      badge: 'Modern & SEO-Ready',
      icon: Globe,
      color: 'sky',
      file: 'WebArchitecture.ts',
      code: [
        'const site = await YovexaSolutions.deployWeb({',
        "  framework: ['React 19', 'Tailwind', 'Vite'],",
        "  speed: '100/100 Core Web Vitals & Sub-second SLA',",
        "  seo: 'Dynamic Meta & Structured Schema'",
        '});'
      ]
    },
    {
      id: 'app',
      name: 'App Development',
      badge: 'Scalable Mobile Apps',
      icon: Smartphone,
      color: 'purple',
      file: 'MobileEngine.ts',
      code: [
        'const app = await YovexaSolutions.buildApp({',
        "  ecosystem: ['iOS', 'Android', 'Cross-Platform'],",
        "  sync: 'Realtime WebSocket + Offline-First Cache',",
        "  security: 'Biometric KeyStore + Hardware AES-256'",
        '});'
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Solutions',
      badge: 'High-Converting Stores',
      icon: ShoppingCart,
      color: 'emerald',
      file: 'CommerceEngine.ts',
      code: [
        'const store = await YovexaSolutions.deployStore({',
        "  engine: ['Custom Checkout', 'Payment Gateway'],",
        "  scale: 'High-Concurrency Multi-Tenant Cart',",
        "  inventory: 'Automated Stock Sync & ERP Integration'",
        '});'
      ]
    },
    {
      id: 'software',
      name: 'Custom Software',
      badge: 'Tailored Enterprise Systems',
      icon: Code2,
      color: 'amber',
      file: 'EnterpriseCore.ts',
      code: [
        'const core = await YovexaSolutions.deployEnterprise({',
        "  stack: ['Java Spring Boot', 'MongoDB', 'Docker Cloud'],",
        "  performance: 'Sub-second Response SLA & Clustering',",
        "  security: 'Zero-Trust JWT + Granular RBAC'",
        '});'
      ]
    }
  ];

  const currentService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  return (
    <section id="about" className="py-24 sm:py-28 bg-white text-slate-900 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{sectionLabel}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display max-w-4xl">
            {title}{' '}
            <span className="text-[#0284C7]">
              {titleHighlight}
            </span>
          </h2>
        </div>

        {/* 2-Column Main Layout: Left Story + Right Technical Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Business Story & Capabilities */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5 text-left">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {primaryDesc}
              </p>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {secondaryDesc}
              </p>
            </div>

            {/* Focus Capabilities Grid */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-3">
                What We Deliver For Our Clients:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {focusAreas.map((area, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-800 font-semibold leading-snug">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#0B1B3A] hover:bg-[#183B75] transition-all shadow-sm transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start A Conversation</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 hover:text-[#0284C7] hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>
          </div>

          {/* Right Column: Custom Digital Architecture Showcase (Balanced to match left column height) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full flex flex-col justify-between rounded-3xl bg-[#06101E] border border-slate-800 shadow-xl p-5 sm:p-6 text-white relative overflow-hidden tech-grid-dark">
              
              {/* Soft Ambient Neon Glows */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Top Navigation & Status Header */}
              <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-sm shadow-sky-500/25">
                    <div className="w-full h-full bg-[#071326] rounded-[7px] flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-sky-400" />
                    </div>
                  </div>
                  <div>
                    <span className="font-extrabold tracking-tight text-white text-sm font-display block leading-none">
                      YOVEXA <span className="text-sky-400 font-mono text-[10px] tracking-wider">ENGINEERING</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Production Architecture
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  <span>Innovation</span>
                  <span className="text-slate-700">·</span>
                  <span>Integrity</span>
                  <span className="text-slate-700">·</span>
                  <span>Impact</span>
                </div>
              </div>

              {/* Service Selection Tabs */}
              <div className="relative z-10 my-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {servicesData.map(service => {
                  const Icon = service.icon;
                  const isActive = activeTab === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-500/20 text-white border border-sky-400/50 shadow-xs'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                      <span className="truncate text-[11px] font-medium">{service.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Architecture Code Terminal */}
              <div className="relative z-10 rounded-xl bg-[#050C18] border border-slate-800 p-3.5 font-mono text-xs text-slate-300 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    <span className="ml-2 text-[10px] text-slate-400">{currentService.file}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <Activity className="w-3 h-3" />
                    Verified SLA
                  </span>
                </div>
                <div className="space-y-1 text-[11px] leading-relaxed">
                  <p className="text-purple-400">{currentService.code[0]}</p>
                  <p className="pl-3.5 text-emerald-300">{currentService.code[1]}</p>
                  <p className="pl-3.5 text-sky-300">{currentService.code[2]}</p>
                  <p className="pl-3.5 text-amber-300">{currentService.code[3]}</p>
                  <p className="text-slate-400">{currentService.code[4]}</p>
                </div>
              </div>

              {/* 4 Core Pillars Quick Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-2.5 my-3">
                {servicesData.map(service => {
                  const Icon = service.icon;
                  const isActive = activeTab === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-slate-900/90 border-sky-500/50'
                          : 'bg-slate-900/50 border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate font-display">
                          {service.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {service.badge}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Metrics Bar */}
              <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-4 sm:gap-5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span><strong className="text-white font-sans text-xs">50+</strong> Projects</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong className="text-white font-sans text-xs">98%</strong> Satisfaction</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span><strong className="text-white font-sans text-xs">5+</strong> Countries</span>
                  </div>
                </div>

                <span className="hidden sm:inline text-sky-300/80 font-serif italic text-xs tracking-wide">
                  Built for Scale
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
