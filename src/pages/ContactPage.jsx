import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedProject = searchParams.get('project') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Have a Project in Mind? | Contact Yovexa Solutions';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
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
