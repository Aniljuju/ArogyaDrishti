import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, FileText } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { Card, StatusBadge, cx, ButtonLink } from "../components/ui/Primitives";
import { reports } from "../data/mockReports";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "My Reports — ArogyaDrishti" },
      { name: "description", content: "Browse and filter every medical report you have analyzed." },
      { property: "og:title", content: "My Reports — ArogyaDrishti" },
      { property: "og:description", content: "Full history of analyzed medical reports." },
    ],
  }),
  component: ReportHistory,
});

const filters = ["All", "Completed", "Processing", "Abnormal"];

function ReportHistory() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      reports.filter((r) => {
        const matchesFilter =
          filter === "All" ||
          (filter === "Abnormal" ? r.abnormal > 0 : r.status === filter);
        const matchesQuery =
          !query ||
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [filter, query],
  );

  return (
    <AppLayout title="My Reports" subtitle="History of analyzed reports">
      <div className="space-y-6 rise-in">
        <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cx(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 sm:max-w-xs">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Report</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Abnormal Values</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border transition-colors hover:bg-surface">
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <FileText className="size-4" />
                        </span>
                        <span className="font-medium text-foreground">{r.title}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.type}</td>
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
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center text-sm text-muted-foreground">
                      No reports match this filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex justify-center">
          <ButtonLink to="/upload" variant="outline">
            Analyze New Report
          </ButtonLink>
        </div>
      </div>
    </AppLayout>
  );
}
