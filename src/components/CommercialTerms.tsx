"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import {
  CalendarCheck2,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  COMMERCIAL_TERMS,
  formatCOP,
  QUOTE_METADATA,
} from "@/data/domus-quote";

export default function CommercialTerms() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="condiciones" className="relative pt-16 pb-24 sm:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.22em] text-[#10B981] uppercase">
              Condiciones Comerciales y Contacto
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl">
              Forma de Pago, Garantía y Atención Directa
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Payment Timeline + Legal Terms */}
            <div className="space-y-6 lg:col-span-7">
              {/* 50 / 50 Payment Scheme */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="luxury-card rounded-3xl p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/12 text-[#F3E5AB]">
                      <Wallet className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-50">
                        Forma de Pago 50% / 50%
                      </h3>
                      <p className="text-xs text-slate-400">
                        Pagos definidos contra inicio y entrega a satisfacción
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 font-mono text-xs font-semibold text-[#10B981]">
                    Sin mensualidades
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {COMMERCIAL_TERMS.paymentScheme.map((phase) => (
                    <div
                      key={phase.step}
                      className="rounded-2xl border border-white/10 bg-[#090A0F]/65 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#38BDF8]">
                          PAGO {phase.step}
                        </span>
                        <span className="rounded-lg bg-[#D4AF37]/15 px-2.5 py-0.5 font-mono text-sm font-bold text-[#F3E5AB]">
                          {phase.percentage}
                        </span>
                      </div>
                      <h4 className="mt-3 text-base font-bold text-slate-100">
                        {phase.title}
                      </h4>
                      <p className="mt-2 font-mono text-2xl font-bold text-[#F3E5AB] tabular-nums">
                        {formatCOP(phase.amount)}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        {phase.note}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Warranty & Validity */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="luxury-card rounded-3xl p-6 sm:p-8"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                      <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                      {COMMERCIAL_TERMS.warranty.duration}
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {COMMERCIAL_TERMS.warranty.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-100">
                      <CalendarCheck2 className="h-5 w-5 text-[#38BDF8]" />
                      Validez: {COMMERCIAL_TERMS.validity.days} Días Calendario
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {COMMERCIAL_TERMS.validity.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <p className="text-xs leading-relaxed text-slate-300">
                    <strong className="text-amber-200">Nota legal: </strong>
                    {COMMERCIAL_TERMS.warranty.exclusions}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Rosa Coral Executive Contact & Print Card */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="luxury-card flex flex-col justify-between rounded-3xl border-[#D4AF37]/30 p-6 sm:p-8 lg:col-span-5"
            >
              <div>
                <div className="relative h-14 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#050608] px-3 py-1.5">
                  <Image
                    src={QUOTE_METADATA.provider.logoPath}
                    alt="Logo Seguridad Explorer LTDA / IngExpertos"
                    fill
                    sizes="256px"
                    className="object-contain"
                  />
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                    Contacto Directo de Gerencia
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-50">
                    {QUOTE_METADATA.provider.representative}
                  </h3>
                  <p className="text-sm font-medium text-[#38BDF8]">
                    {QUOTE_METADATA.provider.role} ·{" "}
                    {QUOTE_METADATA.provider.legalName}
                  </p>
                </div>

                <dl className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <dt className="visually-hidden">Teléfono</dt>
                    <dd className="font-mono">
                      {QUOTE_METADATA.provider.phoneFormatted}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <dt className="visually-hidden">Correo electrónico</dt>
                    <dd className="break-all">
                      {QUOTE_METADATA.provider.email}
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <dt className="visually-hidden">Dirección</dt>
                    <dd>{QUOTE_METADATA.provider.address}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <dt className="visually-hidden">Sitio web</dt>
                    <dd>
                      <a
                        href={QUOTE_METADATA.provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-white/25 underline-offset-4 transition hover:text-[#F3E5AB]"
                      >
                        www.seguridadexplorer.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="no-print mt-8 space-y-3">
                <a
                  href={QUOTE_METADATA.provider.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(16,185,129,0.28)] transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar o Aprobar por WhatsApp
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:${QUOTE_METADATA.provider.email}?subject=Propuesta%20Edificio%20Domus%20-%20Cotizaci%C3%B3n%20I-P.A.11`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-100 transition hover:border-[#D4AF37]/50 hover:bg-white/[0.08]"
                  >
                    <Mail className="h-4 w-4 text-[#38BDF8]" />
                    Enviar Correo
                  </a>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/12 px-4 py-3 text-xs font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/22"
                  >
                    <Printer className="h-4 w-4 text-[#D4AF37]" />
                    Exportar PDF
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
