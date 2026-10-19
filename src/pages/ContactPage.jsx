import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us & Start a Project | Yovexa Solutions';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 pt-12">
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
