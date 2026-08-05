'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

declare global {
 interface Window {
 YT: any;
 onYouTubeIframeAPIReady: () => void;
 }
}

interface VideoPlayerProps {
 youtubeVideoId: string;
 onEnded?: () => void;
}

// Global script loading state to handle concurrent mounts
let apiLoaded = false;
let callbacks: (() => void)[] = [];

function loadYoutubeApi(callback: () => void) {
 if (typeof window === 'undefined') return;

 if (window.YT && window.YT.Player) {
 callback();
 return;
 }

 callbacks.push(callback);

 if (apiLoaded) return;
 apiLoaded = true;

 window.onYouTubeIframeAPIReady = () => {
 callbacks.forEach((cb) => cb());
 callbacks = [];
 };

 const tag = document.createElement('script');
 tag.src = 'https://www.youtube.com/iframe_api';
 tag.id = 'youtube-iframe-api';
 const firstScriptTag = document.getElementsByTagName('script')[0];
 if (firstScriptTag && firstScriptTag.parentNode) {
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 } else {
 document.head.appendChild(tag);
 }
}

export function VideoPlayer({ youtubeVideoId, onEnded }: VideoPlayerProps) {
 const containerRef = useRef<HTMLDivElement>(null);
 const iframeContainerRef = useRef<HTMLDivElement>(null);
 const playerRef = useRef<any>(null);
 const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

 // States
 const [isPlaying, setIsPlaying] = useState(false);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const [volume, setVolume] = useState(100);
 const [isMuted, setIsMuted] = useState(false);
 const [playbackRate, setPlaybackRate] = useState(1);
 const [isBuffering, setIsBuffering] = useState(false);
 const [isFullscreen, setIsFullscreen] = useState(false);
 const [showControls, setShowControls] = useState(true);

 // Helper: Format seconds into MM:SS or HH:MM:SS
 const formatTime = (seconds: number) => {
 if (isNaN(seconds) || seconds === Infinity || seconds < 0) return '0:00';
 const hrs = Math.floor(seconds / 3600);
 const mins = Math.floor((seconds % 3600) / 60);
 const secs = Math.floor(seconds % 60);

 if (hrs > 0) {
 return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
 }
 return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
 };

 // Sync state changes from player API
 useEffect(() => {
 if (!youtubeVideoId) return;

 let player: any = null;
 let isMounted = true;

 loadYoutubeApi(() => {
 if (!isMounted) return;
 if (!iframeContainerRef.current) return;

 // Ensure target element exists inside container
 iframeContainerRef.current.innerHTML = '<div id="yt-player-embed"></div>';

 player = new window.YT.Player('yt-player-embed', {
 height: '100%',
 width: '100%',
 videoId: youtubeVideoId,
 playerVars: {
 controls: 0, // Hide standard YouTube controls
 rel: 0, // Do not show off-channel related videos
 fs: 0, // Hide native fullscreen button
 modestbranding: 1, // Hide YouTube logo where possible
 disablekb: 1, // Disable keyboard controls inside iframe
 enablejsapi: 1,
 origin: typeof window !== 'undefined' ? window.location.origin : '',
 },
 events: {
 onReady: (event: any) => {
 if (!isMounted) return;
 playerRef.current = event.target;
 setDuration(event.target.getDuration());
 setVolume(event.target.getVolume());
 setIsMuted(event.target.isMuted());
 event.target.setPlaybackRate(playbackRate);
 },
 onStateChange: (event: any) => {
 if (!isMounted) return;
 const state = event.data;

 if (state === window.YT.PlayerState.PLAYING) {
 setIsPlaying(true);
 setIsBuffering(false);
 setDuration(event.target.getDuration());
 } else if (state === window.YT.PlayerState.PAUSED) {
 setIsPlaying(false);
 setIsBuffering(false);
 } else if (state === window.YT.PlayerState.BUFFERING) {
 setIsBuffering(true);
 } else if (state === window.YT.PlayerState.ENDED) {
 setIsPlaying(false);
 setIsBuffering(false);
 onEnded?.();
 }
 },
 },
 });
 });

 return () => {
 isMounted = false;
 if (player && typeof player.destroy === 'function') {
 player.destroy();
 }
 playerRef.current = null;
 };
 }, [youtubeVideoId]);

 // Periodic time updates while video is playing
 useEffect(() => {
 let timer: NodeJS.Timeout;
 if (isPlaying) {
 timer = setInterval(() => {
 if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
 setCurrentTime(playerRef.current.getCurrentTime());
 }
 }, 250);
 }
 return () => {
 if (timer) clearInterval(timer);
 };
 }, [isPlaying]);

 // Sync fullscreen change event
 useEffect(() => {
 const onFullscreenChange = () => {
 setIsFullscreen(!!document.fullscreenElement);
 };
 document.addEventListener('fullscreenchange', onFullscreenChange);
 return () => {
 document.removeEventListener('fullscreenchange', onFullscreenChange);
 };
 }, []);

 // Controls Visibility Auto-Hide Logic
 const triggerShowControls = () => {
 setShowControls(true);
 if (controlsTimeoutRef.current) {
 clearTimeout(controlsTimeoutRef.current);
 }
 if (isPlaying) {
 controlsTimeoutRef.current = setTimeout(() => {
 setShowControls(false);
 }, 3000);
 }
 };

 const handleMouseMove = () => {
 triggerShowControls();
 };

 const handleMouseLeave = () => {
 if (isPlaying) {
 setShowControls(false);
 }
 };

 // Play/Pause Action
 const togglePlay = () => {
 if (!playerRef.current) return;
 if (isPlaying) {
 playerRef.current.pauseVideo();
 } else {
 playerRef.current.playVideo();
 }
 triggerShowControls();
 };

 // Seek Action
 const handleSeek = (time: number) => {
 if (!playerRef.current) return;
 playerRef.current.seekTo(time, true);
 setCurrentTime(time);
 triggerShowControls();
 };

 // Volume Changes
 const handleVolumeChange = (v: number) => {
 setVolume(v);
 if (!playerRef.current) return;
 playerRef.current.setVolume(v);
 if (v > 0 && isMuted) {
 playerRef.current.unMute();
 setIsMuted(false);
 } else if (v === 0 && !isMuted) {
 playerRef.current.mute();
 setIsMuted(true);
 }
 triggerShowControls();
 };

 // Mute/Unmute Toggle
 const toggleMute = () => {
 if (!playerRef.current) return;
 if (isMuted) {
 playerRef.current.unMute();
 setIsMuted(false);
 if (volume === 0) {
 handleVolumeChange(50);
 }
 } else {
 playerRef.current.mute();
 setIsMuted(true);
 }
 triggerShowControls();
 };

 // Fullscreen Action
 const toggleFullscreen = () => {
 if (!containerRef.current) return;
 if (!document.fullscreenElement) {
 containerRef.current.requestFullscreen().catch((err) => {
 console.error('Failed to enter fullscreen:', err);
 });
 } else {
 document.exitFullscreen();
 }
 triggerShowControls();
 };

 // Speed Action
 const handleSpeedChange = (rate: number) => {
 setPlaybackRate(rate);
 if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
 playerRef.current.setPlaybackRate(rate);
 }
 triggerShowControls();
 };

 // Capture clicking outer container to play/pause (ignoring control bar interactions)
 const handleContainerClick = (e: React.MouseEvent) => {
 if ((e.target as HTMLElement).closest('.player-controls')) {
 return;
 }
 togglePlay();
 };

 return (
 <div
 ref={containerRef}
 onMouseMove={handleMouseMove}
 onMouseLeave={handleMouseLeave}
 onClick={handleContainerClick}
 onContextMenu={(e) => e.preventDefault()}
 className="relative aspect-video w-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group select-none cursor-pointer"
 >
 {/* 1. YouTube Iframe Wrapper - Pointer events disabled to prevent redirects & native clicks */}
 <div ref={iframeContainerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

 {/* 2. Semi-transparent click overlay to block interactions and handle central play clicks */}
 <div className="absolute inset-0 w-full h-full bg-white/10 hover:bg-white/20 transition-all duration-300" />

 {/* 3. Center Buffering / Play Overlay */}
 {isBuffering && (
 <div className="absolute inset-0 flex items-center justify-center bg-white/40 pointer-events-none">
 <Loader2 className="w-12 h-12 text-[var(--gold)] animate-spin" />
 </div>
 )}

 {!isPlaying && !isBuffering && (
 <div className="absolute inset-0 flex items-center justify-center bg-white/30 group-hover:bg-white/45 transition-all">
 <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform duration-300">
 <Play className="w-7 h-7 fill-black ml-1" />
 </div>
 </div>
 )}

 {/* 4. Custom Controls Bar Overlay */}
 <div
 className={`player-controls absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/85 to-transparent flex flex-col gap-3 transition-opacity duration-300 ${
 showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
 }`}
 >
 {/* Progress Timeline Slider */}
 <div className="flex items-center gap-3">
 <span className="text-[11px] font-mono select-none" style={{ color: '#e5e5e5' }}>
 {formatTime(currentTime)}
 </span>
 <input
 type="range"
 min={0}
 max={duration || 100}
 value={currentTime}
 onChange={(e) => handleSeek(Number(e.target.value))}
 className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-[var(--gold)] outline-none transition-all hover:h-2"
 style={{
 background: `linear-gradient(to right, var(--gold) ${
 (currentTime / (duration || 1)) * 100
 }%, rgba(255, 255, 255, 0.25) ${(currentTime / (duration || 1)) * 100}%)`,
 }}
 />
 <span className="text-[11px] font-mono select-none" style={{ color: '#e5e5e5' }}>
 {formatTime(duration)}
 </span>
 </div>

 {/* Buttons and Actions */}
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-4">
 {/* Play/Pause Button */}
 <button
 onClick={togglePlay}
 className="hover:text-[var(--gold)] transition-colors p-1"
 style={{ color: '#ffffff' }}
 title={isPlaying ? 'Pause' : 'Play'}
 >
 {isPlaying ? (
 <Pause className="w-5 h-5" color="#ffffff" fill="#ffffff" />
 ) : (
 <Play className="w-5 h-5" color="#ffffff" fill="#ffffff" />
 )}
 </button>

 {/* Volume Control */}
 <div className="flex items-center gap-2 group/volume">
 <button
 onClick={toggleMute}
 className="hover:text-[var(--gold)] transition-colors p-1"
 style={{ color: '#ffffff' }}
 title={isMuted ? 'Unmute' : 'Mute'}
 >
 {isMuted || volume === 0 ? (
 <VolumeX className="w-5 h-5" color="#ffffff" />
 ) : (
 <Volume2 className="w-5 h-5" color="#ffffff" />
 )}
 </button>
 <input
 type="range"
 min={0}
 max={100}
 value={isMuted ? 0 : volume}
 onChange={(e) => handleVolumeChange(Number(e.target.value))}
 className="w-0 group-hover/volume:w-16 h-1 rounded-lg appearance-none cursor-pointer accent-[var(--gold)] outline-none transition-all duration-300"
 style={{
 background: `linear-gradient(to right, var(--gold) ${
 isMuted ? 0 : volume
 }%, rgba(255, 255, 255, 0.25) ${isMuted ? 0 : volume}%)`,
 }}
 />
 </div>
 </div>

 <div className="flex items-center gap-4">
 {/* Speed Controller */}
 <div className="flex items-center gap-1.5">
 <span className="text-[10px] font-medium select-none" style={{ color: '#a3a3a3' }}>Speed:</span>
 <select
 value={playbackRate}
 onChange={(e) => handleSpeedChange(Number(e.target.value))}
 className="bg-gray-100 border border-gray-200 text-gray-900 text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] font-medium cursor-pointer"
 >
 {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
 <option key={s} value={s} className="bg-white text-gray-900">
 {s === 1 ? 'Normal' : `${s}x`}
 </option>
 ))}
 </select>
 </div>

 {/* Fullscreen Button */}
 <button
 onClick={toggleFullscreen}
 className="hover:text-[var(--gold)] transition-colors p-1"
 style={{ color: '#ffffff' }}
 title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
 >
 {isFullscreen ? (
 <Minimize className="w-5 h-5" color="#ffffff" />
 ) : (
 <Maximize className="w-5 h-5" color="#ffffff" />
 )}
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}
