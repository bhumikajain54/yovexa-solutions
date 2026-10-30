import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { inquiryService } from '../services/inquiryService';
import { COMPANY_INFO } from '../data/company';
import { SERVICES_DATA } from '../data/services';

export default function Contact({ preselectedService, preselectedProject, isStandalone = false }) {
  const budgetOptions = [
    "Under ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000+",
    "Not Sure Yet"
  ];

  const serviceOptions = [
    ...SERVICES_DATA.map(s => s.title),
    "Other / Custom Requirement"
  ];

  const contactInfo = {
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.phone,
    location: COMPANY_INFO.location,
    turnaroundTime: COMPANY_INFO.turnaroundTime || "Within 24 Hours",
    heading: "Have a Project in Mind?",
    description: "Tell us what you're building. Let's discuss your requirements, technical approach, and next steps.",
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: preselectedService || serviceOptions[0] || 'Website Development',
    projectBudget: 'Not Sure Yet',
    message: preselectedProject
      ? `Hi Yovexa Team, I would like to discuss building a project similar in architecture to ${preselectedProject}. Here are our requirements: `
      : '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Synchronize when preselectedService or preselectedProject props change
  const [prevService, setPrevService] = useState(preselectedService);
  if (preselectedService !== prevService) {
    setPrevService(preselectedService);
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preselectedService }));
    }
  }

  const [prevProject, setPrevProject] = useState(preselectedProject);
  if (preselectedProject !== prevProject) {
    setPrevProject(preselectedProject);
    if (preselectedProject) {
      setFormData(prev => ({
        ...prev,
        message: `Hi Yovexa Team, I would like to discuss building a project similar in architecture to ${preselectedProject}. Here are our requirements: `
      }));
    }
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please describe what you are looking to build or improve.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Please provide at least a brief description (15+ characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      await inquiryService.submitInquiry(formData);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceRequired: serviceOptions[0] || 'Website Development',
        projectBudget: 'Not Sure Yet',
        message: '',
      });
    } catch (err) {
      console.error("Submission error:", err);
      setApiError(err.response?.data?.message || err.message || "Failed to submit inquiry. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className={`${
        isStandalone 
          ? 'py-8 sm:py-12' 
          : 'py-24 sm:py-28 border-t border-slate-200 scroll-mt-24'
      } bg-[#F8FAFC] text-slate-900 relative tech-grid-bg overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            {contactInfo.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {contactInfo.description}
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Direct Consultation Expectation & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card">
              <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
                What to Expect
              </h3>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Requirements & Feasibility</strong>
                    <p className="text-slate-600 mt-0.5 text-xs sm:text-sm leading-relaxed">
                      We review your specification and evaluate architecture, data model, and API considerations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Direct Engineering Consultation</strong>
                    <p className="text-slate-600 mt-0.5 text-xs sm:text-sm leading-relaxed">
                      Speak directly with our senior developers to clarify technical milestones and dependencies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Transparent Milestone Roadmap</strong>
                    <p className="text-slate-600 mt-0.5 text-xs sm:text-sm leading-relaxed">
                      Clear deliverable schedules with realistic estimates, clean milestones, and continuous communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4 text-xs sm:text-sm">
              {contactInfo.email && (
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-sky-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#0284C7] uppercase font-bold tracking-wider">Direct Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-slate-900 font-semibold hover:text-[#0284C7] transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.turnaroundTime && (
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-sky-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#0284C7] uppercase font-bold tracking-wider">Turnaround Time</div>
                    <div className="text-slate-900 font-semibold">{contactInfo.turnaroundTime}</div>
                  </div>
                </div>
              )}

              {contactInfo.location && (
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 border border-sky-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#0284C7] uppercase font-bold tracking-wider">Location</div>
                    <div className="text-slate-900 font-semibold">{contactInfo.location}</div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Accessible High-Contrast Form (Kept fully dynamic for inquiries) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-white border border-slate-200 shadow-card">

              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">Inquiry Received</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for contacting <strong className="text-slate-900">Yovexa Solutions</strong>. We have received your project details and our engineering team will get back to you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3A] hover:bg-[#183B75] transition-colors shadow-xs cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="fullName">
                        Full Name <span className="text-[#0284C7]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="email">
                        Work Email <span className="text-[#0284C7]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium ${
                          errors.email ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="phone">
                        Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="company">
                        Company / Business <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Innovations"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="serviceRequired">
                        Service of Interest
                      </label>
                      <select
                        id="serviceRequired"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="projectBudget">
                        Estimated Budget
                      </label>
                      <select
                        id="projectBudget"
                        name="projectBudget"
                        value={formData.projectBudget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all font-medium"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1.5" htmlFor="message">
                      Project Requirements & Context <span className="text-[#0284C7]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe what you are looking to build, expected timelines, key features, or reference products..."
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition-all resize-none font-medium ${
                        errors.message ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* API Error Notification */}
                  {apiError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all duration-200 shadow-sm text-sm disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Strict confidentiality · Direct response within 24 hours</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
