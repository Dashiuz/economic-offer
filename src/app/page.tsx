import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import ZoneExplorer from "@/components/ZoneExplorer";
import FinancialProposal from "@/components/FinancialProposal";
import ImplementationSchedule from "@/components/ImplementationSchedule";
import CommercialTerms from "@/components/CommercialTerms";
import {
  FINANCIAL_SUMMARY,
  formatCOP,
  QUOTE_METADATA,
} from "@/data/domus-quote";

const NAV_LINKS = [
  { href: "#resumen", label: "Resumen" },
  { href: "#transformacion", label: "Antes y Después" },
  { href: "#zonas", label: "Zonas del Edificio" },
  { href: "#inversion", label: "Propuesta Económica" },
  { href: "#cronograma", label: "Cronograma" },
  { href: "#condiciones", label: "Condiciones" },
] as const;

export default function HomePage() {
  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[#090A0F]/85 backdrop-blur-xl">
        <div className="domus-container flex h-16 items-center justify-between gap-4">
          <a
            href="#resumen"
            className="flex items-center gap-3 rounded-lg py-1 focus-visible:outline-2"
          >
            <span className="relative h-9 w-40 overflow-hidden rounded-md border border-white/10 bg-[#050608] px-1.5 sm:w-48">
              <Image
                src={QUOTE_METADATA.provider.logoPath}
                alt="Seguridad Explorer / IngExpertos"
                fill
                sizes="192px"
                className="object-contain"
              />
            </span>
            <span className="hidden border-l border-white/12 pl-3 text-sm font-semibold tracking-wide text-slate-200 sm:inline">
              {QUOTE_METADATA.client.building}
            </span>
          </a>

          <nav
            aria-label="Secciones de la propuesta"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-[#F3E5AB]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#inversion"
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/12 px-4 py-2 text-sm font-semibold text-[#F3E5AB] transition hover:bg-[#D4AF37]/20"
          >
            <span className="hidden sm:inline">Total:</span>
            <span className="font-mono tabular-nums">
              {formatCOP(FINANCIAL_SUMMARY.total)}
            </span>
          </a>
        </div>
      </header>

      <main id="main-content" className="relative">
        <HeroSection />
        <BeforeAfterShowcase />
        <ZoneExplorer />
        <FinancialProposal />
        <ImplementationSchedule />
        <CommercialTerms />
      </main>

      <footer className="border-t border-white/8 bg-[#06070B] py-8">
        <div className="domus-container flex flex-col items-start justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>
            Propuesta #{QUOTE_METADATA.quoteNumber} ·{" "}
            <strong className="text-slate-300">
              {QUOTE_METADATA.client.building}
            </strong>{" "}
            ({QUOTE_METADATA.client.address})
          </p>
          <p>
            Presentada por {QUOTE_METADATA.provider.legalName} ·{" "}
            {QUOTE_METADATA.date}
          </p>
        </div>
      </footer>
    </>
  );
}
