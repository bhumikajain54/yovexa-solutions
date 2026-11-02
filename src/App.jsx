import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Public Pages (Eagerly loaded for fast crawlability & zero LCP delay)
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CaseStudyListingPage from './pages/CaseStudyListingPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Guard
import ProtectedRoute from './components/common/ProtectedRoute';

// Admin Pages (Lazy loaded for massive bundle reduction for public visitors & search crawlers)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminBlogsPage = lazy(() => import('./pages/admin/AdminBlogsPage'));
const AdminCreateBlogPage = lazy(() => import('./pages/admin/AdminCreateBlogPage'));
const AdminEditBlogPage = lazy(() => import('./pages/admin/AdminEditBlogPage'));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'));
const AdminCreateProjectPage = lazy(() => import('./pages/admin/AdminCreateProjectPage'));
const AdminEditProjectPage = lazy(() => import('./pages/admin/AdminEditProjectPage'));
const AdminCaseStudiesPage = lazy(() => import('./pages/admin/AdminCaseStudiesPage'));
const AdminCreateCaseStudyPage = lazy(() => import('./pages/admin/AdminCreateCaseStudyPage'));
const AdminEditCaseStudyPage = lazy(() => import('./pages/admin/AdminEditCaseStudyPage'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage'));

function AdminLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#081A33] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-slate-300">Loading Portal...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/case-studies" element={<CaseStudyListingPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Admin Routes (Code-split with Suspense) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminLoadingFallback />}>
                    <AdminLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              
              {/* Projects Management */}
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="projects/create" element={<AdminCreateProjectPage />} />
              <Route path="projects/new" element={<AdminCreateProjectPage />} />
              <Route path="projects/edit/:id" element={<AdminEditProjectPage />} />
              <Route path="projects/:id/edit" element={<AdminEditProjectPage />} />

              {/* Case Studies Management */}
              <Route path="case-studies" element={<AdminCaseStudiesPage />} />
              <Route path="case-studies/create" element={<AdminCreateCaseStudyPage />} />
              <Route path="case-studies/new" element={<AdminCreateCaseStudyPage />} />
              <Route path="case-studies/edit/:id" element={<AdminEditCaseStudyPage />} />
              <Route path="case-studies/:id/edit" element={<AdminEditCaseStudyPage />} />

              {/* Blog Management */}
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="blogs/create" element={<AdminCreateBlogPage />} />
              <Route path="blogs/edit/:id" element={<AdminEditBlogPage />} />

              {/* Contact Inquiries */}
              <Route path="inquiries" element={<AdminInquiriesPage />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
