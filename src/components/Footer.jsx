import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:muhdshihan.vk@gmail.com',
      icon: <Mail className="w-4 h-4" />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/shihhann/',
      icon: <GithubIcon className="w-4 h-4" />,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhdshihan',
      icon: <LinkedinIcon className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="border-t border-night-border bg-night py-12 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-night-border/60">
          {/* Brand & Identity */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-white">Shihan</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-night-surface border border-night-border text-lemon">
                Software Developer
              </span>
            </div>
            <p className="text-xs font-mono text-content-secondary mt-1">
              Python Django + React Full Stack Development • Brototype Cohort
            </p>
          </div>

          {/* Social / Contact Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.name === 'Email' ? undefined : '_blank'}
                rel={item.name === 'Email' ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-night-surface border border-night-border hover:border-lemon/60 text-xs font-mono text-content-secondary hover:text-lemon hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                aria-label={item.name}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-night-surface border border-night-border hover:border-lemon/60 text-xs font-mono text-content-secondary hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-1 text-lemon" />
          </button>
        </div>

        {/* Bottom Credits & Philosophy */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-content-muted gap-3">
          <div className="flex items-center gap-2 text-content-muted">
            <span>Learn</span>
            <span className="text-lemon select-none">→</span>
            <span>Build</span>
            <span className="text-lemon select-none">→</span>
            <span>Improve</span>
            <span className="text-lemon select-none">→</span>
            <span className="text-white font-medium">Grow</span>
          </div>

          <div>
            © 2026 Shihan. Authentic developer portfolio.
          </div>
        </div>

      </div>
    </footer>
  );
};
