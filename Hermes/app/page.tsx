import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SlideView from "@/components/SlideView";
import { SLIDES, SlideDef } from "@/lib/deck";
import { SAMPLE_DECK } from "@/lib/sample";
import clsx from "clsx";

const byId = (id: string): SlideDef => SLIDES.find((s) => s.id === id)!;

const frameworks = [
  "500 Global",
  "Founder Institute",
  "Sequoia",
  "Stripe Atlas",
  "SeedLegals",
  "Startup India",
];

const steps = [
  {
    n: "01",
    title: "Answer guided prompts",
    body: "Twelve focused questions, each with the exact framing investors expect. No blank-page dread.",
  },
  {
    n: "02",
    title: "Watch it take shape",
    body: "Every answer renders live into a real slide. Reorder, refine, and see the deck as investors will.",
  },
  {
    n: "03",
    title: "Export & send",
    body: "One click prints a clean, board-ready PDF. Your work saves in your browser — pick up anytime.",
  },
];

const features = [
  {
    title: "A structure that's already been funded",
    body: "We distilled the 500 Global, Founder Institute, and Sequoia decks into one proven 12-slide spine. You're never guessing what goes where.",
  },
  {
    title: "Live, pixel-accurate preview",
    body: "What you type is what you print. The preview is the real slide — not a rough mock.",
  },
  {
    title: "Export in one click",
    body: "A board-ready PDF, 16:9, with your branding. Send it before the meeting, not after.",
  },
  {
    title: "Start from a real example",
    body: "Load a finished sample deck, then swap in your own story. Momentum beats a blank canvas.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_-10%,rgb(var(--accent-soft)/0.7),transparent_60%)]" />
          <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
            <div className="animate-fade-up">
              <div className="eyebrow mb-5">Investor-ready pitch decks</div>
              <h1 className="display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold">
                The deck that gets you{" "}
                <span className="text-accent-ink">funded</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                Heremes turns your startup story into a sharp, investor-ready
                pitch deck. Guided questions, a proven slide structure, and a
                board-ready export — in an afternoon, not a weekend.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/builder" className="btn-primary !px-6 !py-3.5">
                  Build your deck
                </Link>
                <a href="#deck-spotlight" className="btn-ghost !px-6 !py-3.5">
                  See a real example
                </a>
              </div>
              <p className="mt-5 text-sm text-faint">
                Free to start · No sign-up · Saves in your browser
              </p>
            </div>

            <div className="relative animate-scale-in [animation-delay:120ms]">
              <div className="rotate-1 transition-transform duration-500 hover:rotate-0">
                <div className="overflow-hidden rounded-2xl border border-line shadow-lift">
                  <SlideView slide={byId("cover")} content={SAMPLE_DECK} />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rotate-[-3deg] rounded-2xl border border-line bg-surface p-1 shadow-lift sm:block">
                <div className="w-56 overflow-hidden rounded-xl">
                  <SlideView slide={byId("traction")} content={SAMPLE_DECK} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frameworks marquee */}
        <section className="border-y border-line bg-surface-2/40 py-5">
          <div className="container-page">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-faint">
              Built on the decks that actually raise
            </p>
            <div className="relative overflow-hidden">
              <div className="flex w-max animate-marquee items-center gap-12 pr-12">
                {[...frameworks, ...frameworks].map((f, i) => (
                  <span
                    key={i}
                    className="display whitespace-nowrap text-xl font-medium text-muted/70"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">How it works</div>
            <h2 className="display text-[clamp(2rem,4vw,3rem)] font-semibold">
              From blank page to boardroom.
            </h2>
            <p className="mt-4 text-muted">
              No design skills, no template wrangling. Answer the questions that
              matter and Heremes assembles the deck.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="card p-7 animate-fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="font-mono text-sm text-accent-ink">{s.n}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Slide system */}
        <section id="slides" className="border-y border-line bg-surface-2/40 py-20 sm:py-28">
          <div className="container-page">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">The deck</div>
              <h2 className="display text-[clamp(2rem,4vw,3rem)] font-semibold">
                Twelve slides. Every one that matters.
              </h2>
              <p className="mt-4 text-muted">
                The canonical arc investors expect — from cover to the ask. Skip
                none, reorder if your story demands it.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className="card flex items-start gap-4 p-5 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-xs font-semibold text-accent-ink">
                    {String(s.index).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-muted">{s.tagline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example spotlight */}
        <section id="deck-spotlight" className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">A real example</div>
            <h2 className="display text-[clamp(2rem,4vw,3rem)] font-semibold">
              “Northwind” — a seed deck, assembled.
            </h2>
            <p className="mt-4 text-muted">
              Load this exact deck in the builder and make it yours. Three
              slides from the twelve:
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {["problem", "traction", "competition"].map((id, i) => (
              <div
                key={id}
                className="overflow-hidden rounded-2xl border border-line shadow-soft animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <SlideView slide={byId(id)} content={SAMPLE_DECK} />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/builder" className="btn-primary !px-6 !py-3.5">
              Build your own
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="why" className="border-t border-line bg-surface-2/40 py-20 sm:py-28">
          <div className="container-page grid gap-10 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Why Heremes</div>
              <h2 className="display text-[clamp(2rem,4vw,3rem)] font-semibold">
                The polish of a design studio, the speed of a form.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={clsx(
                    "animate-fade-up",
                    i % 2 === 1 && "sm:mt-10"
                  )}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-page py-20 sm:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink px-8 py-16 text-center text-surface sm:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_0%,rgb(var(--accent)/0.35),transparent_60%)]" />
            <div className="relative">
              <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-semibold">
                Your investors are waiting. Don't make them wait on the deck.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-surface/70">
                Build a deck that reads like you've already raised. Free to
                start — no sign-up, no credit card.
              </p>
              <Link
                href="/builder"
                className="mt-8 inline-flex btn bg-accent px-7 py-4 text-accent-ink hover:brightness-105"
              >
                Build your deck
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
