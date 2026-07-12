import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("application baseline", () => {
  it("renders the Arabic homepage and its primary contact actions", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /تأجير يخت خاص في دبي مع يخوت دبي/,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /أرسل تفاصيل الرحلة/ })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/971504641020"),
    );
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === "tel:+971504641020")).toBe(true);
  });
});
