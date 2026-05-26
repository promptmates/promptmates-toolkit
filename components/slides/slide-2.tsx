"use client";

import { Badge, CalloutCard } from "@/components/slide-layout";

export function Slide2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Badge>PromptMates Survey 2026 | 100+ TA Leaders</Badge>
        </div>

        <div className="mb-6">
          <span className="text-7xl md:text-8xl font-bold text-[#22c55e]">69%</span>
        </div>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          of talent teams do their AI work in general-purpose tools, not specialist HR products.
        </p>

        <CalloutCard variant="green">
          <p className="text-gray-700 leading-relaxed">
            The LLM is now infrastructure. The question is whether you&apos;re using it like a search bar or like a system.
          </p>
        </CalloutCard>
      </div>
    </div>
  );
}
