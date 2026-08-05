import { Suspense } from 'react';
import PremiumKundliGeneratorPage from '@/components/ui/PremiumKundliGeneratorPage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function PremiumPersonalizedKundliPage() {
 return (
 <Suspense fallback={
 <div className="min-h-screen bg-white flex items-center justify-center">
 <LoadingSpinner size="lg" />
 </div>
 }>
 <PremiumKundliGeneratorPage />
 </Suspense>
 );
}
