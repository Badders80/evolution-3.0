import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-2">Admin Overview</h2>
      <p className="text-sm text-neutral-400">
        Manage syndicators, horses, and term sheets created through the Evolution
        Engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/engine/owners/profile/create"
          className="border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition-colors"
        >
          <h3 className="font-semibold mb-1">Syndicators</h3>
          <p className="text-xs text-neutral-400">
            View and manage authorised syndicators.
          </p>
        </Link>

        <Link
          href="/engine/horses/profile/create"
          className="border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition-colors"
        >
          <h3 className="font-semibold mb-1">Horses</h3>
          <p className="text-xs text-neutral-400">
            View onboarded horses and linked term sheets.
          </p>
        </Link>

        <Link
          href="/admin/term-sheets"
          className="border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition-colors"
        >
          <h3 className="font-semibold mb-1">Term Sheets</h3>
          <p className="text-xs text-neutral-400">
            Review lease terms before disclosure and issuance.
          </p>
        </Link>
      </div>
    </div>
  );
}
