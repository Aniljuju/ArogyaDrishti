import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ReportView from "../components/reports/ReportView";
import { reportResult, reports } from "../data/mockReports";

export const Route = createFileRoute("/reports/$reportId")({
  head: () => ({
    meta: [
      { title: "Report Details — ArogyaDrishti" },
      { name: "description", content: "Full details of an analyzed medical report." },
      { property: "og:title", content: "Report Details — ArogyaDrishti" },
      { property: "og:description", content: "Metadata, findings, lab values and explanation for one report." },
    ],
  }),
  component: ReportDetails,
});

function ReportDetails() {
  const { reportId } = Route.useParams();
  const meta = reports.find((r) => r.id === reportId);
  const report = meta
    ? { ...reportResult, id: meta.id, title: meta.title, type: meta.type, date: meta.date }
    : reportResult;

  return (
    <AppLayout title={report.title} subtitle={`Report ID ${report.id} · ${report.type}`}>
      <div className="space-y-6">
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Back to My Reports
        </Link>
        <ReportView report={report} showFindings />
      </div>
    </AppLayout>
  );
}
