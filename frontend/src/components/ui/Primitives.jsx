import { Link } from "@tanstack/react-router";

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, children, ...rest }) {
  return (
    <div className={cx("card-surface", className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionHeading({ title, description, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants = {
  primary: "bg-primary text-primary-foreground shadow-card hover:brightness-115 active:scale-[0.99]",
  accent: "bg-accent text-accent-foreground shadow-card hover:brightness-110 active:scale-[0.99]",
  outline: "border border-border bg-card text-foreground hover:bg-secondary",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
  subtle: "bg-primary-soft text-secondary-foreground hover:brightness-98",
};

const buttonSizes = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
  lg: "h-13 px-7 text-base",
};

export function Button({ variant = "primary", size = "md", className, ...rest }) {
  return (
    <button className={cx(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...rest} />
  );
}

export function ButtonLink({ variant = "primary", size = "md", className, ...rest }) {
  return (
    <Link className={cx(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...rest} />
  );
}

const statusStyles = {
  NORMAL: "bg-success-soft text-success",
  LOW: "bg-warning-soft text-warning",
  HIGH: "bg-danger-soft text-danger",
  Completed: "bg-success-soft text-success",
  Processing: "bg-accent-soft text-accent",
  Failed: "bg-danger-soft text-danger",
};

export function StatusBadge({ status, className }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        statusStyles[status] ?? "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <Card className="flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
      <span className={cx("flex size-11 shrink-0 items-center justify-center rounded-xl", tones[tone])}>
        {Icon ? <Icon className="size-5" strokeWidth={2} /> : null}
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </Card>
  );
}
