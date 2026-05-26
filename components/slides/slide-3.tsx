"use client";

import { CalloutCard } from "@/components/slide-layout";

export function Slide3() {
  const maturityLevels = [
    { level: "One-off prompts", description: "Quick answers, no memory", percentage: "31%", highlighted: false },
    { level: "Building workflows", description: "Custom prompts, reusable context, automation", percentage: "51%", highlighted: true },
    { level: "Piloting agents", description: "AI taking actions with human oversight", percentage: "21%", highlighted: false },
    { level: "Operating agents", description: "AI in production, autonomous", percentage: "16%", highlighted: false },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Most teams are here. Today we move you up.
        </h2>
        <p className="text-gray-500 mb-10">
          AI adoption happens in stages. Almost no team skips a step.
        </p>

        <div className="flex flex-col gap-3 mb-8">
          {maturityLevels.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all ${
                item.highlighted
                  ? "bg-[#f0fdf4] border-l-4 border-l-[#22c55e] border-t-transparent border-r-transparent border-b-transparent"
                  : "bg-gray-50 border-gray-100 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className={`font-semibold ${item.highlighted ? "text-gray-900" : "text-gray-600"}`}>
                    {item.level}
                  </p>
                  <p className={`text-sm ${item.highlighted ? "text-gray-600" : "text-gray-400"}`}>
                    {item.description}
                  </p>
                </div>
                <span className={`text-xl font-bold ${item.highlighted ? "text-[#22c55e]" : "text-gray-400"}`}>
                  {item.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>

        <CalloutCard variant="green">
          <p className="text-gray-700">
            <strong>Today&apos;s goal:</strong> move from Row 1 to Row 2. Give your LLM memory and rules so it stops starting from zero.
          </p>
        </CalloutCard>
      </div>
    </div>
  );
}
