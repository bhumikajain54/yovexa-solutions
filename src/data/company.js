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
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { platform: "GitHub", url: "https://github.com", icon: "Github" },
    { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { platform: "Email", url: "mailto:support@yovexasolutions.in", icon: "Mail" }
  ],

  navLinks: [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  footerCompany: [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  footerServices: SERVICES_DATA
};

export default COMPANY_INFO;
