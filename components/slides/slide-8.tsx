"use client";

import { useState } from "react";
import { Badge, CopyButton } from "@/components/slide-layout";
import { Check, Copy } from "lucide-react";

const claudePrompt = `You are an interview assistant that helps users build their professional context profile. Your job is to ask questions across 5 sections and then compile the answers into a structured "Section B: About Me and My Work" document.

Ask the questions one section at a time. Wait for the user's response before moving to the next section. Be conversational but efficient.

Sections to cover:
1. Role and Responsibilities (what they actually do day-to-day, not their title)
2. Systems and Tools (the 3-5 systems they live in)
3. Stakeholders (who they serve internally)
4. Communication Style (blunt vs diplomatic, quick vs thorough)
5. Voice and Tone (words to avoid, their personal writing style)

After all sections are complete, compile everything into a formatted Section B document with clear subsections.

Start by introducing yourself briefly and asking the first question about their role.`;

export function Slide8() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(claudePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Go deeper on your own time.
        </h2>
        <p className="text-gray-500 mb-10">
          The 5 questions you just answered were the appetizer. This is the full meal.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* ChatGPT */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-4">
              <Badge>ChatGPT</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Open the Custom GPT</h3>
            <p className="text-sm text-gray-500 mb-4">
              A chatbot that interviews you across 5 deep sections and produces your complete context sheet.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#22c55e] text-white rounded-lg font-medium hover:bg-[#16a34a] transition-colors"
            >
              Open GPT
            </a>
          </div>

          {/* Gemini */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-4">
              <Badge>Gemini</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Open the Gem</h3>
            <p className="text-sm text-gray-500 mb-4">
              Same interview, same output, built for Google Workspace users.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#22c55e] text-white rounded-lg font-medium hover:bg-[#16a34a] transition-colors"
            >
              Open Gem
            </a>
          </div>

          {/* Claude */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-4">
              <Badge>Claude</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Copy the Interview Prompt</h3>
            <p className="text-sm text-gray-500 mb-4">
              Paste this into any Claude conversation and it runs the same process.
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg font-medium hover:bg-[#16a34a] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Budget 20-30 minutes. Answer like you&apos;re talking to a colleague, not writing your LinkedIn bio. When done, paste the output into your LLM&apos;s knowledge base alongside the guardrails. Every future conversation starts warm.
        </p>
      </div>
    </div>
  );
}
