"use client";

import { useState } from "react";

/* ---------- Preset donation amounts ---------- */
/* WHY: These match the starting amounts of actual drives so donors see familiar numbers */
const presetAmounts = [25, 50, 100, 250, 350, 500];

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
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState("general");

  const donationAmount = customAmount
    ? parseInt(customAmount, 10)
    : selectedAmount;

  function handleDonate() {
    /* WHY: Stripe Payment Links are the simplest integration — no backend needed.
       Replace this URL with your actual Stripe Payment Link once created.
       Stripe Payment Links support custom amounts and metadata. */
    const stripeUrl = `https://donate.stripe.com/YOUR_PAYMENT_LINK_ID`;
    // For now, show instructions
    alert(
      `Stripe integration ready to connect!\n\nAmount: $${donationAmount}\nFund: ${fund}\n\nTo activate: replace the placeholder Stripe Payment Link in donate/page.tsx with your actual link from the Stripe Dashboard.`
    );
    // When live, uncomment: window.open(stripeUrl, '_blank');
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
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
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

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!donationAmount || donationAmount < 1}
              className="w-full py-4 bg-gold-500 text-white text-lg font-bold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {donationAmount && donationAmount >= 1
                ? `Donate $${donationAmount}`
                : "Select an Amount"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              UNCS Cares Foundation is a 501(c)(3) nonprofit. EIN #84-4044721.
              Your donation may be tax-deductible.
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
