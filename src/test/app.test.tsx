import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("application baseline", () => {
  it("renders the Arabic homepage and its primary contact actions", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /تأجير يخوت فاخرة في دبي/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /احجز يختك الآن/ })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/971504641020"),
    );
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === "tel:+971504641020")).toBe(true);
  });
});
