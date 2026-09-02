import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import { ButtonLink } from "../ui/Primitives";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#privacy" className="transition-colors hover:text-foreground">
            Privacy
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink to="/dashboard" variant="outline" size="sm">
            View Demo
          </ButtonLink>
          <ButtonLink to="/upload" size="sm">
            Analyze a Report
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
