'use client';

import React, { useRef, useEffect } from 'react';

export function GraphologyHeroBackground() {
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

 // Pre-defined relative paths for cursive letter segments
 // Points are normalized around (0, 0)
 const letterPaths = [
 // 'g' cursive segment
 [
 { x: -10, y: -10 }, { x: 0, y: -15 }, { x: 10, y: -10 }, { x: 10, y: 0 },
 { x: 0, y: 5 }, { x: -10, y: 0 }, { x: -10, y: -10 }, // loop
 { x: 10, y: -10 }, { x: 10, y: 15 }, { x: 5, y: 25 }, { x: -5, y: 25 }, 
 { x: -10, y: 15 }, { x: 0, y: 5 }, { x: 20, y: 5 } // lower loop & exit
 ],
 // 't' cursive segment with crossbar
 [
 { x: -10, y: 10 }, { x: 0, y: 10 }, { x: 0, y: -25 }, { x: 0, y: 10 }, { x: 15, y: 10 }, // stem & exit
 { x: -15, y: -10 }, { x: 15, y: -10 } // crossbar
 ],
 // 'y' cursive segment
 [
 { x: -15, y: -10 }, { x: -10, y: 0 }, { x: 0, y: 0 }, { x: 5, y: -10 },
 { x: 5, y: 15 }, { x: 0, y: 25 }, { x: -10, y: 25 }, { x: -15, y: 15 },
 { x: 0, y: 5 }, { x: 15, y: 5 }
 ],
 // 'a' cursive segment
 [
 { x: -15, y: 0 }, { x: -5, y: -12 }, { x: 5, y: -12 }, { x: 15, y: 0 },
 { x: 5, y: 12 }, { x: -5, y: 12 }, { x: -15, y: 0 }, // oval loop
 { x: 15, y: -5 }, { x: 15, y: 10 }, { x: 25, y: 10 } // stem & exit
 ],
 // Cursive loop wave (neural pulse)
 [
 { x: -30, y: 0 }, { x: -15, y: -15 }, { x: 0, y: 0 }, { x: 15, y: 15 },
 { x: 30, y: 0 }, { x: 45, y: -15 }, { x: 60, y: 0 }
 ]
 ];

 interface StrokePath {
 x: number;
 y: number;
 vx: number;
 vy: number;
 points: { x: number; y: number }[];
 scale: number;
 opacity: number;
 pulsePos: number; // Position of neural impulse along the path (0 to 1)
 pulseSpeed: number;
 slantAngle: number; // Subtle slant tilt in radians
 targetSlant: number;
 }

 const strokeCount = 14;
 const strokes: StrokePath[] = [];

 for (let i = 0; i < strokeCount; i++) {
 strokes.push({
 x: Math.random() * width,
 y: Math.random() * height,
 vx: (Math.random() - 0.5) * 0.1,
 vy: (Math.random() - 0.5) * 0.1,
 points: letterPaths[Math.floor(Math.random() * letterPaths.length)],
 scale: Math.random() * 0.8 + 0.8,
 opacity: Math.random() * 0.05 + 0.02, // Reduced base opacity (2% to 7%)
 pulsePos: Math.random(),
 pulseSpeed: Math.random() * 0.004 + 0.002,
 slantAngle: 0,
 targetSlant: 0
 });
 }

 const render = () => {
 ctx.clearRect(0, 0, width, height);

    const goldColor = '#b07a2a';
    const goldRGB = '176, 122, 42';

 // 1. Mouse Parallax Tilt
 mouse.x += (mouse.targetX - mouse.x) * 0.05;
 mouse.y += (mouse.targetY - mouse.y) * 0.05;

 const maxTilt = 4;
 const rotateX = -mouse.y * maxTilt;
 const rotateY = mouse.x * maxTilt;
 canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

 // 2. Render Handwriting/Brainwave strokes
 strokes.forEach((s) => {
 s.x += s.vx;
 s.y += s.vy;

 // Wrap around boundaries
 if (s.x < -100) s.x = width + 100;
 if (s.x > width + 100) s.x = -100;
 if (s.y < -100) s.y = height + 100;
 if (s.y > height + 100) s.y = -100;

 // Check if mouse is hovering nearby to warp the slant (Graphology slant interaction)
 let isNearMouse = false;
 if (mouse.rawX !== -9999) {
 const dist = Math.hypot(s.x - mouse.rawX, s.y - mouse.rawY);
 if (dist < 200) {
 isNearMouse = true;
 // Induce a slant skew based on cursor relative positioning
 s.targetSlant = (mouse.rawX - s.x) / 300; // warp slant angle
 }
 }

 if (!isNearMouse) {
 s.targetSlant = 0; // return to upright
 }

 s.slantAngle += (s.targetSlant - s.slantAngle) * 0.05;

 // Compute final opacity (soft and subtle)
 const finalOpacity = isNearMouse ? s.opacity * 2.2 : s.opacity;

 // Draw the stroke path
 ctx.save();
 ctx.translate(s.x, s.y);
 ctx.scale(s.scale, s.scale);
 ctx.transform(1, 0, Math.tan(s.slantAngle), 1, 0, 0); // Apply slant transform skew!

 // Draw path line
 ctx.beginPath();
 const p0 = s.points[0];
 ctx.moveTo(p0.x, p0.y);
 for (let j = 1; j < s.points.length; j++) {
 const p = s.points[j];
 ctx.lineTo(p.x, p.y);
 }
 // Always draw as a premium golden line with responsive opacity
 ctx.strokeStyle = `rgba(${goldRGB}, ${finalOpacity})`;
 ctx.lineWidth = 1.2;
 ctx.stroke();

 ctx.restore();
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
