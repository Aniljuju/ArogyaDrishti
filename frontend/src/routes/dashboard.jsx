import { createFileRoute, Link } from "@tanstack/react-router";
import { FileStack, CheckCircle2, ShieldCheck, AlertTriangle, Plus, ChevronRight } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { Card, StatCard, StatusBadge, SectionHeading, ButtonLink } from "../components/ui/Primitives";
import { reports, summaryStats } from "../data/mockReports";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ArogyaDrishti" },
      { name: "description", content: "Review your recent medical reports and analysis summaries." },
      { property: "og:title", content: "Dashboard — ArogyaDrishti" },
      { property: "og:description", content: "Recent medical reports, analysis status and abnormal values." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const recent = reports.slice(0, 5);

  return (
    <AppLayout title="Dashboard" subtitle="Overview of your report analyses">
      <div className="space-y-8 rise-in">
        <Card className="flex flex-wrap items-center justify-between gap-5 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Good afternoon</h2>
            <p className="mt-1.5 text-muted-foreground">Review your recent medical reports.</p>
          </div>
          <ButtonLink to="/upload" size="lg">
            <Plus className="size-4" />
            Analyze New Report
          </ButtonLink>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileStack} label="Total Reports" value={summaryStats.totalReports} tone="primary" />
          <StatCard icon={CheckCircle2} label="Analyzed" value={summaryStats.analyzed} tone="accent" />
          <StatCard icon={ShieldCheck} label="Normal Results" value={summaryStats.normalResults} tone="success" />
          <StatCard icon={AlertTriangle} label="Abnormal Values" value={summaryStats.abnormalValues} tone="danger" />
        </div>

        <section>
          <SectionHeading
            title="Recent Reports"
            description="Your five most recent uploads."
            action={
              <ButtonLink to="/history" variant="ghost" size="sm">
                View all
                <ChevronRight className="size-4" />
              </ButtonLink>
            }
          />
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Report Type</th>
                    <th className="px-5 py-3 font-semibold">Upload Date</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Abnormal Values</th>
                    <th className="px-5 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="border-t border-border transition-colors hover:bg-surface">
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.type}</p>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{r.date}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-5 py-4">
                        {r.abnormal > 0 ? (
                          <span className="font-medium text-danger">{r.abnormal} abnormal</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to="/reports/$reportId"
                          params={{ reportId: r.id }}
                          className="text-sm font-medium text-accent hover:underline"
                        >
                          View Report
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          ArogyaDrishti is an informational report-analysis tool. It does not provide medical diagnosis or
          replace professional medical advice.
        </p>
      </div>
    </AppLayout>
  );
}
