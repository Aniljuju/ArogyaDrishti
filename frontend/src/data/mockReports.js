// Mock data used by the frontend prototype. Replace with Django REST responses later.

export const summaryStats = {
  totalReports: 12,
  analyzed: 10,
  normalResults: 7,
  abnormalValues: 3,
};

export const labResults = [
  { test: "Hemoglobin", value: "10.4", unit: "g/dL", range: "13–17", status: "LOW" },
  { test: "WBC", value: "12500", unit: "/µL", range: "4000–11000", status: "HIGH" },
  { test: "Platelets", value: "250000", unit: "/µL", range: "150000–450000", status: "NORMAL" },
  { test: "RBC", value: "4.8", unit: "million/µL", range: "4.5–5.5", status: "NORMAL" },
  { test: "Hematocrit", value: "41.2", unit: "%", range: "40–50", status: "NORMAL" },
  { test: "MCV", value: "84.5", unit: "fL", range: "80–100", status: "NORMAL" },
  { test: "MCH", value: "27.1", unit: "pg", range: "27–33", status: "NORMAL" },
  { test: "MCHC", value: "31.8", unit: "g/dL", range: "32–36", status: "LOW" },
  { test: "Neutrophils", value: "62", unit: "%", range: "40–70", status: "NORMAL" },
  { test: "Lymphocytes", value: "28", unit: "%", range: "20–40", status: "NORMAL" },
  { test: "Eosinophils", value: "2", unit: "%", range: "1–6", status: "NORMAL" },
  { test: "ESR", value: "9", unit: "mm/hr", range: "0–15", status: "NORMAL" },
];

export const abnormalValues = labResults.filter((r) => r.status !== "NORMAL");

export const patient = {
  name: "John Doe",
  age: "32",
  gender: "Male",
  reportDate: "28 Aug 2026",
};

export const clinicalSummary =
  "Most reported values are within the reference ranges. A few values are outside the provided reference ranges and may require discussion with a qualified healthcare professional.";

export const aiExplanation = {
  intro:
    "Your report contains mostly values within the provided reference ranges. Hemoglobin is below the stated reference range, while WBC is above the stated range.",
  meaning: [
    "Hemoglobin carries oxygen around the body. The reported value is lower than the range printed on your report.",
    "White blood cells (WBC) are part of the body's defence system. The reported value is higher than the range printed on your report.",
    "All other reported values fall inside the ranges printed on the same report.",
  ],
  disclaimer:
    "This explanation is generated from information contained in the uploaded report and is not a medical diagnosis.",
};

export const medications = [
  {
    name: "Ferrous Ascorbate",
    dosage: "100 mg",
    frequency: "Once daily",
    instructions: "After breakfast, as printed on the prescription",
  },
  {
    name: "Folic Acid",
    dosage: "5 mg",
    frequency: "Once daily",
    instructions: "With water, after a meal",
  },
  {
    name: "Paracetamol",
    dosage: "500 mg",
    frequency: "As needed",
    instructions: "Only if fever is noted, maximum 3 times a day",
  },
];

export const recommendations = [
  "Discuss abnormal results with a qualified healthcare professional.",
  "Bring the original report when consulting your healthcare provider.",
  "Keep previous reports available so trends can be compared.",
  "Follow any instructions already written on the report by the issuing laboratory.",
];

export const confidence = [
  { label: "OCR Confidence", value: 94 },
  { label: "Extraction Confidence", value: 91 },
  { label: "Classification Confidence", value: 96 },
];

export const reports = [
  {
    id: "rpt-1024",
    title: "CBC Report",
    type: "CBC",
    date: "28 Aug 2026",
    status: "Completed",
    abnormal: 2,
  },
  {
    id: "rpt-1023",
    title: "Biochemistry Report",
    type: "Biochemistry",
    date: "22 Aug 2026",
    status: "Completed",
    abnormal: 1,
  },
  {
    id: "rpt-1022",
    title: "MRI Report",
    type: "MRI",
    date: "15 Aug 2026",
    status: "Completed",
    abnormal: 0,
  },
  {
    id: "rpt-1021",
    title: "Chest X-Ray Report",
    type: "X-Ray",
    date: "09 Aug 2026",
    status: "Completed",
    abnormal: 0,
  },
  {
    id: "rpt-1020",
    title: "ECG Report",
    type: "ECG",
    date: "02 Aug 2026",
    status: "Completed",
    abnormal: 0,
  },
  {
    id: "rpt-1019",
    title: "Discharge Summary",
    type: "Discharge Summary",
    date: "27 Jul 2026",
    status: "Processing",
    abnormal: 0,
  },
  {
    id: "rpt-1018",
    title: "Prescription",
    type: "Prescription",
    date: "18 Jul 2026",
    status: "Completed",
    abnormal: 0,
  },
];

export const reportResult = {
  id: "rpt-1024",
  title: "Blood Test Report",
  type: "CBC",
  status: "Analysis Complete",
  date: "28 Aug 2026",
  totals: { total: 12, normal: 8, low: 3, high: 1 },
  patient,
  clinicalSummary,
  labResults,
  abnormalValues,
  aiExplanation,
  medications,
  recommendations,
  confidence,
  findings: [
    "Report identified as a Complete Blood Count (CBC) panel issued by a diagnostic laboratory.",
    "12 measurable parameters were extracted along with their units and reference ranges.",
    "3 parameters fall below and 1 parameter falls above the ranges printed on the report.",
    "A prescription block containing 3 medications was detected on the second page.",
  ],
};

export const processingSteps = [
  "Upload",
  "File Validation",
  "Text Extraction",
  "OCR",
  "Report Classification",
  "Information Extraction",
  "Validation",
  "AI Explanation",
];
