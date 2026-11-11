import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  Lightbulb,
  GraduationCap,
  Users,
  Layers,
  TrendingUp,
  Briefcase,
  Compass,
  CheckCircle2,
  Mail,
  Search,
  Code2,
  Rocket,
  Zap,
  Clock,
  HeartHandshake
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import { COMPANY_INFO } from '../data/company';

// LinkedIn official URL from company configuration
const LINKEDIN_URL = COMPANY_INFO.socials?.find(s => s.platform === 'LinkedIn')?.url || 'https://www.linkedin.com/company/yovexa-solutions';

// 6 Core Pillars for "Why Work With Us"
const WHY_WORK_ITEMS = [
  {
    id: 'innovation',
    icon: Zap,
    title: 'Innovation-Driven Environment',
    desc: 'We challenge conventional paradigms, experiment with modern frontend and backend architectures, and empower every engineer to bring forward-thinking solutions to life.',
    tag: 'Modern Stack'
  },
  {
    id: 'learning',
    icon: GraduationCap,
    title: 'Continuous Learning & Development',
    desc: 'Software engineering moves fast, and we prioritize staying ahead. From architectural deep-dives to technical discussions, we invest in ongoing skill mastery and personal growth.',
    tag: 'Skill Mastery'
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Collaborative Team Culture',
    desc: 'Work alongside supportive, ego-free peers. We practice transparent communication, constructive peer reviews, and cross-functional synergy where every voice is respected.',
    tag: 'Ego-Free'
  },
  {
    id: 'projects',
    icon: Layers,
    title: 'Real-World Technology Projects',
    desc: 'Engage with production-grade web applications, mission-critical REST APIs, and digital platforms that deliver tangible value and solve authentic business challenges.',
    tag: 'Real Impact'
  },
  {
    id: 'growth',
    icon: TrendingUp,
    title: 'Professional Growth Opportunities',
    desc: 'Clear pathways for career progression with direct technical ownership. Take charge of key features, master architecture decisions, and grow into leadership.',
    tag: 'Clear Trajectory'
  },
  {
    id: 'problem-solving',
    icon: Lightbulb,
    title: 'Creative Problem Solving',
    desc: 'We value pragmatic ingenuity over rigid bureaucracy. Tackle complex algorithmic and UX edge cases, and transform ambiguous problems into elegant, maintainable code.',
    tag: 'Craftsmanship'
  }
];

