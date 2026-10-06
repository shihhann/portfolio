import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projectsData } from '../data/projects';
import { ExternalLink, FolderGit2, Clock } from 'lucide-react';
import { GithubIcon } from './Icons';

export const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(['.projects-header', '.project-card', '.projects-footer'], { opacity: 1, y: 0 });
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
        '.projects-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.project-card',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.projects-footer',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="projects-header flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lemon">
              04 // Projects
            </span>
            <span className="h-px w-8 bg-night-border" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Featured Projects & Milestones
          </h2>
          <p className="mt-3 text-content-secondary text-sm sm:text-base max-w-2xl">
            Real implementations from my learning curriculum. No inflated metrics, fake clients, or simulated stats — purely authentic code and architectural practice.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="project-card bg-night-surface border border-night-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-night-border-light hover:scale-[1.01] hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lemon/[0.02] rounded-bl-full pointer-events-none group-hover:bg-lemon/[0.05] transition-colors" />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-night border border-night-border group-hover:border-lemon/40 transition-colors">
                    <FolderGit2 className="w-5 h-5 text-lemon" />
                  </div>
                  {project.status && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-night border border-night-border text-content-secondary group-hover:border-lemon/30 group-hover:text-lemon transition-colors">
                      <Clock className="w-3 h-3 text-lemon" />
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-heading font-bold text-xl text-white group-hover:text-lemon transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-content-secondary text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-night text-xs font-mono text-content-primary border border-night-border/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-night-border/70 flex items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-night border border-night-border hover:border-lemon/60 text-xs font-mono text-content-primary hover:text-lemon transition-colors group/btn"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-night/50 border border-night-border/60 text-xs font-mono text-content-muted">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repo in progress</span>
                  </span>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-lemon text-night font-mono font-medium text-xs hover:bg-lemon-muted transition-colors group/btn"
                  >
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-content-muted">
                    <span>Live link coming soon</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Development Note */}
        <div className="projects-footer rounded-xl bg-night-surface/60 border border-night-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-lemon animate-ping" />
            <span className="text-xs font-mono text-content-secondary">
              Repository links and live deployments are added as soon as each project reaches production readiness.
            </span>
          </div>
          <a
            href="https://github.com/shihhann/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-lemon hover:underline inline-flex items-center gap-1 group/gh"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
