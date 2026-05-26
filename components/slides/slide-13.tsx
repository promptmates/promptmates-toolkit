"use client";

const features = [
  "Weekly builds, not just webinars",
  "Practitioners teaching practitioners",
  "The people who made today's session do this every day",
];

export function Slide13() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-3xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          <span className="bg-[#c1ff72] px-3 py-1 rounded">Keep building with us.</span>
        </h2>
        <p className="text-gray-500 mb-10">
          PromptMates is a community of TA and HR builders going AI-native together.
        </p>

        <div className="flex flex-col gap-3 mb-10 text-left max-w-md mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] mt-2 shrink-0" />
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
        </div>

        <a
          href="https://www.promptmates.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#22c55e] text-white rounded-xl font-semibold text-lg hover:bg-[#16a34a] transition-colors mb-10"
        >
          Join PromptMates
        </a>

        <div className="text-gray-700 mb-2">
          Jason Miller (Natera) | Matt Texeira (Komodo Health)
        </div>
        <p className="text-gray-500 text-sm">
          Thank you for building with us today.
        </p>
      </div>
    </div>
  );
}
