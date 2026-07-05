"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const EVENT_TYPES = [
  "Festival / Outdoor",
  "Concert / Tour",
  "Corporate Event",
  "Exhibition / Trade Show",
  "Broadcast / Streaming",
  "Other",
];

// ⬇️ Paste your free Web3Forms access key here.
// Get it in 30s at https://web3forms.com — just enter info@nodaltc.com and check that inbox.
const WEB3FORMS_ACCESS_KEY = "aab72214-a231-401a-a55b-3538d2f2d449";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-2">
      <label className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.14em] text-[#3a4558] uppercase transition-colors duration-300 group-focus-within:text-[#00d4ff]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "bg-transparent border-b border-[rgba(0,212,255,0.15)] text-[#e8f0fe] text-sm py-3 outline-none transition-all duration-300 placeholder:text-[#2a3447] focus:border-[#00d4ff] w-full";

export function Contact() {
  const [active, setActive] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot: hidden field only bots fill in — silently drop the submission.
    if (formData.get("botcheck")) return;

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New brief from ${formData.get("name") || "the website"}`,
      from_name: "Nodal TC Website",
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      event_type: active,
      brief: formData.get("brief"),
      replyto: formData.get("email"),
    };

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error("Send failed");
      }

      setSubmitted(true);
      setActive(null);
      setTimeout(() => {
        setSubmitted(false);
        formRef.current?.reset();
      }, 4000);
    } catch {
      setError("Something went wrong. Please email us directly at info@nodaltc.com.");
    } finally {
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

          {/* Left: Statement */}
          <div>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.05] text-[#e8f0fe] mb-8"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
            >
              Start a{" "}
              <span className="text-[#00d4ff]">conversation.</span>
            </h2>

            <p className="text-[#5a6478] text-base leading-relaxed max-w-[360px] mb-12">
              We respond to every brief within 24 hours. Project enquiries,
              technical questions, or an event you want to talk through — all
              welcome.
            </p>

            {/* Contact atoms */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.78 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  ),
                  label: "+971 50 123 4567",
                  href: "tel:+971501234567",
                },
                {
                  icon: (
                    <>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </>
                  ),
                  label: "info@nodaltc.com",
                  href: "mailto:info@nodaltc.com",
                },
                {
                  icon: (
                    <>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </>
                  ),
                  label: "Dubai, UAE — global delivery",
                  href: "#",
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group inline-flex items-center gap-3 text-[#5a6478] text-sm hover:text-[#e8f0fe] transition-colors duration-300"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 text-[#00d4ff]"
                  >
                    {icon}
                  </svg>
                  {label}
                </a>
              ))}
            </div>

            {/* Availability signal */}
            <div className="mt-12 inline-flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-[signal-pulse_2s_ease-in-out_infinite]" />
              <span className="font-[var(--font-mono)] text-[0.68rem] tracking-[0.12em] text-[#00ff88] uppercase">
                Accepting briefs for 2026 — 2027
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
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
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
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
                        name="name"
                        placeholder="Your name"
                        required
                        className={inputBase}
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        type="text"
                        name="company"
                        placeholder="Organisation"
                        className={inputBase}
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      type="email"
                      name="email"
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
                      name="brief"
                      rows={4}
                      placeholder="Event scale, location, timeline, technical needs..."
                      className={`${inputBase} resize-none`}
                    />
                  </Field>

                  {error && (
                    <p className="text-xs text-[#ff6b6b] font-[var(--font-mono)]">
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
