'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isPlayingRef = useRef(false);

  // Video: https://www.youtube.com/watch?v=Dx_YTL73kew
  const videoId = "Dx_YTL73kew";

  // Keep ref in sync to avoid stale closure inside the window click handler
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // 1. Inject YouTube Iframe API Script if not already loaded
    if (!window.YT) {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }
    }

    // 2. Define YouTube Player Initializer
    const initPlayer = () => {
      if (playerRef.current) return;
      if (typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId, // Required for loop parameter to work on single video
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 0,
          origin: typeof window !== 'undefined' ? window.location.origin : undefined
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            event.target.setVolume(40); // Soft volume level
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    // 3. Connect to API script lifecycle
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) {
          try {
            previousCallback();
          } catch (e) {
            console.error("Error calling previous onYouTubeIframeAPIReady:", e);
          }
        }
        initPlayer();
      };
    }

    // 4. Fallback: global click listener to play if blocked by initial browser autoplay restrictions
    const handleGlobalClick = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function' && !isPlayingRef.current) {
        playerRef.current.playVideo();
        setHasInteracted(true);
      }
    };
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []); // Run ONLY on mount to prevent infinite rebuild loops

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent page elements
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  // Micro-animated floating musical notes
  const notes = [
    { id: 1, char: '🎵', delay: 0, x: -12 },
    { id: 2, char: '🎶', delay: 1, x: 12 },
    { id: 3, char: '♩', delay: 2, x: 0 }
  ];

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex flex-col items-center">
      {/* Hidden YouTube player container - positioned offscreen to avoid display: none API bugs */}
      <div className="absolute -left-[9999px] w-px h-px pointer-events-none opacity-0">
        <div id="youtube-player" />
      </div>

      {/* Floating Notes (drift upwards when music is playing) */}
      {isPlaying && notes.map((note) => (
        <motion.span
          key={note.id}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ y: -30, opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: note.delay,
            ease: "easeOut"
          }}
          style={{ left: `calc(50% + ${note.x}px)` }}
          className="absolute -top-4 text-xs pointer-events-none select-none text-terracotta/70 font-sans"
        >
          {note.char}
        </motion.span>
      ))}

      {/* Music Control Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 bg-[#fffdf9] border-2 border-[#eee9db] hover:border-terracotta/30 text-charcoal-800 hover:text-terracotta rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors group select-none"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Washi tape visual deco on top of button */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 washi-tape-1 transform -rotate-12 pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Mute/Play Icons */}
        {isPlaying ? (
          <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 text-zinc-400 transition-transform group-hover:scale-110" />
        )}
      </motion.button>
    </div>
  );
}
