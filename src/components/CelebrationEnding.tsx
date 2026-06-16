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

interface CelebrationEndingProps {
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

const pleadingMessages = [
  "Would you be my girlfriend? 🌹",
  "Shey you dey whine me ni? 🥺 Please choose Yes!",
  "haaa, you wan send me go back village? 💔 Ask your heart!",
  "Think again! There are so many adventures waiting for us! ✨",
  "Incorrect answer! 😜 Try the other button!",
  "Oyaa na beg I dey beg nauuu! 💖",
  "No is not an option anymore! 😉",
];

export default function CelebrationEnding({ isFlipped, setIsFlipped }: CelebrationEndingProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Proposal states
  const [noCount, setNoCount] = useState(0);
  const [extraYesButtons, setExtraYesButtons] = useState<Array<{ id: number; top: string; left: string; scale: number }>>([]);
  const [proposalAccepted, setProposalAccepted] = useState(false);

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

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    
    // Spawn a new Yes button at a random position inside the card back face
    const randomTop = Math.floor(Math.random() * 55) + 20; // 20% to 75% to avoid title/main buttons
    const randomLeft = Math.floor(Math.random() * 70) + 15; // 15% to 85%
    const newButton = {
      id: Date.now() + Math.random(),
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      scale: Math.random() * 0.2 + 0.9,
    };
    setExtraYesButtons(prev => [...prev, newButton]);
  };

