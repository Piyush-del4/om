'use client';

import React, { useRef, useEffect } from 'react';

export function CosmicHeroBackground() {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;

 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 let animationFrameId: number;
 
 const getDimensions = () => {
 const parent = canvas.parentElement;
 return {
 w: parent ? parent.clientWidth : window.innerWidth,
 h: parent ? parent.clientHeight : window.innerHeight
 };
 };
 
 let { w: width, h: height } = getDimensions();
 canvas.width = width;
 canvas.height = height;

 // Mouse positions for parallax and interactive connections
 let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, rawX: -9999, rawY: -9999 };
 
 const handleMouseMove = (e: MouseEvent) => {
 const rect = canvas.getBoundingClientRect();
 const relativeX = e.clientX - rect.left;
 const relativeY = e.clientY - rect.top;

 // Normalize targetX and targetY between -1 and 1 for parallax
 mouse.targetX = (relativeX - rect.width / 2) / (rect.width / 2);
 mouse.targetY = (relativeY - rect.height / 2) / (rect.height / 2);
 // Raw coordinates relative to canvas bounding box for distance checks
 mouse.rawX = relativeX;
 mouse.rawY = relativeY;
 };

 const handleMouseLeave = () => {
 mouse.rawX = -9999;
 mouse.rawY = -9999;
 };

 const handleResize = () => {
 if (!canvas) return;
 const dims = getDimensions();
 width = canvas.width = dims.w;
 height = canvas.height = dims.h;
 };

 window.addEventListener('mousemove', handleMouseMove);
 window.addEventListener('mouseleave', handleMouseLeave);
 window.addEventListener('resize', handleResize);

 // Initialize particles (stars)
 const particleCount = 70;
 const particles: { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[] = [];
 for (let i = 0; i < particleCount; i++) {
 particles.push({
 x: Math.random() * width,
 y: Math.random() * height,
 vx: (Math.random() - 0.5) * 0.12, // slow random speed
 vy: (Math.random() - 0.5) * 0.12,
 radius: Math.random() * 1.5 + 0.5,
 opacity: Math.random() * 0.2 + 0.2, // 0.2 to 0.4 opacity
 });
 }

 // Define Constellations
 const constellationTemplates = [
 {
 name: 'मेष',
 points: [{ x: 0, y: 0 }, { x: 40, y: -20 }, { x: 75, y: -12 }, { x: 100, y: 15 }],
 connections: [[0, 1], [1, 2], [2, 3]]
 },
 {
 name: 'वृषभ',
 points: [{ x: 0, y: 0 }, { x: -25, y: -25 }, { x: -55, y: -35 }, { x: -20, y: 20 }, { x: 20, y: 40 }, { x: 45, y: 50 }],
 connections: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5]]
 },
 {
 name: 'मिथुन',
 points: [{ x: -20, y: -20 }, { x: 0, y: -30 }, { x: 20, y: -40 }, { x: -30, y: 15 }, { x: -10, y: 5 }, { x: 10, y: -5 }, { x: -40, y: 50 }, { x: -20, y: 35 }],
 connections: [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5], [3, 6], [4, 7]]
 },
 {
 name: 'सिंह',
 points: [{ x: 25, y: 0 }, { x: 45, y: 12 }, { x: 55, y: -8 }, { x: 45, y: -35 }, { x: 25, y: -30 }, { x: 0, y: -18 }, { x: -25, y: -5 }, { x: -35, y: 18 }, { x: -18, y: 28 }, { x: 0, y: 18 }],
 connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 5], [0, 9]]
 },
 {
 name: 'तुला',
 points: [{ x: 0, y: -30 }, { x: -30, y: 0 }, { x: 30, y: 0 }, { x: -20, y: 40 }, { x: 20, y: 40 }, { x: 0, y: 60 }],
 connections: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 5], [4, 5]]
 },
 {
 name: 'वृश्चिक',
 points: [{ x: -40, y: -30 }, { x: -20, y: -20 }, { x: 0, y: -10 }, { x: 10, y: 10 }, { x: 15, y: 35 }, { x: 5, y: 55 }, { x: -15, y: 65 }, { x: -35, y: 60 }, { x: -45, y: 40 }],
 connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
 }
 ];

 const constellations = constellationTemplates.map((t, idx) => {
 // Space constellations horizontally across the screen in a belt
 const count = constellationTemplates.length;
 const spacingX = width / (count + 1);
 const gridX = (idx + 1) * spacingX;
 // Stagger them slightly vertically for a natural cosmic wave flow
 const staggerY = (idx % 2 === 0 ? -40 : 40);
 const gridY = (height / 2) + staggerY;

 return {
 name: t.name,
 x: gridX + (Math.random() - 0.5) * 100,
 y: gridY + (Math.random() - 0.5) * 80,
 vx: (Math.random() - 0.5) * 0.05,
 vy: (Math.random() - 0.5) * 0.05,
 points: t.points,
 connections: t.connections,
 opacity: 0.05,
 targetOpacity: 0.05,
 };
 });

 const render = () => {
 ctx.clearRect(0, 0, width, height);

    // Light-theme canvas colors
    const starRGB = '15, 23, 42';
    const starGlow = 'rgba(15, 23, 42, 0.15)';
    const goldColor = '#a06e22';
    const goldRGB = '160, 110, 34';
    const textColor = 'rgba(160, 110, 34, ';

 // 1. Smooth mouse lerp for 3D parallax tilt
 mouse.x += (mouse.targetX - mouse.x) * 0.05;
 mouse.y += (mouse.targetY - mouse.y) * 0.05;

 const maxTilt = 6; // subtle parallax
 const rotateX = -mouse.y * maxTilt;
 const rotateY = mouse.x * maxTilt;
 canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

 // 2. Draw drifting background particles (AMCient stars)
 particles.forEach((p) => {
 p.x += p.vx;
 p.y += p.vy;

 // Wrap around boundaries
 if (p.x < 0) p.x = width;
 if (p.x > width) p.x = 0;
 if (p.y < 0) p.y = height;
 if (p.y > height) p.y = 0;

 ctx.beginPath();
 ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
 ctx.fillStyle = `rgba(${starRGB}, ${p.opacity})`;
 ctx.shadowBlur = 2;
 ctx.shadowColor = starGlow;
 ctx.fill();
 ctx.shadowBlur = 0; // reset
 });

 // 3. Connect AMCient stars to mouse or each other if close
 if (mouse.rawX !== -9999) {
 // Find distance and draw dynamic web links
 for (let i = 0; i < particles.length; i++) {
 const pi = particles[i];
 const distMouse = Math.hypot(pi.x - mouse.rawX, pi.y - mouse.rawY);
 
 if (distMouse < 160) {
 const alpha = (1 - distMouse / 160) * 0.25;
 ctx.beginPath();
 ctx.moveTo(pi.x, pi.y);
 ctx.lineTo(mouse.rawX, mouse.rawY);
 ctx.strokeStyle = `rgba(${goldRGB}, ${alpha})`;
 ctx.lineWidth = 0.8;
 ctx.stroke();

 // Connect nearby stars too
 for (let j = i + 1; j < particles.length; j++) {
 const pj = particles[j];
 const distStars = Math.hypot(pi.x - pj.x, pi.y - pj.y);
 if (distStars < 90) {
 const innerAlpha = (1 - distStars / 90) * 0.12 * (1 - distMouse / 160);
 ctx.beginPath();
 ctx.moveTo(pi.x, pi.y);
 ctx.lineTo(pj.x, pj.y);
 ctx.strokeStyle = `rgba(${starRGB}, ${innerAlpha})`;
 ctx.lineWidth = 0.5;
 ctx.stroke();
 }
 }
 }
 }
 }

 // 4. Update and Draw Zodiac Constellations
 constellations.forEach((c) => {
 // Slow drift
 c.x += c.vx;
 c.y += c.vy;

 // Wrap around boundaries
 if (c.x < -100) c.x = width + 100;
 if (c.x > width + 100) c.x = -100;
 if (c.y < -100) c.y = height + 100;
 if (c.y > height + 100) c.y = -100;

 // Determine if mouse is hovering close to the constellation center
 let isClose = false;
 if (mouse.rawX !== -9999) {
 const dist = Math.hypot(c.x - mouse.rawX, c.y - mouse.rawY);
 if (dist < 200) {
 isClose = true;
 // Higher opacity when closer
 c.targetOpacity = 0.15 + (1 - dist / 200) * 0.75;
 }
 }

 if (!isClose) {
 c.targetOpacity = 0.06; // faint AMCient opacity
 }

 // Interpolate opacity
 c.opacity += (c.targetOpacity - c.opacity) * 0.08;

 // Draw Constellation Lines
 ctx.beginPath();
 c.connections.forEach(([i1, i2]) => {
 const p1 = c.points[i1];
 const p2 = c.points[i2];
 ctx.moveTo(c.x + p1.x, c.y + p1.y);
 ctx.lineTo(c.x + p2.x, c.y + p2.y);
 });
 ctx.strokeStyle = `rgba(${goldRGB}, ${c.opacity * 0.8})`;
 ctx.lineWidth = 1;
 ctx.setLineDash([3, 5]);
 ctx.stroke();
 ctx.setLineDash([]); // reset

 // Draw Constellation Stars (Nodes)
 c.points.forEach((p) => {
 const px = c.x + p.x;
 const py = c.y + p.y;

 // Outer Glow
 ctx.beginPath();
 ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${c.opacity * 0.2})`;
 ctx.fill();

 // Star Core
 ctx.beginPath();
 ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${Math.min(1, c.opacity + 0.35)})`;
 ctx.shadowBlur = c.opacity > 0.1 ? 8 : 0;
 ctx.shadowColor = goldColor;
 ctx.fill();
 ctx.shadowBlur = 0; // reset
 });

 // Draw Constellation Label Text
 if (c.opacity > 0.12) {
 ctx.font = 'italic tracking-widest 10px Georgia, serif';
 ctx.fillStyle = `${textColor}${(c.opacity - 0.12) * 1.2})`;
 ctx.textAlign = 'center';
 ctx.fillText(c.name, c.x, c.y - 45);

 // Subtle horizontal underline
 ctx.beginPath();
 ctx.moveTo(c.x - 15, c.y - 38);
 ctx.lineTo(c.x + 15, c.y - 38);
 ctx.strokeStyle = `${textColor}${(c.opacity - 0.12) * 0.6})`;
 ctx.lineWidth = 0.5;
 ctx.stroke();
 }
 });

 animationFrameId = requestAnimationFrame(render);
 };

 render();

 return () => {
 window.removeEventListener('mousemove', handleMouseMove);
 window.removeEventListener('mouseleave', handleMouseLeave);
 window.removeEventListener('resize', handleResize);
 cancelAnimationFrame(animationFrameId);
 };
 }, []);

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
