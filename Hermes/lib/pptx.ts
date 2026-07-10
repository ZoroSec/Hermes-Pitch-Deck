import { SLIDES, DeckContent } from "./deck";

// Native, editable PowerPoint export. Loaded on demand (browser only) so it
// stays out of the SSR bundle and initial client payload.
// pptxgenjs runs client-side and triggers the download via writeFile().

const C = {
  bg: "FBFAF5",
  ink: "111016",
  muted: "5C5A66",
  faint: "96949E",
  accent: "B08429",
  accentSoft: "F0E7CE",
  accentInk: "4A340E",
  line: "E4E0D6",
};

const DISPLAY = "Georgia";
const BODY = "Arial";
const MONO = "Courier New";

const byId = Object.fromEntries(SLIDES.map((s) => [s.id, s]));
const placeholder = (id: string, key: string) =>
  byId[id]?.fields.find((f) => f.key === key)?.placeholder ?? "";

const get = (c: DeckContent, id: string, key: string) =>
  (c[id]?.[key] ?? "").trim();
const val = (c: DeckContent, id: string, key: string) => {
  const v = get(c, id, key);
  return v.length ? v : placeholder(id, key);
};
const has = (c: DeckContent, id: string, key: string) => get(c, id, key).length > 0;

// statement slides -> supporting meta pairs
const META: Record<string, { label: string; key: string }[]> = {
  problem: [
    { label: "Who feels it", key: "who" },
    { label: "Scale", key: "magnitude" },
  ],
  solution: [
    { label: "Benefit", key: "benefit" },
    { label: "Secret sauce", key: "secretSauce" },
  ],
  model: [{ label: "Expansion", key: "expansion" }],
  whyNow: [{ label: "Tailwinds", key: "tailwinds" }],
};

type Slide = ReturnType<import("pptxgenjs").default["addSlide"]>;
type Pptx = import("pptxgenjs").default;

function baseSlide(pptx: Pptx): Slide {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.09,
    h: 7.5,
    fill: { color: C.accent },
    line: { type: "none" },
  });
  return s;
}

function kicker(slide: Slide, def: (typeof SLIDES)[number], pptx: Pptx) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 0.7,
    y: 0.5,
    w: 0.34,
    h: 0.34,
    fill: { color: C.accent },
    line: { type: "none" },
  });
  slide.addText(String(def.index).padStart(2, "0"), {
    x: 0.7,
    y: 0.5,
    w: 0.34,
    h: 0.34,
    align: "center",
    valign: "middle",
    fontSize: 10,
    bold: true,
    color: C.accentInk,
    fontFace: BODY,
  });
  slide.addText(def.title.toUpperCase(), {
    x: 1.15,
    y: 0.5,
    w: 9,
    h: 0.34,
    valign: "middle",
    fontSize: 11,
    bold: true,
    color: C.accentInk,
    charSpacing: 2,
    fontFace: BODY,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.15,
    y: 0.86,
    w: 11.0,
    h: 0.012,
    fill: { color: C.line },
    line: { type: "none" },
  });
}

function footer(slide: Slide, company: string) {
  slide.addText(company || "Your company", {
    x: 0.7,
    y: 7.02,
    w: 6,
    h: 0.3,
    fontSize: 9,
    bold: true,
    color: C.accentInk,
    fontFace: BODY,
  });
  slide.addText("HERMES · PITCH", {
    x: 6.7,
    y: 7.02,
    w: 5.9,
    h: 0.3,
    align: "right",
    fontSize: 9,
    color: C.faint,
    fontFace: MONO,
  });
}

function renderCover(slide: Slide, c: DeckContent, pptx: Pptx) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 1.7,
    w: 1.0,
    h: 0.06,
    fill: { color: C.accent },
    line: { type: "none" },
  });
  slide.addText(val(c, "cover", "companyName"), {
    x: 0.7,
    y: 1.95,
    w: 11.5,
    h: 1.2,
    fontSize: 46,
    bold: true,
    fontFace: DISPLAY,
    color: C.ink,
  });
  slide.addText(val(c, "cover", "tagline"), {
    x: 0.7,
    y: 3.3,
    w: 10.6,
    h: 1.5,
    fontSize: 20,
    color: C.muted,
    fontFace: BODY,
  });
  const presenter = val(c, "cover", "presenter");
  const context = get(c, "cover", "context");
  if (presenter || context) {
    slide.addText(presenter, {
      x: 0.7,
      y: 5.0,
      w: 8,
      h: 0.4,
      fontSize: 14,
      color: C.ink,
      fontFace: BODY,
    });
    if (context) {
      const w = 0.4 + context.length * 0.085;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.7,
        y: 5.5,
        w,
        h: 0.4,
        rectRadius: 0.2,
        fill: { color: C.bg },
        line: { color: C.line, width: 1 },
      });
      slide.addText(context, {
        x: 0.7,
        y: 5.5,
        w,
        h: 0.4,
        align: "center",
        valign: "middle",
        fontSize: 11,
        color: C.accentInk,
        fontFace: MONO,
      });
    }
  }
}

