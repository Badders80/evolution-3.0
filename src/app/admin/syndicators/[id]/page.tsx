import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export default async function AdminSyndicatorDetailPage({ params }: Props) {
  const { data: syndicator } = await supabaseServer
    .from('syndicators')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!syndicator) {
    return (
      <div className="max-w-3xl mx-auto py-8 pt-24">
        <p className="text-red-500">Syndicator not found.</p>
      </div>
    );
  }

  // Get all term sheets for this syndicator
  const { data: syndicatorTermSheets } = await supabaseServer
    .from('term_sheets')
    .select('*')
    .eq('owner_id', params.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-3xl mx-auto py-8 pt-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Syndicator Details</h1>
        <Link
          href="/admin/syndicators"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to List
        </Link>
      </div>

      {/* Syndicator Info */}
      <section className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-lg">Profile</h2>
        <div className="space-y-2">
          <p>
            <strong>Authorised Syndicator:</strong> {syndicator.name}
          </p>
          <p>
            <strong>Contact Person:</strong> {syndicator.contact_person}
          </p>
          <p>
            <strong>Email:</strong> {syndicator.email}
          </p>
          <p>
            <strong>Phone:</strong> {syndicator.phone || "N/A"}
          </p>
          <p>
            <strong>Right to Lease Confirmed:</strong>{" "}
            {syndicator.syndicator_confirms_right_to_lease ? "Yes" : "No"}
          </p>
          <p>
            <strong>Digital Syndication Approved:</strong>{" "}
            {syndicator.syndicator_approves_digital_syndication ? "Yes" : "No"}
          </p>
          <p className="text-sm text-gray-500 pt-2">
            Created: {new Date(syndicator.created_at || "").toLocaleString()}
          </p>
        </div>
      </section>

      {/* Term Sheets */}
      <section className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4 text-lg">
          Term Sheets ({syndicatorTermSheets.length})
        </h2>
        {syndicatorTermSheets.length === 0 ? (
          <p className="text-gray-500">No term sheets yet.</p>
        ) : (
          <div className="space-y-3">
            {syndicatorTermSheets.map((ts) => (
              <Link
                key={ts.id}
                href={`/admin/term-sheets/${ts.id}`}
                className="block border p-4 rounded hover:border-gray-400 transition-colors"
              >
                <p className="font-medium">{ts.syndicate_name}</p>
                <p className="text-sm text-gray-600">
                  Lease: {ts.lease_start} to {ts.lease_end}
                </p>
                <p className="text-sm text-gray-600">
                  {ts.number_of_tokens_available} tokens available
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
