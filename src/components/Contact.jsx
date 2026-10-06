import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Copy, Check, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';

// =========================================================================
// WHATSAPP CONFIGURATION
// International format without +, spaces, dashes, or brackets (e.g. 917012399172)
// =========================================================================
const WHATSAPP_NUMBER = "917012399172";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);

  const contactInfo = {
    email: "muhdshihan.vk@gmail.com",
    github: "https://github.com/shihhann/",
    linkedin: "https://www.linkedin.com/in/muhdshihan",
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(
          ['.contact-header', '.contact-channel-card', '.contact-form-box'],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.fromTo(
        '.contact-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.contact-channel-card',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.contact-form-box',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        );
    },
    { scope: sectionRef }
  );

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      return "Please enter a message.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOpening) return;

    setErrorMessage(null);
    setStatusNotice(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "YOUR_NUMBER_HERE") {
      setErrorMessage(
        "WhatsApp number is not configured yet. Please update WHATSAPP_NUMBER in Contact.jsx with your international phone number."
      );
      return;
    }

    setIsOpening(true);

    const messageText = `Hi Shihan,

Name: ${formData.name.trim()}
Email: ${formData.email.trim()}

Message:
${formData.message.trim()}

I'm contacting you through your portfolio.`;

    const encodedMessage = encodeURIComponent(messageText);
    let cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Subtle feedback and form reset
    setStatusNotice("Opening WhatsApp... Please review your pre-filled message and tap Send.");
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setIsOpening(false);
    }, 2000);

    setTimeout(() => {
      setStatusNotice(null);
    }, 8000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="contact-header flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lemon">
              05 // Contact
            </span>
            <span className="h-px w-8 bg-night-border" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Let's build something meaningful.
          </h2>
          <p className="mt-4 text-content-secondary text-base max-w-xl leading-relaxed">
            I am always open to discussing Python, Django, React architectures, code reviews, or collaborating on ambitious projects.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Mailto & Copy */}
            <div className="contact-channel-card bg-night-surface border border-night-border rounded-xl p-5 hover:border-lemon/40 transition-colors group">
              <div className="flex items-start justify-between">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 flex-1 focus:outline-none"
                >
                  <div className="p-2.5 rounded-lg bg-night border border-night-border text-lemon group-hover:border-lemon/40 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase">Email</span>
                    <p className="text-sm font-medium text-white group-hover:text-lemon transition-colors break-all">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-1.5 ml-2">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="p-2 rounded-lg bg-night border border-night-border hover:border-lemon/50 text-content-secondary hover:text-lemon transition-colors"
                    title="Send Email"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-night border border-night-border hover:border-lemon/50 text-content-secondary hover:text-white transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-lemon" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card block bg-night-surface border border-night-border rounded-xl p-5 hover:border-lemon/40 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-night border border-night-border text-lemon group-hover:border-lemon/40 transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase">GitHub Profile</span>
                    <p className="text-sm font-medium text-white group-hover:text-lemon transition-colors">
                      github.com/shihhann
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-content-secondary group-hover:text-lemon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card block bg-night-surface border border-night-border rounded-xl p-5 hover:border-lemon/40 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-night border border-night-border text-lemon group-hover:border-lemon/40 transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-content-muted uppercase">LinkedIn</span>
                    <p className="text-sm font-medium text-white group-hover:text-lemon transition-colors">
                      linkedin.com/in/muhdshihan
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-content-secondary group-hover:text-lemon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>

            {/* Availability note */}
            <div className="contact-channel-card p-4 rounded-xl bg-night-surface/40 border border-night-border text-xs font-mono text-content-muted flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-lemon animate-pulse shrink-0" />
              <span>Available for Python, Django, and React full-stack collaborations.</span>
            </div>

          </div>

          {/* Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="contact-form-box bg-night-surface border border-night-border rounded-2xl p-6 sm:p-8">
              <h3 className="font-heading font-semibold text-lg text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-content-secondary mb-6">
                Have a question or opportunity? Feel free to reach out.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-content-secondary mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      disabled={isOpening}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-lg bg-night border border-night-border text-white text-sm focus:outline-none focus:border-lemon transition-colors disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-content-secondary mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      disabled={isOpening}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-night border border-night-border text-white text-sm focus:outline-none focus:border-lemon transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-content-secondary mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    disabled={isOpening}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Hi Shihan, I'd like to talk about..."
                    className="w-full px-4 py-2.5 rounded-lg bg-night border border-night-border text-white text-sm focus:outline-none focus:border-lemon transition-colors resize-none disabled:opacity-60"
                  />
                </div>

                {/* Status Notice */}
                {statusNotice && (
                  <div className="p-3.5 rounded-lg bg-lemon/10 border border-lemon/30 flex items-start gap-2.5 text-xs text-lemon">
                    <Check className="w-4 h-4 text-lemon shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{statusNotice}</span>
                  </div>
                )}

                {/* Error Notification */}
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isOpening}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-lemon text-night font-heading font-bold text-sm hover:bg-lemon-muted transition-colors shadow-lemon-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isOpening ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-night" />
                      <span>Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <span>Send on WhatsApp</span>
                      <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