function renderStatement(slide: Slide, c: DeckContent, id: string, pptx: Pptx) {
  slide.addText(val(c, id, "statement"), {
    x: 0.7,
    y: 1.9,
    w: 11.8,
    h: 2.4,
    fontSize: 30,
    fontFace: DISPLAY,
    color: C.ink,
    valign: "top",
    lineSpacingMultiple: 1.05,
  });
  const meta = META[id] ?? [];
  meta.forEach((m, i) => {
    const cx = 0.7 + i * 4.0;
    slide.addText(m.label.toUpperCase(), {
      x: cx,
      y: 4.5,
      w: 3.7,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: C.accentInk,
      charSpacing: 1,
      fontFace: BODY,
    });
    slide.addText(val(c, id, m.key), {
      x: cx,
      y: 4.85,
      w: 3.7,
      h: 1.3,
      fontSize: 14,
      color: C.ink,
      fontFace: BODY,
      valign: "top",
    });
  });
}

function renderSplit(slide: Slide, c: DeckContent, id: string) {
  slide.addText(val(c, id, "description"), {
    x: 0.7,
    y: 1.95,
    w: 5.6,
    h: 4.4,
    fontSize: 22,
    fontFace: DISPLAY,
    color: C.ink,
    valign: "top",
  });
  const listKey = id === "team" ? "founders" : "features";
  slide.addText(id === "team" ? "FOUNDERS" : "KEY FEATURES", {
    x: 6.7,
    y: 1.95,
    w: 5.8,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: C.accentInk,
    charSpacing: 1,
    fontFace: BODY,
  });
  const lines = val(c, id, listKey)
    .split("\n")
    .filter(Boolean);
  const paras = lines.map((l) => ({
    text: "•  " + l,
    options: { fontFace: BODY, fontSize: 14, color: C.ink, paraSpaceAfter: 8 },
  }));
  slide.addText(paras, { x: 6.7, y: 2.35, w: 5.8, h: 3.4, valign: "top" });
  if (id === "team" && has(c, id, "edge")) {
    slide.addText(val(c, id, "edge"), {
      x: 6.7,
      y: 5.95,
      w: 5.8,
      h: 1.0,
      fontSize: 12,
      italic: true,
      color: C.muted,
      fontFace: BODY,
    });
  }
}

function renderMetric(slide: Slide, c: DeckContent, id: string, pptx: Pptx) {
  if (id === "market") {
    const cols = [
      ["TAM", val(c, "market", "tam")],
      ["SAM", val(c, "market", "sam")],
      ["SOM", val(c, "market", "som")],
    ];
    cols.forEach((col, i) => {
      const cx = 0.7 + i * 3.95;
      slide.addText(col[1], {
        x: cx,
        y: 2.3,
        w: 3.6,
        h: 1.1,
        fontSize: 40,
        bold: true,
        fontFace: MONO,
        color: i === 2 ? C.accentInk : C.ink,
      });
      slide.addText(col[0], {
        x: cx,
        y: 3.4,
        w: 3.6,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: C.faint,
        charSpacing: 1,
        fontFace: BODY,
      });
    });
    if (has(c, "market", "approach")) {
      slide.addText(val(c, "market", "approach"), {
        x: 0.7,
        y: 4.6,
        w: 11.8,
        h: 1.6,
        fontSize: 14,
        color: C.muted,
        fontFace: BODY,
        valign: "top",
      });
    }
    return;
  }

  let big = "";
  let bigLabel = "";
  const notes: string[] = [];
  if (id === "traction") {
    big = val(c, "traction", "headlineMetric");
    bigLabel = val(c, "traction", "metricLabel");
    if (has(c, "traction", "growth")) notes.push(val(c, "traction", "growth"));
    if (has(c, "traction", "logos")) notes.push(val(c, "traction", "logos"));
  }
  if (id === "ask") {
    big = val(c, "ask", "amount");
    bigLabel = val(c, "ask", "milestone");
    if (has(c, "ask", "useOfFunds"))
      notes.push("Use of funds: " + val(c, "ask", "useOfFunds"));
  }

  slide.addText(big, {
    x: 0.7,
    y: 1.9,
    w: 8.5,
    h: 1.6,
    fontSize: 54,
    bold: true,
    fontFace: DISPLAY,
    color: C.accentInk,
  });
  if (bigLabel) {
    slide.addText(bigLabel.toUpperCase(), {
      x: 0.7,
      y: 3.5,
      w: 8,
      h: 0.4,
      fontSize: 12,
      bold: true,
      color: C.muted,
      charSpacing: 1,
      fontFace: BODY,
    });
  }
  let ny = 4.3;
  notes.forEach((n) => {
    slide.addText(n, {
      x: 0.7,
      y: ny,
      w: 7.8,
      h: 0.9,
      fontSize: 14,
      color: C.ink,
      fontFace: BODY,
      valign: "top",
    });
    ny += 1.0;
  });
}

