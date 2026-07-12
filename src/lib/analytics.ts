export type ConversionEventName =
  | "whatsapp_click"
  | "phone_click"
  | "booking_form_start"
  | "booking_form_submit";

export interface ConversionEventContext {
  placement: string;
  formId?: string;
  route?: string;
}

export interface ConversionDataLayerEvent {
  event: ConversionEventName;
  route: string;
  placement: string;
  form_id?: string;
}

declare global {
  interface Window {
    dataLayer?: ConversionDataLayerEvent[];
  }
}

const safeToken = (value: string, fallback: string) => {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "");
  return normalized.slice(0, 64) || fallback;
};

const currentRoute = () => {
  if (typeof window === "undefined") return "/";
  try {
    return decodeURI(window.location.pathname) || "/";
  } catch {
    return window.location.pathname || "/";
  }
};

export const trackConversionEvent = (event: ConversionEventName, context: ConversionEventContext) => {
  if (typeof window === "undefined") return;
  const payload: ConversionDataLayerEvent = {
    event,
    route: context.route ?? currentRoute(),
    placement: safeToken(context.placement, "content"),
    ...(context.formId ? { form_id: safeToken(context.formId, "booking_form") } : {}),
  };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
};

const placementForAnchor = (anchor: HTMLAnchorElement) =>
  anchor.dataset.analyticsPlacement ??
  anchor.closest<HTMLElement>("[data-analytics-region]")?.dataset.analyticsRegion ??
  "content";

export const trackAnchorConversion = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) {
    trackConversionEvent("phone_click", { placement: placementForAnchor(anchor) });
    return;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "https:" && url.hostname === "wa.me") {
      trackConversionEvent("whatsapp_click", { placement: placementForAnchor(anchor) });
    }
  } catch {
    // Non-URL anchors are outside this conversion contract.
  }
};
