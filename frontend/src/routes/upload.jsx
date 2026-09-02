import { useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UploadCloud, FileText, X, ShieldCheck, Info } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { Card, Button, cx } from "../components/ui/Primitives";
import { uploadReport } from "../services/api";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Report — ArogyaDrishti" },
      { name: "description", content: "Upload a PDF or image of your medical report for analysis." },
      { property: "og:title", content: "Upload Report — ArogyaDrishti" },
      { property: "og:description", content: "Drag and drop a PDF or image of your medical report." },
    ],
  }),
  component: UploadReport,
});

function formatSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function UploadReport() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const accept = ["application/pdf", "image/png", "image/jpeg"];

  const pick = (selected) => {
    if (!selected) return;
    if (!accept.includes(selected.type)) {
      setError("Unsupported file type. Please choose a PDF, PNG, JPG or JPEG file.");
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError("File is larger than the 10 MB limit.");
      return;
    }
    setError("");
    setFile(selected);
  };

  const analyze = async () => {
    if (!file) return;
    setBusy(true);
    await uploadReport(file);
    navigate({ to: "/processing", search: { name: file.name } });
  };

  return (
    <AppLayout title="Upload Report" subtitle="Add a medical report to analyze">
      <div className="mx-auto max-w-3xl space-y-6 rise-in">
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">Upload Your Medical Report</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            CBC, biochemistry, imaging, ECG, prescriptions and discharge summaries are supported.
          </p>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pick(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={cx(
              "mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors",
              dragging ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-accent",
            )}
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-card text-accent shadow-card">
              <UploadCloud className="size-6" />
            </span>
            <p className="mt-4 font-medium text-foreground">Drag and drop your PDF or image here</p>
            <p className="mt-1 text-sm text-muted-foreground">or</p>
            <span className="mt-3 inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground">
              Browse Files
            </span>
            <p className="mt-4 text-xs text-muted-foreground">
              Supported: PDF, PNG, JPG, JPEG &middot; Maximum file size: 10 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => pick(e.target.files?.[0])}
            />
          </div>

          {error ? (
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
              <Info className="size-4" />
              {error}
            </p>
          ) : null}

          {file ? (
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-border bg-card p-4 rise-in">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={() => setFile(null)}
                aria-label="Remove file"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-danger"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" />
              Your report is processed securely.
            </p>
            <Button size="lg" disabled={!file || busy} onClick={analyze}>
              {busy ? "Preparing…" : "Analyze Report"}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground">Tips for better extraction</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>• Use the original PDF whenever it is available.</li>
            <li>• Photograph the full page in even lighting.</li>
            <li>• Make sure reference ranges are visible.</li>
            <li>• Upload one report per file.</li>
          </ul>
        </Card>
      </div>
    </AppLayout>
  );
}
