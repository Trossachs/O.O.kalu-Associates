import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { Reveal } from "@/components/motion";
import { PRACTICE_AREAS } from "@/lib/firm-data";
import heroPractice from "@/assets/hero-practice.jpg";
import { lines, text } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/use-content";

export const Route = createFileRoute("/practice-areas")({
  head: () => ({
    meta: [
      { title: "Practice Areas — O.O. Kalu & Associates Nigeria" },
      {
        name: "description",
        content:
          "Corporate and M&A, litigation and arbitration, energy and natural resources, regulatory investigations, intellectual property, and real estate counsel at O.O. Kalu & Associates Nigeria.",
      },
      { property: "og:title", content: "Practice Areas — O.O. Kalu & Associates Nigeria" },
      {
        property: "og:description",
        content: "Practice groups serving Nigerian boards, institutions, and families.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticeAreasPage,
});

function PracticeAreasPage() {
  const { block, list } = useSiteContent();
  const header = block("practice-areas", "header");
  const rows = list("practice-areas", "area");

  const areas = rows.length
    ? rows.map((row) => ({
        key: row.id,
        title: text(row.title, ""),
        detail: text(row.meta, row.body ?? ""),
        services: lines(row.bullets),
      }))
    : PRACTICE_AREAS.map((a) => ({ key: a.slug, title: a.title, detail: a.detail, services: a.services }));

  return (
    <div>
      <PageHeader
        eyebrow={text(header?.eyebrow, "Practice Areas")}
        title={text(header?.title, "Groups with one standard of preparation")}
        intro={text(
          header?.body,
          "Our practice groups work as a single bench. A transaction that turns into a dispute does not change hands; it gains advocates.",
        )}
        image={text(header?.image_url, heroPractice)}
        imageAlt="Boardroom in a Lagos law firm overlooking the city at dusk"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {areas.map((area, i) => (
            <Reveal as="article" key={area.key} delay={(i % 2) * 130} className="bg-background p-8">
              <h2 className="text-3xl text-foreground">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.detail}</p>
              <ul className="mt-6 space-y-2">
                {area.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <p className="max-w-md text-sm text-muted-foreground">
            Unsure which group fits your matter? Describe it and we will route it correctly.
          </p>
          <Link
            to="/consultation"
            className="rounded-sm bg-ink px-6 py-3 text-sm text-ink-foreground transition-colors hover:bg-ink/90"
          >
            Request a consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
