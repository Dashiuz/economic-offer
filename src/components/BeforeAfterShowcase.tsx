"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  MoveHorizontal,
  Sparkles,
} from "lucide-react";
import { BEFORE_AFTER_CASES, BeforeAfterCase } from "@/data/domus-quote";

function InteractiveImageComparator({ item }: { item: BeforeAfterCase }) {
  const [splitPercent, setSplitPercent] = useState(52);
  const sliderId = useId();
  const labelId = useId();

  if (item.mode === "split") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0D1018]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={item.beforeImage}
              alt={item.beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090A0F]/90 to-transparent"
            />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#090A0F]/85 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <AlertTriangle className="h-3.5 w-3.5" />
              {item.id === "autonomia-vehicular"
                ? "Pedestal Modernizado"
                : "Antes · Estado Actual"}
            </span>
          </div>
          <figcaption className="border-t border-white/5 px-4 py-3 text-xs text-slate-300">
            {item.beforeAlt}
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-2xl border border-[#10B981]/30 bg-[#0D1018]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={item.afterImage}
              alt={item.afterAlt}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090A0F]/90 to-transparent"
            />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#090A0F]/85 px-3 py-1 text-xs font-semibold text-[#10B981] backdrop-blur-md">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {item.id === "autonomia-vehicular"
                ? "Salida Sótano Autónoma"
                : "Después · Solución Domus"}
            </span>
          </div>
          <figcaption className="border-t border-white/5 px-4 py-3 text-xs text-slate-300">
            {item.afterAlt}
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <label
          id={labelId}
          htmlFor={sliderId}
          className="inline-flex items-center gap-2 font-medium text-slate-300"
        >
          <MoveHorizontal className="h-4 w-4 text-[#D4AF37]" />
          Deslice para comparar Antes y Después
        </label>
        <span className="font-mono text-[#F3E5AB] tabular-nums">
          Después: {100 - splitPercent}% · Antes: {splitPercent}%
        </span>
      </div>

      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D1018] select-none"
        style={{ touchAction: "pan-y" }}
      >
        {/* Base Layer: DESPUÉS */}
        <Image
          src={item.afterImage}
          alt={item.afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />

        {/* Overlay Layer: ANTES clipped cleanly by percentage */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
        >
          <Image
            src={item.beforeImage}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* Corner Badges */}
        <span className="pointer-events-none absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#090A0F]/85 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
          <AlertTriangle className="h-3.5 w-3.5" />
          Antes
        </span>
        <span className="pointer-events-none absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#090A0F]/85 px-3 py-1 text-xs font-semibold text-[#10B981] backdrop-blur-md">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Después
        </span>

        {/* Native accessible range input covering the comparator */}
        <input
          id={sliderId}
          type="range"
          min={5}
          max={95}
          step={1}
          value={splitPercent}
          onChange={(e) => setSplitPercent(Number(e.target.value))}
          aria-labelledby={labelId}
          aria-valuetext={`Mostrando ${splitPercent}% de situación actual y ${
            100 - splitPercent
          }% de solución propuesta`}
          className="comparator-range peer absolute inset-0 z-20 h-full w-full opacity-0"
        />

        {/* Visual Divider & Handle synced with range input */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.8)]"
          style={{ left: `${splitPercent}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F3E5AB] bg-[#090A0F]/90 text-[#F3E5AB] shadow-xl transition peer-focus-visible:ring-4 peer-focus-visible:ring-[#D4AF37]/60">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterShowcase() {
  const [activeId, setActiveId] = useState(BEFORE_AFTER_CASES[0].id);
  const activeItem =
    BEFORE_AFTER_CASES.find((c) => c.id === activeId) ?? BEFORE_AFTER_CASES[0];

  return (
    <MotionConfig reducedMotion="user">
      <section id="transformacion" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#38BDF8] uppercase">
                Mejoras en Espacios Clave
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl">
                Solución a los Puntos Críticos del Edificio
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Comparación directa entre la situación actual y la propuesta
                planteada para recepción, entrada peatonal y salidas
                vehiculares, cuidando la estética del edificio.
              </p>
            </div>

            {/* Case Selector Buttons */}
            <div
              role="tablist"
              aria-label="Casos de transformación arquitectónica"
              className="flex flex-wrap gap-2"
            >
              {BEFORE_AFTER_CASES.map((item) => {
                const selected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(item.id)}
                    className={`relative rounded-xl border px-4 py-2.5 text-left text-xs font-semibold transition sm:text-sm ${
                      selected
                        ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F3E5AB]"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {item.badge}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card mt-8 grid gap-8 rounded-3xl p-5 sm:p-8 lg:grid-cols-12"
            >
              {/* Left Narrative Column */}
              <div className="flex flex-col justify-between gap-6 lg:col-span-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3 py-1 text-xs font-medium text-[#38BDF8]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {activeItem.location}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
                    {activeItem.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                      <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-amber-300 uppercase">
                        <AlertTriangle className="h-4 w-4" />
                        {activeItem.beforeTitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {activeItem.beforeSummary}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#10B981]/25 bg-[#10B981]/[0.06] p-4">
                      <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#10B981] uppercase">
                        <CheckCircle2 className="h-4 w-4" />
                        {activeItem.afterTitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200">
                        {activeItem.afterSummary}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07] px-4 py-3">
                  <span className="text-xs font-medium text-slate-300">
                    Beneficio para la Copropiedad
                  </span>
                  <span className="text-xs font-bold text-[#F3E5AB] sm:text-sm">
                    {activeItem.impactMetric}
                  </span>
                </div>
              </div>

              {/* Right Visual Comparator */}
              <div className="lg:col-span-7">
                <InteractiveImageComparator item={activeItem} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}
