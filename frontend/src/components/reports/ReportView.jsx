import {
  Download,
  Printer,
  ClipboardList,
  CheckCircle2,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Pill,
  Stethoscope,
  Gauge,
  AlertTriangle,
  User,
} from "lucide-react";
import { Card, StatusBadge, SectionHeading, Button, cx } from "../ui/Primitives";

function Metric({ label, value, tone }) {
  const tones = {
    total: "text-primary",
    normal: "text-success",
    low: "text-warning",
    high: "text-danger",
  };
  return (
    <Card className="p-5">
      <p className={cx("text-3xl font-semibold", tones[tone])}>{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}

export default function ReportView({ report, showFindings = false }) {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="space-y-8 rise-in">
      {/* Header */}
      <Card className="flex flex-wrap items-start justify-between gap-4 p-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-foreground">{report.title}</h2>
            <StatusBadge status="Completed" className="!bg-success-soft !text-success" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {report.status} &middot; {report.date} &middot; Report ID {report.id}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="size-4" />
            Print Report
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Download className="size-4" />
            Download Report
          </Button>
        </div>
      </Card>

      {/* Totals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Total Tests" value={report.totals.total} tone="total" />
        <Metric label="Normal" value={report.totals.normal} tone="normal" />
        <Metric label="Low" value={report.totals.low} tone="low" />
        <Metric label="High" value={report.totals.high} tone="high" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="size-4 text-accent" />
            Patient Information
          </div>
          <div className="space-y-3">
            <Field label="Patient Name" value={report.patient.name} />
            <Field label="Age" value={report.patient.age} />
            <Field label="Gender" value={report.patient.gender} />
            <Field label="Report Date" value={report.patient.reportDate} />
          </div>
        </Card>

        <Card className="border-l-4 border-l-accent p-6 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <ClipboardList className="size-4 text-accent" />
            Overall Summary
          </div>
          <p className="text-[0.95rem] leading-relaxed text-foreground/85">{report.clinicalSummary}</p>

          {showFindings ? (
            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-3 text-sm font-semibold text-foreground">Extracted Findings</p>
              <ul className="space-y-2">
                {report.findings.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </div>

      {/* Lab results */}
      <section>
        <SectionHeading title="Lab Results" description="Values extracted from the uploaded report." />
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Test</th>
                  <th className="px-5 py-3 font-semibold">Value</th>
                  <th className="px-5 py-3 font-semibold">Unit</th>
                  <th className="px-5 py-3 font-semibold">Reference Range</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.labResults.map((row) => (
                  <tr key={row.test} className="border-t border-border transition-colors hover:bg-surface">
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.test}</td>
                    <td className="px-5 py-3.5 font-semibold text-foreground">{row.value}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.unit}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.range}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Abnormal values */}
      <section>
        <SectionHeading
          title="Values Outside Reference Range"
          description="These flags are based on the reference ranges provided in the report."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {report.abnormalValues.map((row) => {
            const isHigh = row.status === "HIGH";
            return (
              <Card
                key={row.test}
                className={cx("p-5", isHigh ? "border-l-4 border-l-danger" : "border-l-4 border-l-warning")}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-foreground">{row.test}</p>
                  {isHigh ? (
                    <ArrowUpRight className="size-5 text-danger" />
                  ) : (
                    <ArrowDownRight className="size-5 text-warning" />
                  )}
                </div>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {row.value} <span className="text-base font-normal text-muted-foreground">{row.unit}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reference: {row.range} {row.unit}
                </p>
                <p className="mt-3 text-sm font-medium">
                  Status:{" "}
                  <span className={isHigh ? "text-danger" : "text-warning"}>
                    {isHigh ? "High" : "Low"}
                  </span>
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* AI explanation */}
      <section>
        <Card className="overflow-hidden p-0">
          <div className="flex items-center gap-2 border-b border-border bg-primary-soft px-6 py-4">
            <Sparkles className="size-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Simple Explanation</h2>
          </div>
          <div className="space-y-5 p-6">
            <p className="text-[0.98rem] leading-relaxed text-foreground/90">{report.aiExplanation.intro}</p>
            <div>
              <p className="mb-2 font-semibold text-foreground">What does this mean?</p>
              <ul className="space-y-2">
                {report.aiExplanation.meaning.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 rounded-lg bg-warning-soft px-4 py-3.5 text-sm text-foreground/85">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
              <p>
                <span className="font-semibold">Important: </span>
                {report.aiExplanation.disclaimer}
              </p>
            </div>
          </div>
        </Card>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Medications */}
        <section className="lg:col-span-2">
          <SectionHeading title="Medications" description="Detected from the prescription section." />
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Medication</th>
                    <th className="px-5 py-3 font-semibold">Dosage</th>
                    <th className="px-5 py-3 font-semibold">Frequency</th>
                    <th className="px-5 py-3 font-semibold">Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {report.medications.map((m) => (
                    <tr key={m.name} className="border-t border-border">
                      <td className="px-5 py-3.5 font-medium text-foreground">
                        <span className="flex items-center gap-2">
                          <Pill className="size-4 text-accent" />
                          {m.name}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">{m.dosage}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{m.frequency}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{m.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Confidence */}
        <section>
          <SectionHeading title="Processing Confidence" />
          <Card className="space-y-5 p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="size-4 text-accent" />
              Pipeline quality indicators
            </div>
            {report.confidence.map((c) => (
              <div key={c.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-semibold text-foreground">{c.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs leading-relaxed text-muted-foreground">
              These values describe text-processing quality only. They are not medical diagnostic confidence
              scores.
            </p>
          </Card>
        </section>
      </div>

      {/* Recommendations */}
      <section>
        <SectionHeading title="Recommended Follow-up" />
        <Card className="p-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {report.recommendations.map((r) => (
              <li key={r} className="flex gap-2.5 rounded-lg bg-surface px-4 py-3 text-sm text-foreground/85">
                <Stethoscope className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <p className="rounded-xl border border-border bg-card px-5 py-4 text-center text-xs leading-relaxed text-muted-foreground">
        ArogyaDrishti is an informational report-analysis tool. It does not provide medical diagnosis or
        replace professional medical advice.
      </p>
    </div>
  );
}
