import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Terminal, ChevronRight } from 'lucide-react';

// Structured tokens for views.py (Django REST Framework)
const djangoCodeLines = [
  [
    { text: "# Django REST Framework view", className: "text-content-muted" }
  ],
  [
    { text: "from ", className: "text-[#F43F5E]" },
    { text: "rest_framework.views ", className: "text-content-primary" },
    { text: "import ", className: "text-[#F43F5E]" },
    { text: "APIView", className: "text-content-primary" }
  ],
  [
    { text: "from ", className: "text-[#F43F5E]" },
    { text: "rest_framework.response ", className: "text-content-primary" },
    { text: "import ", className: "text-[#F43F5E]" },
    { text: "Response", className: "text-content-primary" }
  ],
  [
    { text: "class ", className: "text-[#3B82F6]" },
    { text: "DevProfileView", className: "text-lemon font-semibold" },
    { text: "(APIView):", className: "text-content-primary" }
  ],
  [
    { text: "    def ", className: "text-[#F43F5E]" },
    { text: "get", className: "text-[#60A5FA]" },
    { text: "(self, request):", className: "text-content-primary" }
  ],
  [
    { text: "        data = {", className: "text-content-primary" }
  ],
  [
    { text: '            "name"', className: "text-[#A78BFA]" },
    { text: ": ", className: "text-content-primary" },
    { text: '"Shihan"', className: "text-[#34D399]" },
    { text: ",", className: "text-content-primary" }
  ],
  [
    { text: '            "focus"', className: "text-[#A78BFA]" },
    { text: ": [", className: "text-content-primary" },
    { text: '"Django"', className: "text-[#34D399]" },
    { text: ", ", className: "text-content-primary" },
    { text: '"React"', className: "text-[#34D399]" },
    { text: "],", className: "text-content-primary" }
  ],
  [
    { text: "        }", className: "text-content-primary" }
  ],
  [
    { text: "        return ", className: "text-[#F43F5E]" },
    { text: "Response(data)", className: "text-content-primary" }
  ]
];

// Structured tokens for Portfolio.jsx (React)
const reactCodeLines = [
  [
    { text: "// React Functional Component", className: "text-content-muted" }
  ],
  [
    { text: "import ", className: "text-[#F43F5E]" },
    { text: "React, { useState } ", className: "text-content-primary" },
    { text: "from ", className: "text-[#F43F5E]" },
    { text: "'react'", className: "text-[#34D399]" },
    { text: ";", className: "text-content-primary" }
  ],
  [
    { text: "export const ", className: "text-[#F43F5E]" },
    { text: "DevJourney ", className: "text-lemon font-semibold" },
    { text: "= () => {", className: "text-content-primary" }
  ],
  [
    { text: "  const ", className: "text-[#3B82F6]" },
    { text: "[stage] = useState(", className: "text-content-primary" },
    { text: "'Active Learning'", className: "text-[#34D399]" },
    { text: ");", className: "text-content-primary" }
  ],
  [
    { text: "  return (", className: "text-content-primary" }
  ],
  [
    { text: '    <div className="tech-journey">', className: "text-content-primary" }
  ],
  [
    { text: "      <h3>Building with Python & React</h3>", className: "text-content-primary" }
  ],
  [
    { text: "      <Badge highlight>{stage}</Badge>", className: "text-content-primary" }
  ],
  [
    { text: "    </div>", className: "text-content-primary" }
  ],
  [
    { text: "  );", className: "text-content-primary" }
  ],
  [
    { text: "};", className: "text-content-primary" }
  ]
];

const getLinesTotalChars = (lines) =>
  lines.reduce((acc, line) => acc + line.reduce((lAcc, tok) => lAcc + tok.text.length, 0), 0);

const getLineBreakIndices = (lines) => {
  const breaks = [];
  let count = 0;
  for (const line of lines) {
    count += line.reduce((acc, t) => acc + t.text.length, 0);
    breaks.push(count);
  }
  return breaks;
};

const djangoTotal = getLinesTotalChars(djangoCodeLines);
const reactTotal = getLinesTotalChars(reactCodeLines);
const djangoBreaks = getLineBreakIndices(djangoCodeLines);
const reactBreaks = getLineBreakIndices(reactCodeLines);

