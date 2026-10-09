import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { journeyData } from '../data/journey';
import { ArrowRight, ArrowLeft, ArrowDown, Compass } from 'lucide-react';

export const Journey = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(
          ['.journey-header', '.journey-node', '.journey-connector', '.journey-bridge', '.journey-footer'],
          { opacity: 1, y: 0, scale: 1 }
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
        '.journey-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          '.journey-node',
          { opacity: 0, y: 22, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07 },
          '-=0.3'
        )
        .fromTo(
          '.journey-connector',
          { opacity: 0, scaleX: 0.7 },
          { opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.07 },
          '-=0.5'
        )
        .fromTo(
          '.journey-bridge',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          '.journey-footer',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  const renderNode = (node, index) => {
    const isHovered = hoveredIndex === index;
    const isCurrent = node.isCurrent;

    return (
      <div
        key={node.step}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }}
        className={`journey-node spotlight-card relative flex-1 rounded-xl p-5 transition-all duration-300 transform ${
          isCurrent
            ? 'bg-night-surface border-2 border-lemon shadow-lemon-glow relative z-20 hover:-translate-y-1'
            : isHovered
            ? 'bg-night-elevated border-lemon/60 shadow-card-hover -translate-y-1.5 z-10'
            : 'bg-night-surface border border-night-border hover:border-night-border-light'
        }`}
      >
        {/* Subtle inner corner accent */}
        <div
          className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none transition-opacity duration-300 ${
            isCurrent
              ? 'bg-lemon/10 opacity-100'
              : isHovered
              ? 'bg-lemon/8 opacity-100'
              : 'opacity-0'
          }`}
        />

        {/* Top bar: Step number & Status */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded transition-all duration-200 ${
                isCurrent
                  ? 'bg-lemon text-night shadow-lemon-sm'
                  : isHovered
                  ? 'bg-lemon/20 text-lemon border border-lemon/40 shadow-sm'
                  : 'bg-night text-content-muted border border-night-border'
              }`}
            >
              {node.step}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-content-muted">
              {node.category}
            </span>
          </div>

          {/* NOW Badge for React */}
          {isCurrent && (
            <div className="relative flex items-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lemon opacity-30" />
              <span className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lemon text-night font-mono font-black text-[10px] tracking-wider uppercase shadow-lemon-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-night animate-pulse" />
                NOW
              </span>
            </div>
          )}
        </div>

        {/* Technology Title */}
        <h3
          className={`font-heading font-bold text-lg leading-tight transition-colors duration-200 mb-1.5 relative z-10 ${
            isCurrent
              ? 'text-white'
              : isHovered
              ? 'text-lemon'
              : 'text-white'
          }`}
        >
          {node.title}
        </h3>

        {/* Compact supporting label */}
        <p className="text-xs font-mono text-content-secondary relative z-10">
          {node.label}
        </p>

        {/* Pulsing indicator for active stage */}
        {isCurrent && (
          <div className="mt-4 pt-3 border-t border-lemon/20 flex items-center justify-between text-[11px] font-mono text-lemon relative z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lemon animate-pulse" />
              Active Learning Stage
            </span>
            <span className="text-content-muted">Stage 09/09</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="journey" ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle ambient glow behind roadmap */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-lemon/[0.03] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="journey-header flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-lemon">
              03 // Learning Journey
            </span>
            <span className="h-px w-8 bg-night-border" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
            <div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Developer Roadmap & Path
              </h2>
              <p className="mt-3 text-content-secondary text-sm sm:text-base max-w-xl">
                A continuous, milestone-driven journey through full-stack engineering — from core languages to active React mastery.
              </p>
            </div>

            {/* Path legend */}
            <div className="flex items-center gap-4 text-xs font-mono bg-night-surface border border-night-border px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1.5 text-content-secondary">
                <span className="w-2 h-2 rounded-full bg-lemon/50" />
                <span>Snake Flow</span>
              </div>
              <span className="text-night-border">|</span>
              <div className="flex items-center gap-1.5 text-lemon font-medium">
                <span className="w-2 h-2 rounded-full bg-lemon animate-pulse" />
                <span>Current Stage: React</span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP ZIG-ZAG ROADMAP (Hidden on Mobile) */}
        <div className="hidden md:block relative">
          
          {/* Start Marker */}
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-content-muted">
            <span className="w-2 h-2 rounded-full bg-lemon animate-ping" />
            <span className="text-lemon font-bold tracking-widest uppercase">START ROADMAP (01 → 09)</span>
            <span className="h-px w-16 bg-gradient-to-r from-lemon/60 to-transparent" />
          </div>

          {/* ROW 1: LEFT → RIGHT: 01 HTML & CSS → 02 Python Fundamentals → 03 Python Advanced */}
          <div className="flex items-center gap-3 relative">
            {renderNode(journeyData[0], 0)}
            
            {/* Connector 01 -> 02 */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80 group">
              <div className="h-[2px] w-full bg-gradient-to-r from-night-border via-lemon/50 to-night-border relative flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[1], 1)}

            {/* Connector 02 -> 03 */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80">
              <div className="h-[2px] w-full bg-gradient-to-r from-night-border via-lemon/50 to-night-border relative flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[2], 2)}
          </div>

          {/* TURN CONNECTOR 1: Row 1 to Row 2 (Right-side turn directly linking 03 ↓ 04) */}
          <div className="journey-bridge my-3.5 flex items-center gap-3">
            {/* Col 1 spacer */}
            <div className="flex-1" />
            <div className="shrink-0 w-8" />
            {/* Col 2: Transition pill */}
            <div className="flex-1 flex justify-end">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-night-surface border border-night-border text-[11px] font-mono text-content-secondary shadow-sm hover:border-lemon/30 transition-colors">
                <span className="text-content-muted">Stage 03 → 04</span>
                <span className="h-3 w-px bg-night-border" />
                <span className="text-white font-medium">Transitioning to Backend</span>
                <ArrowDown className="w-3.5 h-3.5 text-lemon animate-bounce" />
              </div>
            </div>
            <div className="shrink-0 w-8" />
            {/* Col 3: Vertical track directly beneath Card 03 and above Card 04 */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-[2px] h-10 bg-gradient-to-b from-night-border via-lemon/70 to-night-border relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-night-surface border border-lemon/40 flex items-center justify-center shadow-lemon-sm z-10">
                  <ArrowDown className="w-3.5 h-3.5 text-lemon animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: RIGHT → LEFT: 06 Django ORM ← 05 PostgreSQL ← 04 Django */}
          <div className="flex items-center gap-3 relative">
            {renderNode(journeyData[5], 5)}

            {/* Connector 05 -> 06 (pointing left ←) */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80">
              <div className="h-[2px] w-full bg-gradient-to-l from-night-border via-lemon/50 to-night-border relative flex items-center justify-center">
                <ArrowLeft className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[4], 4)}

            {/* Connector 04 -> 05 (pointing left ←) */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80">
              <div className="h-[2px] w-full bg-gradient-to-l from-night-border via-lemon/50 to-night-border relative flex items-center justify-center">
                <ArrowLeft className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[3], 3)}
          </div>

          {/* TURN CONNECTOR 2: Row 2 to Row 3 (Left-side turn directly linking 06 ↓ 07) */}
          <div className="journey-bridge my-3.5 flex items-center gap-3">
            {/* Col 1: Vertical track directly beneath Card 06 and above Card 07 */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-[2px] h-10 bg-gradient-to-b from-night-border via-lemon/70 to-night-border relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-night-surface border border-lemon/40 flex items-center justify-center shadow-lemon-sm z-10">
                  <ArrowDown className="w-3.5 h-3.5 text-lemon animate-bounce" />
                </div>
              </div>
            </div>
            <div className="shrink-0 w-8" />
            {/* Col 2: Transition pill */}
            <div className="flex-1 flex justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-night-surface border border-night-border text-[11px] font-mono text-content-secondary shadow-sm hover:border-lemon/30 transition-colors">
                <ArrowDown className="w-3.5 h-3.5 text-lemon animate-bounce" />
                <span className="text-white font-medium">Transitioning to API & Frontend</span>
                <span className="h-3 w-px bg-night-border" />
                <span className="text-content-muted">Stage 06 → 07</span>
              </div>
            </div>
            <div className="shrink-0 w-8" />
            {/* Col 3 spacer */}
            <div className="flex-1" />
          </div>

          {/* ROW 3: LEFT → RIGHT: 07 Django REST Framework → 08 JavaScript → 09 React (NOW) */}
          <div className="flex items-center gap-3 relative">
            {renderNode(journeyData[6], 6)}

            {/* Connector 07 -> 08 */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80">
              <div className="h-[2px] w-full bg-gradient-to-r from-night-border via-lemon/50 to-night-border relative flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[7], 7)}

            {/* Connector 08 -> 09 */}
            <div className="journey-connector flex items-center justify-center shrink-0 w-8 text-lemon/80">
              <div className="h-[2px] w-full bg-gradient-to-r from-night-border via-lemon/50 to-lemon relative flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-lemon animate-pulse" />
              </div>
            </div>

            {renderNode(journeyData[8], 8)}
          </div>

        </div>

        {/* MOBILE RESPONSIVE ROADMAP (Visible on Mobile only) */}
        <div className="md:hidden relative space-y-3">
          {/* Start marker mobile */}
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-lemon">
            <span className="w-2 h-2 rounded-full bg-lemon animate-ping" />
            <span className="font-bold uppercase tracking-wider">ROADMAP START (01 → 09)</span>
          </div>

          {journeyData.map((node, index) => {
            const isLast = index === journeyData.length - 1;
            return (
              <React.Fragment key={node.step}>
                {renderNode(node, index)}
                
                {/* Transition label between 03 and 04 */}
                {index === 2 && (
                  <div className="py-1 flex justify-center">
                    <span className="px-3 py-1 rounded-full bg-night-surface border border-night-border text-[10px] font-mono text-content-muted">
                      Transitioning to Backend ↓
                    </span>
                  </div>
                )}

                {/* Transition label between 06 and 07 */}
                {index === 5 && (
                  <div className="py-1 flex justify-center">
                    <span className="px-3 py-1 rounded-full bg-night-surface border border-night-border text-[10px] font-mono text-content-muted">
                      Transitioning to API & Frontend ↓
                    </span>
                  </div>
                )}

                {/* Downward connector between stages on mobile */}
                {!isLast && (
                  <div className="journey-connector flex items-center justify-center py-1">
                    <div className="w-[2px] h-5 bg-gradient-to-b from-lemon/40 to-night-border relative flex items-center justify-center">
                      <ArrowDown className="w-3 h-3 text-lemon/80 -translate-y-0.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer info badge */}
        <div className="journey-footer mt-12 p-4 rounded-xl bg-night-surface/60 border border-night-border hover:border-night-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-content-secondary transition-colors duration-200">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-lemon shrink-0" />
            <span>
              Target: Full-stack integration connecting robust Django REST services to React dynamic frontends.
            </span>
          </div>
          <a
            href="#projects"
            className="group/link text-lemon hover:underline shrink-0 flex items-center gap-1.5 font-medium"
          >
            <span>View Practical Work</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
