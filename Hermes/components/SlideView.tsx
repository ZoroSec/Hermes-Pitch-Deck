import { SlideDef, DeckContent } from "@/lib/deck";
import clsx from "clsx";

// Every size on a slide is expressed in container-query units (cqw = 1% of the
// slide's own width) so the slide scales as one proportional canvas — identical
// whether rendered as a 224px thumbnail or a full 1280px export.
// ponytail: baseline design width is 1280px; cqw value ≈ pixels-at-1280 / 12.8.

function val(content: DeckContent, slideId: string, key: string): string {
  return content[slideId]?.[key]?.trim() ?? "";
}

function has(content: DeckContent, slideId: string, key: string): boolean {
  return val(content, slideId, key).length > 0;
}

function Placeholder({ text }: { text: string }) {
  return <span className="text-faint italic">{text}</span>;
}

function Kicker({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-[1.2cqw]">
      <span className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-full bg-accent/15 font-mono text-[1.2cqw] font-semibold text-accent-ink">
        {String(index).padStart(2, "0")}
      </span>
      <span className="eyebrow !text-[1.1cqw] !tracking-[0.18em]">{title}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

function Footer({ company }: { company: string }) {
  return (
    <div className="flex items-center justify-between text-[1cqw] text-faint">
      <span className="font-medium tracking-wide text-accent-ink/70">
        {company || "Your company"}
      </span>
      <span className="font-mono">HERMES · PITCH</span>
    </div>
  );
}

export default function SlideView({
  slide,
  content,
  className,
}: {
  slide: SlideDef;
  content: DeckContent;
  className?: string;
}) {
  const company = val(content, "cover", "companyName");
  const c = (key: string) => val(content, slide.id, key);
  const show = (key: string) => has(content, slide.id, key);

  return (
    <div
      className={clsx(
        "group relative flex aspect-[16/9] w-full flex-col overflow-hidden bg-surface text-ink [container-type:inline-size]",
        className
      )}
    >
      {/* Subtle texture + accent edge */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(var(--accent-soft)/0.5),transparent_55%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[0.5cqw] bg-accent/70" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-[2.5cqw] p-[6cqw]">
        <Kicker index={slide.index} title={slide.title} />

        <div className="min-h-0 flex-1">
          {slide.layout === "cover" && (
            <div className="flex h-full flex-col justify-center">
              <div className="mb-[2cqw] h-[0.5cqw] w-[5cqw] bg-accent" />
              <h1 className="display text-[6cqw] font-semibold">
                {show("companyName") ? company : <Placeholder text="Company name" />}
              </h1>
              <p className="mt-[2cqw] max-w-[80%] text-balance text-[1.9cqw] text-muted">
                {show("tagline") ? c("tagline") : <Placeholder text="Your one-line pitch goes here — what you do, for whom." />}
              </p>
              <div className="mt-[3.5cqw] flex flex-wrap items-center gap-x-[3cqw] gap-y-[1cqw] text-[1.4cqw] text-muted">
                <span>{show("presenter") ? c("presenter") : <Placeholder text="Your name & role" />}</span>
                {show("context") && (
                  <span className="rounded-full border border-line px-[1.4cqw] py-[0.5cqw] font-mono text-[1.1cqw] text-accent-ink">
                    {c("context")}
                  </span>
                )}
              </div>
            </div>
          )}

          {slide.layout === "statement" && (
            <div className="flex h-full flex-col justify-center">
              <p className="display text-[4.4cqw] font-medium leading-[1.1]">
                {show("statement") ? (
                  c("statement")
                ) : (
                  <Placeholder text="The core idea for this slide — stated in one confident sentence." />
                )}
              </p>
              <div className="mt-[3cqw] flex flex-wrap gap-x-[4cqw] gap-y-[1.2cqw] text-[1.4cqw] text-muted">
                {show("who") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Who feels it</div>
                    <div className="text-ink">{c("who")}</div>
                  </div>
                )}
                {show("magnitude") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Scale</div>
                    <div className="text-ink">{c("magnitude")}</div>
                  </div>
                )}
                {show("benefit") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Benefit</div>
                    <div className="text-ink">{c("benefit")}</div>
                  </div>
                )}
                {show("secretSauce") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Secret sauce</div>
                    <div className="text-ink">{c("secretSauce")}</div>
                  </div>
                )}
                {show("expansion") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Expansion</div>
                    <div className="text-ink">{c("expansion")}</div>
                  </div>
                )}
                {show("tailwinds") && (
                  <div>
                    <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Tailwinds</div>
                    <div className="text-ink">{c("tailwinds")}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {slide.layout === "split" && (
            <div className="grid h-full grid-cols-2 gap-[4cqw] items-center">
              <p className="text-[2.6cqw] font-medium leading-snug">
                {show("description") ? c("description") : <Placeholder text="Describe the product in a sentence or two." />}
              </p>
              <div>
                <div className="eyebrow !text-[1.1cqw] mb-[1.2cqw]">
                  {slide.id === "team" ? "Founders" : "Key features"}
                </div>
                {show(slide.id === "team" ? "founders" : "features") ? (
                  <ul className="space-y-[1cqw] text-[1.6cqw]">
                    {(slide.id === "team" ? c("founders") : c("features"))
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i} className="flex gap-[1.2cqw] text-ink">
                          <span className="mt-[0.7cqw] h-[0.6cqw] w-[0.6cqw] shrink-0 rounded-full bg-accent" />
                          <span>{line}</span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <Placeholder text="List the key items, one per line." />
                )}
                {slide.id === "team" && show("edge") && (
                  <p className="mt-[2cqw] border-l-2 border-accent pl-[1.5cqw] text-[1.4cqw] text-muted">
                    {c("edge")}
                  </p>
                )}
              </div>
            </div>
          )}

          {slide.layout === "metric" && (
            <div className="flex h-full flex-col justify-center">
              <div className="flex flex-wrap items-end gap-x-[4cqw] gap-y-[2.5cqw]">
                {show("headlineMetric") && (
                  <div>
                    <div className="display text-[9cqw] font-semibold leading-none text-accent-ink">
                      {c("headlineMetric")}
                    </div>
                    {show("metricLabel") && (
                      <div className="mt-[0.8cqw] text-[1.4cqw] uppercase tracking-wide text-muted">
                        {c("metricLabel")}
                      </div>
                    )}
                  </div>
                )}
                {show("amount") && (
                  <div>
                    <div className="display text-[9cqw] font-semibold leading-none text-accent-ink">
                      {c("amount")}
                    </div>
                    {show("milestone") && (
                      <div className="mt-[0.8cqw] text-[1.4cqw] uppercase tracking-wide text-muted">
                        {c("milestone")}
                      </div>
                    )}
                  </div>
                )}
                <div className="space-y-[1.5cqw] text-[1.4cqw]">
                  {show("growth") && (
                    <div className="max-w-[24cqw]">
                      <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Momentum</div>
                      <div className="text-ink">{c("growth")}</div>
                    </div>
                  )}
                  {show("logos") && (
                    <div className="max-w-[24cqw]">
                      <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Customers</div>
                      <div className="text-ink">{c("logos")}</div>
                    </div>
                  )}
                  {show("useOfFunds") && (
                    <div className="max-w-[24cqw]">
                      <div className="eyebrow !text-[1.1cqw] mb-[0.4cqw]">Use of funds</div>
                      <div className="text-ink">{c("useOfFunds")}</div>
                    </div>
                  )}
                </div>
              </div>
              {slide.id === "market" && (
                <div className="mt-[3cqw] flex flex-wrap gap-x-[4cqw] gap-y-[1.2cqw]">
                  {show("tam") && (
                    <div>
                      <div className="font-mono text-[2.4cqw] font-semibold">{c("tam")}</div>
                      <div className="text-[1.1cqw] uppercase tracking-wide text-faint">TAM</div>
                    </div>
                  )}
                  {show("sam") && (
                    <div>
                      <div className="font-mono text-[2.4cqw] font-semibold">{c("sam")}</div>
                      <div className="text-[1.1cqw] uppercase tracking-wide text-faint">SAM</div>
                    </div>
                  )}
                  {show("som") && (
                    <div>
                      <div className="font-mono text-[2.4cqw] font-semibold text-accent-ink">{c("som")}</div>
                      <div className="text-[1.1cqw] uppercase tracking-wide text-faint">SOM</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {slide.layout === "matrix" && (
            <div className="flex h-full flex-col justify-center gap-[2.5cqw]">
              <div className="grid grid-cols-2 gap-[2.5cqw] text-[1.7cqw]">
                <div>
                  <div className="eyebrow !text-[1.1cqw] mb-[0.8cqw]">Alternatives today</div>
                  <p className="text-ink">
                    {show("alternatives") ? c("alternatives") : <Placeholder text="Who or what founders use instead." />}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/40 bg-accent-soft/40 p-[2.5cqw]">
                  <div className="eyebrow !text-[1.1cqw] mb-[0.8cqw] text-accent-ink">Unlike them, we…</div>
                  <p className="text-ink">
                    {show("unlike") ? c("unlike") : <Placeholder text="State your differentiators clearly." />}
                  </p>
                </div>
              </div>
              {show("edge") && (
                <p className="text-[1.4cqw] text-muted">
                  <span className="font-semibold text-ink">Durable edge — </span>
                  {c("edge")}
                </p>
              )}
            </div>
          )}

          {slide.layout === "closing" && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-[2.5cqw] h-[0.5cqw] w-[5cqw] bg-accent" />
              <p className="display text-[5cqw] font-medium leading-[1.1]">
                {show("statement") ? (
                  c("statement")
                ) : (
                  <Placeholder text="The bigger future — what this becomes if you're right." />
                )}
              </p>
            </div>
          )}
        </div>

        <Footer company={company} />
      </div>
    </div>
  );
}
