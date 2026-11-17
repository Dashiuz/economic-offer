"use client";

import { motion, MotionConfig } from "framer-motion";
import { CLARIFICATIONS } from "@/data/domus-quote";

export default function ClarificationsSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="aclaraciones"
        aria-labelledby="aclaraciones-heading"
        className="relative py-12 sm:py-16"
      >
        <div className="domus-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              id="aclaraciones-heading"
              className="text-3xl font-bold tracking-[-0.03em] text-slate-50 sm:text-4xl lg:text-[2.65rem]"
            >
              Aclaraciones
            </h2>

            <div className="luxury-card print-keep-together mt-6 rounded-3xl border-[#D4AF37]/30 p-6 sm:p-8">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase sm:text-sm">
                {CLARIFICATIONS.priorityLabel}
              </p>

              <ol className="mt-4 space-y-3">
                {CLARIFICATIONS.items.map((item) => (
                  <li
                    key={item.number}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-[#090A0F]/65 px-5 py-4 text-base leading-relaxed text-slate-100 sm:text-lg"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 font-mono text-xs font-bold text-[#F3E5AB]">
                      {item.number}.
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
