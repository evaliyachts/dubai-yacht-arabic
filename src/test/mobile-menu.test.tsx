import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { vi } from "vitest";

describe("mobile navigation keyboard behavior", () => {
  it("traps tab focus, isolates the background, locks scrolling, and restores trigger focus on Escape", async () => {
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();
    const { container } = render(<App />);
    const trigger = screen.getByRole("button", { name: "فتح القائمة" });

    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "قائمة التنقل عبر الهاتف" });
    const close = within(dialog).getByRole("button", { name: "إغلاق القائمة" });
    await waitFor(() => expect(close).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(screen.getByRole("main", { hidden: true }).closest('[aria-hidden="true"]')).not.toBeNull());
    expect(document.body).toHaveAttribute("data-scroll-locked", "1");

    await user.tab({ shift: true });
    expect(within(dialog).getByRole("link", { name: /اتصل الآن/ })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "قائمة التنقل عبر الهاتف" })).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(container).not.toHaveAttribute("aria-hidden");
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
  });

  it("closes cleanly after keyboard route selection", async () => {
    window.history.pushState({}, "", "/");
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "فتح القائمة" }));
    const dialog = await screen.findByRole("dialog", { name: "قائمة التنقل عبر الهاتف" });
    const yachtLink = within(dialog).getByRole("link", { name: "اليخوت" });
    yachtLink.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => expect(screen.queryByRole("dialog", { name: "قائمة التنقل عبر الهاتف" })).not.toBeInTheDocument());
    expect(decodeURI(window.location.pathname)).toBe("/yachts/");
    expect(screen.getByRole("button", { name: "فتح القائمة" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes and releases isolation when resizing across the desktop breakpoint", async () => {
    let desktopListener: ((event: MediaQueryListEvent) => void) | undefined;
    const originalMatchMedia = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: (_type, listener) => {
        if (query === "(min-width: 1024px)") desktopListener = listener as (event: MediaQueryListEvent) => void;
      },
      removeEventListener: () => undefined,
      dispatchEvent: () => true,
    }));
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "فتح القائمة" }));
    expect(await screen.findByRole("dialog", { name: "قائمة التنقل عبر الهاتف" })).toBeInTheDocument();
    act(() => desktopListener?.({ matches: true } as MediaQueryListEvent));

    await waitFor(() => expect(screen.queryByRole("dialog", { name: "قائمة التنقل عبر الهاتف" })).not.toBeInTheDocument());
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
    window.matchMedia = originalMatchMedia;
  });
});
