export type SlideId =
  | "cover"
  | "problem"
  | "solution"
  | "product"
  | "traction"
  | "model"
  | "market"
  | "competition"
  | "whyNow"
  | "team"
  | "ask"
  | "vision";

export type SlideLayout =
  | "cover"
  | "statement"
  | "split"
  | "metric"
  | "matrix"
  | "closing";

export interface SlideField {
  key: string;
  label: string;
  placeholder: string;
  helper?: string;
  multiline?: boolean;
  maxLength?: number;
}

export interface SlideDef {
  id: SlideId;
  index: number;
  title: string;
  tagline: string;
  prompt: string;
  layout: SlideLayout;
  tips: string[];
  fields: SlideField[];
}

export interface DeckContent {
  [slideId: string]: Record<string, string>;
}

export const SLIDES: SlideDef[] = [
  {
    id: "cover",
    index: 1,
    title: "Cover",
    tagline: "Who you are, in one breath.",
    prompt:
      "Open with your company name and a single sentence that says what you do and for whom. Use the proven one-liner formula.",
    layout: "cover",
    tips: [
      "Formula: “A [product] that helps [customer] [solve problem] with [secret sauce].”",
      "Explain it like you would to a five-year-old — no jargon.",
      "Put the round and year so investors know the context instantly.",
    ],
    fields: [
      {
        key: "companyName",
        label: "Company name",
        placeholder: "Northwind",
        maxLength: 40,
      },
      {
        key: "tagline",
        label: "One-line pitch",
        placeholder:
          "A logistics platform that helps small manufacturers ship overseas without a broker.",
        helper: "The madlibs formula works best here.",
        multiline: true,
        maxLength: 200,
      },
      {
        key: "presenter",
        label: "Your name & role",
        placeholder: "Maya Chen, Founder & CEO",
        maxLength: 60,
      },
      {
        key: "context",
        label: "Round & date",
        placeholder: "Seed round · 2026",
        maxLength: 40,
      },
    ],
  },
  {
    id: "problem",
    index: 2,
    title: "Problem",
    tagline: "The pain, quantified.",
    prompt:
      "Describe the problem from the customer's point of view. Make it specific and put a number on how big or costly it is.",
    layout: "statement",
    tips: [
      "Lead with the customer's lived pain, not your product.",
      "Quantify it: time lost, money wasted, people affected.",
      "One problem, sharply drawn — not a list of everything.",
    ],
    fields: [
      {
        key: "statement",
        label: "The problem",
        placeholder:
          "Small manufacturers spend 3+ weeks and 12% of revenue just clearing customs.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "who",
        label: "Who feels it",
        placeholder: "5,000+ small exporters in emerging markets",
        maxLength: 120,
      },
      {
        key: "magnitude",
        label: "How big (number)",
        placeholder: "$40B lost to customs friction every year",
        maxLength: 120,
      },
    ],
  },
  {
    id: "solution",
    index: 3,
    title: "Solution",
    tagline: "How you make the pain go away.",
    prompt:
      "State the solution plainly, the primary benefit, and your secret sauce — what makes it work.",
    layout: "statement",
    tips: [
      "One sentence on what you do, then the benefit.",
      "Name the secret sauce — the thing competitors can't easily copy.",
      "Show the before → after in the reader's head.",
    ],
    fields: [
      {
        key: "statement",
        label: "Your solution",
        placeholder:
          "Northwind automates customs paperwork and matches shipments to the cheapest trusted carrier.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "benefit",
        label: "Primary benefit",
        placeholder: "Exporters go from 3 weeks to 3 days, at a third of the cost.",
        maxLength: 160,
      },
      {
        key: "secretSauce",
        label: "Secret sauce",
        placeholder:
          "A customs model trained on 2M past filings across 40 ports.",
        maxLength: 160,
      },
    ],
  },
  {
    id: "product",
    index: 4,
    title: "Product",
    tagline: "What it is and how it works.",
    prompt:
      "Describe the product and walk through how it works. List the 2–4 capabilities that matter most.",
    layout: "split",
    tips: [
      "Show, don't tell — a screenshot or flow helps more than prose.",
      "2–4 key features only; depth beats a long list.",
      "Tie each feature back to the problem it solves.",
    ],
    fields: [
      {
        key: "description",
        label: "Product description",
        placeholder:
          "A web app where exporters upload an invoice and get a cleared, routable shipment in minutes.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "features",
        label: "Key features (one per line)",
        placeholder:
          "Auto-filled customs docs\nCarrier matching\nLive duty & tax estimate\nDispute handling",
        multiline: true,
        maxLength: 400,
      },
    ],
  },
  {
    id: "traction",
    index: 5,
    title: "Traction",
    tagline: "Proof it's working.",
    prompt:
      "Lead with one headline metric and show the growth. Investors want evidence, not promises.",
    layout: "metric",
    tips: [
      "One chart beats a wall of text — name the single number that matters.",
      "Show momentum: MoM or YoY growth, not just a snapshot.",
      "Logos of customers or partners add instant credibility.",
    ],
    fields: [
      {
        key: "headlineMetric",
        label: "Headline metric",
        placeholder: "£1.2M ARR",
        maxLength: 40,
      },
      {
        key: "metricLabel",
        label: "What it measures",
        placeholder: "Annual recurring revenue",
        maxLength: 60,
      },
      {
        key: "growth",
        label: "Growth note",
        placeholder: "Up 18% month-over-month for 7 straight months.",
        maxLength: 160,
      },
      {
        key: "logos",
        label: "Customers / partners",
        placeholder: "Used by 220 exporters across 12 countries",
        maxLength: 120,
      },
    ],
  },
  {
    id: "model",
    index: 6,
    title: "Business model",
    tagline: "How you make money.",
    prompt:
      "Explain how you charge, what the unit economics look like, and how revenue expands over time.",
    layout: "statement",
    tips: [
      "State the pricing model in one line (subscription, take-rate, per-shipment).",
      "Show expansion: how a customer pays you more over time.",
      "Rank revenue sources if you have more than one.",
    ],
    fields: [
      {
        key: "model",
        label: "How you make money",
        placeholder:
          "Per-shipment fee (1.5%) plus a £99/mo plan for high-volume exporters.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "expansion",
        label: "Expansion / upsell",
        placeholder: "Teams add freight insurance and financing as they grow.",
        maxLength: 160,
      },
    ],
  },
  {
    id: "market",
    index: 7,
    title: "Market",
    tagline: "The size of the prize.",
    prompt:
      "Show the opportunity with TAM / SAM / SOM. Prefer a bottom-up number you can defend.",
    layout: "metric",
    tips: [
      "Use a bottom-up estimate you can defend, not a vague top-down figure.",
      "Show you can realistically capture a meaningful slice (SOM).",
      "$1B+ TAM is the floor investors expect for venture scale.",
    ],
    fields: [
      {
        key: "tam",
        label: "TAM",
        placeholder: "$40B global customs & freight brokerage",
        maxLength: 80,
      },
      {
        key: "sam",
        label: "SAM",
        placeholder: "$9B SMB cross-border logistics",
        maxLength: 80,
      },
      {
        key: "som",
        label: "SOM (3-yr)",
        placeholder: "$180M addressable with current reach",
        maxLength: 80,
      },
      {
        key: "approach",
        label: "How you sized it",
        placeholder:
          "2M SMB exporters × £900 avg annual spend on customs tooling.",
        multiline: true,
        maxLength: 200,
      },
    ],
  },
  {
    id: "competition",
    index: 8,
    title: "Competition",
    tagline: "Where you win.",
    prompt:
      "Name the alternatives, then say clearly how you're different. Never claim there's no competition.",
    layout: "matrix",
    tips: [
      "Never say “no competition” — it signals you haven't looked.",
      "Use the frame: “Unlike [alternatives], we [differentiator] and [differentiator].”",
      "A 2x2 matrix of price vs. capability lands fast.",
    ],
    fields: [
      {
        key: "alternatives",
        label: "Alternatives today",
        placeholder: "Freight forwarders, spreadsheets, incumbents like Flexport (enterprise-only)",
        multiline: true,
        maxLength: 240,
      },
      {
        key: "unlike",
        label: "Unlike them, we…",
        placeholder:
          "Unlike forwarders, we're instant and self-serve; unlike Flexport, we serve the small exporter.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "edge",
        label: "Durable edge",
        placeholder: "Proprietary customs model + network effects from shipment data.",
        maxLength: 160,
      },
    ],
  },
  {
    id: "whyNow",
    index: 9,
    title: "Why now",
    tagline: "Why this moment.",
    prompt:
      "Explain why this is possible and necessary now — a shift in tech, regulation, or behaviour.",
    layout: "statement",
    tips: [
      "Point to a real shift: new tech, regulation, or behaviour change.",
      "Show why incumbents can't just copy you overnight.",
      "Why wasn't this built five years ago? Answer that.",
    ],
    fields: [
      {
        key: "statement",
        label: "Why this moment",
        placeholder:
          "Customs APIs opened in 40 ports since 2023, and SMBs now expect instant software.",
        multiline: true,
        maxLength: 280,
      },
      {
        key: "tailwinds",
        label: "Tailwinds",
        placeholder: "Trade digitisation mandates + cheaper ML inference.",
        maxLength: 160,
      },
    ],
  },
  {
    id: "team",
    index: 10,
    title: "Team",
    tagline: "Why you'll win.",
    prompt:
      "Show the founders and the unfair advantage — why this team is the one to back.",
    layout: "split",
    tips: [
      "Lead with relevant proof: built this before, domain expertise, rare skills.",
      "Name the unfair advantage competitors can't hire for.",
      "Add advisors or early hires that fill gaps.",
    ],
    fields: [
      {
        key: "founders",
        label: "Founders (one per line)",
        placeholder:
          "Maya Chen — ex-TradeSpring, cleared $2B in shipments\nDev Rao — ex-Stripe, built payments infra",
        multiline: true,
        maxLength: 360,
      },
      {
        key: "edge",
        label: "Unfair advantage",
        placeholder:
          "Combined 18 years inside customs and payments; first-mover on SMB data.",
        multiline: true,
        maxLength: 240,
      },
    ],
  },
  {
    id: "ask",
    index: 11,
    title: "The ask",
    tagline: "What you want.",
    prompt:
      "State the amount, what it buys, and the round context. Make the use of funds concrete.",
    layout: "metric",
    tips: [
      "State the number plainly — don't make investors guess.",
      "Tie the raise to a milestone: “gets us to £5M ARR”.",
      "Show how the money is split (hiring, growth, product).",
    ],
    fields: [
      {
        key: "amount",
        label: "Raising",
        placeholder: "£1.5M seed",
        maxLength: 40,
      },
      {
        key: "useOfFunds",
        label: "Use of funds",
        placeholder:
          "60% engineering & product, 25% go-to-market, 15% ops.",
        multiline: true,
        maxLength: 240,
      },
      {
        key: "milestone",
        label: "What it gets you to",
        placeholder: "£5M ARR and series A readiness in 18 months.",
        maxLength: 160,
      },
    ],
  },
  {
    id: "vision",
    index: 12,
    title: "Vision",
    tagline: "Where this goes.",
    prompt:
      "Close with the bigger future — the company this becomes if you're right.",
    layout: "closing",
    tips: [
      "Paint the 10-year picture, not just the next feature.",
      "Make it specific enough to be believable.",
      "End on conviction, not a question.",
    ],
    fields: [
      {
        key: "statement",
        label: "The vision",
        placeholder:
          "The default operating system for every small business that trades across borders.",
        multiline: true,
        maxLength: 240,
      },
    ],
  },
];

export function emptyDeck(): DeckContent {
  const deck: DeckContent = {};
  for (const slide of SLIDES) {
    deck[slide.id] = {};
    for (const field of slide.fields) {
      deck[slide.id][field.key] = "";
    }
  }
  return deck;
}

export function slideCompletion(content: DeckContent, slide: SlideDef): number {
  const values = slide.fields.map((f) => (content[slide.id]?.[f.key] ?? "").trim());
  const filled = values.filter((v) => v.length > 0).length;
  return filled / Math.max(values.length, 1);
}

export function deckCompletion(content: DeckContent): number {
  const scores = SLIDES.map((s) => slideCompletion(content, s));
  return scores.reduce((a, b) => a + b, 0) / SLIDES.length;
}
