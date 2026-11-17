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
        <div className="domus-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#10B981] uppercase sm:text-sm">
                Condiciones Comerciales y Contacto
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl lg:text-[2.65rem]">
                Forma de Pago, Garantía y Atención Directa
              </h2>
            </div>
            <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#10B981] sm:text-sm">
              Sin mensualidades
            </span>
          </motion.div>

          {/* Payment Options Comparison Cards (50/50 Standard vs 70/30 with 6% Discount) */}
          <div className="print-cols-2 mt-8 grid items-stretch gap-6 lg:grid-cols-2">
            {COMMERCIAL_TERMS.paymentOptions.map((option, idx) => (
              <motion.article
                key={option.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`luxury-card print-keep-together flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8 ${
                  option.hasDiscount
                    ? "border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/10 via-[#12141D] to-[#12141D]"
                    : ""
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                          option.hasDiscount
                            ? "border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#F3E5AB]"
                            : "border-white/15 bg-white/[0.05] text-slate-200"
                        }`}
                      >
                        <Wallet className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-50 sm:text-xl">
                          {option.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3.5 py-1 font-mono text-xs font-bold sm:text-sm ${
                        option.hasDiscount
                          ? "border-[#10B981]/40 bg-[#10B981]/15 text-[#6EE7B7]"
                          : "border-white/15 bg-white/[0.05] text-slate-200"
                      }`}
                    >
                      {option.badge}
                    </span>
                  </div>

                  {/* Option Summary Strip */}
                  <div
                    className={`mt-5 flex flex-wrap items-baseline justify-between gap-2 rounded-2xl border px-4 py-3.5 ${
                      option.hasDiscount
                        ? "border-[#D4AF37]/30 bg-[#090A0F]/70"
                        : "border-white/10 bg-[#090A0F]/65"
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        {option.hasDiscount
                          ? "Total con descuento 6% (IVA incluido)"
                          : "Total del proyecto sin descuento (IVA incluido)"}
                      </span>
                      <span className="mt-0.5 block font-mono text-xs text-slate-300 tabular-nums">
                        {option.hasDiscount
                          ? `Dto. 6%: -${formatCOP(option.discountAmount)} · Ahorro con IVA: ${formatCOP(option.savingsAmount)}`
                          : `Subtotal $ 60.593.946 · IVA 19% ${formatCOP(option.ivaAmount)}`}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xl font-bold tabular-nums sm:text-2xl ${
                        option.hasDiscount
                          ? "text-gold-gradient"
                          : "text-slate-100"
                      }`}
                    >
                      {formatCOP(option.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Two Payment Milestones */}
                <div className="print-cols-2 mt-5 grid gap-4 sm:grid-cols-2">
                  {option.phases.map((phase) => (
                    <div
                      key={phase.step}
                      className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#090A0F]/65 p-5"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-[#38BDF8] sm:text-sm">
                            PAGO {phase.step}
                          </span>
                          <span
                            className={`rounded-lg px-3 py-0.5 font-mono text-sm font-bold ${
                              option.hasDiscount
                                ? "bg-[#D4AF37]/15 text-[#F3E5AB]"
                                : "bg-white/[0.08] text-slate-200"
                            }`}
                          >
                            {phase.percentage}
                          </span>
                        </div>
                        <h4 className="mt-3 text-base font-bold text-slate-100">
                          {phase.title}
                        </h4>
                        <p
                          className={`mt-2 font-mono text-xl font-bold tabular-nums sm:text-2xl ${
                            option.hasDiscount
                              ? "text-[#F3E5AB]"
                              : "text-slate-100"
                          }`}
                        >
                          {formatCOP(phase.amount)}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {phase.note}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="print-cols-2 mt-6 grid items-stretch gap-6 lg:grid-cols-12">
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
              className="luxury-card print-keep-together flex flex-col justify-between rounded-3xl p-6 sm:p-8 lg:col-span-7"
            >
              <div className="print-cols-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2.5 text-base font-bold text-slate-100">
                    <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                    {COMMERCIAL_TERMS.warranty.duration}
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                    {COMMERCIAL_TERMS.warranty.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 text-base font-bold text-slate-100">
                    <CalendarCheck2 className="h-5 w-5 text-[#38BDF8]" />
                    Validez: {COMMERCIAL_TERMS.validity.days} Días Calendario
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                    {COMMERCIAL_TERMS.validity.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-amber-200">Nota legal: </strong>
                  {COMMERCIAL_TERMS.warranty.exclusions}
                </p>
              </div>
            </motion.div>

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
              className="luxury-card print-keep-together flex h-full flex-col justify-between rounded-3xl border-[#D4AF37]/30 p-6 sm:p-8 lg:col-span-5"
            >
              <div>
                <div className="print-dark-logo relative h-16 w-72 overflow-hidden rounded-xl border border-white/10 bg-[#050608] px-3 py-1.5">
                  <Image
                    src={QUOTE_METADATA.provider.logoPath}
                    alt="Logo Seguridad Explorer LTDA / IngExpertos"
                    fill
                    sizes="288px"
                    className="object-contain"
                  />
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs font-semibold tracking-wider text-[#D4AF37] uppercase sm:text-sm">
                    Contacto Directo de Gerencia
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold text-slate-50 sm:text-3xl">
                    {QUOTE_METADATA.provider.representative}
                  </h3>
                  <p className="mt-1 text-base font-medium text-[#38BDF8]">
                    {QUOTE_METADATA.provider.role} ·{" "}
                    {QUOTE_METADATA.provider.legalName}
                  </p>
                </div>

                <dl className="mt-6 space-y-3.5 text-[15px] text-slate-300 sm:text-base">
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-5 py-4 text-base font-bold text-white shadow-[0_8px_28px_rgba(16,185,129,0.28)] transition hover:brightness-110"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar o Aprobar por WhatsApp
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`mailto:${QUOTE_METADATA.provider.email}?subject=Propuesta%20Edificio%20Domus%20-%20Cotizaci%C3%B3n%20I-P.A.11`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-[#D4AF37]/50 hover:bg-white/[0.08]"
                  >
                    <Mail className="h-4 w-4 text-[#38BDF8]" />
                    Enviar Correo
                  </a>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/12 px-4 py-3.5 text-sm font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/22"
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
