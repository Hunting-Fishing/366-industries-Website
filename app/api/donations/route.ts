import { NextResponse } from "next/server";
import { supabaseInsertDonation } from "../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      donorName?: string;
      donorEmail?: string;
      amountUsd?: number;
      frequency?: "once" | "monthly" | "institutional";
      missionId?: string;
      missionTitle?: string;
      donorNote?: string;
    };

    const donorName = String(body.donorName ?? "").trim();
    const donorEmail = String(body.donorEmail ?? "").trim().toLowerCase();
    const amountUsd = Number(body.amountUsd ?? 0);
    const frequency = body.frequency || "once";
    const missionId = String(body.missionId || "all-humanitarian");
    const missionTitle = String(
      body.missionTitle || "All Frontline Missions (Water + Coastal Drones + Disaster Rescue)"
    );
    const donorNote = body.donorNote ? String(body.donorNote).trim() : null;

    if (!donorName || !donorEmail || !donorEmail.includes("@") || amountUsd <= 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please provide a valid name, email address, and donation amount.",
        },
        { status: 400 }
      );
    }

    const pledgeRef = `366-HUM-${Math.floor(100000 + Math.random() * 900000)}`;

    const supaRes = await supabaseInsertDonation({
      pledge_ref: pledgeRef,
      donor_name: donorName,
      donor_email: donorEmail,
      amount_usd: amountUsd,
      frequency,
      mission_id: missionId,
      mission_title: missionTitle,
      donor_note: donorNote,
      status: "pledged",
    });

    return NextResponse.json({
      ok: true,
      pledgeRef,
      supabaseSynced: supaRes.synced,
      donation: supaRes.row ?? {
        pledge_ref: pledgeRef,
        donor_name: donorName,
        donor_email: donorEmail,
        amount_usd: amountUsd,
        frequency,
        mission_id: missionId,
        mission_title: missionTitle,
        donor_note: donorNote,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to record donation pledge." },
      { status: 400 }
    );
  }
}
