import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export type Step = { title: string; description: string };

export function Steps({
  eyebrow,
  title,
  description,
  steps,
  contained = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: Step[];
  contained?: boolean;
}) {
  const content = (
    <>
      <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} className="mx-auto" />
      <ol
        className={cn(
          "mt-14 grid overflow-hidden rounded-card border border-slate-200/80 bg-white",
          steps.length >= 5
            ? "sm:grid-cols-2 lg:grid-cols-5"
            : "sm:grid-cols-3"
        )}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="relative border-b border-slate-100 p-7 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-xs font-bold text-brand-700">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-sm font-semibold text-navy-900">{step.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.description}</p>
          </li>
        ))}
      </ol>
    </>
  );

  if (!contained) return content;

  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>{content}</Container>
    </section>
  );
}
