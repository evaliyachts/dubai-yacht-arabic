import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { canonicalUrlForPath, INDEXABLE_ROUTE_RECORDS } from "@/seo/route-manifest";

const report = readFileSync(resolve("docs/ENGLISH_HREFLANG_CHANGES.md"), "utf8");
const reportRows = [...report.matchAll(/^\| `([^`]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)].map((match) => ({
  arabicCanonical: match[1],
  englishCell: match[2].trim(),
  status: match[3].trim(),
  reciprocal: match[4].trim(),
}));

describe("committed English-equivalent audit", () => {
  it("accounts for every indexable Arabic canonical exactly once", () => {
    const expected = INDEXABLE_ROUTE_RECORDS.map((route) => decodeURI(canonicalUrlForPath(route.path)));
    expect(reportRows).toHaveLength(INDEXABLE_ROUTE_RECORDS.length);
    expect(new Set(reportRows.map((row) => row.arabicCanonical))).toEqual(new Set(expected));
  });

  it("stores only exact verified English canonicals and does not normalize slash form", () => {
    const mappedRoutes = INDEXABLE_ROUTE_RECORDS.filter((route) => route.englishEquivalent);
    const mappedRows = reportRows.filter((row) => row.englishCell !== "—");

    expect(mappedRoutes).toEqual([
      expect.objectContaining({ path: "/", englishEquivalent: "https://yachtrentaldxb.com/" }),
    ]);
    expect(mappedRows).toEqual([
      expect.objectContaining({
        arabicCanonical: "https://yacht-dxb.com/",
        englishCell: "`https://yachtrentaldxb.com/`",
        status: expect.stringContaining("Verified"),
      }),
    ]);

    for (const route of mappedRoutes) {
      const url = new URL(route.englishEquivalent!);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("yachtrentaldxb.com");
      expect(mappedRows.some((row) => row.englishCell === `\`${route.englishEquivalent}\``)).toBe(true);
    }
  });

  it("leaves all unverified routes explicitly unmapped", () => {
    const unmappedRows = reportRows.filter((row) => row.englishCell === "—");
    expect(unmappedRows).toHaveLength(57);
    for (const row of unmappedRows) {
      expect(row.status).toMatch(/Unmapped/);
      expect(row.reciprocal).toBe("None");
    }
  });

  it("documents future reciprocal tags without enabling x-default", () => {
    expect(report).toContain('hreflang="ar-AE" href="https://yacht-dxb.com/"');
    expect(report).toContain('hreflang="en" href="https://yachtrentaldxb.com/"');
    expect(report).toContain("Do not add `x-default`");
  });
});
