import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../components/layout/AppLayout";
import { Card, Button } from "../components/ui/Primitives";
import { patient } from "../data/mockReports";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — ArogyaDrishti" },
      { name: "description", content: "Your ArogyaDrishti account details and patient information." },
      { property: "og:title", content: "Profile — ArogyaDrishti" },
      { property: "og:description", content: "Account and patient details used on report summaries." },
    ],
  }),
  component: Profile,
});

const fields = [
  { label: "Full Name", value: patient.name },
  { label: "Age", value: patient.age },
  { label: "Gender", value: patient.gender },
  { label: "Email", value: "john.doe@example.com" },
  { label: "Phone", value: "+977 98XXXXXXXX" },
  { label: "Preferred Language", value: "English" },
];

function Profile() {
  return (
    <AppLayout title="Profile" subtitle="Details shown on your report summaries">
      <div className="mx-auto max-w-3xl space-y-6 rise-in">
        <Card className="flex flex-wrap items-center gap-5 p-6">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-primary-soft text-xl font-semibold text-secondary-foreground">
            JD
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">Patient account · 12 reports analyzed</p>
          </div>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="rounded-lg bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="mt-0.5 font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
