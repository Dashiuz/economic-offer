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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTitleId = useId();
  const sectionHeadingId = useId();

  const activeZone =
    BUILDING_ZONES.find((z) => z.id === activeZoneId) ?? BUILDING_ZONES[0];

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
      setActiveZoneId(BUILDING_ZONES[nextIndex].id);
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase">
                Recorrido por Áreas del Edificio
              </p>
              <h2
                id={sectionHeadingId}
                className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl"
              >
                Cobertura Completa por Zonas
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Así se distribuyen los 14 lectores faciales, 5 electroimanes, 6
                brazos hidráulicos, 5 botones sin contacto y 12 botones de
                emergencia en todo el edificio.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="no-print inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2.5 text-sm font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/20 lg:self-auto"
            >
              <MapIcon className="h-4 w-4 text-[#D4AF37]" />
              Ver Plano General de Ubicación
            </button>
          </motion.div>

          {/* Horizontal single-row scrollable tablist */}
          <div
            role="tablist"
            aria-label="Zonas de cobertura del Edificio Domus"
            className="mt-8 flex flex-nowrap gap-2 overflow-x-auto pb-2"
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
                  onClick={() => setActiveZoneId(zone.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`relative flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition ${
                    selected
                      ? "border-[#D4AF37]/50 bg-[#12141D] text-slate-50"
                      : "border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                      selected
                        ? "bg-[#D4AF37]/20 text-[#F3E5AB]"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                      Zona {zone.number}
                    </span>
                    <span className="block text-xs font-semibold whitespace-nowrap sm:text-sm">
                      {zone.shortLabel}
                    </span>
                  </span>
                  {selected ? (
                    <motion.span
                      layoutId="zone-tab-underline"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Active Zone Panel */}
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
              className="luxury-card mt-4 rounded-3xl p-5 sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Left Technical Details */}
                <div className="space-y-6 lg:col-span-5">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-3 py-1 font-mono text-xs font-semibold text-[#38BDF8]">
                      ZONA {activeZone.number} · {activeZone.name}
                    </span>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
                      {activeZone.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {activeZone.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                    <p className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
                      Situación Actual que se Resuelve
                    </p>
                    <p className="mt-1.5 text-sm text-slate-300">
                      {activeZone.currentPain}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Cómo Funcionará en el Día a Día
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {activeZone.solutionFlow.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-slate-200"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {activeZone.hardwareSummary.map((hw) => (
                      <div
                        key={hw.label}
                        className="rounded-xl border border-white/8 bg-[#090A0F]/65 p-3"
                      >
                        <p className="text-[11px] font-medium text-slate-400">
                          {hw.label}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#F3E5AB]">
                          {hw.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Photo Gallery */}
                <div className="lg:col-span-7">
                  <div
                    className={`grid gap-4 ${
                      activeZone.gallery.length > 1
                        ? "sm:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {activeZone.gallery.map((photo, idx) => (
                      <figure
                        key={photo.src}
                        className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0D1018] ${
                          activeZone.gallery.length === 3 && idx === 0
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <div
                          className={`relative w-full overflow-hidden ${
                            activeZone.gallery.length === 3 && idx === 0
                              ? "aspect-[16/9]"
                              : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover transition duration-500 hover:scale-[1.02]"
                          />
                        </div>
                        <figcaption className="border-t border-white/8 px-4 py-3 text-xs leading-relaxed text-slate-300">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Integrated Engineering Pillars (from domus-luxury-proposal) */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
                  className={`luxury-card rounded-2xl p-6 ${style.border}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${style.badge}`}
                    >
                      {pillar.metric}
                    </span>
                    <Icon className={`h-5 w-5 ${style.icon}`} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-50">
                    {pillar.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-slate-400">
                    {pillar.model}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
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
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="font-mono text-[11px] tracking-wider text-[#D4AF37] uppercase">
                Plano de Distribución · Sótano 1 y Recepción
              </p>
              <h3
                id={modalTitleId}
                className="text-base font-bold text-slate-50 sm:text-lg"
              >
                Mapa General de Equipos en el Edificio
              </h3>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Cerrar plano general"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition hover:border-[#D4AF37]/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="p-4 sm:p-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white">
              <Image
                src="/images/blueprint-sotano.webp"
                alt="Plano arquitectónico de ubicación de faciales, esclusa, LPR, botones de emergencia, UPS y estaciones de control"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
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
