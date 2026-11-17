"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDownRight,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  DoorClosedLocked,
  HardDrive,
  ScanFace,
  ShieldCheck,
} from "lucide-react";
import {
  FINANCIAL_SUMMARY,
  formatCOP,
  HERO_METRICS,
  HeroMetric,
  QUOTE_METADATA,
} from "@/data/domus-quote";

const METRIC_ICONS: Record<string, typeof ScanFace> = {
  faciales: ScanFace,
  lpr: Camera,
  puertas: DoorClosedLocked,
  respaldo: HardDrive,
};

const ACCENT_CLASSES: Record<
  HeroMetric["accent"],
  { ring: string; iconBg: string; text: string }
> = {
  gold: {
    ring: "hover:border-[#D4AF37]/50",
    iconBg: "bg-[#D4AF37]/12 text-[#F3E5AB] border-[#D4AF37]/25",
    text: "text-[#F3E5AB]",
  },
  cyan: {
    ring: "hover:border-[#38BDF8]/50",
    iconBg: "bg-[#38BDF8]/12 text-[#38BDF8] border-[#38BDF8]/25",
    text: "text-[#38BDF8]",
  },
  emerald: {
    ring: "hover:border-[#10B981]/50",
    iconBg: "bg-[#10B981]/12 text-[#10B981] border-[#10B981]/25",
    text: "text-[#10B981]",
  },
};

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (shouldReduceMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = `${value}${suffix}`;
    };
  }, [inView, value, suffix, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="resumen"
        className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24"
      >
        {/* Ultra-diffuse ambient radial lighting */}
        <div
          aria-hidden="true"
          className="no-print pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(56,189,248,0.06)_45%,transparent_72%)] blur-3xl"
        />

        <div className="domus-container relative">
          {/* Executive Meta Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex-wrap-balance mb-8 items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#F3E5AB] uppercase sm:text-sm">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              Cotización Oficial #{QUOTE_METADATA.quoteNumber}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-slate-300 sm:text-sm">
              <Building2 className="h-4 w-4 text-[#38BDF8]" />
              {QUOTE_METADATA.client.building} · {QUOTE_METADATA.client.stratum}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-slate-300 sm:text-sm">
              <CalendarClock className="h-4 w-4 text-[#10B981]" />
              Atención: {QUOTE_METADATA.client.attention} · Validez{" "}
              {QUOTE_METADATA.validityDays} días
            </span>
          </motion.div>

          {/* Main Balanced Grid (6 / 6 on desktop for visual symmetry) */}
          <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between lg:col-span-6"
            >
              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase sm:text-sm">
                  Control de Accesos y Seguridad · Bogotá
                </p>
                <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                  Ingreso Ágil,{" "}
                  <span className="text-gold-gradient">Seguro y Autónomo</span>{" "}
                  para el Edificio Domus
                </h1>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg lg:text-[1.15rem]">
                  Una solución completa y estética para el edificio: residentes
                  que pueden ingresar con la lectura de placas o por la puerta
                  peatonal en segundos; visitantes que solo pueden ingresar con
                  autorización del residente y registro facial y de placas,
                  ventanilla segura para domicilios y estación de trabajo para el
                  vigilante.
                </p>

                {/* Key Value Highlights */}
                <ul className="mt-6 grid gap-3.5 text-[15px] leading-relaxed text-slate-300 sm:grid-cols-2 sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#10B981]" />
                    <span>
                      Autonomía en ingresos y accesos peatonales o vehiculares,
                      aun si el guarda está en otro lugar o desarrollando otra
                      labor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#10B981]" />
                    <span>
                      Recepción segura de paquetes y domicilios sin tener que
                      abrir la puerta principal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#10B981]" />
                    <span>
                      Software central permanente para las puertas controladas,
                      vehículos y registro de visitantes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#10B981]" />
                    <span>
                      Tecnología adaptable para añadir más cámaras y ampliar los
                      sistemas actuales de análogos a IP. Grabaciones de
                      sistemas de control de acceso y vehicular hasta por 30
                      días.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons aligned cleanly on a single row */}
              <div className="no-print mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#inversion"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-7 py-4 text-base font-bold text-[#090A0F] shadow-[0_8px_30px_rgba(212,175,55,0.28)] transition hover:brightness-105"
                >
                  Ver Propuesta Económica
                  <ArrowDownRight className="h-5 w-5" />
                </a>
                <a
                  href="#zonas"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-base font-semibold text-slate-100 transition hover:border-[#D4AF37]/50 hover:bg-white/[0.07]"
                >
                  Explorar Cobertura por Zonas
                </a>
              </div>
            </motion.div>

            {/* Right Column: Architectural Facade + Symmetric Investment Summary Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between gap-4 lg:col-span-6"
            >
              <div className="luxury-card relative overflow-hidden rounded-2xl p-2.5 shadow-2xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0D1018]">
                  <Image
                    src="/images/hero-domus-facade.webp"
                    alt="Fachada del Edificio Domus con proyección de cámaras LPR y lectores faciales"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="print-hide-overlay absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/20 to-transparent"
                  />
                  <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3 rounded-xl border border-white/10 bg-[#090A0F]/85 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                        {QUOTE_METADATA.client.address}
                      </p>
                      <p className="text-base font-semibold text-slate-100">
                        Cobertura Integral de Accesos
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-[#10B981]/30 bg-[#10B981]/15 px-3 py-1 font-mono text-xs font-semibold text-[#10B981] sm:text-sm">
                      27 Ítems
                    </span>
                  </div>
                </div>
              </div>

              {/* Symmetrical Investment Summary Anchor */}
              <div className="luxury-card print-keep-together flex flex-col justify-between gap-4 rounded-2xl border-[#D4AF37]/35 bg-gradient-to-r from-[#D4AF37]/12 via-[#12141D] to-[#12141D] px-6 py-5 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <span className="block text-xs font-semibold tracking-wider text-[#F3E5AB] uppercase">
                    Inversión Total IVA Incluido
                  </span>
                  <p className="font-mono text-sm text-slate-300 tabular-nums">
                    Subtotal {formatCOP(FINANCIAL_SUMMARY.subtotal)} · IVA 19%{" "}
                    {formatCOP(Math.round(FINANCIAL_SUMMARY.ivaAmount))}
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="text-gold-gradient font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                    {formatCOP(FINANCIAL_SUMMARY.total)}
                  </span>
                  <span className="block font-mono text-xs text-slate-400">
                    COP · Validez {QUOTE_METADATA.validityDays} días
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Floating KPI Metric Cards */}
          <div className="print-cols-2 mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_METRICS.map((metric, index) => {
              const Icon = METRIC_ICONS[metric.id] ?? ShieldCheck;
              const style = ACCENT_CLASSES[metric.accent];
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`luxury-card print-keep-together flex h-full flex-col justify-between rounded-2xl p-6 ${style.ring}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${style.iconBg}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                        CLAVE 0{index + 1}
                      </span>
                    </div>
                    <div
                      className={`mt-5 text-3xl font-bold sm:text-4xl ${style.text}`}
                    >
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix}
                      />
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-100 sm:text-lg">
                      {metric.label}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                    {metric.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
