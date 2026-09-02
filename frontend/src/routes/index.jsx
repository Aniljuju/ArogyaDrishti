import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanText,
  FolderTree,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Lock,
  EyeOff,
  ArrowRight,
  UploadCloud,
  FileSearch,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";
import SiteHeader from "../components/layout/SiteHeader";
import { Card, ButtonLink, StatusBadge } from "../components/ui/Primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArogyaDrishti — Understand Your Medical Reports Simply" },
      {
        name: "description",
        content:
          "Upload a medical report and get structured results, abnormal-value detection and easy-to-understand explanations.",
      },
      { property: "og:title", content: "ArogyaDrishti — Medical Report Analysis" },
      {
        property: "og:description",
        content: "Structured results, abnormal-value detection and patient-friendly explanations.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: ScanText,
    title: "OCR & Text Extraction",
    body: "Scanned pages and photographs are converted into clean, searchable report text.",
  },
  {
    icon: FolderTree,
    title: "Medical Report Classification",
    body: "CBC, biochemistry, imaging, ECG, prescriptions and discharge summaries are recognised automatically.",
  },
  {
    icon: AlertTriangle,
    title: "Abnormal Value Detection",
    body: "Each value is compared with the reference range printed on your own report.",
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Explanation",
    body: "A plain-language summary that explains what the report says, without medical jargon.",
  },
];

const steps = [
  { icon: UploadCloud, title: "Upload Report", body: "Add a PDF or image of your medical report." },
  { icon: FileSearch, title: "Extract Information", body: "Text and structured fields are pulled from the file." },
  { icon: CheckCircle2, title: "Validate Results", body: "Values are checked against the report's reference ranges." },
  { icon: MessageSquareText, title: "Get Simple Explanation", body: "Read a patient-friendly summary of the findings." },
];

function DashboardPreview() {
  return (
    <Card className="overflow-hidden p-0 shadow-lift">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="size-2.5 rounded-full bg-danger/60" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-muted-foreground">Blood Test Report — Analysis Complete</span>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            ["12", "Tests", "text-primary"],
            ["8", "Normal", "text-success"],
            ["3", "Low", "text-warning"],
            ["1", "High", "text-danger"],
          ].map(([v, l, c]) => (
            <div key={l} className="rounded-lg bg-surface py-3">
              <p className={`text-xl font-semibold ${c}`}>{v}</p>
              <p className="text-[0.7rem] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            ["Hemoglobin", "10.4 g/dL", "LOW"],
            ["WBC", "12500 /µL", "HIGH"],
            ["Platelets", "250000 /µL", "NORMAL"],
            ["RBC", "4.8 million/µL", "NORMAL"],
          ].map(([test, val, status]) => (
            <div
              key={test}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm"
            >
              <span className="font-medium text-foreground">{test}</span>
              <span className="flex items-center gap-3">
                <span className="text-muted-foreground">{val}</span>
                <StatusBadge status={status} />
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-primary-soft px-4 py-3 text-xs leading-relaxed text-secondary-foreground">
          <span className="font-semibold">Simple Explanation: </span>
          Most values sit inside the ranges printed on your report. Hemoglobin is below and WBC is above those
          ranges.
        </div>
      </div>
    </Card>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-3.5 text-accent" />
              Report analysis, not diagnosis
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
              Understand Your Medical Reports in Simple Language
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Upload a medical report and get structured results, abnormal-value detection, and
              easy-to-understand explanations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/upload" size="lg">
                Analyze a Report
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink to="/dashboard" variant="outline" size="lg">
                View Demo
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" /> PDF, PNG, JPG supported
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" /> Reference-range validation
              </span>
            </div>
          </div>
          <div className="rise-in">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground">Built for real medical reports</h2>
          <p className="mt-3 text-muted-foreground">
            Every stage of the analysis pipeline is designed around what is actually printed on your report.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="p-6 transition-shadow hover:shadow-lift">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold text-foreground">How ArogyaDrishti Works</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Four clear steps between uploading a document and understanding it.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Card key={s.title} className="relative p-6">
                <span className="absolute right-5 top-5 font-display text-3xl font-bold text-primary/10">
                  0{i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Your report stays your report</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Medical documents are sensitive. ArogyaDrishti is built so that reports are handled carefully at
              every step of processing.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Lock, title: "Encrypted transfer", body: "Files move over secure connections only." },
              { icon: EyeOff, title: "No public sharing", body: "Reports are never shown to other users." },
              { icon: ShieldCheck, title: "You stay in control", body: "Delete a report from your history anytime." },
            ].map((p) => (
              <Card key={p.title} className="p-5">
                <p.icon className="size-5 text-accent" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6">
        <Card className="flex flex-wrap items-center justify-between gap-5 bg-primary p-8 text-primary-foreground">
          <div>
            <h2 className="text-2xl font-bold">Ready to read your report clearly?</h2>
            <p className="mt-2 text-sm opacity-85">
              Upload a report and see structured results in under a minute.
            </p>
          </div>
          <ButtonLink to="/upload" variant="accent" size="lg">
            Analyze a Report
            <ArrowRight className="size-4" />
          </ButtonLink>
        </Card>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto w-full max-w-[1180px] space-y-5 px-4 py-10 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display font-bold text-foreground">ArogyaDrishti</p>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/upload" className="hover:text-foreground">
                Upload
              </Link>
              <Link to="/history" className="hover:text-foreground">
                My Reports
              </Link>
            </nav>
          </div>
          <p className="rounded-xl border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Disclaimer: </span>
            ArogyaDrishti is an informational report-analysis tool. It does not provide medical diagnosis or
            replace professional medical advice.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 ArogyaDrishti. Understand Your Medical Reports in Simple Language.
          </p>
        </div>
      </footer>
    </div>
  );
}