// 5 Core Cultural Values for "Our Work Culture"
const CULTURE_VALUES = [
  {
    id: 'innovation',
    title: 'Innovation',
    subtitle: 'Question the Status Quo',
    icon: Sparkles,
    badge: 'Pillar 01',
    description: 'We believe innovation is not about hype, but about thoughtful problem solving. We continuously evaluate new tools, frameworks, and patterns that make software faster, more resilient, and simpler to maintain.',
    practices: [
      'Proactive refactoring and architectural improvement',
      'Embracing modern web standards & performance optimization',
      'Encouraging technical experimentation and prototyping'
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    subtitle: 'Win Together as One Team',
    icon: HeartHandshake,
    badge: 'Pillar 02',
    description: 'Great software is never built in silos. We foster an environment of psychological safety, open discussions, and collective responsibility where everyone’s contribution elevates the team.',
    practices: [
      'Empathetic and constructive code reviews',
      'Shared architecture design sessions',
      'Transparent communication across all project stages'
    ]
  },
  {
    id: 'creativity',
    title: 'Creativity',
    subtitle: 'Craftsmanship in Every Pixel & Function',
    icon: Code2,
    badge: 'Pillar 03',
    description: 'We treat software engineering and UI design as interconnected crafts. Clean code, intuitive interactions, and elegant aesthetics converge to create digital experiences that truly delight.',
    practices: [
      'Pixel-perfect frontend execution with micro-interactions',
      'Clean, readable code with predictable state handling',
      'User-centric perspective in every technical decision'
    ]
  },
  {
    id: 'learning',
    title: 'Learning',
    subtitle: 'Curiosity as Our Daily Fuel',
    icon: Compass,
    badge: 'Pillar 04',
    description: 'We approach every challenge with intellectual humility and a hunger to understand. Failure is treated as a learning data point, and continuous curiosity is celebrated.',
    practices: [
      'Knowledge sharing sessions and architectural tear-downs',
      'Dedicated time for exploring new libraries & tooling',
      'Mentorship and mutual knowledge elevation'
    ]
  },
  {
    id: 'growth',
    title: 'Growth',
    subtitle: 'Empowering Your Personal Trajectory',
    icon: TrendingUp,
    badge: 'Pillar 05',
    description: 'We design our workflows to help you expand your technical scope, take on architectural ownership, and steadily advance your career trajectory with confidence.',
    practices: [
      'Ownership of complete features from design to deployment',
      'Direct exposure to production infrastructure and delivery',
      'Clear milestones for technical and professional advancement'
    ]
  }
];

// Future talent areas (informational only - explicitly marked not currently open)
const FUTURE_DISCIPLINES = [
  {
    role: 'Frontend Engineering',
    stack: 'React.js, Tailwind CSS, Vite, Modern JavaScript / TypeScript',
    description: 'Crafting responsive, accessible, high-performance web interfaces with fluid micro-interactions.'
  },
  {
    role: 'Backend Engineering',
    stack: 'Spring Boot, Java, RESTful APIs, PostgreSQL / MySQL',
    description: 'Architecting secure, scalable microservices, robust authentication, and relational database systems.'
  },
  {
    role: 'UI/UX & Product Design',
    stack: 'Figma, Modern Design Systems, Wireframing & Prototyping',
    description: 'Designing intuitive user journeys, design systems, and digital product interfaces.'
  },
  {
    role: 'Full-Stack Architecture',
    stack: 'React + Spring Boot, Cloud Infrastructure, Docker',
    description: 'Bridging frontend elegance with resilient backend services and production deployment pipelines.'
  }
];

export default function CareersPage() {
  const [activeCultureTab, setActiveCultureTab] = useState('innovation');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToOpenings = (e) => {
    e.preventDefault();
    const element = document.getElementById('openings');
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
    }
  };

  const scrollToCulture = (e) => {
    e.preventDefault();
    const element = document.getElementById('culture');
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
    }
  };

  const careersSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Careers at Yovexa Solutions',
    'url': 'https://www.yovexasolutions.in/careers',
    'description': 'Join Yovexa Solutions. Learn about our engineering-driven culture, values, continuous learning environment, and future career opportunities.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Yovexa Solutions',
      'url': 'https://www.yovexasolutions.in'
    }
  };

  const activeCulture = CULTURE_VALUES.find(c => c.id === activeCultureTab) || CULTURE_VALUES[0];
  const ActiveIcon = activeCulture.icon;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Careers — Build Your Future With Us | Yovexa Solutions"
        description="Join Yovexa Solutions. Explore our engineering culture, core values, continuous learning, and future career opportunities in software development."
        canonical="/careers"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Careers', item: '/careers' }
        ]}
        schema={careersSchema}
      />

      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-24">
        {/* =========================================================================
            SECTION A: HERO SECTION
        ========================================================================== */}
        <section className="relative overflow-hidden bg-white border-b border-[#E5E7EB] pt-16 pb-20 sm:pt-20 sm:pb-28">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl" />
            <div className="absolute inset-0 tech-grid-bg opacity-40" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563EB] text-xs font-bold tracking-wide uppercase mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Careers at Yovexa Solutions</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.12] font-display">
                Build Your Future With{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#1D4ED8]">
                  Yovexa.
                </span>
              </h1>

              {/* Hero Description */}
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed font-normal">
                Join a team of passionate innovators, developers, and creative thinkers building meaningful digital experiences. At Yovexa Solutions, we believe in innovation, collaboration, continuous learning, and creating technology that makes a difference.
              </p>

              {/* Hero CTA Buttons */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#openings"
                  onClick={scrollToOpenings}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <span>Explore Opportunities</span>
                  <ArrowDown className="w-4 h-4 text-white" />
                </a>

                <a
                  href="#culture"
                  onClick={scrollToCulture}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-slate-700 hover:text-[#111827] bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Our Work Culture</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </a>
              </div>

              {/* Trust & Craft Highlights Strip */}
              <div className="mt-14 pt-8 border-t border-[#E5E7EB]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
                <div className="p-3 rounded-xl bg-slate-50/70 border border-[#E5E7EB]/80">
                  <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Mindset</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] mt-0.5">Engineering-First</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/70 border border-[#E5E7EB]/80">
                  <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Environment</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] mt-0.5">Ego-Free & Open</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/70 border border-[#E5E7EB]/80">
                  <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Growth</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] mt-0.5">Continuous Learning</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/70 border border-[#E5E7EB]/80">
                  <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Delivery</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] mt-0.5">Real-World Impact</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION B: WHY WORK WITH US
        ========================================================================== */}
        <section className="py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-[#2563EB] text-xs font-bold tracking-wider uppercase mb-3">
                <Rocket className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Why Work With Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
                Built for People Who Care About Craft
              </h2>
              <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                We combine modern engineering practices with an empowering, respectful team culture designed to help passionate individuals thrive and build lasting technical capabilities.
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {WHY_WORK_ITEMS.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group p-7 rounded-2xl bg-white border border-[#E5E7EB] hover:border-blue-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top icon and tag */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                          <ItemIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {item.tag}
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-xl font-bold text-[#111827] font-display tracking-tight group-hover:text-[#2563EB] transition-colors duration-150">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-[#64748B] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom subtle indicator */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                      <span>Learn more about our standards</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION C: OUR WORK CULTURE
        ========================================================================== */}
        <section id="culture" className="py-20 bg-white border-b border-[#E5E7EB] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-[#2563EB] text-xs font-bold tracking-wider uppercase mb-3">
                <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Our Work Culture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
                Core Values That Guide How We Build
              </h2>
              <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                Culture is not a poster on the wall—it is the sum of our everyday decisions, coding standards, and how we treat one another when designing solutions.
              </p>
            </div>

            {/* Interactive Value Tabs & Detail Panel */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs">
              
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-8 border-b border-[#E5E7EB]">
                {CULTURE_VALUES.map((val) => {
                  const ValIcon = val.icon;
                  const isActive = activeCultureTab === val.id;
                  return (
                    <button
                      key={val.id}
                      onClick={() => setActiveCultureTab(val.id)}
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-sm scale-102'
                          : 'bg-white text-slate-700 hover:text-slate-900 border border-[#E5E7EB] hover:bg-slate-100/80'
                      }`}
                    >
                      <ValIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2563EB]'}`} />
                      <span>{val.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Content Card */}
              <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Description (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60">
                    <span>{activeCulture.badge}</span>
                    <span>•</span>
                    <span>{activeCulture.subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display">
                    {activeCulture.title} in Action
                  </h3>

                  <p className="text-base text-[#64748B] leading-relaxed font-normal">
                    {activeCulture.description}
                  </p>

                  <div className="pt-3 space-y-3">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      How we put this into practice:
                    </div>
                    <ul className="space-y-2.5">
                      {activeCulture.practices.map((practice, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-[#111827]">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="font-medium">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Visual Highlight (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-card relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 text-[#2563EB] flex items-center justify-center mb-6">
                      <ActiveIcon className="w-7 h-7" />
                    </div>

                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Philosophy Standard
                    </div>
                    <div className="text-lg font-bold text-[#111827] mt-1 font-display">
                      "{activeCulture.subtitle}"
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      At Yovexa Solutions, every digital asset we engineer embodies this standard. We hold ourselves accountable to exceptional code hygiene and user-centric clarity.
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Standard ID</span>
                      <span className="font-bold text-[#2563EB]">YVX-CUL-{activeCulture.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION D: CURRENT JOB OPENINGS (STRICTLY EMPTY STATE)
        ========================================================================== */}
        <section id="openings" className="py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3">
                <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                <span>Job Openings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
                Current Opportunities
              </h2>
              <p className="mt-4 text-base text-[#64748B] leading-relaxed">
                Discover your next career chapter at Yovexa Solutions. Review our current openings below.
              </p>
            </div>

            {/* Empty State Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-14 text-center shadow-card relative overflow-hidden">
              
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono font-semibold mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Status: Active Openings (0)</span>
              </div>

              {/* Custom Modern Empty-State SVG Illustration */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-8">
                {/* Decorative radar rings */}
                <div className="absolute inset-0 rounded-full border border-blue-200/80 animate-ping opacity-25" />
                <div className="absolute -inset-3 rounded-full border border-blue-100" />
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200/90 flex items-center justify-center shadow-xs">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-[#2563EB]" />
                </div>
              </div>

              {/* Required Exact Heading */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display tracking-tight">
                No Current Openings
              </h3>

              {/* Required Exact Description */}
              <div className="mt-4 space-y-3 max-w-xl mx-auto text-base text-[#64748B] leading-relaxed font-normal">
                <p>
                  We're not actively hiring at the moment, but we're always interested in connecting with talented and passionate individuals.
                </p>
                <p>
                  Keep an eye on this page for future opportunities. We look forward to growing together!
                </p>
              </div>

              {/* Helpful Information Box regarding future recruitment */}
              <div className="mt-10 pt-8 border-t border-slate-100 text-left">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Disciplines We Regularly Build Teams In:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {FUTURE_DISCIPLINES.map((discipline, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50/80 border border-[#E5E7EB] hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#111827]">{discipline.role}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                          Future Role
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[#2563EB] mt-1 truncate">
                        {discipline.stack}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
                        {discipline.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION E: STAY CONNECTED SECTION
        ========================================================================== */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-blue-50/60 to-slate-50/90 border border-blue-200/70 p-8 sm:p-14 text-center shadow-card relative overflow-hidden">
              
              {/* Subtle Corner Accents */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-[#2563EB] text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
                  <Compass className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Network & Community</span>
                </div>

                {/* Required Heading */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
                  Stay Connected With Yovexa
                </h2>

                {/* Required Description */}
                <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed font-normal">
                  Although we don't have any open positions right now, new opportunities may arise in the future. Follow us to stay updated on our latest announcements and career opportunities.
                </p>

                {/* Connect Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  {/* LinkedIn Official CTA Button */}
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                    aria-label="Follow Yovexa Solutions on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                    </svg>
                    <span>Follow on LinkedIn</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>

                  {/* General Email Outreach */}
                  <a
                    href="mailto:support@yovexasolutions.in?subject=Future%20Talent%20Inquiry%20-%20Yovexa%20Solutions"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-slate-700 hover:text-[#111827] bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 shadow-xs transition-all duration-200"
                  >
                    <Mail className="w-4 h-4 text-[#2563EB]" />
                    <span>Send Talent Introduction</span>
                  </a>
                </div>

                {/* Subtext */}
                <p className="mt-6 text-xs text-slate-500">
                  Official updates, project launches, and future role releases are announced on our LinkedIn channel first.
                </p>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
