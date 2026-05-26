"use client";

import { ArrowRight } from "lucide-react";

export function Slide5() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Two layers. That&apos;s the whole system.
        </h2>

        <div className="flex flex-col items-center gap-6">
          {/* Section A */}
          <div className="w-full max-w-2xl bg-white rounded-xl border-l-4 border-l-[#22c55e] border border-gray-200 p-6">
            <p className="text-sm font-semibold text-[#22c55e] mb-2">Section A: Guardrails</p>
            <p className="text-gray-700">
              Always-on rules that govern every response. Lives in your <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">instructions</span> field.
            </p>
          </div>

          {/* Section B */}
          <div className="w-full max-w-2xl bg-white rounded-xl border-l-4 border-l-[#22c55e] border border-gray-200 p-6">
            <p className="text-sm font-semibold text-[#22c55e] mb-2">Section B: Context Sheet</p>
            <p className="text-gray-700">
              Who you are, how you work, what your org looks like. Lives in your <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm">knowledge base</span>.
            </p>
          </div>

          {/* Arrow */}
          <div className="text-[#22c55e]">
            <ArrowRight className="w-8 h-8 rotate-90" />
          </div>

          {/* Result */}
          <div className="w-full max-w-2xl bg-[#f0fdf4] rounded-xl border border-[#22c55e] p-6 text-center">
            <p className="text-lg font-semibold text-gray-900">Output That Sounds Like You</p>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-10 max-w-2xl mx-auto">
          Section A constrains the AI&apos;s behavior. Section B teaches it your world. Together, they eliminate the cold start.
        </p>
      </div>
    </div>
  );
}
