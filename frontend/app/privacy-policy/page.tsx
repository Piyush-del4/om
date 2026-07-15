'use client';

import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-neutral-950 p-8 rounded-2xl border border-[var(--gold-100)]">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-[var(--gold)] mx-auto" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">Privacy Policy</h1>
          <p className="text-xs text-[var(--gold)] font-medium">Last updated: May 20, 2026</p>
        </div>

        <div className="h-px bg-neutral-800 my-6"></div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--gold)]" /> 1. Data We Collect
            </h2>
            <p>
              We collect information you provide directly to us when registering for an account, booking consultations, or making purchases. This includes your name, email address, phone number, payment details (processed securely by Razorpay), and any birth charts/handwriting data provided during service requests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--gold)]" /> 2. How We Use Your Data
            </h2>
            <p>
              Your personal information is used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li>Manage your account, authentication status, and dashboard settings.</li>
              <li>Schedule, update, and coordinate consultations via Google Calendar API.</li>
              <li>Process shop orders, deliver tracking tags, and generate invoices.</li>
              <li>Provide access to educational lecture panels, note saving, and comment sections.</li>
              <li>Notify you about course enrollments or schedule alterations via Nodemailer emails.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--gold)]" /> 3. Third-Party Integrations
            </h2>
            <p>
              We integrate only with verified third-party partners to provide core features:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li><strong>Google Calendar API:</strong> For scheduling video slot events (authorized service accounts).</li>
              <li><strong>Razorpay:</strong> Encrypted payment gateways for purchases and enrollment fees.</li>
              <li><strong>Cloudinary:</strong> Safe metadata storage for products and course PDFs.</li>
              <li><strong>Sentry:</strong> For logging errors, crashes, and performance bottlenecks (no PII logged).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--gold)]" /> 4. Security Measures
            </h2>
            <p>
              We enforce strict encryption policies on token exchange, passwords, and sessions. Cookies are set using HTTPOnly, Secure, and Strict SameSite flags to block cross-site script access. GDPR parameters are supported, and you may export your data files or choose to remove your account files permanently at any time via the User Profile console.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
            <p>
              If you have queries, concerns, or requests regarding data deletion, contact us at: <span className="text-[var(--gold)]">privacy@omastrologyamc.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
