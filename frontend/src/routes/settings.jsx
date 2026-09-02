import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../components/layout/AppLayout";
import { Card, cx } from "../components/ui/Primitives";
import { API_BASE_URL } from "../services/api";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ArogyaDrishti" },
      { name: "description", content: "Manage analysis preferences and notification settings." },
      { property: "og:title", content: "Settings — ArogyaDrishti" },
      { property: "og:description", content: "Analysis preferences, notifications and data settings." },
    ],
  }),
  component: SettingsPage,
});

const options = [
  { key: "explanations", label: "Plain-language explanations", body: "Include a simple summary with every analysis." },
  { key: "flags", label: "Abnormal value highlighting", body: "Highlight values outside the printed reference range." },
  { key: "emails", label: "Email notifications", body: "Send an email when an analysis finishes." },
  { key: "retain", label: "Keep report history", body: "Store analyzed reports in My Reports." },
];

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={cx(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-accent" : "bg-border",
      )}
    >
      <span
        className={cx(
          "absolute top-0.5 size-5 rounded-full bg-card shadow-card transition-all",
          on ? "left-[1.4rem]" : "left-0.5",
        )}
      />
    </button>
  );
}

function SettingsPage() {
  const [state, setState] = useState({ explanations: true, flags: true, emails: false, retain: true });

  return (
    <AppLayout title="Settings" subtitle="Preferences for report analysis">
      <div className="mx-auto max-w-3xl space-y-6 rise-in">
        <Card className="divide-y divide-border p-0">
          {options.map((o) => (
            <div key={o.key} className="flex items-center justify-between gap-6 p-5">
              <div>
                <p className="font-medium text-foreground">{o.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{o.body}</p>
              </div>
              <Toggle on={state[o.key]} onClick={() => setState((s) => ({ ...s, [o.key]: !s[o.key] }))} />
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground">API Connection</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This prototype runs on mock data. The analysis service will later be served from:
          </p>
          <code className="mt-3 block rounded-lg bg-surface px-4 py-3 font-mono text-sm text-foreground">
            {API_BASE_URL}
          </code>
        </Card>
      </div>
    </AppLayout>
  );
}
