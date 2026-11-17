"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  BellRing,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  LockKeyhole,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { IMPLEMENTATION_SCHEDULE } from "@/data/domus-quote";

interface PlainDateLike {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  add(duration: { days: number }): PlainDateLike;
  toString(): string;
}

interface TemporalNamespace {
  PlainDate: {
    from(iso: string): PlainDateLike;
  };
}

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const shortDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const fullDateFormatter = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function isValidIsoDate(iso: string): boolean {
  const match = ISO_DATE_RE.exec(iso);
  if (!match) return false;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const check = new Date(Date.UTC(y, m - 1, d));
  return (
    check.getUTCFullYear() === y &&
    check.getUTCMonth() === m - 1 &&
    check.getUTCDate() === d
  );
}

function addCalendarDays(
  iso: string,
  offsetDays: number,
  temporal?: TemporalNamespace
): { year: number; month: number; day: number; iso: string } {
  if (temporal) {
    const plain = temporal.PlainDate.from(iso).add({ days: offsetDays });
    return {
      year: plain.year,
      month: plain.month,
      day: plain.day,
      iso: plain.toString(),
    };
  }
  const [, yStr, mStr, dStr] = ISO_DATE_RE.exec(iso)!;
  const utc = new Date(
    Date.UTC(Number(yStr), Number(mStr) - 1, Number(dStr) + offsetDays)
  );
  const year = utc.getUTCFullYear();
  const month = utc.getUTCMonth() + 1;
  const day = utc.getUTCDate();
  return {
    year,
    month,
    day,
    iso: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`,
  };
}

function formatCalendarDate(
  parts: { year: number; month: number; day: number },
  variant: "short" | "full"
): string {
  const utcEpoch = Date.UTC(parts.year, parts.month - 1, parts.day);
  return variant === "full"
    ? fullDateFormatter.format(utcEpoch)
    : shortDateFormatter.format(utcEpoch);
}

export default function ImplementationSchedule() {
  const [startDateInput, setStartDateInput] = useState<string>(
    IMPLEMENTATION_SCHEDULE.defaultStartDate
  );
  const [temporalReady, setTemporalReady] = useState(false);
  const startDateId = useId();
  const helperId = useId();

  // Feature-detect native Temporal; load temporal-polyfill only when missing (e.g., Safari)
  useEffect(() => {
    const globalScope = globalThis as { Temporal?: TemporalNamespace };
    if (globalScope.Temporal) return;
    let active = true;
    import("temporal-polyfill").then((mod) => {
      const polyfillTemporal = mod.Temporal as unknown as TemporalNamespace;
      globalScope.Temporal = polyfillTemporal;
      if (active) setTemporalReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const validStartIso = isValidIsoDate(startDateInput) ? startDateInput : null;

  const computedTimeline = useMemo(() => {
    if (!validStartIso) return null;
    void temporalReady;
    const temporalApi = (globalThis as { Temporal?: TemporalNamespace })
      .Temporal;
    const startParts = addCalendarDays(validStartIso, 0, temporalApi);
    const endParts = addCalendarDays(
      validStartIso,
      IMPLEMENTATION_SCHEDULE.totalDays - 1,
      temporalApi
    );
    const weeks = IMPLEMENTATION_SCHEDULE.weeks.map((week) => {
      const from = addCalendarDays(
        validStartIso,
        week.startDayOffset,
        temporalApi
      );
      const to = addCalendarDays(
        validStartIso,
        week.endDayOffset,
        temporalApi
      );
      return {
        ...week,
        fromLabel: formatCalendarDate(from, "short"),
        toLabel: formatCalendarDate(to, "short"),
        fromIso: from.iso,
        toIso: to.iso,
      };
    });
    return {
      startLabel: formatCalendarDate(startParts, "full"),
      endLabel: formatCalendarDate(endParts, "full"),
      startShort: formatCalendarDate(startParts, "short"),
      endShort: formatCalendarDate(endParts, "short"),
      weeks,
    };
  }, [validStartIso, temporalReady]);

  return (
    <MotionConfig reducedMotion="user">
      <section id="cronograma" className="relative py-16 sm:py-24">
        <div className="domus-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#38BDF8] uppercase sm:text-sm">
                Plan de Ejecución · 4 Semanas
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl lg:text-[2.65rem]">
                Cronograma Interactivo de Instalación y Entrega
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
                {IMPLEMENTATION_SCHEDULE.introNote}
              </p>
            </div>
          </motion.div>

          {/* Interactive Start Date Calculator + End Date Output */}
          <div className="luxury-card print-keep-together mt-8 rounded-3xl border-[#D4AF37]/30 p-6 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <label
                  htmlFor={startDateId}
                  className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#F3E5AB] uppercase sm:text-sm"
                >
                  <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
                  Seleccione o escriba la fecha tentativa de inicio
                </label>
                <p id={helperId} className="mt-2 text-sm text-slate-400">
                  Al cambiar la fecha inicial, las 4 semanas y la fecha estimada
                  de entrega final se recalculan automáticamente.
                </p>
                <div className="no-print mt-3.5 flex flex-wrap items-center gap-2.5">
                  <input
                    id={startDateId}
                    type="date"
                    value={startDateInput}
                    aria-describedby={helperId}
                    onChange={(e) => setStartDateInput(e.target.value)}
                    className="domus-date-input min-h-[46px] flex-1 rounded-xl border border-white/15 bg-[#090A0F]/90 px-4 py-2.5 font-mono text-base text-slate-100 focus:border-[#D4AF37]"
                  />
                  {startDateInput !==
                  IMPLEMENTATION_SCHEDULE.defaultStartDate ? (
                    <button
                      type="button"
                      onClick={() =>
                        setStartDateInput(
                          IMPLEMENTATION_SCHEDULE.defaultStartDate
                        )
                      }
                      className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-[#D4AF37]/40 hover:text-[#F3E5AB]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reiniciar
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="print-cols-2 grid gap-4 sm:grid-cols-2 lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-[#090A0F]/70 p-5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#38BDF8] uppercase">
                    <CalendarRange className="h-4 w-4" />
                    Fecha de Inicio Seleccionada
                  </span>
                  <p className="mt-2 text-base font-bold text-slate-100 capitalize sm:text-lg">
                    {computedTimeline
                      ? computedTimeline.startLabel
                      : "Ingrese una fecha válida"}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                    Sujeta a entrega de los 5 requisitos previos
                  </p>
                </div>

                <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/[0.07] p-5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#10B981] uppercase">
                    <CheckCircle2 className="h-4 w-4" />
                    Fecha Estimada de Entrega Final
                  </span>
                  <p className="mt-2 text-base font-bold text-slate-50 capitalize sm:text-lg">
                    {computedTimeline
                      ? computedTimeline.endLabel
                      : "Pendiente de fecha válida"}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-slate-300 sm:text-sm">
                    Duración: 4 semanas ({IMPLEMENTATION_SCHEDULE.totalDays}{" "}
                    días calendario)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Week Dynamic Timeline Grid */}
          <div className="print-cols-2 mt-6 grid items-stretch gap-5 md:grid-cols-2">
            {IMPLEMENTATION_SCHEDULE.weeks.map((week, idx) => {
              const computedWeek = computedTimeline?.weeks[idx];
              const weekDates = computedWeek
                ? `${computedWeek.fromLabel} — ${computedWeek.toLabel}`
                : "Pendiente de fecha válida";
              return (
                <motion.article
                  key={week.weekNumber}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="luxury-card flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/12 px-3.5 py-1 font-mono text-xs font-bold text-[#F3E5AB] sm:text-sm">
                        SEMANA 0{week.weekNumber}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#38BDF8] sm:text-sm">
                        {weekDates}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-50 sm:text-xl">
                      {week.title}
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {week.activities.map((activity, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-300 sm:text-base"
                        >
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#10B981]" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/8 bg-[#090A0F]/65 px-4 py-3 text-sm text-slate-300">
                    <strong className="text-[#F3E5AB]">Entregable: </strong>
                    {week.deliverable}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* 5 Mandatory Startup Prerequisites + Storage + Enrollment */}
          <div className="print-cols-2 mt-6 grid items-stretch gap-6 lg:grid-cols-12">
            <div className="luxury-card print-keep-together flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <ClipboardCheck className="h-5 w-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-bold text-slate-50 sm:text-xl">
                    Requisitos Obligatorios para Iniciar el Proyecto
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                  El proyecto inicia únicamente al contar con los cinco (5)
                  soportes completos:
                </p>
                <ol className="mt-4 space-y-3">
                  {IMPLEMENTATION_SCHEDULE.startRequirements.map((req, index) => (
                    <li
                      key={req}
                      className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#090A0F]/55 px-4 py-3 text-[15px] text-slate-200 sm:text-base"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 font-mono text-xs font-bold text-[#F3E5AB]">
                        {index + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 lg:col-span-6">
              <div className="luxury-card print-keep-together rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <Users className="h-5 w-5 text-[#38BDF8]" />
                  <h3 className="text-lg font-bold text-slate-50 sm:text-xl">
                    {
                      IMPLEMENTATION_SCHEDULE.commitments.enrollmentSessions
                        .title
                    }
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.enrollmentSessions
                      .description
                  }
                </p>
              </div>

              <div className="luxury-card print-keep-together rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <PackageCheck className="h-5 w-5 text-[#10B981]" />
                  <h3 className="text-lg font-bold text-slate-50 sm:text-xl">
                    Resguardo de Equipos y Materiales en el Edificio
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  {IMPLEMENTATION_SCHEDULE.storageNote}
                </p>
                <p className="mt-4 rounded-xl border border-[#10B981]/25 bg-[#10B981]/10 px-4 py-3 text-sm font-medium text-[#6EE7B7] sm:text-[15px]">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.addedValueWindow
                      .description
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Contractual Commitments, Cybersecurity, Post-Sale Support & Closeout */}
          <details
            open
            className="domus-accordion luxury-card mt-6 rounded-3xl p-6 sm:p-8"
          >
            <summary className="flex items-center justify-between gap-4 text-left text-lg font-bold text-slate-50 sm:text-xl">
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                Compromisos de Ciberseguridad, Soporte Posventa, Entregables y
                Alertas
              </span>
              <ChevronDown className="accordion-chevron no-print h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200" />
            </summary>

            <div className="print-cols-2 mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-[#090A0F]/65 p-5 sm:p-6">
                <div className="flex items-center gap-2.5 text-base font-bold text-[#F3E5AB]">
                  <LockKeyhole className="h-5 w-5" />
                  {IMPLEMENTATION_SCHEDULE.commitments.cybersecurity.title}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.cybersecurity
                      .description
                  }
                </p>
              </article>

              <article className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-base font-bold text-slate-50">
                    <Wrench className="h-5 w-5 text-[#D4AF37]" />
                    {IMPLEMENTATION_SCHEDULE.commitments.postSaleSupport.title}
                  </span>
                  <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-0.5 font-mono text-xs font-bold text-[#F3E5AB] sm:text-sm">
                    {
                      IMPLEMENTATION_SCHEDULE.commitments.postSaleSupport
                        .priceLabel
                    }
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-200 sm:text-base">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.postSaleSupport
                      .description
                  }
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#090A0F]/65 p-5 sm:p-6">
                <div className="flex items-center gap-2.5 text-base font-bold text-[#38BDF8]">
                  <FileCheck2 className="h-5 w-5" />
                  {IMPLEMENTATION_SCHEDULE.commitments.projectCloseout.title}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.projectCloseout
                      .description
                  }
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#090A0F]/65 p-5 sm:p-6">
                <div className="flex items-center gap-2.5 text-base font-bold text-[#10B981]">
                  <BellRing className="h-5 w-5" />
                  {IMPLEMENTATION_SCHEDULE.commitments.alertsAndSiren.title}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                  {
                    IMPLEMENTATION_SCHEDULE.commitments.alertsAndSiren
                      .description
                  }
                </p>
              </article>
            </div>
          </details>
        </div>
      </section>
    </MotionConfig>
  );
}
