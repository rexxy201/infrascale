import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, Building, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          to: "info@infrascale.africa",
          subject: `New Enquiry: ${form.subject} — from ${form.name}`,
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status !== "sending") {
      onClose();
      setTimeout(() => setStatus("idle"), 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl bg-[#0d1821] border border-white/10 overflow-hidden relative max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="px-8 py-7 border-b border-white/10 flex items-start justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.25em]">Direct Line</span>
                  </div>
                  <h2 className="text-2xl font-serif text-white">Initiate Dialogue</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/40 hover:text-white transition-colors p-1 mt-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success state */}
              {status === "success" ? (
                <div className="px-8 py-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-3">Message Received</h3>
                  <p className="text-white/60 mb-8 max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-[0.15em] text-sm hover:bg-white hover:text-background transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 py-7 overflow-y-auto flex flex-col gap-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="James Okafor"
                        className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="james@company.com"
                        className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company + Subject row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                        <Building className="w-3 h-3" /> Organisation
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Company / Ministry"
                        className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
                        Enquiry Type *
                      </label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors appearance-none"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled>Select a topic</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Energy Infrastructure">Energy Infrastructure</option>
                        <option value="Digital / Data Centre">Digital / Data Centre</option>
                        <option value="Connectivity">Connectivity</option>
                        <option value="Investment">Investment Enquiry</option>
                        <option value="Government / Sovereign">Government / Sovereign</option>
                        <option value="General">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/50 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your project, vision, or question..."
                      className="bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Error state */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Something went wrong. Please try again or email us directly at info@infrascale.africa</span>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <p className="text-white/30 text-xs">We respond within 24 hours.</p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-[0.15em] text-sm hover:bg-white hover:text-background transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
