import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEO from '../components/common/SEO';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedProject = searchParams.get('project') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Yovexa Solutions',
    'url': 'https://www.yovexasolutions.in/contact',
    'description': 'Contact Yovexa Solutions to discuss your custom software development, web applications, or digital engineering project.',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Yovexa Solutions',
      'email': 'support@yovexasolutions.in',
      'url': 'https://www.yovexasolutions.in'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <SEO
        title="Contact Us — Start Your Software Development Project"
        description="Ready to build your digital product? Get in touch with Yovexa Solutions to discuss requirements, architecture approach, estimates, and timelines."
        canonical="/contact"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Contact Us', item: '/contact' }
        ]}
        keywords={[
          'contact software company',
          'hire React developers',
          'hire Spring Boot developers',
          'software development inquiry',
          'Yovexa Solutions contact'
        ]}
        schema={contactSchema}
      />

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        <Contact 
          isStandalone={true}
          preselectedService={preselectedService}
          preselectedProject={preselectedProject}
        />
      </main>

      <Footer />
    </div>
  );
}
