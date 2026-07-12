import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("runtime configuration", () => {
  it("pins Node and npm consistently", () => {
    const packageJson = JSON.parse(readFileSync(resolve("package.json"), "utf8"));
    const nvmrc = readFileSync(resolve(".nvmrc"), "utf8").trim();
    const netlifyConfig = readFileSync(resolve("netlify.toml"), "utf8");

    expect(nvmrc).toBe("24.18.0");
    expect(packageJson.engines.node).toBe(">=24.18.0 <25");
    expect(packageJson.packageManager).toBe("npm@11.16.0");
    expect(netlifyConfig).toContain('NODE_VERSION = "24.18.0"');
    expect(netlifyConfig).toContain('NPM_VERSION = "11.16.0"');
  });
});
