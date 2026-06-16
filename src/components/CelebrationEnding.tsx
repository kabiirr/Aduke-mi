'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, X, Eye } from 'lucide-react';
import { galleryPhotos, GalleryPhoto } from '@/data/storyData';

const photoPositions = [
  // Photo 1 (June Moments) - Top Left
  {
    top: "10vh",
    left: "5vw",
    width: "15rem",
    rotation: -6,
    floatDuration: 5,
    floatDelay: 0,
  },
  // Photo 2 (May Days) - Top Right
  {
    top: "12vh",
    right: "5vw",
    width: "15rem",
    rotation: 8,
    floatDuration: 6,
    floatDelay: 0.5,
  },
  // Photo 3 (Spring Breezes) - Mid Left
  {
    top: "42vh",
    left: "3vw",
    width: "14rem",
    rotation: 4,
    floatDuration: 4.5,
    floatDelay: 1,
  },
  // Photo 4 (April Walks) - Mid Right
  {
    top: "45vh",
    right: "3vw",
    width: "14rem",
    rotation: -5,
    floatDuration: 5.5,
    floatDelay: 1.5,
  },
  // Photo 5 (Sweetheart Smile) - Bottom Left
  {
    bottom: "10vh",
    left: "6vw",
    width: "15rem",
    rotation: -8,
    floatDuration: 5.2,
    floatDelay: 0.8,
  },
  // Photo 6 (Cafe Mornings) - Bottom Right
  {
    bottom: "12vh",
    right: "6vw",
    width: "15rem",
    rotation: 6,
    floatDuration: 5.8,
    floatDelay: 1.2,
  }
];

