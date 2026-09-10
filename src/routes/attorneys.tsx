import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { ATTORNEYS } from "@/lib/firm-data";

export const Route = createFileRoute("/attorneys")({
  head: () => ({
    meta: [
      { title: "Attorneys — Equity Chambers" },
      {
        name: "description",
        content:
          "Meet the partners of Equity Chambers: transactional, trial, regulatory, intellectual property, private client, and real estate counsel.",
      },
      { property: "og:title", content: "Attorneys — Equity Chambers" },
      { property: "og:description", content: "Partner profiles, credentials, and admissions at Equity Chambers." },
    ],
  }),
  component: AttorneysPage,
});

function AttorneysPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Bench"
        title="Partners who try the cases they take"
        intro="Every matter is led by a partner. The person who pitches the work is the person who argues it."
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-px bg-border">
          {ATTORNEYS.map((a) => (
            <article key={a.slug} className="grid gap-8 bg-background p-8 md:grid-cols-[8rem_1fr]">
              <div className="flex h-32 w-32 items-center justify-center bg-ink font-display text-4xl text-accent">
                {a.initials}
              </div>
              <div>
                <h2 className="text-3xl text-foreground">{a.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.role} · {a.focus}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground">{a.bio}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="rule-label text-accent">Education</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {a.education.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="rule-label text-accent">Admissions</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {a.admissions.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
