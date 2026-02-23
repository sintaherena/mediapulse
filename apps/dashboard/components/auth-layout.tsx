"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import Image from "next/image";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      <AuthLeftPanel />

      <div className="relative flex items-center justify-center p-6 lg:p-12 bg-black">
        <div className="relative w-full max-w-md space-y-10">{children}</div>
      </div>
    </div>
  );
}

export function AuthLeftPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-14 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2E] via-[#1F1F23] to-[#141417]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-xl font-semibold tracking-tight">
          <div className="relative h-9 w-9">
            <Image
              src="/hyperjump-icon-only.png"
              alt="MediaPulse Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white">MediaPulse</span>
        </div>

        <div className="mt-24 max-w-sm text-gray-300 leading-relaxed text-base">
          Never miss what matters. Personalized insights delivered daily — only
          the news that impacts your business.
        </div>
      </div>

      <div className="relative z-10 text-sm text-gray-400">
        Copyright © {new Date().getFullYear()} PT Artha Rajamas Mandiri. All
        rights reserved.
      </div>
    </div>
  );
}

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-3xl border border-neutral-800 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <CardContent className="p-10 text-white">{children}</CardContent>
    </Card>
  );
}
