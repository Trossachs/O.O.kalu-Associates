import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { ATTORNEYS } from "@/lib/firm-data";
import { ATTORNEY_PHOTOS } from "@/lib/attorney-photos";
import { Reveal, TiltCard } from "@/components/motion";
import heroAttorneys from "@/assets/hero-attorneys.jpg";
import { lines, text } from "@/lib/content.functions";
import { useSiteContent } from "@/lib/use-content";

export const Route = createFileRoute("/attorneys")({
  head: () => ({
    meta: [
      { title: "Attorneys — O.O. Kalu & Associates Nigeria" },
      {
        name: "description",
        content:
          "Meet the partners of O.O. Kalu & Associates: transactional, disputes, energy, regulatory, private client, and real estate counsel called to the Nigerian Bar.",
      },
      { property: "og:title", content: "Attorneys — O.O. Kalu & Associates Nigeria" },
      { property: "og:description", content: "Partner profiles, credentials, and admissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AttorneysPage,
});

function AttorneysPage() {
  const { block, list } = useSiteContent();
  const header = block("attorneys", "header");
  const rows = list("attorneys", "attorney");

  const attorneys = rows.length
    ? rows.map((row) => ({
        key: row.id,
        name: text(row.title, ""),
        role: text(row.subtitle, ""),
        focus: text(row.eyebrow, ""),
        bio: text(row.body, ""),
        photo: text(row.image_url, heroAttorneys),
        education: lines(row.bullets),
        admissions: lines(row.meta),
      }))
    : ATTORNEYS.map((a) => ({
        key: a.slug,
        name: a.name,
        role: a.role,
        focus: a.focus,
        bio: a.bio,
        photo: ATTORNEY_PHOTOS[a.slug] ?? heroAttorneys,
        education: a.education,
        admissions: a.admissions,
      }));

  return (
    <div>
      <PageHeader
        eyebrow={text(header?.eyebrow, "The Bench")}
        title={text(header?.title, "Partners who argue the matters they take")}
        intro={text(
          header?.body,
          "Every matter is led by a partner called to the Nigerian Bar. The person who pitches the work is the person who argues it.",
        )}
        image={text(header?.image_url, heroAttorneys)}
        imageAlt="Barristers' black robes hanging on brass hooks in a chambers robing room"
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-px bg-border">
          {attorneys.map((a, i) => (
            <Reveal as="article" key={a.key} delay={(i % 3) * 80}>
              <div className="grid gap-8 bg-background p-8 md:grid-cols-[14rem_1fr]">
                <TiltCard className="overflow-hidden" max={8}>
                  <img
                    src={a.photo}
                    alt={`Portrait of ${a.name}, ${a.role}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale transition-all duration-[900ms] ease-out hover:scale-[1.04] hover:grayscale-0"
                  />
                </TiltCard>
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
