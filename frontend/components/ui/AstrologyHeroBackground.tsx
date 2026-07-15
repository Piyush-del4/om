'use client';

import React, { useRef, useEffect } from 'react';

export function AstrologyHeroBackground() {
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

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      mouse.targetX = (relativeX - rect.width / 2) / (rect.width / 2);
      mouse.targetY = (relativeY - rect.height / 2) / (rect.height / 2);
    };

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Star particles
    const particleCount = 60;
    const stars: { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      const starRGB = isDark ? '255, 255, 255' : '15, 23, 42';
      const ringColor = isDark ? 'rgba(204, 143, 51, 0.04)' : 'rgba(160, 110, 34, 0.04)';

      // Mouse Parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const maxTilt = 4;
      const rotateX = -mouse.y * maxTilt;
      const rotateY = mouse.x * maxTilt;
      canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Draw drifting stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRGB}, ${s.opacity})`;
        ctx.fill();
      });

      // Draw astronomical coordinates grid lines in the background
      ctx.beginPath();
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw concentric rings
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 0.8;
      
      const maxRadius = Math.max(width, height) * 0.6;
      for (let r = 100; r < maxRadius; r += 140) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw radial meridian lines
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        ctx.moveTo(centerX + Math.cos(angle) * 80, centerY + Math.sin(angle) * 80);
        ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
