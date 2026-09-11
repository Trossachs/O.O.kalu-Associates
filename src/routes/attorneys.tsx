import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { ATTORNEYS } from "@/lib/firm-data";
import { ATTORNEY_PHOTOS } from "@/lib/attorney-photos";
import { Reveal, TiltCard } from "@/components/motion";
import heroAttorneys from "@/assets/hero-attorneys.jpg";

export const Route = createFileRoute("/attorneys")({
  head: () => ({
    meta: [
      { title: "Attorneys — Equity Chambers Nigeria" },
      {
        name: "description",
        content:
          "Meet the partners of Equity Chambers: transactional, disputes, energy, regulatory, private client, and real estate counsel called to the Nigerian Bar.",
      },
      { property: "og:title", content: "Attorneys — Equity Chambers Nigeria" },
      { property: "og:description", content: "Partner profiles, credentials, and admissions at Equity Chambers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AttorneysPage,
});

function AttorneysPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The Bench"
        title="Partners who argue the matters they take"
        intro="Every matter is led by a partner called to the Nigerian Bar. The person who pitches the work is the person who argues it."
        image={heroAttorneys}
        imageAlt="Barristers' black robes hanging on brass hooks in a chambers robing room"
      />


      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-px bg-border">
          {ATTORNEYS.map((a, i) => (
            <Reveal as="article" key={a.slug} delay={(i % 3) * 80}>
              <div className="grid gap-8 bg-background p-8 md:grid-cols-[14rem_1fr]">
                <TiltCard className="overflow-hidden" max={8}>
                  <img
                    src={ATTORNEY_PHOTOS[a.slug]}
                    alt={`Portrait of ${a.name}, ${a.role} at Equity Chambers`}
                    width={800}
                    height={1000}
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
