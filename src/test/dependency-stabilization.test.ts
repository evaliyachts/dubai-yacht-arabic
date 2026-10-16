import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");
const manifest = JSON.parse(read("package.json"));
const lock = JSON.parse(read("package-lock.json"));

describe("Arabic dependency security boundaries", () => {
  it("pins the patched router and uses its supported declarative exports", () => {
    expect(manifest.dependencies["react-router-dom"]).toBe("7.18.4");
    expect(lock.packages["node_modules/react-router"].version).toBe("7.18.4");
    expect(read("src/entry-server.tsx")).toContain('import { StaticRouter } from "react-router-dom"');
    expect(read("src/entry-server.tsx")).not.toContain("react-router-dom/server");
    expect(read("src/App.tsx")).not.toContain("v7_startTransition");
  });

  it("keeps the Tailwind configuration plugin out of the production dependency tree", () => {
    expect(manifest.dependencies["tailwindcss-animate"]).toBeUndefined();
    expect(manifest.devDependencies["tailwindcss-animate"]).toBe("1.0.7");
    expect(lock.packages["node_modules/tailwindcss-animate"].dev).toBe(true);
    expect(lock.packages["node_modules/tailwindcss"].dev).toBe(true);
    expect(read("tailwind.config.ts")).toContain("tailwindcss-animate");
  });

  it("pins patched tooling and removes the vulnerable test worker without overrides", () => {
    expect(manifest.devDependencies.vite).toBe("7.3.7");
    expect(manifest.devDependencies.vitest).toBe("4.1.11");
    expect(Object.keys(lock.packages).some((path) => path.endsWith("/tinypool"))).toBe(false);
    expect(manifest.overrides).toBeUndefined();
  });

  it("preserves browser compatibility, source-map exclusion and the production audit gate", () => {
    expect(read("vite.config.ts")).toContain('["es2020", "edge88", "firefox78", "chrome87", "safari14"]');
    expect(read("vite.config.ts")).toContain("sourcemap: false");
    expect(read(".github/workflows/quality.yml")).toContain("npm audit --omit=dev");
    expect(manifest.scripts.typecheck).toBe("tsc -p tsconfig.app.json --noEmit && tsc -p tsconfig.node.json --noEmit");
  });
});