export const Hero = () => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [activeTab, setActiveTab] = useState(prefersReduced ? 'react' : 'django');
  const [visibleChars, setVisibleChars] = useState(prefersReduced ? reactTotal : 0);
  const [isAnimationDone, setIsAnimationDone] = useState(prefersReduced);
  const heroRef = useRef(null);
  const windowRef = useRef(null);

  // GSAP Hero Entrance with useGSAP scoping
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(
          ['.hero-badge', '.hero-heading', '.hero-subtext', '.hero-ctas', '.hero-philosophy', '.hero-window'],
          { opacity: 1, y: 0, x: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '.hero-heading',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        )
        .fromTo(
          '.hero-ctas .hero-btn',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.35'
        )
        .fromTo(
          '.hero-window',
          { opacity: 0, x: 26 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.55'
        )
        .fromTo(
          '.hero-philosophy',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.3'
        );
    },
    { scope: heroRef }
  );

  // Single-run progressive typing sequence: views.py -> pause -> Portfolio.jsx -> STOP
  useEffect(() => {
    if (prefersReduced) return;

    let isCancelled = false;
    let timerId = null;

    let currentFile = 'django';
    let currentChars = 0;

    const stepTyping = () => {
      if (isCancelled) return;

      if (currentFile === 'django') {
        if (currentChars < djangoTotal) {
          const isNearLineEnd = djangoBreaks.some(
            (b) => b >= currentChars && b <= currentChars + 4
          );
          const step = isNearLineEnd ? 1 : Math.min(3, djangoTotal - currentChars);
          currentChars += step;
          setVisibleChars(currentChars);

          const delay = isNearLineEnd ? 70 : 26 + (currentChars % 3) * 4;
          timerId = setTimeout(stepTyping, delay);
        } else {
          // views.py completed: Pause for ~650ms, then switch to Portfolio.jsx
          timerId = setTimeout(() => {
            if (isCancelled) return;
            currentFile = 'react';
            currentChars = 0;
            setActiveTab('react');
            setVisibleChars(0);

            // Short pause before Portfolio.jsx starts typing
            timerId = setTimeout(stepTyping, 180);
          }, 650);
        }
      } else if (currentFile === 'react') {
        if (currentChars < reactTotal) {
          const isNearLineEnd = reactBreaks.some(
            (b) => b >= currentChars && b <= currentChars + 4
          );
          const step = isNearLineEnd ? 1 : Math.min(3, reactTotal - currentChars);
          currentChars += step;
          setVisibleChars(currentChars);

          const delay = isNearLineEnd ? 70 : 26 + (currentChars % 3) * 4;
          timerId = setTimeout(stepTyping, delay);
        } else {
          // Portfolio.jsx finished: STOP permanently on this page load
          setIsAnimationDone(true);
        }
      }
    };

    // Initial slight offset so the hero window entrance animation lands naturally
    timerId = setTimeout(stepTyping, 350);

    return () => {
      isCancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [prefersReduced]);

  // Render tokens progressively with syntax highlighting and thin cursor
  const renderTypedCode = (lines, visibleCount, isComplete) => {
    let remaining = visibleCount;
    let cursorPlaced = false;

    return lines.map((lineTokens, lineIdx) => {
      if (remaining <= 0 && cursorPlaced) {
        return null;
      }

      const renderedTokens = [];

      for (let tIdx = 0; tIdx < lineTokens.length; tIdx++) {
        const token = lineTokens[tIdx];
        const len = token.text.length;

        if (remaining >= len) {
          renderedTokens.push(
            <span key={tIdx} className={token.className}>
              {token.text}
            </span>
          );
          remaining -= len;
        } else if (remaining > 0) {
          renderedTokens.push(
            <span key={tIdx} className={token.className}>
              {token.text.slice(0, remaining)}
            </span>
          );
          // Active thin vertical cursor at the exact typing character
          renderedTokens.push(
            <span
              key="cursor"
              className="inline-block w-[2px] h-[1.1em] bg-lemon align-middle ml-[1px] animate-pulse"
            />
          );
          cursorPlaced = true;
          remaining = 0;
        } else {
          break;
        }
      }

      if (!cursorPlaced && remaining === 0) {
        if (!isComplete) {
          renderedTokens.push(
            <span
              key="cursor"
              className="inline-block w-[2px] h-[1.1em] bg-lemon align-middle ml-[1px] animate-pulse"
            />
          );
        }
        cursorPlaced = true;
      }

      return (
        <div key={lineIdx} className="leading-relaxed whitespace-pre hover:bg-white/[0.03] rounded px-1.5 -mx-1.5 transition-colors duration-150">
          {renderedTokens}
          {isComplete && lineIdx === lines.length - 1 && (
            <span
              className={`inline-block w-[2px] h-[1.1em] align-middle ml-[2px] ${
                isAnimationDone ? 'bg-lemon/40' : 'bg-lemon/70 animate-pulse'
              }`}
            />
          )}
        </div>
      );
    });
  };

  const isCurrentComplete =
    activeTab === 'django' ? visibleChars >= djangoTotal : visibleChars >= reactTotal;

  return (
    <section id="hero" ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-lemon/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Software Developer Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-night-surface border border-night-border hover:border-night-border-light mb-6 shadow-sm transition-colors duration-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lemon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lemon"></span>
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-lemon uppercase">
                SOFTWARE DEVELOPER
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="hero-heading font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12] mb-6">
              Building my path into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lemon via-lemon/90 to-white">
                full-stack
              </span>{' '}
              development.
            </h1>

            {/* Supporting Copy */}
            <p className="hero-subtext text-base sm:text-lg text-content-secondary leading-relaxed max-w-xl mb-9">
              I'm <strong className="text-white font-medium">Shihan</strong>, a student developer focused on{' '}
              <span className="text-content-primary font-medium">Python</span>,{' '}
              <span className="text-content-primary font-medium">Django</span>, and{' '}
              <span className="text-content-primary font-medium">React</span> — learning by building real projects and continuously improving my skills.
            </p>

            {/* Call To Actions */}
            <div className="hero-ctas flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="hero-btn group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-lemon text-night font-heading font-bold text-sm tracking-wide shadow-lemon-sm hover:shadow-lemon-glow hover:bg-lemon-muted hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </a>

              <a
                href="#journey"
                className="hero-btn group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-night-surface border border-night-border hover:border-lemon/40 hover:bg-night-elevated text-content-primary hover:text-white font-heading font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all duration-200"
              >
                <span>Explore My Journey</span>
                <ChevronRight className="w-4 h-4 text-content-secondary group-hover:translate-x-1 group-hover:text-lemon transition-all duration-200" />
              </a>
            </div>

            {/* Philosophy Bar */}
            <div className="hero-philosophy w-full pt-6 border-t border-night-border/80 flex items-center gap-3 sm:gap-6 text-xs font-mono text-content-muted">
              <span className="flex items-center gap-1.5 text-content-secondary hover:text-white transition-colors duration-200">
                <span className="text-lemon">✓</span> Learn
              </span>
              <span className="select-none">→</span>
              <span className="flex items-center gap-1.5 text-content-secondary hover:text-white transition-colors duration-200">
                <span className="text-lemon">✓</span> Build
              </span>
              <span className="select-none">→</span>
              <span className="flex items-center gap-1.5 text-content-secondary hover:text-white transition-colors duration-200">
                <span className="text-lemon">✓</span> Improve
              </span>
              <span className="select-none">→</span>
              <span className="flex items-center gap-1.5 text-lemon font-semibold">
                <span>✦</span> Grow
              </span>
            </div>

          </div>

          {/* Right Hero Visual: Technical Code Window */}
          <div className="hero-window lg:col-span-5 w-full" ref={windowRef}>
            <div className="relative rounded-2xl bg-night-surface border border-night-border hover:border-night-border-light hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),0_0_30px_-5px_rgba(239,255,79,0.06)] p-1 shadow-2xl shadow-black/60 group transition-all duration-300">
              
              {/* Outer decorative gradient border accent */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-lemon/20 via-transparent to-transparent opacity-50 group-hover:opacity-75 blur-sm pointer-events-none transition-opacity duration-300" />

              {/* IDE Container */}
              <div className="relative rounded-xl bg-[#12161F] overflow-hidden border border-night-border/50">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E121A] border-b border-night-border/80 select-none">
                  <div className="flex items-center gap-3.5">
                    {/* Authentic macOS Traffic-Light Window Controls - Always Visible */}
                    <div className="flex items-center gap-2 pl-0.5">
                      <span
                        aria-label="Close"
                        className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-150 hover:scale-110 hover:brightness-110 group/btn"
                      >
                        <svg className="w-1.5 h-1.5 text-[#4D0000] opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                          <path d="M1 1L5 5M5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </span>

                      <span
                        aria-label="Minimize"
                        className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-150 hover:scale-110 hover:brightness-110 group/btn"
                      >
                        <svg className="w-1.5 h-1.5 text-[#5C4300] opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                          <path d="M0.8 3H5.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </span>

                      <span
                        aria-label="Maximize"
                        className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 flex items-center justify-center cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-150 hover:scale-110 hover:brightness-110 group/btn"
                      >
                        <svg className="w-1.5 h-1.5 text-[#0A4D14] opacity-0 group-hover/btn:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                          <path d="M1 2.2V1H2.2M3.8 5H5V3.8M5 1L3.2 2.8M1 5L2.8 3.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Window Title */}
                    <span className="font-mono text-xs text-content-secondary tracking-tight">
                      shihan-dev-env
                    </span>
                  </div>

                  {/* Refined Runtime Badge with Status */}
                  <div className="flex items-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-night-surface/90 border border-night-border text-[11px] font-mono shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                      </span>
                      <span className="text-content-primary">python 3.12</span>
                      <span className="text-night-border">•</span>
                      <span className="text-content-secondary">react 19</span>
                    </div>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center border-b border-night-border bg-night/40 px-2 pt-2 gap-1 overflow-x-auto text-xs font-mono">
                  <button
                    onClick={() => {
                      setActiveTab('django');
                      if (isAnimationDone) setVisibleChars(djangoTotal);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all duration-200 ${
                      activeTab === 'django'
                        ? 'bg-[#12161F] text-lemon border-t border-x border-night-border border-t-lemon/70 shadow-sm font-medium'
                        : 'text-content-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[#3B82F6]">#</span>
                    <span>views.py</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('react');
                      if (isAnimationDone) setVisibleChars(reactTotal);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all duration-200 ${
                      activeTab === 'react'
                        ? 'bg-[#12161F] text-lemon border-t border-x border-night-border border-t-lemon/70 shadow-sm font-medium'
                        : 'text-content-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[#61DAFB]">⚛</span>
                    <span>Portfolio.jsx</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all duration-200 ${
                      activeTab === 'terminal'
                        ? 'bg-[#12161F] text-lemon border-t border-x border-night-border border-t-lemon/70 shadow-sm font-medium'
                        : 'text-content-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Terminal className="w-3 h-3 text-lemon" />
                    <span>terminal</span>
                  </button>
                </div>

                {/* Editor Content Area */}
                <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto min-h-[290px] flex flex-col justify-between">
                  {activeTab === 'django' && (
                    <div className="space-y-1.5 text-content-primary transition-opacity duration-300">
                      {renderTypedCode(djangoCodeLines, visibleChars, isCurrentComplete)}
                    </div>
                  )}

                  {activeTab === 'react' && (
                    <div className="space-y-1.5 text-content-primary transition-opacity duration-300">
                      {renderTypedCode(reactCodeLines, visibleChars, isCurrentComplete)}
                    </div>
                  )}

                  {activeTab === 'terminal' && (
                    <div className="space-y-2 text-content-primary">
                      <div className="text-content-muted">$ python manage.py check</div>
                      <div className="text-[#34D399]">System check identified no issues (0 silenced).</div>
                      <div className="pt-2 text-content-muted">$ npm run dev</div>
                      <div className="text-content-secondary">
                        VITE v8.3.0 ready in 184 ms
                      </div>
                      <div className="text-lemon">
                        ➜ Local: http://localhost:5173/
                      </div>
                      <div className="pt-2 flex items-center gap-2 text-content-secondary">
                        <span className="text-lemon">➜</span>
                        <span className="text-content-muted">shihan@portfolio:~$</span>
                        <span className="w-2 h-4 bg-lemon animate-pulse inline-block" />
                      </div>
                    </div>
                  )}

                  {/* Quick Bottom Status Bar */}
                  <div className="pt-4 mt-3 border-t border-night-border/60 flex items-center justify-between text-[11px] text-content-muted">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isAnimationDone ? 'bg-[#10B981]' : isCurrentComplete ? 'bg-[#10B981]' : 'bg-lemon animate-pulse'}`} />
                      <span>{isAnimationDone ? 'Ready • Portfolio.jsx' : isCurrentComplete ? 'Ready to build' : 'Writing code...'}</span>
                    </span>
                    <span className="font-mono text-lemon/80">UTF-8 • Git: main</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
