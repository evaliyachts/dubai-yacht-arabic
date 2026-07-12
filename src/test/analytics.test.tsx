import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import App from "@/App";
import ConversionTracking from "@/components/shared/ConversionTracking";
import { trackConversionEvent } from "@/lib/analytics";

describe("privacy-safe conversion analytics", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.history.pushState({}, "", "/contact/");
  });

  it("pushes only allowlisted route, placement, and form identifier fields", () => {
    trackConversionEvent("booking_form_start", {
      placement: "Contact Form",
      formId: "booking_contact",
      route: "/contact/",
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

  it("fires form start once and form submit only after valid required fields", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<App />);

    const form = document.querySelector<HTMLFormElement>("#booking-contact")!;
    fireEvent.submit(form);
    expect(window.dataLayer).toEqual([]);

    fireEvent.change(screen.getByLabelText("الاسم *"), { target: { value: "اسم شخصي لا يرسل للتحليلات" } });
    fireEvent.change(screen.getByLabelText("رقم الهاتف *"), { target: { value: "+971500000000" } });
    fireEvent.change(screen.getByLabelText("ملاحظات إضافية"), { target: { value: "رسالة شخصية" } });

    expect(window.dataLayer?.filter((event) => event.event === "booking_form_start")).toHaveLength(1);
    fireEvent.submit(form);

    await waitFor(() => expect(open).toHaveBeenCalledOnce());
    expect(window.dataLayer?.map((event) => event.event)).toEqual([
      "booking_form_start",
      "booking_form_submit",
      "whatsapp_click",
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/اسم شخصي|971500000000|رسالة شخصية/);
    expect(screen.getByText("تم فتح واتساب. راجع تفاصيل الرسالة ثم أرسلها لإكمال الاستفسار.")).toBeInTheDocument();
    open.mockRestore();
  });
});
