import { SERVICES_DATA } from './services';

export const COMPANY_INFO = {
  name: "Yovexa Solutions",
  legalName: "Yovexa Solutions Pvt. Ltd.",
  tagline: "Digital Engineering & Software Solutions",
  description: "Yovexa Solutions is an engineering-driven digital solutions company building robust websites, web applications, and custom software for growing businesses.",
  footerDescription: "Yovexa Solutions is an engineering-driven digital solutions company building robust websites, web applications, and custom software for growing businesses.",
  email: "support@yovexasolutions.in",
  location: "India · Serving Clients Globally",
  address: "India",
  turnaroundTime: "Within 24 Hours",
  copyright: `© ${new Date().getFullYear()} Yovexa Solutions. All rights reserved.`,

  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/yovexa-solutions", icon: "Linkedin" },
    { platform: "Instagram", url: "https://www.instagram.com/yovexaprime", icon: "Instagram" },
    { platform: "Email", url: "mailto:support@yovexasolutions.in", icon: "Mail" }
  ],

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  footerCompany: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  footerServices: SERVICES_DATA
};

export default COMPANY_INFO;
