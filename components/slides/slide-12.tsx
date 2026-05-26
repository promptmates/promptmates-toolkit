"use client";

import { Check } from "lucide-react";

const checklist = [
  "Talent Operations Guardrails (already in your LLM)",
  "Mini context sheet (already loaded from the Light Gym)",
  "Full Gym link to go deeper this week",
  "3 prompts you already tested live",
  "This site (bookmark it, share it with your team)",
];

export function Slide12() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          What you&apos;re leaving with.
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-lg">
          The activation energy for Monday morning is zero. You already used the system once. Now keep going.
        </p>
      </div>
    </div>
  );
}
