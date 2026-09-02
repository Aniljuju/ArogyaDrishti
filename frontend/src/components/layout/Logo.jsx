import { Activity } from "lucide-react";
import { cx } from "../ui/Primitives";

export default function Logo({ className, subdued = false }) {
  return (
    <span className={cx("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
        <Activity className="size-5" strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[1.05rem] font-bold tracking-tight text-foreground">
          ArogyaDrishti
        </span>
        {!subdued ? (
          <span className="block text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Report Analysis
          </span>
        ) : null}
      </span>
    </span>
  );
}
