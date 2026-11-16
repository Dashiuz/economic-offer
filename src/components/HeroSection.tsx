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
  ScanFace,
  ShieldCheck,
  Zap,
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
  respaldo: Zap,
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
          className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(56,189,248,0.06)_45%,transparent_72%)] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Executive Meta Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#F3E5AB] uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              Cotización Oficial #{QUOTE_METADATA.quoteNumber}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-[#38BDF8]" />
              {QUOTE_METADATA.client.building} · {QUOTE_METADATA.client.stratum}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300">
              <CalendarClock className="h-3.5 w-3.5 text-[#10B981]" />
              Atención: {QUOTE_METADATA.client.attention} · Validez{" "}
              {QUOTE_METADATA.validityDays} días
            </span>
          </motion.div>

          {/* Main Asymmetric Grid */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
                Control de Accesos y Seguridad · Bogotá
              </p>
              <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Ingreso Ágil,{" "}
                <span className="text-gold-gradient">
                  Seguro y Autónomo
                </span>{" "}
                para el Edificio Domus
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Una solución completa y discreta que cuida la estética del
                edificio: ingreso con reconocimiento facial en menos de medio
                segundo, lectura automática de placas vehiculares, ventanilla
                segura para domicilios y control centralizado en portería sin
                cuotas mensuales.
              </p>

              {/* Key Value Highlights */}
              <ul className="mt-6 grid gap-2.5 text-sm text-slate-300 sm:grid-cols-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>
                    Los residentes entran y salen por su cuenta, sin esperar al
                    guarda si está haciendo ronda.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>
                    Recepción segura de paquetes y domicilios sin tener que
                    abrir la puerta principal.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>
                    Software central permanente para 16 puertas, vehículos y
                    registro de visitantes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                  <span>
                    Respaldo eléctrico con dos plantas UPS para seguir operando
                    si falla la luz.
                  </span>
                </li>
              </ul>

              {/* Action Buttons & Investment Snapshot */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#inversion"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-6 py-3.5 text-sm font-bold text-[#090A0F] shadow-[0_8px_30px_rgba(212,175,55,0.28)] transition hover:brightness-105"
                >
                  Ver Propuesta Económica
                  <ArrowDownRight className="h-4 w-4" />
                </a>
                <a
                  href="#zonas"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-[#D4AF37]/50 hover:bg-white/[0.07]"
                >
                  Explorar Cobertura por Zonas
                </a>
                <div className="ml-auto hidden border-l border-white/10 pl-5 xl:block">
                  <span className="block text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    Inversión Total IVA Incl.
                  </span>
                  <span className="font-mono text-xl font-bold text-[#F3E5AB] tabular-nums">
                    {formatCOP(FINANCIAL_SUMMARY.total)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Architectural Hero Frame (LCP Priority) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="luxury-card relative overflow-hidden rounded-2xl p-2 shadow-2xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0D1018]">
                  <Image
                    src="/images/hero-domus-facade.webp"
                    alt="Fachada del Edificio Domus con proyección de cámaras LPR y lectores faciales"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/20 to-transparent"
                  />
                  <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3 rounded-xl border border-white/10 bg-[#090A0F]/80 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase">
                        {QUOTE_METADATA.client.address}
                      </p>
                      <p className="text-sm font-semibold text-slate-100">
                        Cobertura Integral de Accesos
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-[#10B981]/30 bg-[#10B981]/15 px-2.5 py-1 font-mono text-xs font-semibold text-[#10B981]">
                      27 Ítems
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Floating KPI Metric Cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  className={`luxury-card rounded-2xl p-5 ${style.ring}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${style.iconBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">
                      CLAVE 0{index + 1}
                    </span>
                  </div>
                  <div className={`mt-4 text-3xl font-bold ${style.text}`}>
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                    />
                  </div>
                  <h2 className="mt-1 text-sm font-semibold text-slate-100">
                    {metric.label}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
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
