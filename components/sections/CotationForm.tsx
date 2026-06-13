"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

const services = {
  fr: [
    "Lavage basique et complet",
    "Correction de la peinture",
    "Protection céramique",
    "Rénovation des phares",
    "Nettoyage moteur",
    "Total Klean Mobile",
    "Plusieurs services",
  ],
  en: [
    "Basic & Full Wash",
    "Paint Correction",
    "Ceramic Protection",
    "Headlight Restoration",
    "Engine Cleaning",
    "Total Klean Mobile",
    "Multiple services",
  ],
};

interface CotationFormProps {
  locale: "fr" | "en";
}

export function CotationForm({ locale }: CotationFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    vehicle: "",
    message: "",
    consent: false,
  });

  const labels = {
    fr: {
      name: "Nom complet *",
      email: "Adresse e-mail *",
      phone: "Téléphone",
      service: "Service souhaité *",
      vehicle: "Marque & modèle du véhicule",
      message: "Décrivez votre demande *",
      consent: "J'accepte que les données que j'ai fournies soient collectées et stockées conformément à la politique de confidentialité de Total Klean.",
      submit: "Envoyer la demande",
      whatsapp: "Envoyer via WhatsApp",
      sending: "Envoi en cours...",
      sent: "Demande envoyée ! Nous vous recontacterons sous 24h.",
      error: "Une erreur s'est produite. Veuillez réessayer ou nous contacter par WhatsApp.",
      selectService: "Sélectionnez un service",
    },
    en: {
      name: "Full name *",
      email: "Email address *",
      phone: "Phone number",
      service: "Desired service *",
      vehicle: "Vehicle make & model",
      message: "Describe your request *",
      consent: "I agree that the data I have provided will be collected and stored in accordance with Total Klean's privacy policy.",
      submit: "Send request",
      whatsapp: "Send via WhatsApp",
      sending: "Sending...",
      sent: "Request sent! We'll get back to you within 24h.",
      error: "An error occurred. Please try again or contact us via WhatsApp.",
      selectService: "Select a service",
    },
  };
  const l = labels[locale];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const buildWhatsApp = () => {
    const msg = encodeURIComponent(
      `Bonjour Total Klean !\n\nNom: ${form.name}\nService: ${form.service}\nVéhicule: ${form.vehicle}\nTéléphone: ${form.phone}\n\n${form.message}`
    );
    return `https://wa.me/243997806193?text=${msg}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", service: "", vehicle: "", message: "", consent: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
            {l.name}
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
            {l.email}
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
            {l.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
            {l.service}
          </label>
          <select
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors bg-white"
          >
            <option value="">{l.selectService}</option>
            {services[locale].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
          {l.vehicle}
        </label>
        <input
          type="text"
          name="vehicle"
          value={form.vehicle}
          onChange={handleChange}
          placeholder="ex: Toyota Land Cruiser 200"
          className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors placeholder:text-obsidian/30"
        />
      </div>

      <div>
        <label className="block font-body text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
          {l.message}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-btn border border-black/10 font-body text-sm text-obsidian focus:outline-none focus:border-baltic focus:ring-2 focus:ring-baltic/10 transition-colors resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={handleChange}
          className="mt-0.5 accent-baltic flex-shrink-0"
        />
        <span className="font-body text-xs text-obsidian/55 leading-relaxed">{l.consent}</span>
      </label>

      {status === "sent" && (
        <div className="bg-aqua/10 border border-aqua/20 rounded-btn px-4 py-3 font-body text-sm text-baltic">
          {l.sent}
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-100 rounded-btn px-4 py-3 font-body text-sm text-red-600">
          {l.error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-baltic text-white font-body font-semibold rounded-btn hover:bg-amber transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none"
        >
          <Send size={15} />
          {status === "sending" ? l.sending : l.submit}
        </button>
        <a
          href={buildWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white font-body font-semibold rounded-btn hover:bg-[#1ebe5d] transition-colors duration-200"
        >
          <MessageCircle size={15} />
          {l.whatsapp}
        </a>
      </div>
    </form>
  );
}
