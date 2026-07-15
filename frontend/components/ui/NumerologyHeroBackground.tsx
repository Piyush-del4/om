'use client';

import React, { useRef, useEffect } from 'react';

export function NumerologyHeroBackground() {
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

    // Mouse coordinates for interactive lines and tilt
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
      const dims = getDimensions();
      width = canvas.width = dims.w;
      height = canvas.height = dims.h;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Initialize number nodes
    interface NumberNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: string;
      baseValue: string; // The core digit or symbol
      size: number;
      opacity: number;
      isMaster: boolean;
      changeTimer: number; // Cycles digits briefly when close to cursor
    }

    const nodeCount = 65;
    const nodes: NumberNode[] = [];
    const pool = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33', 'Φ', '∞', '+', '='];

    for (let i = 0; i < nodeCount; i++) {
      const val = pool[Math.floor(Math.random() * pool.length)];
      const isMasterNum = val === '11' || val === '22' || val === '33';
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        value: val,
        baseValue: val,
        size: isMasterNum ? 16 : Math.random() * 6 + 10,
        opacity: Math.random() * 0.25 + 0.15,
        isMaster: isMasterNum,
        changeTimer: 0
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check current theme dynamically for contrast adaptive rendering
      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      const starRGB = isDark ? '255, 255, 255' : '15, 23, 42'; // Dark slate in light mode
      const goldColor = isDark ? '#cc8f33' : '#b07a2a';
      const goldRGB = isDark ? '204, 143, 51' : '176, 122, 42';

      // 1. Parallax Tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const maxTilt = 5;
      const rotateX = -mouse.y * maxTilt;
      const rotateY = mouse.x * maxTilt;
      canvas.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // 2. Draw Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap boundaries
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        let finalOpacity = n.opacity;
        let finalColor = `rgba(${starRGB}, ${finalOpacity})`;
        let finalGlow = 0;

        // Check distance to mouse
        let isNearMouse = false;
        if (mouse.rawX !== -9999) {
          const dist = Math.hypot(n.x - mouse.rawX, n.y - mouse.rawY);
          if (dist < 180) {
            isNearMouse = true;
            const factor = (1 - dist / 180);
            finalOpacity = n.opacity + factor * 0.65;
            finalColor = `rgba(${goldRGB}, ${finalOpacity})`;
            finalGlow = factor * 10;

            // Decryption matrix change digits dynamically
            n.changeTimer += 1;
            if (n.changeTimer > 15) {
              n.changeTimer = 0;
              // Cycle through digits if not a master number/symbol
              if (!n.isMaster && n.baseValue !== 'Φ' && n.baseValue !== '∞' && n.baseValue !== '+' && n.baseValue !== '=') {
                n.value = Math.floor(Math.random() * 9 + 1).toString();
              }
            }
          }
        }

        if (!isNearMouse && n.value !== n.baseValue) {
          // Reset value back to original
          n.value = n.baseValue;
        }

        // Draw the text (Pythagorean matrix value)
        ctx.font = n.isMaster ? `bold ${n.size}px Georgia, serif` : `${n.size}px monospace`;
        ctx.fillStyle = finalColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (finalGlow > 0) {
          ctx.shadowBlur = finalGlow;
          ctx.shadowColor = goldColor;
        }
        ctx.fillText(n.value, n.x, n.y);
        ctx.shadowBlur = 0; // reset
      });

      // 3. Draw connecting grid lines between nearby active numbers
      if (mouse.rawX !== -9999) {
        for (let i = 0; i < nodes.length; i++) {
          const ni = nodes[i];
          const distMouse = Math.hypot(ni.x - mouse.rawX, ni.y - mouse.rawY);

          if (distMouse < 180) {
            // Draw connection line to mouse
            const alphaMouse = (1 - distMouse / 180) * 0.18;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(mouse.rawX, mouse.rawY);
            ctx.strokeStyle = `rgba(${goldRGB}, ${alphaMouse})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // Connect nearby nodes that are also near the cursor
            for (let j = i + 1; j < nodes.length; j++) {
              const nj = nodes[j];
              const distNodes = Math.hypot(ni.x - nj.x, ni.y - nj.y);
              if (distNodes < 110) {
                const distMouseJ = Math.hypot(nj.x - mouse.rawX, nj.y - mouse.rawY);
                if (distMouseJ < 180) {
                  const alphaNodes = (1 - distNodes / 110) * 0.12 * (1 - distMouse / 180);
                  ctx.beginPath();
                  ctx.moveTo(ni.x, ni.y);
                  ctx.lineTo(nj.x, nj.y);
                  ctx.strokeStyle = `rgba(${goldRGB}, ${alphaNodes})`;
                  ctx.lineWidth = 0.4;
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

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
