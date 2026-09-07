'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

import { ArrowLeft, Check, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

function extractYoutubeVideoId(input: string): string {
 if (!input) return '';
 const trimmed = input.trim();
 
 const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
 const match = trimmed.match(regExp);
 
 if (match && match[2].length === 11) {
 return match[2];
 }
 
 const shortsRegExp = /\/shorts\/([a-zA-Z0-9_-]{11})/;
 const shortsMatch = trimmed.match(shortsRegExp);
 if (shortsMatch) {
 return shortsMatch[1];
 }

 return trimmed;
}

export default function LecturePage() {
 const { id: lectureId } = useParams() as { id: string };
 const { isAuthenticated, isLoading: authLoading } = useAuth();
 const router = useRouter();
 const queryClient = useQueryClient();

 // Verify auth
 useEffect(() => {
 if (!authLoading && !isAuthenticated) router.push('/login');
 }, [isAuthenticated, authLoading, router]);

 // Fetch Lecture Details
 const { data: lecture, isLoading: loadingLecture, error: lectureError } = useQuery({
 queryKey: ['lecture', lectureId],
 queryFn: async () => {
 const res = await client.get(`/lectures/${lectureId}`);
 return res.data?.data;
 },
 enabled: isAuthenticated && !!lectureId,
 });

 // Fetch all lectures in the batch for previous, upcoming, and playlist navigation
 const { data: batchLectures } = useQuery({
 queryKey: ['batch-lectures', lecture?.batchId],
 queryFn: async () => {
 const res = await client.get(`/batches/${lecture.batchId}/lectures`);
 return res.data?.data || [];
 },
 enabled: isAuthenticated && !!lecture?.batchId,
 });

 // Mark as Watched Mutation
 const watchMutation = useMutation({
 mutationFn: async () => {
 return client.patch(`/lectures/${lectureId}/watched`);
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ['lecture', lectureId] });
 queryClient.invalidateQueries({ queryKey: ['batch-lectures', lecture?.batchId] });
 queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
 alert('Marked as watched!');
 },
 onError: (err: any) => {
 alert(err.response?.data?.error?.message || 'Failed to update progress');
 },
 });

 if (authLoading || loadingLecture) {
 return <div className="min-h-screen bg-white flex items-center justify-center text-gray-600">Loading lecture page...</div>;
 }

 if (lectureError) {
 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-600 p-4">
 <p className="text-red-600 mb-4 font-bold">Access Denied or Lecture Not Found</p>
 <p className="text-xs text-gray-500 max-w-md text-center mb-6">You must be enrolled in the batch corresponding to this lecture to access this content.</p>
 <button onClick={() => router.push('/my-batches')} className="text-[var(--gold)] hover:underline flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Go back</button>
 </div>
 );
 }

 const currentIndex = batchLectures ? batchLectures.findIndex((l: any) => l._id === lectureId) : -1;
 const previousLecture = currentIndex > 0 ? batchLectures[currentIndex - 1] : null;
 const nextLecture = currentIndex >= 0 && currentIndex < batchLectures.length - 1 ? batchLectures[currentIndex + 1] : null;

 return (
 <div className="min-h-screen bg-white text-gray-900 py-8 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto space-y-6">
 <button onClick={() => router.push(`/my-batches/${lecture.batchId || ''}`)} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
 <ArrowLeft className="w-4 h-4" /> Back to Batch Portal
 </button>

 {/* Centered Video Player & Lecture details */}
 <div className="max-w-4xl mx-auto space-y-6">
 <VideoPlayer
 youtubeVideoId={lecture.youtubeVideoId}
 onEnded={() => watchMutation.mutate()}
 />

 {/* Lecture Meta Details */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
 <div>
 <h1 className="font-serif text-2xl font-bold">{lecture.title}</h1>
 <p className="text-xs text-gray-600 mt-1">Enrolled Class Lecture</p>
 </div>
 <button
 onClick={() => watchMutation.mutate()}
 disabled={watchMutation.isPending}
 className="flex items-center gap-1.5 bg-gray-100 border border-[var(--gold-200)] text-[var(--gold)] text-xs font-bold py-2 px-4 rounded-full hover:bg-[var(--gold-10)] transition-all"
 >
 <Check className="w-4 h-4" /> Mark as Watched
 </button>
 </div>

 {/* Previous & Upcoming Lecture Cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {/* Previous Lecture Card */}
 <div
 onClick={() => previousLecture && router.push(`/lecture/${previousLecture._id}`)}
 className={`p-4 rounded-xl border transition-all ${
 previousLecture
 ? 'border-[var(--gold-100)] bg-white hover:border-[var(--gold)] cursor-pointer shadow-sm hover:shadow-md'
 : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
 }`}
 >
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-lg bg-[var(--gold-10)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)] flex-shrink-0">
 <ChevronLeft className="w-5 h-5" />
 </div>
 <div className="min-w-0 flex-1">
 <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-[var(--gold)] block">
 Previous Lecture
 </span>
 <h4 className="font-serif text-sm font-bold text-gray-900 truncate">
 {previousLecture ? previousLecture.title : 'No Previous Lecture'}
 </h4>
 </div>
 </div>
 </div>

 {/* Next / Upcoming Lecture Card */}
 <div
 onClick={() => nextLecture && router.push(`/lecture/${nextLecture._id}`)}
 className={`p-4 rounded-xl border transition-all ${
 nextLecture
 ? 'border-[var(--gold-100)] bg-white hover:border-[var(--gold)] cursor-pointer shadow-sm hover:shadow-md text-right'
 : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed text-right'
 }`}
 >
 <div className="flex items-center justify-end gap-3">
 <div className="min-w-0 flex-1">
 <span className="text-[10px] uppercase tracking-wider font-semibold font-mono text-[var(--gold)] block">
 Upcoming Lecture
 </span>
 <h4 className="font-serif text-sm font-bold text-gray-900 truncate">
 {nextLecture ? nextLecture.title : 'No Upcoming Lecture'}
 </h4>
 </div>
 <div className="w-9 h-9 rounded-lg bg-[var(--gold-10)] border border-[var(--gold-200)] flex items-center justify-center text-[var(--gold)] flex-shrink-0">
 <ChevronRight className="w-5 h-5" />
 </div>
 </div>
 </div>
 </div>

 {/* Full Batch Playlist */}
 {batchLectures && batchLectures.length > 0 && (
 <div className="space-y-4 pt-6 border-t border-gray-200">
 <div className="flex items-center justify-between">
 <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
 <PlayCircle className="w-5 h-5 text-[var(--gold)]" /> Batch Lectures Playlist ({batchLectures.length})
 </h3>
 <span className="text-xs text-gray-500 font-mono">
 {currentIndex >= 0 ? `Lecture ${currentIndex + 1} of ${batchLectures.length}` : ''}
 </span>
 </div>

 <div className="space-y-2">
 {batchLectures.map((lec: any, index: number) => {
 const isCurrent = lec._id === lectureId;
 return (
 <div
 key={lec._id}
 onClick={() => router.push(`/lecture/${lec._id}`)}
 className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
 isCurrent
 ? 'border-[var(--gold)] bg-[var(--gold-5)] font-bold text-gray-900 shadow-sm'
 : 'border-gray-200 bg-white hover:border-[var(--gold-200)] hover:bg-gray-50 text-gray-700'
 }`}
 >
 <div className="flex items-center gap-3 min-w-0">
 <span className={`w-6 h-6 rounded-full text-[11px] font-mono flex items-center justify-center flex-shrink-0 ${
 isCurrent ? 'bg-[var(--gold)] text-black font-bold' : 'bg-gray-100 text-gray-500'
 }`}>
 {index + 1}
 </span>
 <div className="min-w-0">
 <p className="truncate text-sm font-semibold">{lec.title}</p>
 {isCurrent && (
 <span className="text-[10px] text-[var(--gold)] font-mono uppercase tracking-wider block font-bold mt-0.5">
 ▶ Now Playing
 </span>
 )}
 </div>
 </div>

 <div className="flex items-center gap-2 flex-shrink-0">
 {lec.isWatched && (
 <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
 <Check className="w-3 h-3" /> Watched
 </span>
 )}
 {!isCurrent && (
 <GoldButton variant="outlined" className="py-1 px-3 text-[10px]">
 Watch
 </GoldButton>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
