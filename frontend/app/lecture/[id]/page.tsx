'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/api/client';
import { GoldCard } from '@/components/ui/GoldCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

import { ArrowLeft, Check } from 'lucide-react';

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

  // Fetch Lecture Details (Video + Comments)
  const { data: lecture, isLoading: loadingLecture, error: lectureError } = useQuery({
    queryKey: ['lecture', lectureId],
    queryFn: async () => {
      const res = await client.get(`/lectures/${lectureId}`);
      return res.data?.data;
    },
    enabled: isAuthenticated && !!lectureId,
  });



  // Mark as Watched Mutation
  const watchMutation = useMutation({
    mutationFn: async () => {
      return client.patch(`/lectures/${lectureId}/watched`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lecture', lectureId] });
      queryClient.invalidateQueries({ queryKey: ['my-enrolments'] });
      alert('Marked as watched!');
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Failed to update progress');
    },
  });



  if (authLoading || loadingLecture) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">Loading lecture page...</div>;
  }

  if (lectureError) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400 p-4">
        <p className="text-red-400 mb-4 font-bold">Access Denied or Lecture Not Found</p>
        <p className="text-xs text-gray-500 max-w-md text-center mb-6">You must be enrolled in the batch corresponding to this lecture to access this content.</p>
        <button onClick={() => router.push('/my-batches')} className="text-[var(--gold)] hover:underline flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Go back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <button onClick={() => router.push('/my-batches')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to My Batches
        </button>

        {/* Centered Video Player & Lecture details */}
        <div className="max-w-4xl mx-auto space-y-6">
          <VideoPlayer
            youtubeVideoId={lecture.youtubeVideoId}
            onEnded={() => watchMutation.mutate()}
          />

          {/* Lecture Meta Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-5">
            <div>
              <h1 className="font-serif text-2xl font-bold">{lecture.title}</h1>
              <p className="text-xs text-gray-400 mt-1">Enrolled Class Lecture</p>
            </div>
            <button
              onClick={() => watchMutation.mutate()}
              disabled={watchMutation.isPending}
              className="flex items-center gap-1.5 bg-neutral-900 border border-[var(--gold-200)] text-[var(--gold)] text-xs font-bold py-2 px-4 rounded-full hover:bg-[var(--gold-10)] transition-all"
            >
              <Check className="w-4 h-4" /> Mark as Watched
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