export default function CelebrationEnding() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerConfettiShower = () => {
    // Blast 1: Center
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e07a5f', '#f4a261', '#e9c46a', '#fdfbf7', '#2a2a2a']
    });

    // Blast 2: Side cannons (run for 2.5 seconds)
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const isVideoAsset = (src: string) => {
    return src.endsWith('.mp4') || src.endsWith('.mov') || src.includes('/video/');
  };

  const renderMedia = (src: string, alt: string) => {
    if (isVideoAsset(src)) {
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
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none rounded"
      />
    );
  };

  return (
    <section className="relative w-full min-h-screen md:min-h-[120vh] lg:min-h-[130vh] pt-24 md:pt-[15vh] pb-24 px-6 md:px-12 paper-texture border-b border-cream-300 overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 scrapbook-grid opacity-50 pointer-events-none" />

      {/* Confetti Trigger on Enter Viewport */}
      <motion.div
        onViewportEnter={() => {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#e07a5f', '#f4a261', '#e9c46a']
          });
        }}
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Center Card Container */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-2xl mx-auto min-h-[60vh] md:min-h-[75vh]">
        {/* Birthday Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="w-full bg-[#fffdf9] p-8 md:p-12 rounded-[28px] shadow-2xl border-2 border-[#eee9db] flex flex-col items-center text-center space-y-8 select-text"
        >
          {/* Tape deco */}
          <div className="absolute -top-3 left-[20%] w-24 h-7 washi-tape-1 transform -rotate-6" />
          <div className="absolute -top-4 right-[20%] w-24 h-7 washi-tape-2 transform rotate-3" />

          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
            <span className="absolute top-[10%] left-[8%] text-red-400 opacity-25 text-xl animate-bounce">❤️</span>
            <span className="absolute top-[80%] left-[12%] text-red-400 opacity-20 text-2xl animate-pulse">❤️</span>
            <span className="absolute top-[15%] right-[10%] text-red-400 opacity-30 text-xl animate-pulse">❤️</span>
            <span className="absolute top-[75%] right-[8%] text-red-400 opacity-20 text-2xl animate-bounce">❤️</span>
          </div>

          {/* Stamp element */}
          <div className="absolute top-8 right-8 border-2 border-dashed border-terracotta/40 px-3 py-2 rotate-6 rounded font-mono text-[10px] text-terracotta select-none hidden sm:block">
            BIRTHDAY_GIRL_25
          </div>

          {/* Card Header */}
          <div className="space-y-2">
            <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center mx-auto text-terracotta">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-terracotta leading-tight">
              Happy birthday my sweetheartttt
            </h2>
          </div>

          {/* Card Body Letter */}
          <div className="max-w-lg space-y-4">
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed font-sans scrapbook-lined text-justify">
              Birthday blessings my loveeee! On this special day, we celebrate not just the passing of another year, but the incredible person you are. Your kindness, laughter, and vibrant spirit light up the lives of everyone around you. May this year bring you endless joy, exciting adventures, and all the love you deserve. Here's to making unforgettable memories and embracing all the wonderful moments that lie ahead. Cheers to you on your birthday!
            </p>
          </div>

          {/* Interactive Confetti Shower Button */}
          <motion.button
            onClick={triggerConfettiShower}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black hover:bg-zinc-800 text-white font-sans font-semibold text-sm px-8 py-4 rounded-full shadow-lg flex items-center gap-2.5 transition-all group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:animate-spin" />
            Click here for confettiiiii
            <Heart className="w-4 h-4 text-red-400 fill-current" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scattered Polaroids (Client-only rendering to prevent layoutId conflicts and hydration mismatches) */}
      {isMounted && (
        isMobile ? (
          /* Mobile Grid */
          <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-lg z-10">
            {galleryPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layoutId={`card-container-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                style={{ rotate: photoPositions[index % 6].rotation * 0.7 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  delay: index * 0.08,
                }}
                className="bg-white p-2.5 pb-5 rounded-lg shadow-md border border-zinc-200/40 w-full cursor-pointer flex flex-col group relative"
              >
                <div className="aspect-square w-full overflow-hidden rounded bg-zinc-100 relative">
                  {renderMedia(photo.src, photo.title)}
                </div>
                <div className="mt-2 text-center">
                  <span className="font-serif italic text-xs text-charcoal-800">
                    {photo.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop Scattered Collage */
          galleryPhotos.map((photo, index) => {
            const pos = photoPositions[index % 6];
            return (
              <motion.div
                key={photo.id}
                className="absolute z-20"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  width: pos.width,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  delay: index * 0.12,
                }}
                whileHover={{ zIndex: 40 }}
              >
                <div
                  className="animate-float-card w-full"
                  style={{
                    // @ts-ignore
                    '--float-duration': `${pos.floatDuration}s`,
                    '--float-delay': `${pos.floatDelay}s`,
                  } as any}
                >
                  <motion.div
                    layoutId={`card-container-${photo.id}`}
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-white p-3.5 pb-7 rounded-xl shadow-lg border border-zinc-200/40 cursor-pointer flex flex-col group w-full"
                    style={{
                      rotate: pos.rotation,
                    }}
                    whileHover={{
                      scale: 1.08,
                      rotate: 0,
                      boxShadow: "0 25px 30px -5px rgba(0,0,0,0.2), 0 15px 15px -5px rgba(0,0,0,0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {/* Scrap tape decoration on random cards */}
                    {index % 2 === 0 && (
                      <div className="absolute -top-3 left-1/3 w-20 h-6 washi-tape-1 transform -rotate-12 z-20 opacity-80" />
                    )}
                    
                    {/* Polaroid header */}
                    <div className="text-[10px] font-mono text-zinc-400 mb-1.5 leading-none flex items-center justify-between">
                      <span>{photo.title}</span>
                      <span className="text-terracotta opacity-85">🤍</span>
                    </div>

                    {/* Photo Area */}
                    <div className="aspect-square w-full overflow-hidden rounded bg-zinc-100 border border-zinc-100/50 relative">
                      {renderMedia(photo.src, photo.title)}
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-[10px] text-charcoal-900 font-mono tracking-wider font-semibold active:scale-95 transition-transform">
                          <Eye className="w-3 h-3 text-terracotta" /> VIEW
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        )
      )}

      {/* Modal Zoom Detail View */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Expanded Content Box */}
            <motion.div
              layoutId={`card-container-${selectedPhoto.id}`}
              className="relative bg-[#fcfaf2] p-5 md:p-6 pb-8 rounded-2xl shadow-2xl border border-cream-300 w-full max-w-lg md:max-w-xl z-50 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-zinc-900/5 hover:bg-zinc-900/10 text-zinc-500 hover:text-zinc-800 p-1.5 rounded-full transition-colors z-20 active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Washi Tape */}
              <div className="w-32 h-8 washi-tape-1 transform -rotate-2 -translate-y-9" />

              {/* Enlarged Photo/Video */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-100/50 shadow-inner">
                {renderMedia(selectedPhoto.src, selectedPhoto.title)}
              </div>

              {/* Text Info */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring" as any, stiffness: 120 }}
                className="mt-6 text-center max-w-md"
              >
                <span className="font-serif italic text-terracotta text-lg sm:text-xl font-bold flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-4 h-4 fill-current text-terracotta" />
                  {selectedPhoto.title}
                </span>
                
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed tracking-wide mt-3 font-sans">
                  {selectedPhoto.caption}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simple Footer details */}
      <div className="mt-16 text-center space-y-2 select-none z-20">
        <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          with infinite love • june 13, 2026
        </p>
        <p className="text-[9px] font-mono text-zinc-300">
          Handcrafted scrapbook style. Apple-level polish.
        </p>
      </div>
    </section>
  );
}
