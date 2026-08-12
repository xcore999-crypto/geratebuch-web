"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export type FaqItem = { question: string; answer: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-card border border-slate-200 bg-white shadow-card">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-navy-900">{item.question}</span>
              <Icon
                name="chevron-down"
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
