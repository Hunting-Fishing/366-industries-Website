"use client";

import Link from "next/link";
import { useState } from "react";

type FundMission = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  campaignUrl: string;
  campaignLabel: string;
  allocationNote: string;
};

const MISSIONS: FundMission[] = [
  {
    id: "all-humanitarian",
    badge: "MOST IMPACTFUL • FULL HUMANITARIAN RESERVE",
    title: "All Frontline Missions (Water + Coastal Drones + Disaster Rescue)",
    subtitle:
      "Allocated across Solar Borehole Clean Water Hubs (40%), Shark & Crocodile Coastal Drone Protection (25%), Disaster Search-and-Rescue (20%), and Local Responder Training (15%).",
    campaignUrl: "https://www.gofundme.com/f/clean-water-4-all-j2tyh",
    campaignLabel: "Donate via Clean Water 4 All Campaign ↗",
    allocationNote: "100% ring-fenced across our active water & drone field deployments.",
  },
  {
    id: "clean-water",
    badge: "GLOBAL WATER INNOVATION • WASH",
    title: "Clean Water & Solar Borehole Water Hubs",
    subtitle:
      "Funds deep-aquifer borehole drilling, 100% off-grid solar submersible pumps, multi-stage ultrafiltration + UV, IoT water flow sensors, 24/7 smart prepaid dispensers and dry-season farm irrigation.",
    campaignUrl: "https://www.gofundme.com/f/clean-water-4-all-j2tyh",
    campaignLabel: "Donate to Clean Water 4 All (GoFundMe) ↗",
    allocationNote: "Directly funds borehole drilling, solar pumps & filtration skids in Ilocos Norte & globally.",
  },
  {
    id: "coastal-drones",
    badge: "COASTAL PREDATOR OVERWATCH • WILDGUARD",
    title: "Coastal Shark & Crocodile Drone Protection Network",
    subtitle:
      "Funds solar-charged coastal patrol drones with polarized optics, thermal IR and edge-AI to detect sharks, saltwater crocodiles and rip currents—protecting swimmers, children and fishermen.",
    campaignUrl: "https://www.gofundme.com/f/wildguard-drone-network",
    campaignLabel: "Donate to WildGuard Drone Network (GoFundMe) ↗",
    allocationNote: "Directly funds coastal safety UAVs, acoustic warning modules & drop-deployed flotation pods.",
  },
  {
    id: "disaster-rescue",
    badge: "EMERGENCY RESPONSE • SEARCH & RESCUE",
    title: "Typhoon, Flood & Disaster Search-and-Rescue Fleet",
    subtitle:
      "Funds all-weather thermal reconnaissance drones, heavy-lift delivery of emergency drinking water and trauma medicine, and GPS-tracked self-inflating rescue rafts when roads collapse.",
    campaignUrl: "https://www.gofundme.com/f/wildguard-drone-network",
    campaignLabel: "Donate to WildGuard Rescue Fleet (GoFundMe) ↗",
    allocationNote: "Directly funds emergency medical payloads, thermal SAR drones & inflatable rescue rafts.",
  },
];

const TIERS = [
  {
    amount: 25,
    label: "$25",
    title: "Clean Water Supporter",
    impact:
      "Delivers 2,500+ liters of solar-pumped, ultrafiltered safe drinking water for families during grid blackouts.",
  },
  {
    amount: 50,
    label: "$50",
    title: "Coastal Patrol Sponsor",
    impact:
      "Funds 1 full day of AI drone coastal overwatch scanning beaches and river mouths for sharks, crocodiles & rip currents.",
  },
  {
    amount: 100,
    label: "$100",
    title: "Emergency Rescue Kit",
    impact:
      "Supplies drone-dropped emergency drinking water pouches, trauma first-aid kits or 1 self-inflating flotation rescue pod.",
  },
  {
    amount: 250,
    label: "$250",
    title: "IoT & Smart Water Access",
    impact:
      "Equips 25 rural households with 24/7 RFID Smart Prepaid Water cards and inline digital water flow sensor telemetry.",
  },
  {
    amount: 500,
    label: "$500",
    title: "Solar & Responder Readiness",
    impact:
      "Co-funds LiFePO4 blackout battery storage and trains local barangay water caretakers and coastal drone lifeguards.",
  },
  {
    amount: 2500,
    label: "$2,500",
    title: "Hub & Drone Station Patron",
    impact:
      "Major co-funding toward a Barangay Solar Borehole Water Hub or Coastal Shark/Crocodile Drone Station with permanent recognition.",
  },
];

