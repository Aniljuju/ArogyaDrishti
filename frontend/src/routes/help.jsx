import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../components/layout/AppLayout";
import { Card, ButtonLink } from "../components/ui/Primitives";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — ArogyaDrishti" },
      { name: "description", content: "Answers to common questions about analyzing medical reports." },
      { property: "og:title", content: "Help — ArogyaDrishti" },
      { property: "og:description", content: "Common questions about uploads, formats and results." },
    ],
  }),
  component: Help,
});

const faqs = [
  {
    q: "Which report types are supported?",
    a: "CBC, biochemistry panels, MRI, CT, X-Ray, ECG, prescriptions, discharge summaries and other common report formats.",
  },
  {
    q: "What file formats can I upload?",
    a: "PDF, PNG, JPG and JPEG files up to 10 MB. Original PDFs give the most accurate extraction.",
  },
  {
    q: "How are abnormal values decided?",
    a: "Each value is compared only with the reference range printed on the same report — no external range is assumed.",
  },
  {
    q: "Is this a medical diagnosis?",
    a: "No. ArogyaDrishti explains what a report contains. Always discuss results with a qualified healthcare professional.",
  },
];

function Help() {
  return (
    <AppLayout title="Help" subtitle="Guides and frequently asked questions">
      <div className="mx-auto max-w-3xl space-y-4 rise-in">
        {faqs.map((f) => (
          <Card key={f.q} className="p-6">
            <h3 className="font-semibold text-foreground">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </Card>
        ))}
        <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-sm text-muted-foreground">Ready to try it with a report?</p>
          <ButtonLink to="/upload" size="sm">
            Upload a Report
          </ButtonLink>
        </Card>
      </div>
    </AppLayout>
  );
}
