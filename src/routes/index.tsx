import { createFileRoute, Link } from "@tanstack/react-router";
import { ATTORNEYS, CASES, FIRM, PRACTICE_AREAS, PUBLICATIONS, TESTIMONIALS } from "@/lib/firm-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Equity Chambers — Counsel for Consequential Matters" },
      {
        name: "description",
        content:
          "Equity Chambers is a New York law firm advising boards, institutions, and families on transactions, trials, regulatory defense, intellectual property, and succession.",
      },
      { property: "og:title", content: "Equity Chambers — Counsel for Consequential Matters" },
      {
        property: "og:description",
        content: "A New York firm of trial lawyers and transactional counsel, practising since 1994.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:py-36">
          <div>
            <p className="rule-label text-accent">New York · Since {FIRM.founded}</p>
            <h1 className="mt-6 text-5xl leading-[1.02] md:text-7xl">
              Counsel for the matters that decide the decade.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/75">
              Equity Chambers represents boards, institutions, and families when the transaction is complicated, the
              exposure is real, and the outcome cannot be delegated.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/consultation"
                className="rounded-sm bg-accent px-7 py-3 text-sm text-accent-foreground transition-opacity hover:opacity-90"
              >
                Book a consultation
              </Link>
              <Link
                to="/practice-areas"
                className="rounded-sm border border-white/25 px-7 py-3 text-sm text-ink-foreground transition-colors hover:border-accent"
              >
                Explore practice areas
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-8 self-end lg:grid-cols-1">
            {[
              { k: "Years in practice", v: `${new Date().getFullYear() - FIRM.founded}` },
              { k: "First-chair verdicts", v: "180+" },
              { k: "Transaction value advised", v: "$41B" },
            ].map((s) => (
              <div key={s.k} className="border-t border-white/15 pt-4">
                <dd className="font-display text-4xl text-accent">{s.v}</dd>
                <dt className="mt-1 text-xs uppercase tracking-widest text-ink-foreground/60">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="rule-label text-accent">Practice Areas</p>
            <h2 className="mt-3 text-4xl text-foreground">Where we are retained</h2>
          </div>
          <Link to="/practice-areas" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            All practice areas
          </Link>
        </div>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((a) => (
            <div key={a.slug} className="bg-background p-8">
              <h3 className="text-2xl text-foreground">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rule-label text-accent">The Bench</p>
              <h2 className="mt-3 text-4xl text-foreground">Partners lead every matter</h2>
            </div>
            <Link to="/attorneys" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              All attorneys
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ATTORNEYS.slice(0, 3).map((a) => (
              <article key={a.slug} className="bg-background p-8">
                <div className="flex h-24 w-24 items-center justify-center bg-ink font-display text-3xl text-accent">
                  {a.initials}
                </div>
                <h3 className="mt-6 text-2xl text-foreground">{a.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{a.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="rule-label text-accent">Notable Cases</p>
            <h2 className="mt-3 text-4xl text-foreground">Representative results</h2>
          </div>
          <Link to="/notable-cases" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Full record
          </Link>
        </div>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {CASES.slice(0, 4).map((c) => (
            <li key={c.title} className="grid gap-3 py-6 md:grid-cols-[5rem_1fr_12rem] md:items-baseline">
              <span className="rule-label text-accent">{c.year}</span>
              <span className="text-lg text-foreground">{c.title}</span>
              <span className="text-sm text-muted-foreground md:text-right">{c.outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="rule-label text-accent">Client Accounts</p>
          <blockquote className="mt-6 max-w-4xl font-display text-3xl leading-snug md:text-4xl">
            “{TESTIMONIALS[0].quote}”
          </blockquote>
          <p className="mt-6 text-sm text-ink-foreground/70">
            {TESTIMONIALS[0].author} — {TESTIMONIALS[0].org}
          </p>
          <Link
            to="/testimonials"
            className="mt-10 inline-block border-b border-accent pb-1 text-sm text-accent hover:opacity-80"
          >
            More client accounts
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="rule-label text-accent">Publications</p>
            <h2 className="mt-3 text-4xl text-foreground">Recent writing</h2>
          </div>
          <Link to="/publications" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            All publications
          </Link>
        </div>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {PUBLICATIONS.slice(0, 3).map((p) => (
            <article key={p.title} className="bg-background p-8">
              <p className="rule-label text-accent">{p.date}</p>
              <h3 className="mt-3 text-xl text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-parchment">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-20">
          <div>
            <h2 className="max-w-xl text-4xl text-foreground">Bring us the matter you cannot afford to lose.</h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              Confidential consultations, reviewed by a partner, answered within one business day.
            </p>
          </div>
          <Link
            to="/consultation"
            className="rounded-sm bg-ink px-8 py-4 text-sm text-ink-foreground transition-colors hover:bg-ink/90"
          >
            Book a consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
