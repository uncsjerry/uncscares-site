"use client";

import { useState, type FormEvent } from "react";
import type { Metadata } from "next";

/* WHY: metadata export removed — cannot export metadata from a client component.
   SEO metadata is handled via generateMetadata in a separate file or the layout. */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to email service (Resend, SendGrid, or Netlify Forms)
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl">
            Questions, partnership inquiries, or want to volunteer? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
                  <p className="text-lg font-semibold text-teal-900">
                    Thank you!
                  </p>
                  <p className="text-gray-600 mt-2">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="donate">Donation Question</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partnership">
                        Partnership / Sponsorship
                      </option>
                      <option value="media">Media / Press</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Address
                  </h3>
                  <address className="not-italic text-gray-700 leading-relaxed">
                    <p>1471 NE 26th Street, Second Floor</p>
                    <p>Fort Lauderdale, FL 33305</p>
                  </address>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+19545243325"
                    className="text-teal-700 hover:text-teal-900 font-medium transition-colors"
                  >
                    (954) 524-3325
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:support@uncscares.org"
                    className="text-teal-700 hover:text-teal-900 font-medium transition-colors"
                  >
                    support@uncscares.org
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Office Hours
                  </h3>
                  <p className="text-gray-700">
                    Monday &ndash; Friday, 9:00 AM &ndash; 5:00 PM EST
                  </p>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="mt-8 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.7!2d-80.1322!3d26.1451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA4JzQyLjQiTiA4MMKwMDcnNTYuMCJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UNCS Cares Foundation office location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
