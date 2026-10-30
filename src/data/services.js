export const SERVICES_DATA = [
  {
    id: "website-development",
    slug: "website-development",
    serviceCode: "01",
    displayOrder: 1,
    title: "Website Development",
    shortDescription: "Modern, high-converting, responsive websites tailored to your brand identity, business goals, and lightning-fast load times.",
    description: "We design and engineer bespoke, high-performance websites built with modern frontend stacks (React, Vite, Tailwind CSS) optimized for SEO visibility, sub-second load times, and fluid mobile responsiveness. From authoritative corporate platforms to interactive product landing pages, we build web experiences that establish credibility and drive measurable inquiries.",
    icon: "Globe",
    popularTag: "Most Popular",
    features: [
      "Custom responsive UI/UX architecture matching modern brand aesthetics",
      "High-speed performance (90+ Google Lighthouse score guaranteed)",
      "Technical SEO foundation, OpenGraph tags & structured schema markup",
      "Interactive component engineering & subtle micro-animations",
      "Direct inquiry lead capture integration with instant email dispatch",
      "Cross-browser and multi-screen compliance testing"
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript ES6+", "HTML5 Semantic", "PostCSS"],
    deliverables: [
      "Production-ready, minified frontend bundle",
      "Responsive layouts across mobile, tablet, and widescreen",
      "SEO & social media metadata configuration",
      "Deployment setup on Vercel, Netlify, or cloud CDN"
    ],
    idealFor: "Corporate companies, emerging startups, consulting firms, and modern brands needing a credible, high-converting web presence."
  },
  {
    id: "web-applications",
    slug: "web-applications",
    serviceCode: "02",
    displayOrder: 2,
    title: "Web Applications & SaaS",
    shortDescription: "Scalable full-stack web applications and SaaS platforms engineered with robust Spring Boot backends and reactive React frontends.",
    description: "We architect and deliver scalable web applications and SaaS platforms built for heavy business logic, high traffic, and mission-critical workflows. Featuring secure JWT authentication, role-based access control (RBAC), reactive state management, and real-time updates.",
    icon: "Cpu",
    popularTag: "Enterprise Ready",
    features: [
      "Full-stack architecture using Java Spring Boot & React",
      "Secure JWT authentication, refresh token rotation & RBAC",
      "Interactive data tables, server-side pagination & live search",
      "State management & asynchronous background task processing",
      "Multi-tenant database design and isolation",
      "Automated unit/integration testing suites and CI/CD pipelines"
    ],
    technologies: ["Java 17", "Spring Boot", "React", "MongoDB", "Redis", "Docker", "REST APIs"],
    deliverables: [
      "Full-stack source repository with documented modules",
      "Database schemas, indexes & migration scripts",
      "Docker containerization & docker-compose configurations",
      "Interactive OpenAPI / Swagger documentation"
    ],
    idealFor: "Businesses digitizing core operations, SaaS founders, and companies needing secure multi-user portals."
  },
  {
    id: "rest-apis",
    slug: "rest-apis",
    serviceCode: "03",
    displayOrder: 3,
    title: "REST API Design & Backend Integration",
    shortDescription: "High-throughput, secure RESTful microservices and backend API systems for mobile apps, internal tools, and third-party systems.",
    description: "Engineered with Java Spring Boot and enterprise best practices, our REST APIs ensure strict data contract validation, rate limiting, token-based authentication, low latency Redis caching, and seamless integration with third-party payment gateways and webhooks.",
    icon: "Layers",
    popularTag: "High Throughput",
    features: [
      "Clean RESTful resource design & OpenAPI 3.0 / Swagger documentation",
      "Token-based authentication & IP-based rate limiting protection",
      "Redis caching layer for sub-millisecond response latency",
      "Third-party integrations (Stripe, Razorpay, SendGrid, Twilio)",
      "Structured JSON error handling with RFC 7807 compliance",
      "Optimized database queries with connection pooling"
    ],
    technologies: ["Spring Boot 3", "Spring Security", "Redis", "MongoDB", "Swagger / OpenAPI", "JWT"],
    deliverables: [
      "OpenAPI 3.0 / Swagger interactive API console",
      "Postman test collection with sample payloads",
      "Database connection pooling and cache configurations",
      "Comprehensive developer integration guide"
    ],
    idealFor: "Mobile application backends, payment gateway integrations, and data exchange between legacy systems."
  },
  {
    id: "admin-dashboards",
    slug: "admin-dashboards",
    serviceCode: "04",
    displayOrder: 4,
    title: "Admin Dashboards & Internal CMS",
    shortDescription: "Bespoke administrative portals and content management systems designed to streamline daily business operations.",
    description: "Empower your operations team with tailored internal tools and admin portals. We engineer custom dashboards featuring granular permissions, analytics summaries, bulk actions, rich content management, and real-time audit trails.",
    icon: "ShieldCheck",
    popularTag: "Operational Efficiency",
    features: [
      "Intuitive operational workflows tailored to your business model",
      "Data visualization with charts, key metrics, and trend monitors",
      "Granular permission matrix (Superadmin, Editor, Viewer)",
      "Audit logs, activity records, and revision histories",
      "CSV/Excel data exports and automated report generation",
      "Secure session handling and token rotation"
    ],
    technologies: ["React", "Spring Boot", "Tailwind CSS", "Lucide Icons", "Recharts", "MongoDB"],
    deliverables: [
      "Admin portal source code and component library",
      "Role configuration and permission matrices",
      "Audit logging and operational monitoring setup",
      "User onboarding documentation and runbooks"
    ],
    idealFor: "Operational teams, content moderators, executive stakeholders, and internal management."
  }
];

export default SERVICES_DATA;
