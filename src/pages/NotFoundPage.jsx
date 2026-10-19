import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Layers, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found (404) | Yovexa Solutions';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-28 sm:py-36">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sky-100 text-[#0284C7] font-black text-3xl shadow-xs border border-sky-200">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
              Page Not Found
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              The page you requested could not be found or has been moved to a new destination.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Projects</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
