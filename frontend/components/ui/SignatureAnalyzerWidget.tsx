'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Trash2, Zap, Award, Edit } from 'lucide-react';
import { GoldCard } from './GoldCard';

interface MetricTag {
 label: string;
 desc: string;
 type: 'slant' | 'baseline' | 'underline' | 'speed';
}

export function SignatureAnalyzerWidget() {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [isDrawing, setIsDrawing] = useState(false);
 const [points, setPoints] = useState<{ x: number; y: number; t: number }[]>([]);
 const [metrics, setMetrics] = useState<MetricTag[]>([]);
 const [isAnalyzed, setIsAnalyzed] = useState(false);

 // Clear signature pad
 const handleClear = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawGrid(canvas, ctx);
 setPoints([]);
 setMetrics([]);
 setIsAnalyzed(false);
 };

 const drawGrid = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
 const gridColor = 'rgba(160, 110, 34, 0.06)';
 const centerColor = 'rgba(160, 110, 34, 0.15)';

 ctx.save();
 // Faint grid lines
 ctx.strokeStyle = gridColor;
 ctx.lineWidth = 0.8;
 const step = 20;

 for (let x = step; x < canvas.width; x += step) {
 ctx.beginPath();
 ctx.moveTo(x, 0);
 ctx.lineTo(x, canvas.height);
 ctx.stroke();
 }

 for (let y = step; y < canvas.height; y += step) {
 ctx.beginPath();
 ctx.moveTo(0, y);
 ctx.lineTo(canvas.width, y);
 ctx.stroke();
 }

 // Centered horizontal baseline guide
 ctx.beginPath();
 ctx.strokeStyle = centerColor;
 ctx.lineWidth = 1;
 ctx.setLineDash([4, 6]);
 ctx.moveTo(10, canvas.height / 2 + 20);
 ctx.lineTo(canvas.width - 10, canvas.height / 2 + 20);
 ctx.stroke();
 ctx.restore();
 };

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 // Handle high DPI screens
 const rect = canvas.getBoundingClientRect();
 canvas.width = rect.width;
 canvas.height = rect.height;

 drawGrid(canvas, ctx);
 }, []);

 const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
 const canvas = canvasRef.current;
 if (!canvas) return { x: 0, y: 0 };
 const rect = canvas.getBoundingClientRect();

 let clientX = 0;
 let clientY = 0;

 if ('touches' in e) {
 if (e.touches.length === 0) return { x: 0, y: 0 };
 clientX = e.touches[0].clientX;
 clientY = e.touches[0].clientY;
 } else {
 clientX = e.clientX;
 clientY = e.clientY;
 }

 return {
 x: clientX - rect.left,
 y: clientY - rect.top
 };
 };

 const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
 e.preventDefault();
 const pos = getMousePos(e);
 setIsDrawing(true);
 setPoints([{ ...pos, t: Date.now() }]);
 };

 const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
 if (!isDrawing) return;
 e.preventDefault();
 
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 const pos = getMousePos(e);
 const newPoints = [...points, { ...pos, t: Date.now() }];
 setPoints(newPoints);

 // Draw lines smoothly using quadratic curves
 ctx.beginPath();
 ctx.strokeStyle = '#cc8f33';
 ctx.lineWidth = 2.5;
 ctx.lineCap = 'round';
 ctx.lineJoin = 'round';
 
 const p1 = newPoints[newPoints.length - 2];
 const p2 = newPoints[newPoints.length - 1];
 
 ctx.moveTo(p1.x, p1.y);
 ctx.lineTo(p2.x, p2.y);
 ctx.stroke();

 // Renders real-time analysis tags on reaching a good sample size
 if (newPoints.length > 25) {
 analyzeSignature(newPoints);
 }
 };

 const stopDrawing = () => {
 setIsDrawing(false);
 };

 const analyzeSignature = (strokePoints: typeof points) => {
 if (strokePoints.length < 10) return;

 const canvas = canvasRef.current;
 if (!canvas) return;

 const computedMetrics: MetricTag[] = [];

 // 1. Analyze Slant (Slope of Vertical strokes)
 // Find segments where Y changes significantly
 let verticalSlopes: number[] = [];
 for (let i = 1; i < strokePoints.length; i++) {
 const p1 = strokePoints[i - 1];
 const p2 = strokePoints[i];
 const dy = p2.y - p1.y;
 const dx = p2.x - p1.x;

 if (Math.abs(dy) > 3) {
 // Compute slant angle (skew relative to vertical)
 const angle = Math.atan2(dx, -dy); // 0 is straight vertical
 verticalSlopes.push(angle);
 }
 }

 const avgSlant = verticalSlopes.length > 0
 ? verticalSlopes.reduce((acc, v) => acc + v, 0) / verticalSlopes.length
 : 0;

 // Convert avgSlant (radians) to degrees slant
 const slantDegrees = avgSlant * (180 / Math.PI);
 
 if (slantDegrees > 8) {
 computedMetrics.push({
 type: 'slant',
 label: 'Expressive Slant (Right Slant)',
 desc: 'Expresses feelings openly. Empathetic, friendly, and socially responsive.'
 });
 } else if (slantDegrees < -8) {
 computedMetrics.push({
 type: 'slant',
 label: 'Reserved Slant (Left Slant)',
 desc: 'Reserved, reflective, cautious in showing emotions, keeps feelings guarded.'
 });
 } else {
 computedMetrics.push({
 type: 'slant',
 label: 'Controlled Baseline (Vertical)',
 desc: 'Highly analytical, objective, self-disciplined, keeps head over heart.'
 });
 }

 // 2. Baseline Slope (Drift from starting side to ending side)
 // Get X boundary ranges to check slope
 const sortedByX = [...strokePoints].sort((a, b) => a.x - b.x);
 const leftmost = sortedByX[0];
 const rightmost = sortedByX[sortedByX.length - 1];

 if (leftmost && rightmost && rightmost.x - leftmost.x > 60) {
 const dy = rightmost.y - leftmost.y; // positive is downhill (Y goes down screen)
 if (dy < -12) {
 computedMetrics.push({
 type: 'baseline',
 label: 'Ascending Baseline (Uphill)',
 desc: 'Indicates high ambition, optimism, fighting spirit, and future-oriented goals.'
 });
 } else if (dy > 12) {
 computedMetrics.push({
 type: 'baseline',
 label: 'Descending Baseline (Downhill)',
 desc: 'Reflects caution, temporary fatigue, deep realism, or logical skepticism.'
 });
 } else {
 computedMetrics.push({
 type: 'baseline',
 label: 'Horizontal Baseline (Straight)',
 desc: 'Emotionally stable, composed, reliable, and realistic under pressure.'
 });
 }
 }

 // 3. Signature Underline Detector
 // Check if there are horizontal lines drawn in the bottom 35% of the canvas bounding box
 const lowestY = Math.max(...strokePoints.map(p => p.y));
 const highestY = Math.min(...strokePoints.map(p => p.y));
 const verticalSpan = lowestY - highestY;
 const lowerBoundary = lowestY - (verticalSpan * 0.35);

 // Look for a continuous horizontal-ish stroke in the lower region
 let hasUnderline = false;
 let horizontalSegmentsCount = 0;
 for (let i = 2; i < strokePoints.length; i++) {
 const p1 = strokePoints[i - 1];
 const p2 = strokePoints[i];
 if (p1.y > lowerBoundary && p2.y > lowerBoundary) {
 const dx = Math.abs(p2.x - p1.x);
 const dy = Math.abs(p2.y - p1.y);
 if (dx > 4 && dy < 1.5) {
 horizontalSegmentsCount++;
 }
 }
 }

 if (horizontalSegmentsCount > 8) {
 hasUnderline = true;
 }

 if (hasUnderline) {
 computedMetrics.push({
 type: 'underline',
 label: 'Strong Underline (Support Line)',
 desc: 'High self-reliance, executive capability, confidence, and desire to lead.'
 });
 }

 // 4. Drawing Speed / Energy Impulse
 // Average time elapsed per pixel distance
 let totalDist = 0;
 let totalTime = 0;
 for (let i = 1; i < strokePoints.length; i++) {
 const p1 = strokePoints[i - 1];
 const p2 = strokePoints[i];
 const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
 const dt = p2.t - p1.t;
 totalDist += dist;
 if (dt < 150) { // filter out pauses
 totalTime += dt;
 }
 }

 const avgSpeed = totalDist > 0 ? totalTime / totalDist : 0; // ms per pixel

 if (avgSpeed < 10 && totalDist > 100) { // fast drawing speed
 computedMetrics.push({
 type: 'speed',
 label: 'Dynamic Motor Speed (High Drive)',
 desc: 'Quick mental processing, goal-driven efficiency, highly active temperament.'
 });
 } else if (avgSpeed >= 10 && totalDist > 100) {
 computedMetrics.push({
 type: 'speed',
 label: 'Deliberate Stroke (Precision)',
 desc: 'Meticulous attention to detail, cautious planner, values accuracy.'
 });
 }

 setMetrics(computedMetrics);
 setIsAnalyzed(true);
 };

 return (
 <div className="w-full space-y-6 relative z-20">
 <GoldCard className="border border-[var(--gold-300)] p-6 flex flex-col space-y-4 shadow-[0_4px_30px_rgba(204,143,51,0.06)] relative">
 <div className="flex justify-between items-center">
 <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold flex items-center gap-1.5 animate-pulse">
 <Sparkles className="w-3.5 h-3.5" /> Interactive Signature Scanner
 </span>
 <button
 onClick={handleClear}
 className="text-gray-600 hover:text-red-400 p-1 rounded transition-colors duration-300 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold border border-gray-200 px-2.5 py-1"
 >
 <Trash2 className="w-3.5 h-3.5" /> Reset Pad
 </button>
 </div>

 {/* Signature Canvas Drawing Area */}
 <div className="relative w-full h-48 bg-gray-50/70 border border-[var(--gold-200)] rounded-2xl overflow-hidden cursor-crosshair">
 <canvas
 ref={canvasRef}
 onMouseDown={startDrawing}
 onMouseMove={draw}
 onMouseUp={stopDrawing}
 onMouseLeave={stopDrawing}
 onTouchStart={startDrawing}
 onTouchMove={draw}
 onTouchEnd={stopDrawing}
 className="absolute inset-0 w-full h-full"
 />
 {points.length === 0 && (
 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center text-gray-500 text-xs font-light p-4 space-y-2">
 <Edit className="w-6 h-6 text-neutral-700 animate-bounce" />
 <p>Draw your signature here using your mouse or touch screen to analyze it in real-time.</p>
 </div>
 )}
 </div>

 {/* Real-Time Analysis Output */}
 <div className="space-y-3 pt-2">
 <h4 className="font-serif text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
 <Zap className="w-3.5 h-3.5 text-[var(--gold)]" /> Scanner Analytical Metrics
 </h4>

 {isAnalyzed && metrics.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {metrics.map((m) => (
 <div key={m.label} className="p-3 bg-gray-100/50 border border-[var(--gold-100)] rounded-xl space-y-1 relative overflow-hidden group hover:border-[var(--gold-300)] transition-colors duration-300">
 <div className="absolute top-2 right-2 opacity-15">
 <Award className="w-5 h-5 text-[var(--gold)]" />
 </div>
 <h5 className="text-[var(--gold)] font-bold text-[10px] md:text-xs font-serif uppercase tracking-wide">
 {m.label}
 </h5>
 <p className="text-gray-600 text-[9px] md:text-[10px] leading-relaxed font-light">
 {m.desc}
 </p>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-[10px] text-gray-650 italic font-light">
 Draw on the scanner pad above. The system will automatically analyze slants, baseline drift, and pressure speed as you sign.
 </p>
 )}
 </div>
 </GoldCard>
 </div>
 );
}
