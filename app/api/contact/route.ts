import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Escape user input before interpolating into the HTML email body
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, vehicle, message, consent } = body;

    if (!name || !email || !message || !consent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const smtpConfigured =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS;

    if (smtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Total Klean Site" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL ?? "contact@totalklean.com",
        replyTo: email,
        subject: `Nouvelle demande de cotation : ${service || "Non précisé"}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#285889;padding:24px 32px;border-radius:12px 12px 0 0">
              <h1 style="color:#fff;font-size:20px;margin:0">Nouvelle demande | Total Klean</h1>
            </div>
            <div style="background:#f8f9fc;padding:24px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#888;width:140px">Nom</td><td style="padding:8px 0;color:#17181A;font-weight:600">${esc(name)}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0;color:#17181A">${esc(email)}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Téléphone</td><td style="padding:8px 0;color:#17181A">${esc(phone) || "N/A"}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Service</td><td style="padding:8px 0;color:#17181A">${esc(service) || "N/A"}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Véhicule</td><td style="padding:8px 0;color:#17181A">${esc(vehicle) || "N/A"}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
              <p style="font-size:14px;color:#555;white-space:pre-wrap;margin:0">${esc(message)}</p>
            </div>
          </div>
        `,
      });
    } else {
      // SMTP not configured - log to console for development
      // To enable email: add SMTP_HOST, SMTP_USER, SMTP_PASS to your .env.local
      console.log("[Contact form] SMTP not configured. Submission:", {
        name, email, phone, service, vehicle, message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact form] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
