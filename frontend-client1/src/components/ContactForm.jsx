import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
  FiPlay,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const countryCodes = [
  { code: "+91", label: "IN" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
];

const ContactForm = () => {
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const payload = {
      name: form.name,
      email: form.email,
      phone: `${form.countryCode}${form.phone}`,
      message: form.message,
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus("Message sent successfully");
      setForm({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      tl.from(".cf-left", {
        y: 18,
        opacity: 0,
        duration: 1.3,
      })
        .from(
          ".cf-form",
          {
            y: 20,
            opacity: 0,
            duration: 1.4,
          },
          "-=1"
        )
        .from(
          ".cf-submit",
          {
            opacity: 0,
            duration: 0.8,
            ease: "sine.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ContactForm"
      ref={sectionRef}
      className="min-h-screen bg-[#0b0e14] flex items-center justify-center px-4 py-16"
    >
      <div className="max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#11151f]">
        <div className="grid md:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="cf-left relative p-8 bg-gradient-to-br from-[#111827] to-[#020617] text-white">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 opacity-60" />

            <h2 className="text-3xl mb-4">
              Let’s <span className="text-indigo-400">Create</span>
            </h2>

            <p className="text-slate-400 text-sm mb-8">
              Share your idea and let us turn it into a cinematic story.
            </p>

            <div className="space-y-3 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <FiPlay className="text-indigo-400" />
                Creative editing workflow
              </div>
              <div className="flex items-center gap-2">
                <FiPlay className="text-indigo-400" />
                Fast delivery
              </div>
              <div className="flex items-center gap-2">
                <FiPlay className="text-indigo-400" />
                Professional output
              </div>
            </div>
          </div>

          {/* FORM PANEL */}
          <div className="cf-form p-8 bg-[#0f172a]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputBlock
                label="Name"
                icon={<FiUser />}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              <InputBlock
                label="Email"
                icon={<FiMail />}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                type="email"
              />

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="bg-[#020617] border border-white/10 rounded-lg px-3 text-white"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-3 bg-[#020617] border border-white/10 rounded-lg px-4 py-3 flex-1">
                    <FiPhone className="text-indigo-400" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                      className="bg-transparent w-full text-white outline-none placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Message
                </label>
                <div className="flex gap-3 bg-[#020617] border border-white/10 rounded-lg px-4 py-3 focus-within:border-indigo-500 transition">
                  <FiMessageSquare className="text-indigo-400 mt-1" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your project..."
                    required
                    className="bg-transparent w-full text-white outline-none placeholder-slate-500 resize-none"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="cf-submit w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3 rounded-lg text-white hover:opacity-90 transition"
              >
                <FiSend />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="text-center text-xs text-slate-400">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* small reusable input block (no animation applied) */
const InputBlock = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-xs text-slate-400 mb-1">{label}</label>
    <div className="flex items-center gap-3 bg-[#020617] border border-white/10 rounded-lg px-4 py-3 focus-within:border-indigo-500 transition">
      <span className="text-indigo-400">{icon}</span>
      <input
        {...props}
        required
        className="bg-transparent w-full text-white outline-none placeholder-slate-500"
      />
    </div>
  </div>
);

export default ContactForm;
