import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site-chrome";
import { FIRM, PRACTICE_AREAS } from "@/lib/firm-data";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Equity Chambers" },
      {
        name: "description",
        content:
          "Request a confidential consultation with an Equity Chambers partner. Describe your matter and we will respond within one business day.",
      },
      { property: "og:title", content: "Book a Consultation — Equity Chambers" },
      { property: "og:description", content: "Confidential consultations with the partners of Equity Chambers." },
    ],
  }),
  component: ConsultationPage,
});

const TIMES = ["09:00", "10:30", "13:00", "14:30", "16:00"];

function ConsultationPage() {
  const [submitted, setSubmitted] = useState<null | { name: string; date: string; time: string }>(null);
  const [time, setTime] = useState(TIMES[1]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted({
      name: String(data.get("name") ?? ""),
      date: String(data.get("date") ?? ""),
      time,
    });
  }

  const field =
    "mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-ring";
  const label = "rule-label text-muted-foreground";

  return (
    <div>
      <PageHeader
        eyebrow="Consultation"
        title="Tell us what happened"
        intro="Initial consultations are confidential and carry no obligation. A partner reviews every request personally."
      />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {submitted ? (
            <div className="border border-accent/50 bg-parchment p-10">
              <p className="rule-label text-accent">Request received</p>
              <h2 className="mt-3 text-3xl text-foreground">Thank you, {submitted.name || "counsel"}.</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                We have noted your preferred slot of {submitted.date || "the earliest availability"} at {submitted.time}.
                A partner will confirm by telephone within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(null)}
                className="mt-8 rounded-sm bg-ink px-5 py-2.5 text-sm text-ink-foreground hover:bg-ink/90"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="name">
                    Full name
                  </label>
                  <input id="name" name="name" required className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="organization">
                    Organization
                  </label>
                  <input id="organization" name="organization" className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="email">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={field} />
                </div>
                <div>
                  <label className={label} htmlFor="phone">
                    Telephone
                  </label>
                  <input id="phone" name="phone" type="tel" className={field} />
                </div>
              </div>

              <div>
                <label className={label} htmlFor="practice">
                  Practice area
                </label>
                <select id="practice" name="practice" className={field} defaultValue={PRACTICE_AREAS[0].title}>
                  {PRACTICE_AREAS.map((a) => (
                    <option key={a.slug}>{a.title}</option>
                  ))}
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label className={label} htmlFor="date">
                  Preferred date
                </label>
                <input id="date" name="date" type="date" className={field} />
              </div>

              <fieldset>
                <legend className={label}>Preferred time</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      aria-pressed={t === time}
                      className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                        t === time
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-input text-muted-foreground hover:border-accent"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className={label} htmlFor="matter">
                  Describe your matter
                </label>
                <textarea id="matter" name="matter" rows={5} required className={field} />
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Submitting this form does not create an attorney-client relationship. Please do not include privileged
                or highly sensitive details until an engagement is confirmed.
              </p>

              <button
                type="submit"
                className="rounded-sm bg-ink px-7 py-3 text-sm text-ink-foreground transition-colors hover:bg-ink/90"
              >
                Request consultation
              </button>
            </form>
          )}
        </div>

        <aside className="hairline-top pt-8 lg:border-0 lg:pt-0">
          <p className="rule-label text-accent">Chambers</p>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-foreground">
            <p>{FIRM.address}</p>
            <p>{FIRM.phone}</p>
            <p>{FIRM.email}</p>
          </address>
          <p className="mt-8 rule-label text-accent">Hours</p>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            <li>Monday – Friday, 8:30 – 18:30</li>
            <li>Saturday, by appointment</li>
            <li>Urgent matters answered after hours</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
