import { render, screen } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("@/components/shared/ConversionTracking", () => ({
  default: () => <div data-testid="conversion-tracking-mounted" />,
}));

import { AppRoutes } from "@/App";
import { AppProviders } from "@/App";
import { MemoryRouter } from "react-router-dom";

describe("analytics listener enablement", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("does not mount conversion tracking without an approved measurement ID", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "invalid");
    render(
      <AppProviders>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppRoutes /></MemoryRouter>
      </AppProviders>,
    );
    expect(screen.queryByTestId("conversion-tracking-mounted")).not.toBeInTheDocument();
  });

  it("mounts conversion tracking with a valid approved measurement ID", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST123456");
    render(
      <AppProviders>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppRoutes /></MemoryRouter>
      </AppProviders>,
    );
    expect(screen.getByTestId("conversion-tracking-mounted")).toBeInTheDocument();
  });
});
