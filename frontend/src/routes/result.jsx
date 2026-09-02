import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../components/layout/AppLayout";
import ReportView from "../components/reports/ReportView";
import { reportResult } from "../data/mockReports";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Report Result — ArogyaDrishti" },
      { name: "description", content: "Structured lab results, abnormal values and a simple explanation." },
      { property: "og:title", content: "Report Result — ArogyaDrishti" },
      { property: "og:description", content: "Patient-friendly breakdown of your analyzed medical report." },
    ],
  }),
  component: ReportResult,
});

function ReportResult() {
  return (
    <AppLayout title="Report Result" subtitle="Blood Test Report — Analysis Complete">
      <ReportView report={reportResult} />
    </AppLayout>
  );
}