  const handleYesClick = () => {
    setProposalAccepted(true);
    triggerConfettiShower();
    
    // Continuous side corner confetti showers for maximum visual impact
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
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

  const currentMessage = pleadingMessages[Math.min(noCount, pleadingMessages.length - 1)];

  return (
    <section className={`relative w-full min-h-screen pt-24 md:pt-[15vh] pb-24 px-6 md:px-12 transition-all duration-1000 overflow-hidden ${
      isFlipped 
        ? 'bg-zinc-950 text-white' 
        : 'paper-texture border-b border-cream-300 md:min-h-[120vh] lg:min-h-[130vh]'
    }`}>
      {/* Starry Night Sky Background Overlay */}
      {isFlipped && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black opacity-80" />
          {[...Array(35)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-40"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  boxShadow: '0 0 6px 1.5px rgba(255, 255, 255, 0.5)',
                }}
                animate={{
                  opacity: [0.1, 0.9, 0.1],
                  scale: [0.7, 1.3, 0.7],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Background Grids */}
      {!isFlipped && (
        <div className="absolute inset-0 scrapbook-grid opacity-50 pointer-events-none" />
      )}

      {/* Confetti Trigger on Enter Viewport */}
      {!isFlipped && (
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
      )}

      {/* Center Card Container */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-2xl mx-auto min-h-[60vh] md:min-h-[75vh]" style={{ perspective: "1500px" }}>
        {/* 3D Rotating Wrapper */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 45, damping: 14 }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          {/* Front Face (Birthday Card) */}
          <div
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden" 
            }}
            className="w-full bg-[#fffdf9] p-8 md:p-12 rounded-[28px] shadow-2xl border-2 border-[#eee9db] flex flex-col items-center text-center space-y-8 select-text relative"
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
                Birthday blessings my loveeee! On this special day, we celebrate not just the passing of another year, but the incredible person you are. Your kindness, laughter, and vibrant spirit light up the lives of everyone around you. May this year bring you endless joy, exciting adventures, and all the love you deserve. Here's to making unforgettable memories and embracing all the wonderful moments that lie ahead. Cheers to you my special one on your birthday! I love you so much ❤️😘
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
          </div>

          {/* Back Face (Proposal Card) */}
          <div
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(1px)" 
            }}
            className="absolute inset-0 w-full h-full bg-[#121214] p-8 md:p-12 rounded-[28px] shadow-2xl border-2 border-zinc-850 flex flex-col items-center justify-center text-center space-y-8 select-text overflow-hidden"
          >
            {proposalAccepted ? (
              /* Success Screen */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="flex flex-col items-center justify-center space-y-6 w-full"
              >
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="w-24 h-24 bg-pink-500/10 border border-pink-500/30 rounded-full flex items-center justify-center text-pink-500 shadow-[0_0_35px_rgba(236,72,153,0.35)]"
                >
                  <Heart className="w-12 h-12 fill-current" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-serif italic bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent font-bold tracking-wide leading-tight px-4">
                  My baby for lifeeeee! ❤️
                </h2>
                
                <p className="text-zinc-300 text-sm md:text-base max-w-md leading-relaxed font-sans px-4">
                  I love you so much, my Shaylaaa. Here's to us, our endless laughs, and all the beautiful memories we are going to create together. 💖🥂
                </p>
                
                <div className="pt-4">
                  <span className="text-[10px] font-mono tracking-widest text-pink-400/80 uppercase block animate-pulse">
                    Forever & Always ours ✨
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Question/Proposal Screen */
              <div className="flex flex-col items-center justify-center space-y-8 w-full relative h-full">
                {/* Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
                  <span className="absolute top-[10%] left-[8%] text-pink-500 opacity-20 text-xl animate-bounce">💖</span>
                  <span className="absolute top-[80%] left-[12%] text-rose-500 opacity-25 text-2xl animate-pulse">🌹</span>
                  <span className="absolute top-[15%] right-[10%] text-amber-400 opacity-30 text-xl animate-pulse">✨</span>
                  <span className="absolute top-[75%] right-[8%] text-rose-500 opacity-20 text-2xl animate-bounce">💖</span>
                </div>

                <div className="space-y-4 z-10 max-w-md px-4">
                  <div className="w-16 h-16 bg-pink-950/30 border border-pink-500/20 rounded-full flex items-center justify-center mx-auto text-pink-400 animate-pulse">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif italic bg-gradient-to-r from-amber-200 via-pink-300 to-rose-300 bg-clip-text text-transparent leading-tight font-bold">
                    {currentMessage}
                  </h2>
                </div>

                {/* Proposal Buttons */}
                <div className="flex flex-row items-center justify-center gap-6 z-10 min-h-[80px]">
                  {/* Primary Yes Button */}
                  <motion.button
                    onClick={handleYesClick}
                    style={{ scale: 1 + noCount * 0.15 }}
                    whileHover={{ scale: (1 + noCount * 0.15) * 1.05 }}
                    whileTap={{ scale: (1 + noCount * 0.15) * 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-600 hover:from-pink-600 hover:via-rose-600 hover:to-red-700 text-white font-sans font-bold text-base px-10 py-4 rounded-full shadow-lg hover:shadow-pink-500/20 transition-all cursor-pointer z-30"
                  >
                    Yes! 💖
                  </motion.button>

                  {/* Primary No Button */}
                  {noCount < 6 ? (
                    <motion.button
                      onClick={handleNoClick}
                      whileHover={{ scale: 0.95, x: [0, -5, 5, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-sans font-semibold text-sm px-8 py-3.5 rounded-full border border-zinc-700 shadow-md cursor-pointer z-30"
                    >
                      No 😢
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleYesClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-full shadow-md cursor-pointer z-30"
                    >
                      Yes! (You have no choice) 😉
                    </motion.button>
                  )}
                </div>

                {/* Spawned Yes Buttons */}
                {extraYesButtons.map((btn) => (
                  <motion.button
                    key={btn.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: btn.scale, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12 }}
                    onClick={handleYesClick}
                    style={{
                      position: 'absolute',
                      top: btn.top,
                      left: btn.left,
                    }}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-sans font-semibold text-xs px-4 py-2 rounded-full shadow-md cursor-pointer z-40 whitespace-nowrap"
                  >
                    Yes! 🥰
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scattered Polaroids */}
      {isMounted && (
        !isFlipped && isMobile ? (
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
          /* Desktop Scattered Collage - remains in background with low opacity when flipped */
          !isMobile && galleryPhotos.map((photo, index) => {
            const pos = photoPositions[index % 6];
            return (
              <motion.div
                key={photo.id}
                className={`absolute z-20 transition-all duration-1000 ${isFlipped ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
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
                whileHover={isFlipped ? undefined : { zIndex: 40 }}
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
                    onClick={isFlipped ? undefined : () => setSelectedPhoto(photo)}
                    className="bg-white p-3.5 pb-7 rounded-xl shadow-lg border border-zinc-200/40 cursor-pointer flex flex-col group w-full"
                    style={{
                      rotate: pos.rotation,
                    }}
                    whileHover={isFlipped ? undefined : {
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
                      {!isFlipped && (
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-[10px] text-charcoal-900 font-mono tracking-wider font-semibold active:scale-95 transition-transform">
                            <Eye className="w-3 h-3 text-terracotta" /> VIEW
                          </div>
                        </div>
                      )}
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
        {selectedPhoto && !isFlipped && (
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
        <button
          onClick={() => {
            setIsFlipped(!isFlipped);
            if (isFlipped) {
              // Reset proposal states when flipping back to front
              setNoCount(0);
              setExtraYesButtons([]);
              setProposalAccepted(false);
            }
          }}
          className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 cursor-pointer ${
            isFlipped 
              ? 'text-zinc-600 hover:text-pink-400/50' 
              : 'text-zinc-400 hover:text-terracotta'
          }`}
        >
          made for you my baby ❤️
        </button>
      </div>
    </section>
  );
}
