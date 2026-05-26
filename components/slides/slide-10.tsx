"use client";

import { Badge, CodeBlock, CalloutCard } from "@/components/slide-layout";

const prompt2Code = `You are operating under:
- <talent_ops_data_integrity_rule>
- <talent_ops_scope_constraints>
- <talent_ops_output_verbosity>
- <talent_ops_assumption_discipline>

From Section B:
- 1. My Role and Style
- 2. Company Context
- 3. Tone of Voice

TASK:
I am going to share a metric, data point, or report excerpt. This could be: time-to-fill, offer acceptance rate, req approval cycle time, source effectiveness, interview load, coordinator utilization, system adoption, SLA compliance, or any other ops metric.

Your job is not to summarize the data. Your job is to turn it into a narrative that answers: "What does this mean and what should we do about it?"

1. Restate the metric in one line. Confirm the audience.
2. Extract the signal: what is the data actually saying underneath the number? What decision does it point toward?
3. Write a leadership-ready narrative (4-6 sentences): open with the insight (not the number), name the business implication, close with a recommendation.
4. Provide 2-3 anticipated pushback questions with short responses grounded in the data.

If the output could have been produced without Section B loaded, revise it.`;

export function Slide10() {
  return (
    <div className="min-h-screen flex flex-col px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-4">
          <Badge variant="green">Prompt 2</Badge>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          The Data Translator
        </h2>
        <p className="text-gray-500 mb-6">
          Turn raw metrics into leadership-ready narratives.
        </p>

        <CalloutCard variant="amber">
          <p className="text-sm text-gray-700">
            <strong>Data sensitivity:</strong> Only paste real metrics if your LLM is behind SSO and your data governance team has approved. Otherwise, describe the metric in words (&apos;our TTF increased 40% QoQ&apos;) rather than pasting raw numbers.
          </p>
        </CalloutCard>

        <div className="mt-6">
          <CodeBlock copyButtonVariant="prominent" copyButtonLabel="Copy">
            {prompt2Code}
          </CodeBlock>
        </div>

        <p className="text-gray-600 mt-6 text-sm">
          <strong>When to use this:</strong> preparing a metric for a QBR, building the case for a process change, or responding to &quot;what&apos;s happening with [metric]?&quot; in a way that shows strategic thinking.
        </p>
      </div>
    </div>
  );
}
