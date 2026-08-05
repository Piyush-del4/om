'use client';

import React, { useRef, useEffect } from 'react';

interface TarotBackgroundProps {
 suit: 'none' | 'wands' | 'cups' | 'swords' | 'pentacles';
}

export function TarotHeroBackground({ suit }: TarotBackgroundProps) {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;

 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 let animationFrameId: number;
 let width = canvas.width = window.innerWidth;
 let height = canvas.height = window.innerHeight;

 let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, rawX: -9999, rawY: -9999 };

 const handleMouseMove = (e: MouseEvent) => {
 const rect = canvas.getBoundingClientRect();
 const relativeX = e.clientX - rect.left;
 const relativeY = e.clientY - rect.top;

 mouse.targetX = (relativeX - rect.width / 2) / (rect.width / 2);
 mouse.targetY = (relativeY - rect.height / 2) / (rect.height / 2);
 mouse.rawX = relativeX;
 mouse.rawY = relativeY;
 };

 const handleMouseLeave = () => {
 mouse.rawX = -9999;
 mouse.rawY = -9999;
 };

 const handleResize = () => {
 if (!canvas) return;
 const parent = canvas.parentElement;
 width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
 height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
 };

 window.addEventListener('mousemove', handleMouseMove);
 window.addEventListener('mouseleave', handleMouseLeave);
 window.addEventListener('resize', handleResize);

 // Particles setup
 interface TarotParticle {
 x: number;
 y: number;
 vx: number;
 vy: number;
 size: number;
 opacity: number;
 color: string;
 life: number;
 maxLife: number;
 angle?: number;
 speed?: number;
 }

 const particleCount = 80;
 const particles: TarotParticle[] = [];

 const createParticle = (initRandom = false): TarotParticle => {
 let x = Math.random() * width;
 let y = initRandom ? Math.random() * height : height + 10;
 let vx = (Math.random() - 0.5) * 0.4;
 let vy = -Math.random() * 0.8 - 0.2;
 let size = Math.random() * 2 + 1;
 let opacity = Math.random() * 0.3 + 0.15;
 
 // Default gold color
 let color = '176, 122, 42';
 let maxLife = Math.random() * 200 + 200;

 // Adjust particle behaviors based on active Suit / Element
 if (suit === 'wands') { // Fire
 color = '227, 91, 61'; // Orange-red sparks
 vy = -Math.random() * 1.5 - 0.5; // Rise faster
 size = Math.random() * 2.5 + 1;
 } else if (suit === 'cups') { // Water
 color = '79, 147, 227'; // Teal-blue
 vy = (Math.random() - 0.5) * 0.3; // Drift slowly
 vx = Math.random() * 0.8 + 0.2; // Move sideways
 } else if (suit === 'swords') { // Air
 color = '180, 180, 200'; // Silver-white
 vx = (Math.random() - 0.5) * 1.5;
 vy = (Math.random() - 0.5) * 1.5; // Wind currents
 size = Math.random() * 1.5 + 0.5;
 } else if (suit === 'pentacles') { // Earth
 color = '74, 150, 105'; // Green-gold crystals
 vy = Math.random() * 0.3 + 0.1; // Float downwards slowly
 y = initRandom ? Math.random() * height : -10;
 }

 return {
 x,
 y,
 vx,
 vy,
 size,
 opacity,
 color,
 life: 0,
 maxLife,
 angle: Math.random() * Math.PI * 2,
 speed: Math.random() * 0.02
 };
 };

 // Populate initially
 for (let i = 0; i < particleCount; i++) {
 particles.push(createParticle(true));
 }

 const render = () => {
 ctx.clearRect(0, 0, width, height);

 // Parallax Tilt
 mouse.x += (mouse.targetX - mouse.x) * 0.05;
 mouse.y += (mouse.targetY - mouse.y) * 0.05;

 const maxTilt = 4;
 const rotateX = -mouse.y * maxTilt;
 const rotateY = mouse.x * maxTilt;
 canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

 // Render & Update Particles
 for (let i = 0; i < particles.length; i++) {
 const p = particles[i];
 p.life++;

 // Physics updates
 if (suit === 'cups') { // Wave currents
 p.angle = (p.angle || 0) + (p.speed || 0.01);
 p.y += Math.sin(p.angle) * 0.3 + p.vy;
 p.x += p.vx;
 } else if (suit === 'swords') { // Swirls
 p.x += p.vx;
 p.y += p.vy;
 } else {
 p.x += p.vx;
 p.y += p.vy;
 }

 // Draw particle
 ctx.beginPath();
 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
 ctx.fillStyle = `rgba(${p.color}, ${p.opacity * (1 - p.life / p.maxLife)})`;
 
 // Embers / Crystals shadow glow
 if (suit === 'wands' || suit === 'pentacles') {
 ctx.shadowBlur = 4;
 ctx.shadowColor = `rgb(${p.color})`;
 }
 ctx.fill();
 ctx.shadowBlur = 0; // reset

 // Recycle dead particles
 if (p.life >= p.maxLife || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
 particles[i] = createParticle(false);
 }
 }

 // Draw faint connections to mouse
 if (mouse.rawX !== -9999) {
 particles.forEach((p) => {
 const dist = Math.hypot(p.x - mouse.rawX, p.y - mouse.rawY);
 if (dist < 150) {
 const alpha = (1 - dist / 150) * 0.15;
 ctx.beginPath();
 ctx.moveTo(p.x, p.y);
 ctx.lineTo(mouse.rawX, mouse.rawY);
 ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
 ctx.lineWidth = 0.5;
 ctx.stroke();
 }
 });
 }

 // Faint central sacred geometry star matrix in the background
 ctx.beginPath();
 const centerX = width / 2;
 const centerY = height / 2;
 const radius = Math.min(width, height) * 0.3;
 ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
 ctx.strokeStyle = 'rgba(160, 110, 34, 0.05)';
 ctx.lineWidth = 1;
 ctx.stroke();

 // Dashed inner circles
 ctx.beginPath();
 ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
 ctx.setLineDash([4, 6]);
 ctx.stroke();
 ctx.setLineDash([]);

 animationFrameId = requestAnimationFrame(render);
 };

 render();

 return () => {
 window.removeEventListener('mousemove', handleMouseMove);
 window.removeEventListener('mouseleave', handleMouseLeave);
 window.removeEventListener('resize', handleResize);
 cancelAnimationFrame(animationFrameId);
 };
 }, [suit]); // Re-run effect when active suit/element shifts

 return (
 <div
 ref={containerRef}
 className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
 >
 <canvas
 ref={canvasRef}
 className="w-full h-full transition-transform duration-300 ease-out"
 style={{ transformStyle: 'preserve-3d' }}
 />
 </div>
 );
}
