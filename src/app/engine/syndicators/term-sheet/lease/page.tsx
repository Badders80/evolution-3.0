"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

function LeaseDetailsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const syndicatorId = searchParams.get("syndicatorId");
  const horseId = searchParams.get("horseId");

  const [form, setForm] = useState({
    syndicateName: "",
    leaseType: "Fixed-term Lease",
    leaseStart: "",
    leaseEnd: "",
    leaseDurationMonths: 0,
    minimumTokenSize: 1,
    numberOfTokensAvailable: "",
    leasePricePerOnePercent: "",
    tokenHolderRevenueSharePercent: 80,
    tokinvestPlatformFeePercent: 5,
    evolutionFeePercent: 5,
  });

  // Auto calculate months between start / end
  useEffect(() => {
    if (form.leaseStart && form.leaseEnd) {
      const start = new Date(form.leaseStart);
      const end = new Date(form.leaseEnd);
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      setForm(f => ({ ...f, leaseDurationMonths: months }));
    }
  }, [form.leaseStart, form.leaseEnd]);

  // Show error if accessed directly without proper flow
  if (!syndicatorId || !horseId) {
    return (
      <div className="max-w-xl mx-auto py-8 pt-24">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Missing Required Information</h2>
          <p className="text-red-600 mb-4">
            This page requires a syndicator and horse to be created first.
          </p>
          <button
            onClick={() => router.push('/engine/syndicators/profile/create')}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Start from Syndicator Profile
          </button>
        </div>
      </div>
    );
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();

    // Store lease details in sessionStorage
    sessionStorage.setItem("leaseDetails", JSON.stringify(form));

    // Redirect to authority page
    router.push(
      `/engine/syndicators/term-sheet/authority?syndicatorId=${syndicatorId}&horseId=${horseId}`
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 pt-24">
      <h1 className="text-2xl mb-4 font-medium">Lease Details</h1>

      <form onSubmit={handleNext} className="space-y-4">

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Syndicate Name"
          value={form.syndicateName}
          required
          onChange={e => setForm({ ...form, syndicateName: e.target.value })}
        />

        <label className="block text-sm font-medium">Lease Start</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={form.leaseStart}
          required
          onChange={e => setForm({ ...form, leaseStart: e.target.value })}
        />

        <label className="block text-sm font-medium">Lease End</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={form.leaseEnd}
          required
          onChange={e => setForm({ ...form, leaseEnd: e.target.value })}
        />

        {form.leaseDurationMonths > 0 && (
          <p className="text-sm text-gray-700">
            Duration: {form.leaseDurationMonths} months
          </p>
        )}

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Number of tokens available"
          type="number"
          required
          value={form.numberOfTokensAvailable}
          onChange={e => setForm({ ...form, numberOfTokensAvailable: e.target.value })}
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Minimum token size (%)"
          type="number"
          value={form.minimumTokenSize}
          required
          onChange={e =>
            setForm({ ...form, minimumTokenSize: Number(e.target.value) })
          }
        />

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Lease price per 1% ($)"
          type="number"
          required
          value={form.leasePricePerOnePercent}
          onChange={e => setForm({ ...form, leasePricePerOnePercent: e.target.value })}
        />

        <button
          className="px-4 py-2 rounded bg-black text-white"
          type="submit"
        >
          Next: Authority Checks
        </button>
      </form>
    </div>
  );
}

export default function LeaseDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto py-8 pt-24">
          <div className="rounded-lg border border-gray-200 bg-white/5 p-6 text-sm text-gray-200">
            Loading lease details...
          </div>
        </div>
      }
    >
      <LeaseDetailsPageInner />
    </Suspense>
  );
}