function renderMatrix(slide: Slide, c: DeckContent, pptx: Pptx) {
  slide.addText("ALTERNATIVES TODAY", {
    x: 0.7,
    y: 1.9,
    w: 5.6,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: C.accentInk,
    charSpacing: 1,
    fontFace: BODY,
  });
  slide.addText(val(c, "competition", "alternatives"), {
    x: 0.7,
    y: 2.3,
    w: 5.6,
    h: 2.6,
    fontSize: 16,
    color: C.ink,
    fontFace: BODY,
    valign: "top",
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7,
    y: 1.9,
    w: 5.9,
    h: 2.8,
    rectRadius: 0.12,
    fill: { color: C.accentSoft },
    line: { color: C.accent, width: 1 },
  });
  slide.addText("UNLIKE THEM, WE…", {
    x: 6.95,
    y: 2.1,
    w: 5.4,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: C.accentInk,
    charSpacing: 1,
    fontFace: BODY,
  });
  slide.addText(val(c, "competition", "unlike"), {
    x: 6.95,
    y: 2.5,
    w: 5.4,
    h: 2.0,
    fontSize: 16,
    color: C.ink,
    fontFace: BODY,
    valign: "top",
  });
  if (has(c, "competition", "edge")) {
    slide.addText("Durable edge — " + val(c, "competition", "edge"), {
      x: 0.7,
      y: 5.0,
      w: 11.8,
      h: 1.3,
      fontSize: 14,
      color: C.muted,
      fontFace: BODY,
      valign: "top",
    });
  }
}

function renderClosing(slide: Slide, c: DeckContent, pptx: Pptx) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.16,
    y: 2.9,
    w: 1.0,
    h: 0.06,
    fill: { color: C.accent },
    line: { type: "none" },
  });
  slide.addText(val(c, "vision", "statement"), {
    x: 0.9,
    y: 3.2,
    w: 11.0,
    h: 2.6,
    align: "center",
    fontSize: 32,
    fontFace: DISPLAY,
    color: C.ink,
    valign: "top",
  });
}

export async function exportPptx(content: DeckContent): Promise<void> {
  const pptxgen = (await import("pptxgenjs")).default;
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in (16:9)
  pptx.author = "Heremes";
  pptx.company = "Heremes";
  const company = get(content, "cover", "companyName");
  pptx.title = `${company || "Pitch"} — Pitch Deck`;

  for (const def of SLIDES) {
    const slide = baseSlide(pptx);
    kicker(slide, def, pptx);
    switch (def.layout) {
      case "cover":
        renderCover(slide, content, pptx);
        break;
      case "statement":
        renderStatement(slide, content, def.id, pptx);
        break;
      case "split":
        renderSplit(slide, content, def.id);
        break;
      case "metric":
        renderMetric(slide, content, def.id, pptx);
        break;
      case "matrix":
        renderMatrix(slide, content, pptx);
        break;
      case "closing":
        renderClosing(slide, content, pptx);
        break;
    }
    footer(slide, company);
  }

  const fileName = `${(company || "pitch-deck")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}.pptx`;

  await pptx.writeFile({ fileName });
}
