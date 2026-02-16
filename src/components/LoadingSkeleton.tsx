'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center space-y-8">
        <Skeleton className="w-32 h-32 rounded-full mx-auto bg-[#1a1a1a]" />
        <Skeleton className="h-12 w-80 mx-auto bg-[#1a1a1a]" />
        <Skeleton className="h-6 w-96 mx-auto bg-[#1a1a1a]" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-40 bg-[#1a1a1a]" />
          <Skeleton className="h-12 w-40 bg-[#1a1a1a]" />
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full bg-[#1a1a1a]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServiceSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-[#141414] border border-[#333] rounded-xl p-6 space-y-4">
          <Skeleton className="w-12 h-12 rounded-lg bg-[#1a1a1a]" />
          <Skeleton className="h-6 w-3/4 bg-[#1a1a1a]" />
          <Skeleton className="h-4 w-full bg-[#1a1a1a]" />
          <Skeleton className="h-4 w-2/3 bg-[#1a1a1a]" />
        </div>
      ))}
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <Skeleton key={i} className="aspect-square rounded-xl bg-[#1a1a1a]" />
      ))}
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#333] rounded-xl p-6 md:p-8 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20 bg-[#1a1a1a]" />
          <Skeleton className="h-12 w-full bg-[#1a1a1a]" />
        </div>
      ))}
      <Skeleton className="h-12 w-full bg-[#1a1a1a]" />
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 bg-[#1a1a1a]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 bg-[#1a1a1a]" />
            <Skeleton className="h-10 w-32 bg-[#1a1a1a]" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full bg-[#1a1a1a]" />
          ))}
        </div>
        <Skeleton className="h-96 w-full bg-[#1a1a1a]" />
      </div>
    </div>
  );
}
