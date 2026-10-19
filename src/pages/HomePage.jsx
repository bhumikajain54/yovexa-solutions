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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
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
