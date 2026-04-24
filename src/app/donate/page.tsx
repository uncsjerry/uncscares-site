"use client";

import { useState } from "react";

/* ---------- Preset donation amounts ---------- */
/* WHY: Generic presets for most funds */
const defaultPresets = [500, 250, 100, 50, 25];

/* WHY: Brett Rose specified backpack-tier pricing for Back to School.
   Largest first so the anchor effect nudges higher donations. */
const backtoschoolPresets: { amount: number; label: string }[] = [
  { amount: 8000, label: "1,000 Backpacks — $8,000" },
  { amount: 4000, label: "500 Backpacks — $4,000" },
  { amount: 2000, label: "250 Backpacks — $2,000" },
  { amount: 800, label: "100 Backpacks — $800" },
  { amount: 400, label: "50 Backpacks — $400" },
  { amount: 250, label: "25 Backpacks — $250" },
];

/* WHY: Back to School is the active drive as of April 2026.
   Update this when the seasonal drive changes. */
const ACTIVE_DRIVE_DEFAULT = "backtoschool";

const fundOptions = [
  { value: "general", label: "General Fund — Where It's Needed Most" },
  { value: "backtoschool", label: "Back to School Drive" },
  { value: "thanksgiving", label: "Thanksgiving Dinner Drive" },
  { value: "bicycle", label: "Holiday Bicycle Drive" },
  { value: "dorm", label: "Destination Dorm" },
  { value: "shoes", label: "4EveryKid & Soles4Souls" },
  { value: "housing", label: "7 on 7th Affordable Housing" },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(250);
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState(ACTIVE_DRIVE_DEFAULT);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const donationAmount = customAmount
    ? parseInt(customAmount, 10)
    : selectedAmount;

  async function handleDonate() {
    if (!donationAmount || donationAmount < 1) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount, fund, marketingConsent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      /* Redirect to Stripe's hosted checkout page */
      window.location.href = data.url;
    } catch {
      setError("Unable to connect to payment processor. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Make a Donation
          </h1>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl">
            Every dollar goes directly to supporting Broward County families.
            Choose a fund or contribute to our General Fund.
          </p>
        </div>
      </section>

      <section className="bg-warm-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
            {/* Fund Selection */}
            <div className="mb-8">
              <label
                htmlFor="fund"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Choose a Fund
              </label>
              <select
                id="fund"
                value={fund}
                onChange={(e) => setFund(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-700"
              >
                {fundOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <p className="block text-sm font-semibold text-gray-700 mb-3">
                Select Amount
              </p>

              {fund === "backtoschool" ? (
                /* WHY: Backpack tiers use a stacked layout since labels
                   are longer and need to convey the impact clearly. */
                <div className="flex flex-col gap-2 mb-4">
                  {backtoschoolPresets.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => {
                        setSelectedAmount(tier.amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-colors border-2 text-left ${
                        selectedAmount === tier.amount && !customAmount
                          ? "bg-teal-700 text-white border-teal-700"
                          : "bg-white text-teal-700 border-teal-200 hover:border-teal-400"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {defaultPresets.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-lg font-semibold text-lg transition-colors border-2 ${
                        selectedAmount === amount && !customAmount
                          ? "bg-teal-700 text-white border-teal-700"
                          : "bg-white text-teal-700 border-teal-200 hover:border-teal-400"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              )}

              <div>
                <label
                  htmlFor="custom-amount"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    id="custom-amount"
                    min="1"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Marketing consent */}
            <label className="flex items-start gap-3 mb-8 cursor-pointer group">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-gray-300 text-teal-700 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-700 leading-relaxed">
                Keep me updated on UNCS Cares drives and impact stories
              </span>
            </label>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!donationAmount || donationAmount < 1 || loading}
              className="w-full py-4 bg-gold-500 text-white text-lg font-bold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Connecting to Stripe..."
                : donationAmount && donationAmount >= 1
                  ? `Donate $${donationAmount}`
                  : "Select an Amount"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              UNCS Cares Foundation is a 501(c)(3) nonprofit. EIN #84-4044721.
              Your donation is tax-deductible. Processed securely by Stripe.
            </p>
          </div>

          {/* Trust signals */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              {
                title: "Secure",
                text: "Payments processed securely through Stripe",
              },
              {
                title: "Tax-Deductible",
                text: "Receive a receipt for your tax records",
              },
              {
                title: "Direct Impact",
                text: "100% goes to community programs",
              },
            ].map((item) => (
              <div key={item.title} className="p-4">
                <p className="text-sm font-semibold text-teal-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
