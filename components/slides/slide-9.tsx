"use client";

import { Badge, CodeBlock } from "@/components/slide-layout";

const prompt1Code = `You are operating under:
- <talent_ops_scope_constraints>
- <talent_ops_process_fidelity_rule>
- <talent_ops_output_verbosity>

From Section B:
- 1. My Role and Style
- 3. Tone of Voice

TASK:
I am going to paste messy content. It may be a brain dump, a frustrated Slack message, notes from a meeting, or a half-formed idea about a process that needs to change.

Your job:
1. Identify the core problem or request buried in the mess.
2. Restructure it into:
   - Problem Statement (1-2 sentences. What is actually broken or missing.)
   - Why It Matters (Who is affected and what is the cost of inaction.)
   - Proposed Path Forward (3-5 concrete next steps with owners named if possible.)
3. Reflect my tone from Section B.
4. Do not add ideas I did not express. Only organize and clarify what is already there.
5. If anything is ambiguous, flag it under "Needs Clarification."

If the output could have been produced without Section B loaded, revise it.`;

export function Slide9() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-4">
          <Badge variant="green">Prompt 1</Badge>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          The Thought Straightener
        </h2>
        <p className="text-gray-500 mb-8">
          Turn messy brainstorms into structured, actionable briefs.
        </p>

        <CodeBlock copyButtonVariant="prominent" copyButtonLabel="Copy">
          {prompt1Code}
        </CodeBlock>

        <div className="mt-8">
          <p className="font-semibold text-gray-900 mb-3">When to use this:</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-2 shrink-0" />
              Translating a vague stakeholder request into a clear brief
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-2 shrink-0" />
              Turning your own brain dump into something you can send upward
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-2 shrink-0" />
              Converting meeting notes into next steps before they go stale
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
