'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storyChapters } from '@/data/storyData';

gsap.registerPlugin(ScrollTrigger);

interface PhotoCard {
  src: string;
  label: string;
  rotation: number;
  initialX: string; // Viewport width offset at scattered stage
  initialY: string; // Viewport height offset at scattered stage
  size: string; // Tailwind width
  depth: number; // For mouse parallax
  floatDuration: number;
  floatDelay: number;
}

// Preserve user's Cloudinary URLs and metadata
const floatingPhotos: PhotoCard[] = [
  {
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/f_auto,q_auto/v1781340803/IMG_7013_natvui.jpg",
    label: "shaylaa.jpeg",
    rotation: -8,
    initialX: "-44vw",
    initialY: "-36vh",
    size: "w-32 md:w-48",
    depth: 25,
    floatDuration: 5,
    floatDelay: 0,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/v1781340804/50230e84-8247-4ee2-ae7f-364c31180642_fjvlug.jpg",
    label: "Ifemii.jpeg",
    rotation: 5,
    initialX: "-14vw",
    initialY: "-42vh",
    size: "w-36 md:w-52",
    depth: -15,
    floatDuration: 6,
    floatDelay: 0.5,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/v1781340804/PHOTO-2026-01-30-00-28-37_amdlss.jpg",
    label: "Adukemi.jpeg",
    rotation: -4,
    initialX: "14vw",
    initialY: "-40vh",
    size: "w-32 md:w-48",
    depth: 35,
    floatDuration: 4.5,
    floatDelay: 1,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/v1781510615/a42be0cc-2d71-483c-8f4a-bb2548f5f81c_n11yq5.jpg",
    label: "Babymi.jpeg",
    rotation: 10,
    initialX: "40vw",
    initialY: "-36vh",
    size: "w-36 md:w-52",
    depth: -25,
    floatDuration: 5.5,
    floatDelay: 1.5,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/v1781340804/ce3dd336-f520-46c0-a5fe-86eccc86cd79_mbopjv.jpg",
    label: "Boluwasefemi.jpeg",
    rotation: -12,
    initialX: "-48vw",
    initialY: "0vh",
    size: "w-28 md:w-44",
    depth: 20,
    floatDuration: 5.2,
    floatDelay: 0.8,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781510589/613943DB-7777-45D0-9883-756DFA4E6C10_ubcjgb.mov",
    label: "Motunrayo.jpeg",
    rotation: 15,
    initialX: "46vw",
    initialY: "-4vh",
    size: "w-36 md:w-56",
    depth: -35,
    floatDuration: 6.2,
    floatDelay: 1.2,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781340756/WhatsApp_Video_2026-06-03_at_09.03.27_esdoyc.mp4",
    label: "BabyKabiru.jpeg",
    rotation: 6,
    initialX: "-44vw",
    initialY: "32vh",
    size: "w-36 md:w-52",
    depth: 10,
    floatDuration: 4.8,
    floatDelay: 2.2,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781510598/FCA0357E-1F4C-49BD-A8C0-FBA60B89C5B9_jdaujj.mp4",
    label: "Morenikeji.jpeg",
    rotation: -3,
    initialX: "-16vw",
    initialY: "36vh",
    size: "w-32 md:w-48",
    depth: -20,
    floatDuration: 5.8,
    floatDelay: 1.6,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781510564/774cf3a3-91de-4ae6-8d65-4e914e9daa18_ownu0k.mov",
    label: "Ayanfemi.jpeg",
    rotation: 5,
    initialX: "12vw",
    initialY: "34vh",
    size: "w-32 md:w-48",
    depth: 30,
    floatDuration: 5.4,
    floatDelay: 0.4,
  },
  {
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781510506/16FCD2E2-3AFA-449A-A549-E19999593BDA_sr6bya.mp4",
    label: "Ifeteminikan.jpeg",
    rotation: -6,
    initialX: "40vw",
    initialY: "30vh",
    size: "w-36 md:w-52",
    depth: -18,
    floatDuration: 6.5,
    floatDelay: 2.0,
  }
];

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isStacked, setIsStacked] = useState(false);

  // Mouse Parallax (only active when cards are scattered)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isStacked) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isStacked]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Initialize the starting position of all cards in GSAP (scattered coords)
      floatingPhotos.forEach((photo, index) => {
        gsap.set(cardRefs.current[index], {
          x: photo.initialX,
          y: photo.initialY,
          rotation: 0,
          scale: 0.35,
          opacity: 0,
        });
      });

      // Initialize hero text starting state
      gsap.set(heroTextRef.current, {
        opacity: 0,
        y: 40,
      });

      // Animate hero text on load
      gsap.to(heroTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.15,
      });

      // Animate scattered cards on load in a staggered reveal cascade
      gsap.to(cardRefs.current, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.35,
      });

      // Desktop Animations
      mm.add("(min-width: 768px)", () => {
        // Sticky Pin for the full-screen Sticky Viewport
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stickyViewportRef.current,
          pinSpacing: false,
        });

        // Timeline for flight stacking and peeling transitions
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onUpdate: (self) => {
              setIsStacked(self.progress > 0.15);
            }
          }
        });

        // 1. Fade out centered Hero Text
        tl.to(heroTextRef.current, {
          opacity: 0,
          y: -120,
          duration: 1.5,
        }, 0);

        // 2. Fade out Scroll Indicator
        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.0,
        }, 0);

        // 3. Stack with visible depth — top card (index 9, highest DOM z) at y:0,
        //    each card below offset downward so the deck edge is visible
        floatingPhotos.forEach((photo, index) => {
          const stackRotation = (index % 2 === 0 ? 3 : -3) + (index * 0.5);
          const stackScale = 1 - (floatingPhotos.length - 1 - index) * 0.006;
          const depthOffset = (floatingPhotos.length - 1 - index) * 4;

          tl.to(cardRefs.current[index], {
            x: "25vw",
            y: depthOffset,
            rotation: stackRotation,
            scale: stackScale,
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            duration: 2.5,
            ease: "power2.inOut",
          }, 0.5);
        });

        // 4. Peel from the top — index 9 (DOM top) leaves first, flying upward.
        //    After each peel, remaining cards settle to new stack positions.
        const peelOrder = [9, 8, 7, 6];
        const xDrifts = [-10, 8, -8, 10];

        peelOrder.forEach((cardIndex, step) => {
          const startTime = 3.5 + step * 2;

          tl.to(cardRefs.current[cardIndex], {
            y: "-130vh",
            x: `${25 + xDrifts[step]}vw`,
            rotation: xDrifts[step] * 2,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          }, startTime);

          // Remaining cards settle upward so the new top card sits at y:0
          for (let j = 0; j < cardIndex; j++) {
            tl.to(cardRefs.current[j], {
              y: (cardIndex - 1 - j) * 4,
              duration: 0.5,
              ease: "power2.out",
            }, startTime + 0.4);
          }
        });
      });

      // Mobile Animations
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stickyViewportRef.current,
          pinSpacing: false,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.0,
            onUpdate: (self) => {
              setIsStacked(self.progress > 0.12);
            }
          }
        });

        tl.to(heroTextRef.current, {
          opacity: 0,
          y: -60,
          duration: 1.5,
        }, 0);

        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          duration: 1.0,
        }, 0);

        const mobileStackCenterY = window.innerHeight * -0.2;

        floatingPhotos.forEach((photo, index) => {
          const stackRotation = (index % 2 === 0 ? 2 : -2) + (index * 0.4);
          const stackScale = 0.95 - (floatingPhotos.length - 1 - index) * 0.005;
          const depthOffset = (floatingPhotos.length - 1 - index) * 3;

          tl.to(cardRefs.current[index], {
            x: "0vw",
            y: mobileStackCenterY + depthOffset,
            rotation: stackRotation,
            scale: stackScale,
            duration: 2.2,
            ease: "power2.inOut",
          }, 0.4);
        });

        const mobilePeelOrder = [9, 8, 7, 6];

        mobilePeelOrder.forEach((cardIndex, step) => {
          const startTime = 3.5 + step * 2;

          tl.to(cardRefs.current[cardIndex], {
            y: "-130vh",
            rotation: step % 2 === 0 ? -15 : 15,
            opacity: 0,
            duration: 2,
            ease: "power2.in",
          }, startTime);

          for (let j = 0; j < cardIndex; j++) {
            tl.to(cardRefs.current[j], {
              y: mobileStackCenterY + (cardIndex - 1 - j) * 3,
              duration: 0.5,
              ease: "power2.out",
            }, startTime + 0.4);
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderMedia = (src: string, label: string) => {
    const isVideo = src.endsWith('.mp4') || src.endsWith('.mov') || src.includes('/video/');
    if (isVideo) {
      return (
        <video
          src={src}
          loop
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover select-none pointer-events-none rounded"
        />
      );
    }
    return (
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover select-none pointer-events-none rounded"
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#fcfaf2] border-b border-cream-300"
    >
      {/* Background Scrapbook Grids */}
      <div className="absolute inset-0 scrapbook-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[5%] md:left-[50%] w-[1px] border-l border-dashed border-terracotta/15 pointer-events-none" />

      {/* 1. Full-Screen Sticky Viewport containing centered Hero text AND Scattered cards */}
      <div
        ref={stickyViewportRef}
        className="w-full h-screen sticky top-0 overflow-hidden z-20 pointer-events-none"
      >
        {/* Centered Hero Text Overlay (Stays centered in viewport, fades out) */}
        <div
          ref={heroTextRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 select-text pointer-events-auto"
        >
          <div className="max-w-lg md:max-w-2xl space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold italic tracking-tight text-charcoal-900 leading-none">
              Happy birthday
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold italic tracking-tight text-charcoal-900 leading-none">
              my loverr🙈
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 select-none"
          >
            <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase">Scroll to begin</span>
            <div className="w-1.5 h-6 rounded-full bg-zinc-300 flex justify-center p-0.5 animate-bounce">
              <div className="w-1 h-2 rounded-full bg-terracotta" />
            </div>
          </div>
        </div>

        {/* Full-Screen Cards Stack / constellation Frame */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          
          {/* Washi tape decor (behind stack on right side) */}
          <div className="absolute top-[42%] left-[70%] w-24 h-7 washi-tape-1 transform -rotate-6 z-40 pointer-events-none opacity-80 hidden md:block" />

          {floatingPhotos.map((photo, index) => {
            // Mouse Parallax translations (only active at scattered stage)
            const px = isStacked ? 0 : mousePos.x * photo.depth * 0.75;
            const py = isStacked ? 0 : mousePos.y * photo.depth * 0.75;

            return (
              // Outer Wrapper: Handles absolute layout position in center + GSAP flight coordinates on scroll
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  opacity: 0,
                }}
                className="pointer-events-auto select-none absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                {/* Middle Wrapper: Handles React mouse parallax */}
                <div
                  style={{
                    transform: `translate(${px}px, ${py}px)`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  {/* Inner Polaroid Wrapper: Handles base rotation, float animation, and css-only hover zooms */}
                  <div
                    className={`bg-white p-3 pb-6 rounded-lg shadow-md border border-zinc-200/50 flex flex-col transform transition-all duration-500 ease-out hover:scale-108 hover:rotate-0 hover:z-50 hover:shadow-2xl cursor-pointer ${
                      !isStacked ? 'animate-float-card' : ''
                    }`}
                    // @ts-ignore
                    style={{
                      transform: `rotate(${photo.rotation}deg)`,
                      '--float-duration': `${photo.floatDuration}s`,
                      '--float-delay': `${photo.floatDelay}s`,
                    } as any}
                  >
                    {/* Polaroid header */}
                    <div className="text-[9px] md:text-[11px] font-mono text-zinc-400 mb-1.5 leading-none flex items-center justify-between">
                      <span>{photo.label}</span>
                      <span className="text-terracotta opacity-85">🤍</span>
                    </div>

                    {/* Image/Video frame */}
                    <div className={`aspect-[4/5] overflow-hidden rounded bg-zinc-100 border border-zinc-100 ${photo.size}`}>
                      {renderMedia(photo.src, photo.label)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 2. Scrolling Timeline (Chapter text) */}
      {/* Pull it up by -100vh so it starts exactly overlaying the Hero stage scroll */}
      <div className="flex flex-col md:flex-row relative mt-[-100vh]">
        
        {/* Left Column: Scrolling chapters */}
        <div ref={leftContentRef} className="w-full md:w-1/2 px-6 sm:px-12 md:pl-20 md:pr-12 relative z-10">
          
          {/* Spacer Section 0 corresponding to Hero Section viewport scroll duration */}
          <div className="h-screen pointer-events-none" />

          {/* Chapters 1 to 5 */}
          {storyChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-20 select-text"
            >
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-terracotta font-semibold text-lg md:text-xl">
                    Chapter {chapter.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-terracotta/20" />
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-charcoal-900 leading-tight">
                  {chapter.title}
                </h3>

                <p className="text-xs font-mono tracking-widest text-zinc-400">
                  {chapter.date}
                </p>

                {/* Mobile spacer: pushes chapter text down to fit underneath top sticky stack */}
                <div className="h-[45vh] md:hidden" />

                <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed tracking-wide scrapbook-lined">
                  {chapter.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right column spacer to preserve desktop grid layout */}
        <div className="hidden md:block md:w-1/2 h-screen pointer-events-none" />

      </div>
    </div>
  );
}
