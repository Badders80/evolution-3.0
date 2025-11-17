import { getTermSheetById } from "@/services/termSheets";
import { getOwnerById } from "@/services/owners";
import { getHorseById } from "@/services/horses";

type Props = {
  params: { id: string };
};

export default async function AdminTermSheetDetailPage({ params }: Props) {
  const termSheet = await getTermSheetById(params.id);

  if (!termSheet) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-red-500">Term sheet not found.</p>
      </div>
    );
  }

  const owner = await getOwnerById(termSheet.owner_id);
  const horse = await getHorseById(termSheet.horse_id);

  return (
    <div className="max-w-3xl mx-auto py-8 pt-24 space-y-6">
      <h1 className="text-2xl font-medium">Term Sheet Details</h1>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Syndicator</h2>
        <p><strong>Authorised Syndicator:</strong> {owner?.name}</p>
        <p><strong>Contact Person:</strong> {owner?.contact_person}</p>
        <p><strong>Email:</strong> {owner?.email}</p>
        <p><strong>Phone:</strong> {owner?.phone || "N/A"}</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Horse</h2>
        <p><strong>Name:</strong> {horse?.horse_name}</p>
        <p><strong>Microchip:</strong> {horse?.microchip_number}</p>
        <p><strong>Life #:</strong> {horse?.life_number}</p>
        <p><strong>Sex:</strong> {horse?.sex}</p>
        <p><strong>Training Location:</strong> {horse?.training_location}</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Lease Details</h2>
        <p><strong>Syndicate Name:</strong> {termSheet.syndicate_name}</p>
        <p><strong>Lease Type:</strong> {termSheet.lease_type}</p>
        <p><strong>Lease Start:</strong> {termSheet.lease_start}</p>
        <p><strong>Lease End:</strong> {termSheet.lease_end}</p>
        <p><strong>Duration:</strong> {termSheet.lease_duration_months} months</p>
        <p><strong>Tokens Available:</strong> {termSheet.number_of_tokens_available}</p>
        <p><strong>Minimum Token Size:</strong> {termSheet.minimum_token_size}%</p>
        <p><strong>Price / 1%:</strong> ${termSheet.lease_price_per_one_percent}</p>
        <p><strong>Owner Revenue Share:</strong> {termSheet.token_holder_revenue_share_percent}%</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Authority</h2>
        <p>
          <strong>Racing Manager Approval:</strong>{" "}
          {termSheet.racing_manager_approves_syndication ? "Yes" : "No"}
        </p>
        <p>
          <strong>Trainer Confirms Details:</strong>{" "}
          {termSheet.trainer_confirms_horse_details ? "Yes" : "No"}
        </p>
      </section>

      {/* Placeholder for future actions */}
      <section className="border rounded p-4 bg-gray-50">
        <h2 className="font-semibold mb-2">Actions (Coming Soon)</h2>
        <button className="px-4 py-2 mr-2 rounded bg-gray-300 cursor-not-allowed">
          Approve Term Sheet
        </button>
        <button className="px-4 py-2 mr-2 rounded bg-gray-300 cursor-not-allowed">
          Generate PDS
        </button>
        <button className="px-4 py-2 rounded bg-gray-300 cursor-not-allowed">
          Send to Tokinvest
        </button>
      </section>
    </div>
  );
}
