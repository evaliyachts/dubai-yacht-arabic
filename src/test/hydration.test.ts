import { shouldHydrateRoot } from "@/lib/hydration";

describe("hydration detection", () => {
  it("uses createRoot for an empty root", () => {
    const root = document.createElement("div");

    expect(shouldHydrateRoot(root)).toBe(false);
  });

  it("uses createRoot for a comment-only development template root", () => {
    const root = document.createElement("div");
    root.append(document.createComment("app-html"));

    expect(root.hasChildNodes()).toBe(true);
    expect(shouldHydrateRoot(root)).toBe(false);
  });

  it("uses hydrateRoot for prerendered element markup", () => {
    const root = document.createElement("div");
    root.innerHTML = "<main><h1>يخوت دبي</h1></main>";

    expect(shouldHydrateRoot(root)).toBe(true);
  });
});
