"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  DeckContent,
  emptyDeck,
  slideCompletion,
  deckCompletion,
} from "@/lib/deck";
import { loadDeck, saveDeck, clearDeck } from "@/lib/storage";
import { SAMPLE_DECK } from "@/lib/sample";
import SlideView from "@/components/SlideView";
import { exportPptx } from "@/lib/pptx";
import clsx from "clsx";

export default function Builder() {
  const [content, setContent] = useState<DeckContent>(emptyDeck);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setContent(loadDeck());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveDeck(content);
  }, [content, mounted]);

  const setField = (slideId: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [slideId]: { ...prev[slideId], [key]: value },
    }));
  };

  const progress = useMemo(() => deckCompletion(content), [content]);
  const slide = SLIDES[active];

  const go = (delta: number) =>
    setActive((i) => Math.min(SLIDES.length - 1, Math.max(0, i + delta)));

  const loadExample = () => {
    setContent(SAMPLE_DECK);
    setActive(0);
  };

  const startOver = () => {
    clearDeck();
    setContent(emptyDeck());
    setActive(0);
    setConfirmClear(false);
  };

  const handlePptx = async () => {
    setExporting(true);
    try {
      await exportPptx(content);
    } catch (e) {
      console.error("PPTX export failed", e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-ink">
              <span className="display text-sm font-bold">H</span>
            </span>
            <span className="display text-lg font-semibold">Heremes</span>
          </a>

          <div className="hidden flex-1 max-w-xs items-center gap-3 sm:flex">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted">
              {Math.round(progress * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={loadExample} className="btn-ghost hidden sm:inline-flex">
              Try an example
            </button>
            <button
              onClick={handlePptx}
              disabled={exporting}
              className="btn-ghost disabled:opacity-50"
            >
              {exporting ? "Exporting…" : "Export PPTX"}
            </button>
            <button onClick={() => window.print()} className="btn-primary">
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="container-page flex-1 py-6">
        <div className="grid gap-6 lg:grid-cols-[248px_1fr_440px]">
          {/* Steps rail */}
          <aside className="no-print">
            <div className="lg:sticky lg:top-24">
              <div className="eyebrow mb-3">Your deck · {SLIDES.length} slides</div>
              <nav className="space-y-1">
                {SLIDES.map((s, i) => {
                  const pct = slideCompletion(content, s);
                  const isActive = i === active;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      className={clsx(
                        "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                        isActive
                          ? "border-accent/50 bg-surface shadow-soft"
                          : "border-transparent hover:bg-surface/70"
                      )}
                    >
                      <span
                        className={clsx(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold",
                          pct > 0.99
                            ? "bg-accent text-accent-ink"
                            : pct > 0
                            ? "bg-accent/20 text-accent-ink"
                            : "bg-surface-2 text-faint"
                        )}
                      >
                        {pct > 0.99 ? "✓" : String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={clsx(
                          "flex-1 truncate text-sm",
                          isActive ? "font-semibold text-ink" : "text-muted"
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-xl border border-line bg-surface-2/50 p-3 text-xs text-muted">
                Your work saves automatically in this browser. Heremes is a
                writing tool — not financial or legal advice.
              </div>
              <button
                onClick={() => setConfirmClear(true)}
                className="mt-3 text-xs text-faint underline-offset-2 hover:text-accent-ink hover:underline"
              >
                Start over
              </button>
              {confirmClear && (
                <div className="mt-3 rounded-xl border border-line bg-surface p-3 text-xs">
                  <p className="mb-2 text-ink">Clear all your content?</p>
                  <div className="flex gap-2">
                    <button onClick={startOver} className="btn-primary !px-3 !py-1.5 !text-xs">
                      Yes, clear
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="btn-ghost !px-3 !py-1.5 !text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Editor */}
          <section className="no-print min-w-0">
            <div className="card p-6 sm:p-8">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-accent-ink">
                  {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </span>
                <span className="eyebrow">{slide.title}</span>
              </div>
              <h2 className="display text-3xl font-semibold sm:text-4xl">
                {slide.tagline}
              </h2>
              <p className="mt-3 max-w-xl text-muted">{slide.prompt}</p>

              <div className="mt-6 space-y-5">
                {slide.fields.map((f) => {
                  const value = content[slide.id]?.[f.key] ?? "";
                  return (
                    <div key={f.key}>
                      <label className="mb-1.5 flex items-center justify-between text-sm font-medium">
                        <span>{f.label}</span>
                        {f.maxLength && (
                          <span className="font-mono text-[11px] text-faint">
                            {value.length}/{f.maxLength}
                          </span>
                        )}
                      </label>
                      {f.multiline ? (
                        <textarea
                          value={value}
                          maxLength={f.maxLength}
                          onChange={(e) => setField(slide.id, f.key, e.target.value)}
                          placeholder={f.placeholder}
                          rows={f.key === "features" || f.key === "founders" ? 4 : 3}
                          className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      ) : (
                        <input
                          value={value}
                          maxLength={f.maxLength}
                          onChange={(e) => setField(slide.id, f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                      )}
                      {f.helper && (
                        <p className="mt-1 text-xs text-faint">{f.helper}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl bg-accent-soft/40 p-4">
                <div className="eyebrow mb-2 text-accent-ink">Tips for this slide</div>
                <ul className="space-y-1.5 text-sm text-ink/90">
                  {slide.tips.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <button
                  onClick={() => go(-1)}
                  disabled={active === 0}
                  className="btn-ghost disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  onClick={() => go(1)}
                  disabled={active === SLIDES.length - 1}
                  className="btn-primary disabled:opacity-40"
                >
                  Next slide
                </button>
              </div>
            </div>
          </section>

          {/* Live preview */}
          <aside className="no-print">
            <div className="lg:sticky lg:top-24">
              <div className="eyebrow mb-3">Live preview</div>
              <div
                key={active}
                className="overflow-hidden rounded-2xl border border-line shadow-lift animate-fade-in"
              >
                <SlideView slide={slide} content={content} />
              </div>
              <p className="mt-3 text-center text-xs text-faint">
                This is exactly how the slide looks in your exported deck.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Print deck — only visible when printing */}
      <div className="print-deck hidden">
        {SLIDES.map((s) => (
          <div key={s.id} className="print-slide">
            <SlideView slide={s} content={content} />
          </div>
        ))}
      </div>
    </div>
  );
}
