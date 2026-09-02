import { createFileRoute } from "@tanstack/react-router";
import { Lock, EyeOff, ShieldCheck, Trash2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { Card } from "../components/ui/Primitives";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — ArogyaDrishti" },
      { name: "description", content: "How ArogyaDrishti handles uploaded medical reports." },
      { property: "og:title", content: "Privacy — ArogyaDrishti" },
      { property: "og:description", content: "Data handling practices for uploaded medical reports." },
    ],
  }),
  component: Privacy,
});

const points = [
  { icon: Lock, title: "Encrypted transfer", body: "Reports are transferred over secure connections only." },
  { icon: EyeOff, title: "Private by default", body: "Your reports are never shared with other users." },
  { icon: ShieldCheck, title: "Purpose limited", body: "Extracted text is used only to produce your analysis." },
  { icon: Trash2, title: "Deletable anytime", body: "Remove any report and its extracted data from your history." },
];

function Privacy() {
  return (
    <AppLayout title="Privacy" subtitle="How your medical reports are handled">
      <div className="mx-auto max-w-3xl space-y-6 rise-in">
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <Card key={p.title} className="p-6">
              <p.icon className="size-5 text-accent" />
              <h3 className="mt-3 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <h3 className="font-semibold text-foreground">Disclaimer</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            ArogyaDrishti is an informational report-analysis tool. It does not provide medical diagnosis or
            replace professional medical advice.
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
