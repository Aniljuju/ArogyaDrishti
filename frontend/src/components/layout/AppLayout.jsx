import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  User,
  Settings,
  LifeBuoy,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import Logo from "./Logo";
import { cx, ButtonLink } from "../ui/Primitives";

const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Report", icon: UploadCloud },
  { to: "/history", label: "My Reports", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

const bottomNav = [
  { to: "/help", label: "Help", icon: LifeBuoy },
  { to: "/privacy", label: "Privacy", icon: ShieldCheck },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cx(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary-soft text-secondary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="size-[1.05rem]" strokeWidth={2} />
      {item.label}
    </Link>
  );
}

export default function AppLayout({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="px-2 pt-2">
        <Logo />
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {mainNav.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            active={pathname.startsWith(item.to)}
            onClick={() => setOpen(false)}
          />
        ))}
      </nav>
      <div className="flex flex-col gap-1 border-t border-border pt-4">
        {bottomNav.map((item) => (
          <NavItem key={item.to} item={item} active={pathname === item.to} onClick={() => setOpen(false)} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-sidebar lg:block">
        {sidebar}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-sidebar shadow-lift">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 rounded-md p-2 text-muted-foreground hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">{title}</h1>
              {subtitle ? (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              ) : null}
            </div>
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground md:flex">
              <Search className="size-4" />
              <span>Search reports</span>
            </div>
            <button
              aria-label="Notifications"
              className="rounded-lg border border-border bg-background p-2.5 text-muted-foreground hover:bg-secondary"
            >
              <Bell className="size-4" />
            </button>
            <ButtonLink to="/upload" size="sm" className="hidden sm:inline-flex">
              <UploadCloud className="size-4" />
              New Report
            </ButtonLink>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-secondary-foreground">
              JD
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
