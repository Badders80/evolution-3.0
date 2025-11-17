"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getOwnerById } from "@/services/owners";
import { getHorseById } from "@/services/horses";
import { createTermSheet } from "@/services/termSheets";

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ownerId = searchParams.get("ownerId");
  const horseId = searchParams.get("horseId");

  const [owner, setOwner] = useState<any>(null);
  const [horse, setHorse] = useState<any>(null);
  const [leaseDetails, setLeaseDetails] = useState<any>(null);
  const [authorityDetails, setAuthorityDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load everything from Supabase + sessionStorage
  useEffect(() => {
    async function load() {
      if (!ownerId || !horseId) {
        setError("Missing owner ID or horse ID");
        return;
      }

      try {
        const ownerData = await getOwnerById(ownerId as string);
        const horseData = await getHorseById(horseId as string);

        const lease = sessionStorage.getItem("leaseDetails");
        const authority = sessionStorage.getItem("authorityDetails");

        setOwner(ownerData);
        setHorse(horseData);
        setLeaseDetails(lease ? JSON.parse(lease) : null);
        setAuthorityDetails(authority ? JSON.parse(authority) : null);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load owner or horse data");
      }
    }

    load();
  }, [ownerId, horseId]);

  async function handleCreate() {
    if (!ownerId || !horseId || !leaseDetails || !authorityDetails) {
      setError("Missing required data.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const termSheet = await createTermSheet({
        ownerId,
        horseId,

        // Lease
        syndicateName: leaseDetails.syndicateName,
        leaseType: leaseDetails.leaseType,
        leaseStart: leaseDetails.leaseStart,
        leaseEnd: leaseDetails.leaseEnd,
        leaseDurationMonths: leaseDetails.leaseDurationMonths,
        minimumTokenSize: leaseDetails.minimumTokenSize,
        numberOfTokensAvailable: Number(leaseDetails.numberOfTokensAvailable),
        leasePricePerOnePercent: Number(leaseDetails.leasePricePerOnePercent),
        tokenHolderRevenueSharePercent:
          leaseDetails.tokenHolderRevenueSharePercent,
        tokinvestPlatformFeePercent: leaseDetails.tokinvestPlatformFeePercent,
        evolutionFeePercent: leaseDetails.evolutionFeePercent,

        // Tokenization (defaults for now - can be collected in Step 3 later)
        tokenSymbol: `${leaseDetails.syndicateName.substring(0, 4).toUpperCase()}`,
        tokenNetwork: "Solana",
        custodian: "Tokinvest",
        tokenMintAuthority: "Evolution Stables",
        tokenTransferRestrictions: "Approved Secondary Market Only",

        // Authority
        racingManagerId: undefined,
        racingManagerApprovesSyndication:
          authorityDetails.racingManagerApprovesSyndication,
        trainerConfirmsHorseDetails:
          authorityDetails.trainerConfirmsHorseDetails,
      });

      // Clean up storage
      sessionStorage.removeItem("leaseDetails");
      sessionStorage.removeItem("authorityDetails");

      // Redirect
      router.push(`/admin/term-sheets/${termSheet.id}`);

    } catch (err: any) {
      setError(err.message ?? "Failed to create term sheet");
    } finally {
      setLoading(false);
    }
  }

  if (!owner || !horse || !leaseDetails || !authorityDetails) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 pt-24 space-y-6">
      <h1 className="text-2xl font-medium">Review Term Sheet</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Syndicator</h2>
        <p><strong>Authorised Syndicator:</strong> {owner.name}</p>
        <p><strong>Contact Person:</strong> {owner.contact_person}</p>
        <p><strong>Email:</strong> {owner.email}</p>
        <p><strong>Phone:</strong> {owner.phone || "N/A"}</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Horse</h2>
        <p><strong>Name:</strong> {horse.horse_name}</p>
        <p><strong>Microchip:</strong> {horse.microchip_number}</p>
        <p><strong>Life #:</strong> {horse.life_number}</p>
        <p><strong>Sex:</strong> {horse.sex}</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Lease Details</h2>
        <p><strong>Syndicate Name:</strong> {leaseDetails.syndicateName}</p>
        <p><strong>Lease Start:</strong> {leaseDetails.leaseStart}</p>
        <p><strong>Lease End:</strong> {leaseDetails.leaseEnd}</p>
        <p><strong>Duration:</strong> {leaseDetails.leaseDurationMonths} months</p>
        <p><strong>Tokens Available:</strong> {leaseDetails.numberOfTokensAvailable}</p>
        <p><strong>Minimum Token Size:</strong> {leaseDetails.minimumTokenSize}%</p>
        <p><strong>Price/1%:</strong> ${leaseDetails.leasePricePerOnePercent}</p>
        <p><strong>Owner Revenue Share:</strong> {leaseDetails.tokenHolderRevenueSharePercent}%</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Authority Checks</h2>
        <p><strong>Racing Manager:</strong> {authorityDetails.racingManagerName || "N/A"}</p>
        <p>
          <strong>RM Approves:</strong>{" "}
          {authorityDetails.racingManagerApprovesSyndication ? "Yes" : "No"}
        </p>
        <p>
          <strong>Trainer Confirms:</strong>{" "}
          {authorityDetails.trainerConfirmsHorseDetails ? "Yes" : "No"}
        </p>
      </section>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create Term Sheet"}
      </button>
    </div>
  );
}
