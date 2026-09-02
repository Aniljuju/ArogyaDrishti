// API layer prepared for a future Django REST Framework backend.
// Nothing here talks to a real server yet — every call resolves with mock data.

import { reports, reportResult } from "../data/mockReports";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:8000/api";

const USE_MOCK = true;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options = {}) {
  // Future Django integration point:
  // const res = await fetch(`${API_BASE_URL}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
  // if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  // return res.json();
  throw new Error(`Live API not enabled yet (${API_BASE_URL}${path})`);
}

/** POST /reports/upload/ */
export async function uploadReport(file) {
  if (USE_MOCK) {
    await delay(600);
    return {
      id: reportResult.id,
      filename: file?.name ?? "report.pdf",
      size: file?.size ?? 0,
      status: "queued",
    };
  }
  const body = new FormData();
  body.append("file", file);
  return request("/reports/upload/", { method: "POST", body });
}

/** GET /reports/ */
export async function getReports() {
  if (USE_MOCK) {
    await delay(300);
    return reports;
  }
  return request("/reports/");
}

/** GET /reports/:id/ */
export async function getReport(id) {
  if (USE_MOCK) {
    await delay(300);
    return reports.find((r) => r.id === id) ?? reports[0];
  }
  return request(`/reports/${id}/`);
}

/** GET /reports/:id/results/ */
export async function getReportResults(id) {
  if (USE_MOCK) {
    await delay(300);
    const meta = reports.find((r) => r.id === id);
    return meta ? { ...reportResult, id: meta.id, title: meta.title, type: meta.type, date: meta.date } : reportResult;
  }
  return request(`/reports/${id}/results/`);
}

export default { API_BASE_URL, uploadReport, getReports, getReport, getReportResults };
