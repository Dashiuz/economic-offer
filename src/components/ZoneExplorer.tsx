"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Building,
  Car,
  Check,
  Cpu,
  DoorOpen,
  Layers,
  Map as MapIcon,
  Network,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  BUILDING_ZONES,
  ENGINEERING_PILLARS,
  EngineeringPillar,
} from "@/data/domus-quote";

const ZONE_ICONS: Record<string, typeof DoorOpen> = {
  "porteria-domicilios": DoorOpen,
  "esclusa-ascensores": Layers,
  "accesos-vehiculares": Car,
  "sotanos-emergencia": ShieldAlert,
};

const PILLAR_ICONS: Record<string, typeof Cpu> = {
  "lpr-wdr": Cpu,
  "poe-sotanos": Network,
  "hikcentral-core": ShieldCheck,
};

const PILLAR_STYLES: Record<
  EngineeringPillar["accent"],
  { border: string; badge: string; icon: string }
> = {
  gold: {
    border: "hover:border-[#D4AF37]/45",
    badge: "border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F3E5AB]",
    icon: "text-[#F3E5AB]",
  },
  cyan: {
    border: "hover:border-[#38BDF8]/45",
    badge: "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8]",
    icon: "text-[#38BDF8]",
  },
  emerald: {
    border: "hover:border-[#10B981]/45",
    badge: "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]",
    icon: "text-[#10B981]",
  },
};

