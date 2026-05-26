"use client";

import { Badge } from "@/components/slide-layout";

export function Slide4() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          This is why your AI output sounds generic.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Without Context */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-4">
              <Badge variant="red">WITHOUT CONTEXT</Badge>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-500 mb-3">
                <span className="text-gray-700 font-semibold">Prompt:</span> Write me a process doc for interview scheduling.
              </p>
              <p className="text-gray-500">
                <span className="text-gray-700 font-semibold">Output:</span> Interview scheduling is an important part of the hiring process. To ensure a smooth experience for all stakeholders, consider the following steps: 1. Confirm availability with all parties. 2. Send calendar invitations with clear details. 3. Follow up to confirm attendance...
              </p>
            </div>
          </div>

          {/* With Context */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-4">
              <Badge variant="green">WITH CONTEXT</Badge>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-500 mb-3">
                <span className="text-gray-700 font-semibold">Prompt:</span> Write me a process doc for interview scheduling.
              </p>
              <p className="text-gray-500">
                <span className="text-gray-700 font-semibold">Output:</span> Interview Scheduling SOP (Lab Operations, Austin)<br />
                Owner: Recruiting Coordinator<br />
                Trigger: Candidate advances past Phone Screen in Greenhouse.<br />
                Step 1: RC checks interviewer availability in Google Calendar (panel of 3, same-day block preferred).<br />
                Step 2: RC creates Greenhouse interview event with scorecard link and candidate packet attached...
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-gray-600">
          Same prompt. Same model. <span className="font-semibold">The difference is context.</span>
        </p>
      </div>
    </div>
  );
}
