"use client";

import { Badge, CodeBlock } from "@/components/slide-layout";

const prompt3Code = `You are operating under:
- <talent_ops_context_binding_rule>
- <talent_ops_output_verbosity> (OVERRIDE: this letter can be as long as it needs to be, up to 200 words)

From Section B:
- 3. Tone of Voice

TASK:
I am going to name a process, tool, workflow, or system that I am done with.

Before you write: I will paste one real sentence I sent to a colleague this week. Match that voice exactly.

Rules:
- This letter must sound like ME. If it sounds generic, rewrite.
- Be specific about what the process/tool actually did wrong. Real grievances.
- Tone: honest, a little dramatic, ultimately empowering. I am moving on.
- End with what I deserve instead (the better future).
- Under 200 words.

Opener: "Dear [Process/Tool], We need to talk."`;

const exampleOutput = `Dear Manual Interview Scheduling, We need to talk. Actually, no. I've been trying to talk for months and you keep ghosting me between reply-all chains. I gave you everything. I forwarded availability windows. I cc'd coordinators. I sent "just circling back" emails that made me hate myself. And what did you give me? Double-bookings. Timezone math at 4pm on a Friday. Panel interviews where two of four "didn't see the email." I deserve a system that checks availability without asking. I deserve to never type "does 2pm CT work for everyone?" again. Moving on, Me`;

export function Slide11() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-4">
          <Badge variant="green">Prompt 3</Badge>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          The Breakup Letter
        </h2>
        <p className="text-gray-500 mb-8">
          Write a breakup letter to your worst process. You deserve better.
        </p>

        <CodeBlock copyButtonVariant="prominent" copyButtonLabel="Copy">
          {prompt3Code}
        </CodeBlock>

        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-3 font-medium">Example output:</p>
          <blockquote className="italic text-gray-700 leading-relaxed">
            {exampleOutput}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
