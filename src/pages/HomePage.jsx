import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import WhyYovexa from '../components/WhyYovexa';
import Portfolio from '../components/Portfolio';
import LatestBlogs from '../components/LatestBlogs';
import ProjectModal from '../components/ProjectModal';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [preselectedService, setPreselectedService] = useState('');
  const [preselectedProject, setPreselectedProject] = useState('');

  const handleSelectService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscussProject = (projectTitle) => {
    setPreselectedProject(projectTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Yovexa Solutions',
    'url': 'https://www.yovexasolutions.in',
    'image': 'https://www.yovexasolutions.in/og-image.png',
    'description': 'We design and develop modern websites, web applications, and custom software that help businesses streamline operations and scale.',
    'telephone': '+91-9999999999',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'IN'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Software Engineering Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Website Development'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Web Applications & SaaS Development'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'REST API Design & Backend Integration'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Admin Dashboards & Internal CMS'
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      <SEO
        title="Custom Software Development & Web Applications Company"
        description="Yovexa Solutions builds modern web applications, mobile apps, custom software, and digital platforms with React, Spring Boot, and cloud architecture."
        canonical="/"
        keywords={[
          'custom software development',
          'web application development',
          'software engineering company',
          'React development India',
          'Spring Boot developers',
          'REST API design',
          'enterprise CMS development',
          'Yovexa Solutions'
        ]}
        schema={homeSchema}
      />

      {/* Sticky Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <About />
        <Services onSelectService={handleSelectService} />
        <Process />
        <WhyYovexa />
        <Portfolio onSelectProject={setSelectedProject} />
        <LatestBlogs />
        <Contact 
          preselectedService={preselectedService} 
          preselectedProject={preselectedProject} 
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep Project Detail Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDiscussProject={handleDiscussProject}
        />
      )}
    </div>
  );
}
