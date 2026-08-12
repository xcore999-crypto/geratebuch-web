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
          "mt-14 grid gap-8",
          steps.length >= 5
            ? "sm:grid-cols-2 lg:grid-cols-5"
            : "sm:grid-cols-3"
        )}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {index + 1}
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
    <section className="bg-slate-50 py-20">
      <Container>{content}</Container>
    </section>
  );
}
