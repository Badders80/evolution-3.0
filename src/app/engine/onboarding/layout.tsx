"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const STEPS = [
  { id: 1, slug: "syndicator", label: "Syndicator" },
  { id: 2, slug: "horse", label: "Horse" },
  { id: 3, slug: "lease", label: "Lease" },
  { id: 4, slug: "authority", label: "Authority" },
  { id: 5, slug: "review", label: "Review" },
];

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const activeStep =
    STEPS.find((step) => (pathname ?? "").includes(step.slug)) ?? STEPS[0];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-medium mb-2">New Lease – Onboarding</h1>
        <p className="text-sm text-neutral-400">
          Step {activeStep.id} of {STEPS.length}: {activeStep.label}
        </p>

        <div className="mt-4 flex items-center gap-2">
          {STEPS.map((step) => {
            const isActive = step.id === activeStep.id;
            const isCompleted = step.id < activeStep.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => router.push(`/engine/onboarding/${step.slug}`)}
                className={[
                  "flex-1 text-xs py-2 rounded border transition-colors",
                  isActive && "bg-black text-white border-white/80",
                  !isActive &&
                    isCompleted &&
                    "bg-neutral-900 text-white border-neutral-800",
                  !isActive &&
                    !isCompleted &&
                    "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
