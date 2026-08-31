'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/AuthProvider';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function OnboardingPage() {
  const { user, isAuthenticated, isLoading, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-900">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse mt-4">
          Loading Onboarding Wizard...
        </p>
      </div>
    );
  }

  const handleFinish = async () => {
    await refreshUser();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative radial-mesh-bg">
      <OnboardingWizard
        userName={user.name}
        onComplete={handleFinish}
        onSkip={handleFinish}
      />
    </div>
  );
}
