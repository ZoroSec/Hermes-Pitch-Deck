import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-ink">
            <span className="display text-sm font-bold">H</span>
          </span>
          <span className="display text-lg font-semibold">Heremes</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#how" className="transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#slides" className="transition-colors hover:text-ink">
            The deck
          </a>
          <a href="#why" className="transition-colors hover:text-ink">
            Why Heremes
          </a>
        </nav>

        <Link href="/builder" className="btn-primary">
          Build your deck
        </Link>
      </div>
    </header>
  );
}
