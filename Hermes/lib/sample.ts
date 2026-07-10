import { DeckContent } from "./deck";

export const SAMPLE_DECK: DeckContent = {
  cover: {
    companyName: "Northwind",
    tagline:
      "A logistics platform that helps small manufacturers ship overseas without a customs broker.",
    presenter: "Maya Chen, Founder & CEO",
    context: "Seed round · 2026",
  },
  problem: {
    statement:
      "Small manufacturers spend 3+ weeks and 12% of revenue just clearing customs and finding a carrier.",
    who: "5,000+ small exporters across emerging markets",
    magnitude: "$40B lost every year to cross-border customs friction",
  },
  solution: {
    statement:
      "Northwind automates customs paperwork and matches each shipment to the cheapest trusted carrier.",
    benefit: "Exporters go from 3 weeks to 3 days, at a third of the cost.",
    secretSauce:
      "A customs model trained on 2M past filings across 40 ports.",
  },
  product: {
    description:
      "A web app where exporters upload one invoice and get a cleared, routable shipment in minutes.",
    features:
      "Auto-filled customs documents\nCarrier matching & booking\nLive duty & tax estimate\nDispute handling",
  },
  traction: {
    headlineMetric: "£1.2M ARR",
    metricLabel: "Annual recurring revenue",
    growth: "Up 18% month-over-month for 7 straight months.",
    logos: "Used by 220 exporters across 12 countries",
  },
  model: {
    model:
      "Per-shipment fee (1.5%) plus a £99/mo plan for high-volume exporters.",
    expansion: "Teams add freight insurance and financing as they grow.",
  },
  market: {
    tam: "$40B",
    sam: "$9B",
    som: "$180M",
    approach:
      "2M SMB exporters × £900 average annual spend on customs tooling.",
  },
  competition: {
    alternatives:
      "Freight forwarders, spreadsheets, and enterprise tools like Flexport (SMBs too small for them).",
    unlike:
      "Unlike forwarders we're instant and self-serve; unlike Flexport we serve the small exporter.",
    edge: "Proprietary customs model plus network effects from shipment data.",
  },
  whyNow: {
    statement:
      "Customs APIs opened in 40 ports since 2023, and SMBs now expect instant software.",
    tailwinds: "Trade digitisation mandates + far cheaper ML inference.",
  },
  team: {
    founders:
      "Maya Chen — ex-TradeSpring, cleared $2B in shipments\nDev Rao — ex-Stripe, built payments infra",
    edge: "18 years combined inside customs and payments; first-mover on SMB data.",
  },
  ask: {
    amount: "£1.5M seed",
    useOfFunds:
      "60% engineering & product, 25% go-to-market, 15% operations.",
    milestone: "£5M ARR and Series A readiness within 18 months.",
  },
  vision: {
    statement:
      "The default operating system for every small business that trades across borders.",
  },
};
