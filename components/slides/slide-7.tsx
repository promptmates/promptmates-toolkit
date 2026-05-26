"use client";

import { CodeBlock } from "@/components/slide-layout";

const lightGymPrompt = `I'm going to answer 5 quick questions to build a mini context file. After I answer all 5, format my answers into a structured section called "Section B: About Me and My Work" with these subsections:

1. My Role and Style
2. Company Context
3. Tone of Voice

Here are my answers:

1. What is my actual job? (Not my title. What I spend my time doing day to day.)

2. What 3 systems do I live in every day?

3. Who do I serve? (2-3 internal teams or stakeholders I exist to support.)

4. What word should AI never use when writing as me?

5. Am I more blunt or diplomatic? Quick or thorough?`;

const coachingNotes = [
  { question: "What is your actual job?", note: "Not your title. What do you spend your time doing? If it fits on a business card, it's too vague." },
  { question: "What 3 systems do you live in?", note: "Just names. Greenhouse, Workday, Jira, whatever. We're teaching the LLM your operating environment." },
  { question: "Who do you serve?", note: "Not 'the business.' Specific humans or teams." },
  { question: "What word should AI never use when writing as you?", note: "The cringe word. Everyone has one." },
  { question: "Are you more blunt or diplomatic? Quick or thorough?", note: "This is your voice axis. It tells the LLM whether you sound like a bullet point or a paragraph." },
];

export function Slide7() {
  return (
    <div className="min-h-screen flex flex-col px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Build your context in 5 questions.
        </h2>
        <p className="text-gray-500 mb-6">
          Copy the prompt below, paste it into your LLM, and answer the questions it asks you.
        </p>

        <CodeBlock copyButtonVariant="prominent" copyButtonLabel="Copy">
          {lightGymPrompt}
        </CodeBlock>

        <div className="mt-8 flex flex-col gap-3">
          {coachingNotes.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-gray-900 mb-1">
                {index + 1}. {item.question}
              </p>
              <p className="text-sm text-gray-500">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
