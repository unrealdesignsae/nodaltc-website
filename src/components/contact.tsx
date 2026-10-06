"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ContactIntro } from "@/components/contact-intro";
import { FORM_KEY } from "@/lib/survey-config";
import { buildBriefPayload, submitForm } from "@/lib/form-submit";

const EVENT_TYPES = [
  "Festival / Outdoor",
  "Concert / Tour",
  "Corporate Event",
  "Exhibition / Trade Show",
  "Broadcast / Streaming",
  "Other",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group flex flex-col gap-2">
      <span className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.14em] text-[#3a4558] uppercase transition-colors duration-300 group-focus-within:text-[#00d4ff]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputBase =
  "bg-transparent border-b border-[rgba(0,212,255,0.15)] text-[#e8f0fe] text-base py-3 outline-none transition-all duration-300 placeholder:text-[#2a3447] focus:border-[#00d4ff] w-full";

export function Contact() {
  const [active, setActive] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (submitted) successRef.current?.focus(); }, [submitted]);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingRef.current) return;
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot: hidden field only bots fill in — silently drop the submission.
    if (formData.get("botcheck")) return;

    const payload = buildBriefPayload(formData, active, FORM_KEY);
    if (!String(payload.name).trim()) { setError("Please enter your name."); return; }
    sendingRef.current = true;
    setSending(true);
    try {
      await submitForm(payload);
      setSubmitted(true);
      setActive(null);
      formRef.current?.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to send. Please email info@nodaltc.com.");
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Ambient glow — off-center, not centred */}
      <div
        className="pointer-events-none absolute right-0 top-0 w-[600px] h-[600px] opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #00d4ff 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* ── Eyebrow rule ── */}
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px flex-1 bg-[rgba(0,212,255,0.1)]" />
          <span className="font-[var(--font-mono)] text-[0.65rem] tracking-[0.2em] text-[#3a4558] uppercase">
            Contact
          </span>
        </div>

        {/* ── Two-column split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 lg:gap-32 items-start">

          <ContactIntro />

          {/* Right: Form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  ref={successRef} role="status" tabIndex={-1}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start justify-center min-h-[420px] gap-4"
                >
                  <div className="w-10 h-10 border border-[#00d4ff] flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d4ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-[var(--font-display)] font-bold text-2xl text-[#e8f0fe]">
                    Brief received.
                  </h3>
                  <p className="text-[#5a6478] text-sm leading-relaxed max-w-[320px]">
                    We&apos;ll be in touch within 24 hours. Keep an eye on your
                    inbox.
                  </p>
                  <button type="button" className="form-again" onClick={() => setSubmitted(false)}>Send another brief</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  aria-label="Homepage enquiry" aria-busy={sending}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="home-enquiry flex flex-col gap-8"
                >
                  {/* Honeypot — hidden from users, catches bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name + Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Field label="Name">
                      <input
                        type="text"
                        name="name" autoComplete="name" maxLength={150} disabled={sending}
                        placeholder="Your name"
                        required
                        className={inputBase}
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        type="text"
                        name="company" autoComplete="organization" maxLength={200} disabled={sending}
                        placeholder="Organisation"
                        className={inputBase}
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      type="email"
                      name="email" autoComplete="email" inputMode="email" maxLength={254} disabled={sending}
                      placeholder="your@email.com"
                      required
                      className={inputBase}
                    />
                  </Field>

                  {/* Event type — custom pill selector */}
                  <div className="flex flex-col gap-3">
                    <span className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.14em] text-[#3a4558] uppercase">
                      Event type
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {EVENT_TYPES.map((type) => (
                        <button
                          key={type}
                          disabled={sending} aria-pressed={active === type}
                          type="button"
                          onClick={() =>
                            setActive(active === type ? null : type)
                          }
                          className={`text-xs font-[var(--font-mono)] tracking-wide px-3 py-1.5 border transition-all duration-200 ${
                            active === type
                              ? "border-[#00d4ff] text-[#00d4ff] bg-[rgba(0,212,255,0.06)]"
                              : "border-[rgba(0,212,255,0.12)] text-[#3a4558] hover:border-[rgba(0,212,255,0.3)] hover:text-[#8892a4]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Brief">
                    <textarea
                      name="brief" maxLength={5000} disabled={sending}
                      rows={4}
                      placeholder="Event scale, location, timeline, technical needs..."
                      className={`${inputBase} resize-none`}
                    />
                  </Field>

                  {error && (
                    <p ref={errorRef} role="alert" tabIndex={-1} className="text-sm text-[#ff9999] font-[var(--font-mono)]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="self-start group relative inline-flex items-center gap-3 font-[var(--font-display)] font-bold text-sm tracking-wider uppercase text-black bg-[#00d4ff] px-8 py-3.5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.25)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Sheen on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <span className="relative">{sending ? "Sending..." : "Send brief"}</span>
                    <svg
                      className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="8" x2="13" y2="8" />
                      <polyline points="9 4 13 8 9 12" />
                    </svg>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
