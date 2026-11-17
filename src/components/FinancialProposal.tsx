"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Filter,
  LayoutGrid,
  Search,
  Table2,
} from "lucide-react";
import {
  CategoryId,
  FINANCIAL_SUMMARY,
  formatCOP,
  QUOTE_CATEGORIES,
  QUOTE_ITEMS,
  QUOTE_METADATA,
} from "@/data/domus-quote";

function AnimatedCurrency({
  value,
  prefix = "",
}: {
  value: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (shouldReduceMotion) {
      node.textContent = `${prefix}${formatCOP(value)}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${formatCOP(Math.round(latest))}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = `${prefix}${formatCOP(value)}`;
    };
  }, [inView, value, prefix, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {formatCOP(value)}
    </span>
  );
}

const ACCENT_DOT: Record<"gold" | "cyan" | "emerald", string> = {
  gold: "bg-[#D4AF37]",
  cyan: "bg-[#38BDF8]",
  emerald: "bg-[#10B981]",
};

const ACCENT_BAR: Record<"gold" | "cyan" | "emerald", string> = {
  gold: "from-[#D4AF37] to-[#F3E5AB]",
  cyan: "from-[#0284C7] to-[#38BDF8]",
  emerald: "from-[#059669] to-[#10B981]",
};

export default function FinancialProposal() {
  const [viewMode, setViewMode] = useState<"executive" | "detailed">(
    "executive"
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();
  const tableCaptionId = useId();

  const categorySummaries = useMemo(() => {
    return QUOTE_CATEGORIES.map((cat) => {
      const items = QUOTE_ITEMS.filter((item) => item.category === cat.id);
      const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
      const sharePct = (subtotal / FINANCIAL_SUMMARY.subtotal) * 100;
      return {
        ...cat,
        itemCount: items.length,
        subtotal,
        sharePct,
      };
    });
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return QUOTE_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        item.ref.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        String(item.id).includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const filteredSubtotal = useMemo(
    () => filteredItems.reduce((acc, item) => acc + item.totalPrice, 0),
    [filteredItems]
  );

  const hasDatasheetLinks = useMemo(
    () => QUOTE_ITEMS.some((item) => Boolean(item.datasheetUrl)),
    []
  );

  const openCategoryDetail = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setViewMode("detailed");
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="inversion" className="relative py-16 sm:py-24">
        <div className="domus-container">
          {/* Header + View Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#D4AF37] uppercase sm:text-sm">
                Propuesta Económica Oficial · #{QUOTE_METADATA.quoteNumber}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl lg:text-[2.65rem]">
                Resumen Económico y Detalle de Cotización
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
                Revise la inversión agrupada por capítulos para toma de
                decisiones o consulte el listado completo de los 27 ítems
                cotizados con cantidades, precios y especificaciones técnicas.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Modo de visualización financiera"
              className="no-print inline-flex shrink-0 rounded-xl border border-white/10 bg-[#12141D] p-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "executive"}
                onClick={() => setViewMode("executive")}
                className={`relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition sm:text-base ${
                  viewMode === "executive"
                    ? "bg-[#D4AF37]/20 text-[#F3E5AB]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Vista Ejecutiva
                {viewMode === "executive" ? (
                  <motion.span
                    layoutId="finance-view-underline"
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-[#D4AF37]"
                  />
                ) : null}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "detailed"}
                onClick={() => setViewMode("detailed")}
                className={`relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition sm:text-base ${
                  viewMode === "detailed"
                    ? "bg-[#D4AF37]/20 text-[#F3E5AB]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Table2 className="h-4 w-4" />
                Tabla 27 Ítems
                {viewMode === "detailed" ? (
                  <motion.span
                    layoutId="finance-view-underline"
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-[#D4AF37]"
                  />
                ) : null}
              </button>
            </div>
          </motion.div>

          {/* Top Financial KPI Summary Strip */}
          <div className="print-cols-2 mt-8 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="luxury-card flex flex-col justify-between rounded-2xl p-6">
              <div>
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase sm:text-sm">
                  Subtotal Antes de IVA (27 Ítems)
                </span>
                <div className="mt-2.5 text-2xl font-bold text-slate-100 sm:text-3xl xl:text-[1.6rem] 2xl:text-[1.95rem]">
                  <AnimatedCurrency value={FINANCIAL_SUMMARY.subtotal} />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Equipos, licencias permanentes, materiales e instalación completa
              </p>
            </div>

            <div className="luxury-card flex flex-col justify-between rounded-2xl border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/10 via-[#12141D] to-[#12141D] p-6">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#6EE7B7] uppercase sm:text-sm">
                  Descuento 6% Antes de IVA
                </span>
                <div className="mt-2.5 text-2xl font-bold text-[#10B981] sm:text-3xl xl:text-[1.6rem] 2xl:text-[1.95rem]">
                  <AnimatedCurrency
                    value={Math.round(FINANCIAL_SUMMARY.discountAmount)}
                    prefix="-"
                  />
                </div>
              </div>
              <p className="mt-2 font-mono text-sm text-slate-300 tabular-nums">
                Subtotal neto:{" "}
                {formatCOP(FINANCIAL_SUMMARY.discountedSubtotal)}
              </p>
            </div>

            <div className="luxury-card flex flex-col justify-between rounded-2xl p-6">
              <div>
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase sm:text-sm">
                  IVA (19% sobre neto)
                </span>
                <div className="mt-2.5 text-2xl font-bold text-[#38BDF8] sm:text-3xl xl:text-[1.6rem] 2xl:text-[1.95rem]">
                  <AnimatedCurrency
                    value={Math.round(FINANCIAL_SUMMARY.ivaAmount)}
                  />
                </div>
              </div>
              <p className="mt-2 font-mono text-sm text-slate-400 tabular-nums">
                Cálculo exacto: {formatCOP(FINANCIAL_SUMMARY.ivaAmount, true)}
              </p>
            </div>

            <div className="luxury-card flex flex-col justify-between rounded-2xl border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/15 via-[#12141D] to-[#12141D] p-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#F3E5AB] uppercase sm:text-sm">
                  Inversión Total del Proyecto
                </span>
                <div className="text-gold-gradient mt-2.5 text-2xl font-bold sm:text-3xl xl:text-[1.7rem] 2xl:text-[2.05rem]">
                  <AnimatedCurrency value={Math.round(FINANCIAL_SUMMARY.total)} />
                </div>
              </div>
              <p className="mt-2 font-mono text-sm text-slate-300 tabular-nums">
                COP · Ahorro con IVA:{" "}
                {formatCOP(FINANCIAL_SUMMARY.totalSavings)}
              </p>
            </div>
          </div>

          {/* Interactive View Switcher Body */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {viewMode === "executive" ? (
                <motion.div
                  key="executive"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="print-cols-2 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                  {categorySummaries.map((cat) => (
                    <article
                      key={cat.id}
                      className="luxury-card flex h-full flex-col justify-between rounded-2xl p-6"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 sm:text-sm">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                ACCENT_DOT[cat.accent]
                              }`}
                            />
                            {cat.itemCount}{" "}
                            {cat.itemCount === 1 ? "ítem" : "ítems"}
                          </span>
                          <span className="font-mono text-xs text-slate-400 tabular-nums sm:text-sm">
                            {cat.sharePct.toFixed(1)}% del subtotal
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-slate-50 sm:text-xl">
                          {cat.name}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-400 sm:text-base">
                          {cat.tagline}
                        </p>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs text-slate-400 sm:text-sm">
                            Subtotal capítulo
                          </span>
                          <span className="font-mono text-xl font-bold text-slate-100 tabular-nums sm:text-2xl">
                            {formatCOP(cat.subtotal)}
                          </span>
                        </div>
                        {/* Proportional Share Bar */}
                        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              ACCENT_BAR[cat.accent]
                            }`}
                            style={{ width: `${Math.max(cat.sharePct, 4)}%` }}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => openCategoryDetail(cat.id)}
                          className="no-print mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F3E5AB] transition hover:text-[#D4AF37]"
                        >
                          Ver ítems de este capítulo
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  ))}

                  {/* Quick CTA Card to full table */}
                  <article className="luxury-card no-print flex h-full flex-col justify-between rounded-2xl border-dashed border-[#D4AF37]/30 bg-[#12141D]/50 p-6">
                    <div>
                      <span className="font-mono text-xs font-semibold tracking-wider text-[#D4AF37] uppercase sm:text-sm">
                        Detalle Completo
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-slate-50 sm:text-xl">
                        Ver los 27 Ítems de la Cotización #
                        {QUOTE_METADATA.quoteNumber}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-400 sm:text-base">
                        Busque fácilmente por nombre de equipo o referencia y
                        revise cantidades, valores unitarios y especificaciones
                        técnicas en PDF.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode("detailed")}
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-5 py-3.5 text-base font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/25"
                    >
                      <Table2 className="h-4 w-4" />
                      Abrir Tabla Completa
                    </button>
                  </article>
                </motion.div>
              ) : (
                <motion.div
                  key="detailed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="luxury-card rounded-3xl p-4 sm:p-6"
                >
                  {/* Filter Controls */}
                  <div className="no-print mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-sm">
                      <label htmlFor={searchInputId} className="visually-hidden">
                        Buscar referencia o descripción en los 27 ítems
                      </label>
                      <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id={searchInputId}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar equipo o palabra clave (ej. cámara, UPS, facial)..."
                        className="w-full rounded-xl border border-white/12 bg-[#090A0F]/80 py-2.5 pr-4 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#D4AF37]/60 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Filter className="h-3.5 w-3.5" />
                        Capítulo:
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory("all")}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                          selectedCategory === "all"
                            ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F3E5AB]"
                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Todos (27)
                      </button>
                      {QUOTE_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            selectedCategory === cat.id
                              ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F3E5AB]"
                              : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {cat.shortName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accessible Responsive Table */}
                  <div
                    tabIndex={0}
                    role="region"
                    aria-labelledby={tableCaptionId}
                    className="quote-table-region rounded-2xl border border-white/8"
                  >
                    <table className="quote-responsive-table w-full border-collapse text-left text-sm sm:text-[15px]">
                      <caption
                        id={tableCaptionId}
                        className="border-b border-white/8 bg-[#090A0F]/60 px-4 py-3.5 text-left text-xs text-slate-400 sm:text-sm"
                      >
                        Mostrando{" "}
                        <strong className="font-mono text-slate-200">
                          {filteredItems.length}
                        </strong>{" "}
                        de 27 ítems · Subtotal filtrado:{" "}
                        <strong className="font-mono text-[#F3E5AB] tabular-nums">
                          {formatCOP(filteredSubtotal)}
                        </strong>
                      </caption>
                      <thead className="bg-[#090A0F]/80 text-xs tracking-wider text-slate-400 uppercase sm:text-sm">
                        <tr>
                          <th scope="col" className="px-4 py-3.5">
                            #
                          </th>
                          <th scope="col" className="px-4 py-3.5">
                            Equipo / Ref.
                          </th>
                          <th scope="col" className="px-4 py-3.5">
                            Descripción
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-right">
                            Cant.
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-right">
                            Valor Unit.
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-right">
                            Valor Total
                          </th>
                          {hasDatasheetLinks ? (
                            <th
                              scope="col"
                              className="no-print px-4 py-3.5 text-center"
                            >
                              Especificaciones Técnicas
                            </th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/8">
                        {filteredItems.map((item) => (
                          <tr
                            key={item.id}
                            className={`transition hover:bg-white/[0.03] ${
                              item.highlight ? "bg-[#D4AF37]/[0.03]" : ""
                            }`}
                          >
                            <td
                              data-label="Ítem"
                              className="px-4 py-3.5 font-mono text-xs text-slate-400 tabular-nums"
                            >
                              {String(item.id).padStart(2, "0")}
                            </td>
                            <th
                              scope="row"
                              className="px-4 py-3.5 font-semibold text-slate-100"
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/95 p-1">
                                  <Image
                                    src={item.imagePath}
                                    alt={item.ref}
                                    fill
                                    sizes="40px"
                                    className="object-contain p-0.5"
                                  />
                                </div>
                                <span className="font-mono text-xs text-[#F3E5AB] sm:text-[13px]">
                                  {item.ref}
                                </span>
                              </div>
                            </th>
                            <td
                              data-label="Descripción"
                              className="max-w-md px-4 py-3.5 text-xs leading-relaxed text-slate-300 sm:text-sm"
                            >
                              {item.description}
                            </td>
                            <td
                              data-label="Cantidad"
                              className="px-4 py-3.5 text-right font-mono font-semibold text-slate-200 tabular-nums"
                            >
                              {item.quantity}
                            </td>
                            <td
                              data-label="Valor Unitario"
                              className="px-4 py-3.5 text-right font-mono text-slate-300 tabular-nums"
                            >
                              {formatCOP(item.unitPrice)}
                            </td>
                            <td
                              data-label="Valor Total"
                              className="px-4 py-3.5 text-right font-mono font-bold text-slate-50 tabular-nums"
                            >
                              {formatCOP(item.totalPrice)}
                            </td>
                            {hasDatasheetLinks ? (
                              <td
                                data-label="Especificaciones Técnicas"
                                className="no-print px-4 py-3.5 text-center"
                              >
                                {item.datasheetUrl ? (
                                  <a
                                    href={item.datasheetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Ver PDF de especificaciones técnicas de ${item.ref} (abre en nueva pestaña)`}
                                    className="inline-flex min-h-7 items-center gap-1.5 rounded-lg border border-[#38BDF8]/40 bg-[#38BDF8]/10 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-[#38BDF8] transition hover:bg-[#38BDF8]/20"
                                  >
                                    <FileText
                                      aria-hidden="true"
                                      className="h-3.5 w-3.5 shrink-0"
                                    />
                                    Ver PDF
                                    <ExternalLink
                                      aria-hidden="true"
                                      className="h-3 w-3 shrink-0"
                                    />
                                  </a>
                                ) : (
                                  <span className="text-xs text-slate-400">
                                    <span aria-hidden="true">—</span>
                                    <span className="visually-hidden">
                                      No disponible
                                    </span>
                                  </span>
                                )}
                              </td>
                            ) : null}
                          </tr>
                        ))}

                        {filteredItems.length === 0 ? (
                          <tr>
                            <td
                              colSpan={hasDatasheetLinks ? 7 : 6}
                              className="px-4 py-10 text-center text-sm text-slate-400"
                            >
                              No se encontraron ítems que coincidan con &ldquo;
                              {searchQuery}&rdquo;.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full 27-item audit table exclusively for Executive Print / PDF */}
            {viewMode === "executive" ? (
              <div className="mt-8 hidden print:block">
                <h3 className="mb-3 text-base font-bold">
                  Anexo Detallado — 27 Ítems Cotización #
                  {QUOTE_METADATA.quoteNumber}
                </h3>
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-2 pr-2">#</th>
                      <th className="py-2 pr-2">Referencia</th>
                      <th className="py-2 pr-2">Descripción</th>
                      <th className="py-2 pr-2 text-right">Cant.</th>
                      <th className="py-2 pr-2 text-right">Valor Unit.</th>
                      <th className="py-2 text-right">Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUOTE_ITEMS.map((item) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="py-1.5 pr-2 font-mono">{item.id}</td>
                        <td className="py-1.5 pr-2 font-mono font-semibold">
                          {item.ref}
                        </td>
                        <td className="py-1.5 pr-2">{item.description}</td>
                        <td className="py-1.5 pr-2 text-right font-mono">
                          {item.quantity}
                        </td>
                        <td className="py-1.5 pr-2 text-right font-mono">
                          {formatCOP(item.unitPrice)}
                        </td>
                        <td className="py-1.5 text-right font-mono font-semibold">
                          {formatCOP(item.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
