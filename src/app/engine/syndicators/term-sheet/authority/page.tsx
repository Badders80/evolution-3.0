"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthorityChecksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const syndicatorId = searchParams.get("syndicatorId");
  const horseId = searchParams.get("horseId");

  const [form, setForm] = useState({
    racingManagerName: "",
    racingManagerApprovesSyndication: false,
    trainerConfirmsHorseDetails: false,
  });

  useEffect(() => {
    if (!syndicatorId || !horseId) {
      console.error("Missing syndicatorId or horseId");
    }
  }, [syndicatorId, horseId]);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();

    // Store authority info
    sessionStorage.setItem("authorityDetails", JSON.stringify(form));

    // Redirect to Step 5 (Review)
    router.push(
      `/engine/syndicators/term-sheet/review?syndicatorId=${syndicatorId}&horseId=${horseId}`
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 pt-24">
      <h1 className="text-2xl mb-4 font-medium">Authority Checks</h1>

      <form onSubmit={handleNext} className="space-y-4">

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Racing Manager Name"
          value={form.racingManagerName}
          onChange={e =>
            setForm({ ...form, racingManagerName: e.target.value })
          }
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.racingManagerApprovesSyndication}
            onChange={e =>
              setForm({
                ...form,
                racingManagerApprovesSyndication: e.target.checked,
              })
            }
          />
          Racing Manager approves this syndication
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.trainerConfirmsHorseDetails}
            onChange={e =>
              setForm({
                ...form,
                trainerConfirmsHorseDetails: e.target.checked,
              })
            }
          />
          Trainer confirms horse details
        </label>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white"
        >
          Next: Review
        </button>
      </form>
    </div>
  );
}
