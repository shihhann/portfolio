import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Target, Cpu, RefreshCw, Compass, ArrowRight } from 'lucide-react';

export const About = () => {
  const sectionRef = useRef(null);

  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-lemon" />,
      title: "Active Learning",
      description: "Enrolled in the intensive Brototype Python Django React program, transforming complex theory into hands-on muscle memory daily.",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-lemon" />,
      title: "Daily Consistency",
      description: "Dedicated to disciplined daily coding, debugging real exceptions, writing clean commits, and mastering technical fundamentals.",
    },
    {
      icon: <Target className="w-5 h-5 text-lemon" />,
      title: "Problem Solving",
      description: "Focusing on understanding how things work under the hood — from relational schema normalization to REST API endpoints.",
    },
    {
      icon: <Compass className="w-5 h-5 text-lemon" />,
      title: "Growth Direction",
      description: "Committed to growing into a reliable, professional Python backend and full-stack developer who builds scalable applications.",
    },
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(['.about-header', '.about-narrative', '.about-pillar'], { opacity: 1, y: 0 });
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
        '.about-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.about-narrative',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.3'
        )
        .fromTo(
          '.about-pillar',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="about-header flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lemon">
              01 // About Me
            </span>
            <span className="h-px w-8 bg-night-border" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Grounded in fundamentals, driven by deliberate practice.
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Narrative Card */}
          <div className="about-narrative lg:col-span-7 bg-night-surface border border-night-border rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-night-border-light transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lemon/[0.03] rounded-bl-full pointer-events-none" />

            <div className="space-y-5 text-content-secondary leading-relaxed text-sm sm:text-base">
              <p>
                I am <span className="text-white font-medium">Shihan</span>, a passionate student developer currently mastering full-stack software development through the <strong className="text-white font-medium">Brototype Python Django React program</strong>.
              </p>
              
              <p>
                Rather than jumping across endless tech trends, my current priority is building deep competence in core engineering: writing clean object-oriented Python, modeling robust relational databases with PostgreSQL and Django ORM, and architecting RESTful services that connect seamlessly to modern React frontends.
              </p>

              <p>
                My working philosophy is straightforward: <span className="text-lemon font-mono font-medium">Learn → Build → Improve → Grow</span>. Every milestone in my journey is backed by code written from scratch, tests executed, and lessons learned through hands-on troubleshooting.
              </p>
            </div>

            {/* Quote / Focus Box */}
            <div className="mt-8 pt-6 border-t border-night-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-lemon" />
                <span className="font-mono text-xs text-content-primary">
                  Goal: Professional Python Backend / Full-Stack Engineer
                </span>
              </div>
              <a
                href="#journey"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-lemon hover:underline"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((item, index) => (
              <div
                key={index}
                className="about-pillar bg-night-surface/70 border border-night-border rounded-xl p-5 hover:border-lemon/40 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-night border border-night-border group-hover:border-lemon/40 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm mb-1 group-hover:text-lemon transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-content-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
