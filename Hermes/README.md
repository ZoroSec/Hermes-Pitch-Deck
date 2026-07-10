# Heremes — Investor Pitch Deck Maker

A browser-based tool that turns a founder's story into a sharp, investor-ready
pitch deck. Guided builder, a proven 12-slide structure, live preview, and a
one-click PDF export. No sign-up, no backend — your work saves in the browser.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## How it works

- `/` — landing page with real rendered slide examples.
- `/builder` — the app: answer guided prompts, watch each slide render live,
  export a board-ready PDF (print to PDF). "Try an example" loads a finished
  sample deck.

## Structure

- `lib/deck.ts` — the canonical 12-slide model, fields, tips, and progress helpers.
- `lib/sample.ts` — a filled example deck ("Northwind") used for demos.
- `lib/storage.ts` — localStorage persistence.
- `components/SlideView.tsx` — renders any slide (used by preview, gallery, and print).
- `components/builder/Builder.tsx` — the interactive builder.
- `app/page.tsx` — landing page. `app/builder/page.tsx` — builder route.

## Notes

- Heremes is a writing tool, not financial or legal advice.
- PDF export uses the browser's print flow (`window.print()`); set the print
  dialog to "Save as PDF" for a board-ready file.
# Hermes-Pitch-Deck
