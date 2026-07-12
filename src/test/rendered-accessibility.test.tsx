import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { vi } from "vitest";
import App from "@/App";

const routes = [
  ["homepage", "/"],
  ["contact", "/contact/"],
  ["services index", "/الخدمات/"],
  ["event page", "/عيد-ميلاد-على-يخت-في-دبي/"],
  ["yacht catalogue", "/yachts/"],
  ["yacht detail", "/yachts/رحلة-يخت-50-قدم-رويال-ماجستي/"],
  ["404", "/مسار-غير-موجود/"],
] as const;

describe("rendered route accessibility", () => {
  it.each(routes)("has no detectable WCAG A/AA violations on the %s", async (_name, route) => {
    const expected404Log = route === "/مسار-غير-موجود/" ? vi.spyOn(console, "error").mockImplementation(() => undefined) : undefined;
    window.history.pushState({}, "", route);
    render(<App />);
    await screen.findByRole("main");

    const results = await axe.run(document.body, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        targets: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    expected404Log?.mockRestore();
  }, 20_000);
});
