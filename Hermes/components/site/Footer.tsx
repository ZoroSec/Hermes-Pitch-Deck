import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-ink">
              <span className="display text-sm font-bold">H</span>
            </span>
            <span className="display text-lg font-semibold">Heremes</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Pitch decks investors actually read. Guided, structured, and ready
            to export in an afternoon.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/builder" className="hover:text-ink">Deck builder</Link></li>
            <li><a href="#slides" className="hover:text-ink">Slide system</a></li>
            <li><a href="#how" className="hover:text-ink">How it works</a></li>
            <li><a href="#why" className="hover:text-ink">Why Heremes</a></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Built on</div>
          <ul className="space-y-2 text-sm text-muted">
            <li>500 Global pitch structure</li>
            <li>Founder Institute templates</li>
            <li>Sequoia narrative</li>
            <li>Stripe Atlas guidance</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Get started</div>
          <Link href="/builder" className="btn-primary w-full sm:w-auto">
            Build your deck free
          </Link>
        </div>
      </div>
      <div className="container-page flex flex-col items-start justify-between gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Heremes. A pitch-deck studio in your browser.</span>
        <span>Heremes is a writing tool — not financial or legal advice.</span>
        <span className="font-mono">Crafted for founders who ship.</span>
      </div>
    </footer>
  );
}
