import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import App from "@/App";
import ConversionTracking from "@/components/shared/ConversionTracking";
import { isAnalyticsEnabled, trackConversionEvent } from "@/lib/analytics";

const VALID_MEASUREMENT_ID = "G-TEST123456";

const completeRequiredFields = () => {
  fireEvent.change(screen.getByLabelText("الاسم *"), { target: { value: "اسم شخصي لا يرسل للتحليلات" } });
  fireEvent.change(screen.getByLabelText("رقم الهاتف *"), { target: { value: "+971500000000" } });
  fireEvent.change(screen.getByLabelText("ملاحظات إضافية"), { target: { value: "رسالة شخصية" } });
};

describe("privacy-safe conversion analytics", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", VALID_MEASUREMENT_ID);
    delete window.dataLayer;
    window.history.pushState({}, "", "/contact/");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    delete window.dataLayer;
  });

  it("enables only valid GA4 measurement IDs and creates no queue while disabled", () => {
    expect(isAnalyticsEnabled()).toBe(true);
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "UA-invalid");
    expect(isAnalyticsEnabled()).toBe(false);

    trackConversionEvent("booking_form_start", { placement: "contact_form" });
    expect(window.dataLayer).toBeUndefined();

    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    trackConversionEvent("phone_click", { placement: "header" });
    expect(window.dataLayer).toBeUndefined();
  });

  it("pushes only allowlisted route, placement, and form identifier fields when enabled", () => {
    trackConversionEvent("booking_form_start", {
      placement: "Contact Form",
      formId: "booking_contact",
      route: "/contact/?message=private",
      name: "Must not escape",
      phone: "+971500000000",
    } as never);

    expect(window.dataLayer).toEqual([
      {
        event: "booking_form_start",
        route: "/contact/",
        placement: "contact_form",
        form_id: "booking_contact",
      },
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/Must not escape|971500000000|name|phone|message/);
  });

  it("tracks WhatsApp and phone anchor clicks by non-personal placement", () => {
    render(
      <div data-analytics-region="footer">
        <ConversionTracking />
        <a href="https://wa.me/971504641020?text=private-message" onClick={(event) => event.preventDefault()}><span>واتساب</span></a>
        <a href="tel:+971504641020" data-analytics-placement="footer_phone" onClick={(event) => event.preventDefault()}>الهاتف</a>
      </div>,
    );

    fireEvent.click(screen.getByText("واتساب"));
    fireEvent.click(screen.getByText("الهاتف"));
    expect(window.dataLayer).toEqual([
      { event: "whatsapp_click", route: "/contact/", placement: "footer" },
      { event: "phone_click", route: "/contact/", placement: "footer_phone" },
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toContain("private-message");
  });

  it("records a valid submit and WhatsApp click only after a successful named-window open", async () => {
    const replace = vi.fn();
    const popup = { opener: window, location: { replace }, close: vi.fn() } as unknown as Window;
    const open = vi.spyOn(window, "open").mockReturnValue(popup);
    render(<App />);

    const form = document.querySelector<HTMLFormElement>("#booking-contact")!;
    fireEvent.submit(form);
    expect(window.dataLayer).toBeUndefined();

    completeRequiredFields();
    fireEvent.submit(form);

    await waitFor(() => expect(open).toHaveBeenCalledOnce());
    expect(open).toHaveBeenCalledWith("about:blank", expect.stringMatching(/^yacht_dxb_whatsapp_/));
    expect(popup.opener).toBeNull();
    expect(replace).toHaveBeenCalledWith(expect.stringContaining("https://wa.me/971504641020?text="));
    expect(window.dataLayer?.map((event) => event.event)).toEqual([
      "booking_form_start",
      "booking_form_submit",
      "whatsapp_click",
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/اسم شخصي|971500000000|رسالة شخصية/);
    expect(screen.getByText("تم فتح نافذة واتساب. راجع تفاصيل الرسالة ثم أرسلها لإكمال الاستفسار.")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "افتح رسالة واتساب الجاهزة" })).not.toBeInTheDocument();
  });

  it("announces a blocked popup, focuses the prepared fallback, and waits for its real click", async () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<App />);

    completeRequiredFields();
    fireEvent.submit(document.querySelector<HTMLFormElement>("#booking-contact")!);

    const status = await waitFor(() => document.querySelector<HTMLElement>("#booking-form-status")!);
    expect(within(status).getByText("تعذر فتح واتساب تلقائياً. استخدم رابط واتساب أدناه لإكمال الاستفسار.")).toBeInTheDocument();
    expect(status).not.toHaveTextContent("تم فتح");
    const fallback = within(status).getByRole("link", { name: "افتح رسالة واتساب الجاهزة" });
    await waitFor(() => expect(fallback).toHaveFocus());
    const prepared = new URL(fallback.getAttribute("href")!);
    expect(prepared.hostname).toBe("wa.me");
    expect(prepared.searchParams.get("text")).toContain("اسم شخصي لا يرسل للتحليلات");
    expect(window.dataLayer?.map((event) => event.event)).toEqual([
      "booking_form_start",
      "booking_form_submit",
    ]);

    fallback.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(fallback);
    expect(window.dataLayer?.map((event) => event.event)).toEqual([
      "booking_form_start",
      "booking_form_submit",
      "whatsapp_click",
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/اسم شخصي|971500000000|رسالة شخصية/);
  });
});