export default function ZoneExplorer() {
  const [activeZoneId, setActiveZoneId] = useState(BUILDING_ZONES[0].id);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTitleId = useId();
  const sectionHeadingId = useId();

  const activeZone =
    BUILDING_ZONES.find((z) => z.id === activeZoneId) ?? BUILDING_ZONES[0];
  const featuredPhoto =
    activeZone.gallery[activePhotoIndex] ?? activeZone.gallery[0];

  const selectZone = (zoneId: string) => {
    setActiveZoneId(zoneId);
    setActivePhotoIndex(0);
  };

  // Fallback for browsers without native <dialog closedby="any"> (e.g., Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);
    return () => {
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = BUILDING_ZONES.length;
    let nextIndex = -1;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % count;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + count) % count;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = count - 1;

    if (nextIndex !== -1) {
      e.preventDefault();
      selectZone(BUILDING_ZONES[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="zonas"
        aria-labelledby={sectionHeadingId}
        className="relative py-16 sm:py-24"
      >
        <div className="domus-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase sm:text-sm">
                Recorrido por Áreas del Edificio
              </p>
              <h2
                id={sectionHeadingId}
                className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl lg:text-[2.65rem]"
              >
                Cobertura Completa por Zonas
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
                Así se distribuyen los 14 lectores faciales, 5 electroimanes, 6
                brazos hidráulicos, 5 botones sin contacto y 12 botones de
                emergencia en todo el edificio.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="no-print inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-3 text-sm font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/20 sm:text-base lg:self-auto"
            >
              <MapIcon className="h-4 w-4 text-[#D4AF37]" />
              Ver Plano General de Ubicación
            </button>
          </motion.div>

          {/* Symmetrical 4-Column Zone Selector */}
          <div
            role="tablist"
            aria-label="Zonas de cobertura del Edificio Domus"
            className="no-print mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {BUILDING_ZONES.map((zone, index) => {
              const Icon = ZONE_ICONS[zone.id] ?? Building;
              const selected = zone.id === activeZone.id;
              return (
                <button
                  key={zone.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`zone-tab-${zone.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectZone(zone.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition sm:px-5 ${
                    selected
                      ? "border-[#D4AF37]/60 bg-[#12141D] text-slate-50 shadow-[0_8px_24px_rgba(212,175,55,0.1)]"
                      : "border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      selected
                        ? "bg-[#D4AF37]/20 text-[#F3E5AB]"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs tracking-wider text-slate-400 uppercase">
                      Zona {zone.number}
                    </span>
                    <span className="block truncate text-sm font-bold sm:text-base">
                      {zone.shortLabel}
                    </span>
                  </span>
                  {selected ? (
                    <motion.span
                      layoutId="zone-tab-underline"
                      aria-hidden="true"
                      className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Active Zone Panel: Balanced 6/6 Top Split + Full-Width 3-Column Bottom Strip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              role="tabpanel"
              aria-labelledby={`zone-tab-${activeZone.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card mt-5 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid items-start gap-8 lg:grid-cols-12">
                {/* Left Column (6 cols): Narrative + Current Situation + Operation Flow */}
                <div className="space-y-6 lg:col-span-6">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#38BDF8] sm:text-sm">
                      ZONA {activeZone.number} · {activeZone.name}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-50 sm:text-[1.75rem] sm:leading-snug">
                      {activeZone.headline}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-300">
                      {activeZone.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                    <p className="text-xs font-bold tracking-wider text-amber-300 uppercase">
                      Situación Actual que se Resuelve
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-200 sm:text-base">
                      {activeZone.currentPain}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase sm:text-sm">
                      Cómo Funcionará en el Día a Día
                    </h4>
                    <ul className="mt-3.5 space-y-3">
                      {activeZone.solutionFlow.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-200 sm:text-base"
                        >
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column (6 cols): Uniform Featured Gallery + Visible All-Photos Strip */}
                <div className="space-y-4 lg:col-span-6">
                  <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1018]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={featuredPhoto.src}
                        alt={featuredPhoto.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="border-t border-white/8 px-5 py-3.5 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                      {featuredPhoto.caption}
                    </figcaption>
                  </figure>

                  {/* Visible Thumbnail Grid so all zone photos stay visible & selectable */}
                  <div
                    className={`grid gap-3 ${
                      activeZone.gallery.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-2"
                    }`}
                  >
                    {activeZone.gallery.map((photo, idx) => {
                      const isFeatured = idx === activePhotoIndex;
                      return (
                        <button
                          key={photo.src}
                          type="button"
                          onClick={() => setActivePhotoIndex(idx)}
                          aria-pressed={isFeatured}
                          className={`group overflow-hidden rounded-xl border text-left transition ${
                            isFeatured
                              ? "border-[#D4AF37]/70 bg-[#D4AF37]/10"
                              : "border-white/10 bg-[#0D1018] hover:border-white/25"
                          }`}
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 1024px) 50vw, 20vw"
                              className="object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                          </div>
                          <span className="block truncate px-3 py-2 text-xs font-medium text-slate-300">
                            Vista {idx + 1}: {photo.caption}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Full-Width 3-Column Hardware Summary Strip (eliminates narrow 10-line cramping) */}
              <div className="print-cols-3 mt-8 grid items-stretch gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
                {activeZone.hardwareSummary.map((hw) => (
                  <div
                    key={hw.label}
                    className="flex flex-col justify-between rounded-2xl border border-white/8 bg-[#090A0F]/65 p-5"
                  >
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase sm:text-sm">
                      {hw.label}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed font-semibold text-[#F3E5AB] sm:text-base">
                      {hw.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Integrated Engineering Pillars */}
          <div className="print-cols-3 mt-8 grid items-stretch gap-5 md:grid-cols-3">
            {ENGINEERING_PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[pillar.id] ?? Cpu;
              const style = PILLAR_STYLES[pillar.accent];
              return (
                <motion.article
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`luxury-card flex h-full flex-col justify-between rounded-2xl p-6 ${style.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-semibold ${style.badge}`}
                      >
                        {pillar.metric}
                      </span>
                      <Icon className={`h-5 w-5 ${style.icon}`} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-50 sm:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-slate-400 sm:text-sm">
                      {pillar.model}
                    </p>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                    {pillar.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Native <dialog> Modal for Architectural Floorplan */}
        <dialog
          ref={dialogRef}
          closedby="any"
          aria-labelledby={modalTitleId}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <p className="font-mono text-xs tracking-wider text-[#D4AF37] uppercase">
                Plano de Distribución · Sótano 1 y Recepción
              </p>
              <h3
                id={modalTitleId}
                className="text-lg font-bold text-slate-50 sm:text-xl"
              >
                Mapa General de Equipos en el Edificio
              </h3>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Cerrar plano general"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition hover:border-[#D4AF37]/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
          <div className="p-5 sm:p-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white">
              <Image
                src="/images/blueprint-sotano.webp"
                alt="Plano arquitectónico de ubicación de faciales, esclusa, LPR, botones de emergencia, UPS y estaciones de control"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Ubicación general de los 14 lectores faciales, la esclusa de
              ascensores, los botones de emergencia en sótanos, las cámaras de
              placas vehiculares y los equipos de respaldo y cómputo en
              portería.
            </p>
          </div>
        </dialog>
      </section>
    </MotionConfig>
  );
}
