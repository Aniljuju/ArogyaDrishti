import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, Circle, FileText } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { Card, cx, Button } from "../components/ui/Primitives";
import { processingSteps } from "../data/mockReports";

export const Route = createFileRoute("/processing")({
  validateSearch: (search) => ({ name: typeof search.name === "string" ? search.name : "" }),
  head: () => ({
    meta: [
      { title: "Analyzing Your Report — ArogyaDrishti" },
      { name: "description", content: "Live progress of the medical report analysis pipeline." },
      { property: "og:title", content: "Analyzing Your Report — ArogyaDrishti" },
      { property: "og:description", content: "Validation, extraction, OCR, classification and explanation." },
    ],
  }),
  component: Processing,
});

const statusLabels = [
  "File uploaded",
  "File validated",
  "Text extracted",
  "OCR completed",
  "Classifying report",
  "Extracting information",
  "Validating results",
  "Generating explanation",
];

function Processing() {
  const { name } = Route.useSearch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= processingSteps.length) {
      const done = setTimeout(() => navigate({ to: "/result" }), 900);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), current === 0 ? 700 : 1100);
    return () => clearTimeout(t);
  }, [current, navigate]);

  const progress = Math.min(100, Math.round((current / processingSteps.length) * 100));

  return (
    <AppLayout title="Processing" subtitle="Analysis pipeline in progress">
      <div className="mx-auto max-w-3xl space-y-6 rise-in">
        <Card className="p-6 text-center sm:p-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Loader2 className="size-7 animate-spin" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold text-foreground">Analyzing Your Report</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {name ? (
              <span className="inline-flex items-center gap-2">
                <FileText className="size-4" />
                {name}
              </span>
            ) : (
              "Running the extraction and explanation pipeline."
            )}
          </p>

          <div className="mx-auto mt-7 max-w-md">
            <div className="h-2.5 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{progress}% complete</p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-foreground">Pipeline</h3>
          <ol className="mt-5 space-y-1">
            {processingSteps.map((step, i) => {
              const done = i < current;
              const active = i === current;
              return (
                <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < processingSteps.length - 1 ? (
                    <span
                      className={cx(
                        "absolute left-[13px] top-7 h-full w-0.5 transition-colors",
                        done ? "bg-success" : "bg-border",
                      )}
                    />
                  ) : null}
                  <span
                    className={cx(
                      "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      done
                        ? "border-success bg-success text-primary-foreground"
                        : active
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="size-4" strokeWidth={3} />
                    ) : active ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Circle className="size-2 fill-current" />
                    )}
                  </span>
                  <div className="pt-0.5">
                    <p
                      className={cx(
                        "text-sm font-medium",
                        done || active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step}
                    </p>
                    <p
                      className={cx(
                        "text-xs",
                        done ? "text-success" : active ? "text-accent" : "text-muted-foreground",
                      )}
                    >
                      {done ? `✓ ${statusLabels[i]}` : active ? `● ${statusLabels[i]}` : `○ ${statusLabels[i]}`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/dashboard" })}>
            Cancel and return to dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
