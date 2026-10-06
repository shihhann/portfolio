import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { skillsData } from '../data/skills';
import { Terminal, Server, Layout, Database, Wrench, CheckCircle } from 'lucide-react';

const categoryIcons = {
  Core: <Terminal className="w-5 h-5 text-lemon" />,
  Backend: <Server className="w-5 h-5 text-lemon" />,
  Frontend: <Layout className="w-5 h-5 text-lemon" />,
  Database: <Database className="w-5 h-5 text-lemon" />,
  Tools: <Wrench className="w-5 h-5 text-lemon" />,
};

export const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(['.skills-header', '.skill-category-card', '.skills-note'], { opacity: 1, y: 0 });
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
        '.skills-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.skill-category-card',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.skills-note',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="skills-header flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lemon">
              02 // Technical Skills
            </span>
            <span className="h-px w-8 bg-night-border" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Technologies & Tools
          </h2>
          <p className="mt-3 text-content-secondary text-sm sm:text-base max-w-xl">
            My active learning and working stack across backend architecture, relational data management, frontend interfaces, and development tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="skill-category-card bg-night-surface border border-night-border rounded-2xl p-6 hover:border-night-border-light hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-night border border-night-border group-hover:border-lemon/40 transition-colors">
                      {categoryIcons[category.category] || <Terminal className="w-5 h-5 text-lemon" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">
                        {category.category}
                      </h3>
                      <span className="text-[11px] font-mono text-content-muted">
                        {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-content-secondary mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-night border border-night-border/90 text-xs font-mono text-content-primary hover:border-lemon/50 hover:text-lemon transition-all duration-150 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-lemon/70" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Status */}
              <div className="mt-6 pt-4 border-t border-night-border/50 flex items-center justify-between text-[11px] font-mono text-content-muted">
                <span>Active Stack</span>
                <span className="text-lemon/80">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Authenticity */}
        <div className="skills-note mt-8 p-4 rounded-xl bg-night-surface/50 border border-night-border/80 flex items-center gap-3 text-xs text-content-muted font-mono">
          <CheckCircle className="w-4 h-4 text-lemon shrink-0" />
          <span>
            Strictly authentic: Every listed technology is actively studied and utilized through hands-on exercises and projects. No inflated percentage meters.
          </span>
        </div>

      </div>
    </section>
  );
};
