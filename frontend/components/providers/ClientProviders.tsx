'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../auth/AuthProvider';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { GlobalPreloader } from '../ui/GlobalPreloader';
import { HoroscopeNotifier } from '../ui/HoroscopeNotifier';

import { Toaster } from 'react-hot-toast';

export function ClientProviders({ children }: { children: React.ReactNode }) {
 // QueryClient initialized in state to prevent sharing between requests on server-render
 const [queryClient] = useState(() => new QueryClient({
 defaultOptions: {
 queries: {
 refetchOnWindowFocus: false,
 retry: 1,
 },
 },
 }));

 return (
 <QueryClientProvider client={queryClient}>
 <AuthProvider>
 <GlobalPreloader />
 <HoroscopeNotifier />
 <Toaster
 position="top-center"
 containerStyle={{
 position: 'fixed',
 top: '50%',
 left: '50%',
 bottom: 'auto',
 right: 'auto',
 transform: 'translate(-50%, -50%)',
 zIndex: 9999,
 }}
 />
 <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
 <Navbar />
 <main className="flex-grow flex flex-col">{children}</main>
 <Footer />
 </div>
 </AuthProvider>
 </QueryClientProvider>
 );
}