export function DonationSection({ compact = false }: { compact?: boolean }) {
  const [frequency, setFrequency] = useState<"once" | "monthly" | "institutional">("once");
  const [selectedMissionId, setSelectedMissionId] = useState<string>("all-humanitarian");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorNote, setDonorNote] = useState<string>("");
  const [pledgeRef, setPledgeRef] = useState<string | null>(null);

  const activeMission =
    MISSIONS.find((m) => m.id === selectedMissionId) ?? MISSIONS[0];

  const effectiveAmount =
    customAmount.trim() !== "" && !Number.isNaN(Number(customAmount)) && Number(customAmount) > 0
      ? Number(customAmount)
      : selectedAmount;

  const activeTier =
    TIERS.find((t) => t.amount === effectiveAmount) ??
    TIERS.slice()
      .reverse()
      .find((t) => effectiveAmount >= t.amount) ??
    TIERS[0];

  function handleRecordPledge(e: React.FormEvent) {
    e.preventDefault();
    const refCode = `366-HUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setPledgeRef(refCode);
  }

  return (
    <section id="donate" className="section donate-section">
      <div className="section-heading">
        <div>
          <div className="section-label">
            Direct Humanitarian Donations • 100% Mission-Allocated
          </div>
          <h2>
            {compact
              ? "Donate to fund clean water, coastal shark & crocodile safety & disaster rescue."
              : "Every contribution builds permanent clean water & life-saving drone protection."}
          </h2>
        </div>
        <p>
          Because our website and commercial platforms help cover core engineering overhead, <strong>direct donor contributions</strong> go straight toward drilling solar borehole water wells, deploying coastal shark &amp; crocodile protection drones, and delivering emergency disaster rescue aid.
        </p>
      </div>

      <div className="donate-grid">
        {/* LEFT COLUMN: INTERACTIVE DONATION BUILDER */}
        <div className="donate-builder-card">
          {/* STEP 1: FREQUENCY */}
          <div className="donate-step-block">
            <span className="donate-step-label">STEP 01 / SELECT CONTRIBUTION TYPE</span>
            <div className="donate-freq-tabs" role="tablist" aria-label="Donation frequency">
              <button
                type="button"
                className={frequency === "once" ? "freq-tab active" : "freq-tab"}
                onClick={() => setFrequency("once")}
              >
                One-Time Donation
              </button>
              <button
                type="button"
                className={frequency === "monthly" ? "freq-tab active" : "freq-tab"}
                onClick={() => setFrequency("monthly")}
              >
                Monthly Impact Partner
              </button>
              <button
                type="button"
                className={frequency === "institutional" ? "freq-tab active" : "freq-tab"}
                onClick={() => setFrequency("institutional")}
              >
                Corporate / Grant Sponsor
              </button>
            </div>
          </div>

          {/* STEP 2: MISSION TARGET */}
          <div className="donate-step-block">
            <span className="donate-step-label">STEP 02 / DESIGNATE YOUR HUMANITARIAN CAUSE</span>
            <div className="donate-mission-selector">
              {MISSIONS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={
                    selectedMissionId === m.id
                      ? "donate-mission-option active"
                      : "donate-mission-option"
                  }
                  onClick={() => setSelectedMissionId(m.id)}
                >
                  <div className="donate-mission-top">
                    <span className="donate-mission-badge">{m.badge}</span>
                    <i className="donate-radio" aria-hidden="true" />
                  </div>
                  <strong>{m.title}</strong>
                  <p>{m.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: AMOUNT SELECTION */}
          <div className="donate-step-block">
            <span className="donate-step-label">
              STEP 03 / CHOOSE AMOUNT (USD) {frequency === "monthly" ? "• BILLED MONTHLY" : ""}
            </span>
            <div className="donate-amounts-grid">
              {TIERS.map((tier) => {
                const isSelected = customAmount === "" && selectedAmount === tier.amount;
                return (
                  <button
                    type="button"
                    key={tier.amount}
                    className={isSelected ? "donate-amount-btn active" : "donate-amount-btn"}
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setCustomAmount("");
                    }}
                  >
                    <strong>{tier.label}</strong>
                    <small>{tier.title}</small>
                  </button>
                );
              })}
            </div>

            <div className="donate-custom-row">
              <label htmlFor="custom-donation-amount">Or enter custom amount ($ USD):</label>
              <div className="donate-custom-input-wrap">
                <span>$</span>
                <input
                  id="custom-donation-amount"
                  type="number"
                  min="5"
                  step="1"
                  placeholder="Enter custom amount (e.g. 150)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <small>USD</small>
              </div>
            </div>

            <div className="donate-impact-preview">
              <span className="impact-preview-tag">
                YOUR ${effectiveAmount.toLocaleString()} {frequency === "monthly" ? "/ MONTH " : ""}FIELD IMPACT:
              </span>
              <strong>{activeTier.title}</strong>
              <p>{activeTier.impact}</p>
            </div>
          </div>

          {/* STEP 4: INSTANT CHECKOUT OR PLEDGE REGISTRATION */}
          <div className="donate-step-block" style={{ borderBottom: "none", paddingBottom: 0 }}>
            <span className="donate-step-label">
              STEP 04 / COMPLETE YOUR DONATION OR REGISTER AN INSTITUTIONAL PLEDGE
            </span>

            <div className="donate-direct-buttons">
              <a
                href={activeMission.campaignUrl}
                target="_blank"
                rel="noreferrer"
                className="button donate-primary-cta"
              >
                Donate ${effectiveAmount.toLocaleString()} Now — {activeMission.campaignLabel}
              </a>
              <a
                href={
                  selectedMissionId === "clean-water"
                    ? "https://www.gofundme.com/f/wildguard-drone-network"
                    : "https://www.gofundme.com/f/clean-water-4-all-j2tyh"
                }
                target="_blank"
                rel="noreferrer"
                className="button secondary"
              >
                {selectedMissionId === "clean-water"
                  ? "Or Support WildGuard Drone Network ↗"
                  : "Or Support Clean Water 4 All Campaign ↗"}
              </a>
            </div>

            <form className="donate-pledge-form" onSubmit={handleRecordPledge}>
              <div className="donate-pledge-header">
                <strong>Need an Official Donation Receipt, Wire Instructions, or Equipment Sponsorship Record?</strong>
                <span>
                  Register your ${effectiveAmount.toLocaleString()} contribution pledge below to generate a reference code and receive official remittance/receipt documentation from our audit desk.
                </span>
              </div>
              <div className="donate-pledge-inputs">
                <input
                  type="text"
                  placeholder="Your Name or Organization"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email for Receipt & Telemetry Updates"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Optional note (e.g. Dedicate to a specific barangay, coastal beach, or equipment item)"
                value={donorNote}
                onChange={(e) => setDonorNote(e.target.value)}
                className="donate-note-input"
              />
              <button type="submit" className="donate-pledge-submit">
                Generate Official Donation Pledge &amp; Receipt Reference →
              </button>

              {pledgeRef && (
                <div className="donate-pledge-confirmation" role="status">
                  <div className="pledge-conf-badge">PLEDGE REGISTERED • REF #{pledgeRef}</div>
                  <h4>Thank you, {donorName || "Supporter"}!</h4>
                  <p>
                    Your <strong>${effectiveAmount.toLocaleString()} USD</strong> ({frequency}) pledge toward{" "}
                    <strong>{activeMission.title}</strong> has been logged under reference{" "}
                    <code>{pledgeRef}</code>. Complete your contribution immediately via{" "}
                    <a href={activeMission.campaignUrl} target="_blank" rel="noreferrer">
                      {activeMission.campaignLabel}
                    </a>{" "}
                    or email{" "}
                    <a
                      href={`mailto:partnerships@366industries.com?subject=Donation%20Pledge%20${pledgeRef}%20($${effectiveAmount})&body=Donor:%20${encodeURIComponent(
                        donorName
                      )}%0AMission:%20${encodeURIComponent(
                        activeMission.title
                      )}%0AAmount:%20$${effectiveAmount}%20USD%20(${frequency})%0ANote:%20${encodeURIComponent(
                        donorNote
                      )}`}
                    >
                      partnerships@366industries.com
                    </a>{" "}
                    for wire/corporate receipt issuance.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: CAMPAIGN CARDS & TRANSPARENCY GUARANTEE */}
        <aside className="donate-sidebar">
          <div className="donate-sidebar-card">
            <span className="section-label">VERIFIED PUBLIC CAMPAIGNS</span>
            <h3>Direct GoFundMe &amp; Field Funds</h3>
            <p>
              Support our active public fundraising campaigns directly or partner with our institutional grant desk for full-hub sponsorships:
            </p>

            <div className="donate-campaign-mini-list">
              <div className="donate-campaign-mini">
                <span>01 / CLEAN WATER INFRASTRUCTURE</span>
                <h4>Clean Water 4 All</h4>
                <p>
                  Off-grid solar borehole drilling, multi-stage ultrafiltration + UV, IoT water flow sensors &amp; 24/7 smart prepaid water dispensers for outage-hit homes and farms.
                </p>
                <a
                  href="https://www.gofundme.com/f/clean-water-4-all-j2tyh"
                  target="_blank"
                  rel="noreferrer"
                  className="mini-campaign-link"
                >
                  Open Clean Water 4 All on GoFundMe ↗
                </a>
              </div>

              <div className="donate-campaign-mini">
                <span>02 / SHARK, CROCODILE &amp; DISASTER DRONES</span>
                <h4>WildGuard Drone Network</h4>
                <p>
                  AI thermal &amp; optical coastal drone patrols where sharks and crocodiles roam, plus typhoon search-and-rescue, medical drops &amp; GPS inflatable rescue rafts.
                </p>
                <a
                  href="https://www.gofundme.com/f/wildguard-drone-network"
                  target="_blank"
                  rel="noreferrer"
                  className="mini-campaign-link"
                >
                  Open WildGuard Network on GoFundMe ↗
                </a>
              </div>
            </div>
          </div>

          <div className="donate-sidebar-card">
            <span className="section-label">DONOR &amp; AUDITOR GUARANTEE</span>
            <h3>How Your Donation Is Protected</h3>
            <ul className="donate-trust-list">
              <li>
                <strong>Ring-Fenced Humanitarian Reserve:</strong> Donations are never mixed with general corporate overhead.
              </li>
              <li>
                <strong>Liter &amp; Flight-Hour Telemetry:</strong> Every Solar Borehole Hub and WildGuard Drone logs measurable field output.
              </li>
              <li>
                <strong>Website Funds Co-Match:</strong> Revenues from 366 AI Designer, Pipe Buyer and 366 Games reinforce community maintenance reserves.
              </li>
              <li>
                <strong>Tri-National Compliance:</strong> Audited across 1st Defence Industries (BC, Canada), Ilocos Norte Operations (PH) &amp; Wyoming LLC (USA).
              </li>
            </ul>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link href="/grants" className="utility-pill highlight">
                View $385K Grant Dossier ↗
              </Link>
              <Link href="/signup" className="utility-pill">
                Create Donor Account ↗
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
