import { useRef, useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getWhatsAppLink, getPhoneLink, PHONE_DISPLAY } from "@/lib/constants";
import { MessageCircle, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { yachts } from "@/data/yachts";
import { requireRouteRecord } from "@/seo/route-manifest";
import { breadcrumbEntity, contactPointEntity, organizationEntity } from "@/seo/entities";
import { trackConversionEvent } from "@/lib/analytics";

const route = requireRouteRecord("/contact/");

const OCCASIONS = [
  "عيد ميلاد", "خطوبة", "طلب زواج", "زفاف", "ذكرى زواج",
  "تخرج", "تحديد جنس المولود", "وداع عزوبية", "حفلة عائلية",
  "شواء BBQ", "عشاء رومانسي", "رحلة صباحية", "صيد", "أخرى",
];

const Contact = () => {
  const { toast } = useToast();
  const [honeypot, setHoneypot] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const hasStarted = useRef(false);
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", guests: "",
    occasion: "", yacht: "", notes: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    trackConversionEvent("booking_form_submit", { placement: "contact_form", formId: "booking_contact" });
    trackConversionEvent("whatsapp_click", { placement: "contact_form_submit", formId: "booking_contact" });
    const msg = `استفسار جديد:
الاسم: ${form.name}
الهاتف: ${form.phone}
التاريخ: ${form.date}
وقت الرحلة: ${form.time}
عدد الضيوف: ${form.guests}
نوع المناسبة: ${form.occasion}
اختيار اليخت: ${form.yacht}
ملاحظات: ${form.notes}`;
    window.open(getWhatsAppLink(msg), "_blank", "noopener,noreferrer");
    setFormStatus("تم فتح واتساب. راجع تفاصيل الرسالة ثم أرسلها لإكمال الاستفسار.");
    toast({ title: "تم فتح واتساب", description: "راجع تفاصيل الرسالة ثم أرسلها لإكمال الاستفسار." });
  };

  const handleFormStart = (target: EventTarget | null) => {
    if (hasStarted.current || !(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    if (target.name === "website") return;
    hasStarted.current = true;
    trackConversionEvent("booking_form_start", { placement: "contact_form", formId: "booking_contact" });
  };

  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-sm backdrop-blur-sm text-right";
  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  return (
    <Layout>
      <SEOHead route={route} jsonLd={[organizationEntity(), contactPointEntity(), breadcrumbEntity(route)]} />

      <div className="pt-28 pb-20" dir="rtl">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="liquid-pill inline-block mb-4">تواصل معنا</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              {route.h1}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              املأ التفاصيل لفتح رسالة واتساب جاهزة للمراجعة، أو تواصل معنا مباشرة عبر الهاتف.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <form
                  id="booking-contact"
                  onSubmit={handleSubmit}
                  onChangeCapture={(event) => handleFormStart(event.target)}
                  className="liquid-glass-gold p-6 md:p-8 space-y-4"
                  aria-describedby="booking-form-guidance booking-form-status"
                >
                  <p id="booking-form-guidance" className="text-sm text-muted-foreground">
                    الحقول المعلّمة بنجمة مطلوبة. إرسال النموذج يفتح رسالة واتساب لمراجعتها قبل الإرسال.
                  </p>
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-name" className={labelClass}>الاسم *</label>
                      <input id="booking-name" name="name" required autoComplete="name" placeholder="اكتب الاسم" value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className={labelClass}>رقم الهاتف *</label>
                      <input id="booking-phone" name="phone" required type="tel" autoComplete="tel" inputMode="tel" placeholder="مثال: +971 50 000 0000" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-date" className={labelClass}>تاريخ الرحلة المطلوب</label>
                      <input id="booking-date" name="date" type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="booking-time" className={labelClass}>وقت الرحلة المطلوب</label>
                      <input id="booking-time" name="time" type="time" value={form.time} onChange={(e) => updateField("time", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-guests" className={labelClass}>عدد الضيوف</label>
                      <input id="booking-guests" name="guests" type="number" inputMode="numeric" min="1" placeholder="أدخل العدد الإجمالي" value={form.guests} onChange={(e) => updateField("guests", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="booking-occasion" className={labelClass}>نوع المناسبة</label>
                      <select id="booking-occasion" name="occasion" value={form.occasion} onChange={(e) => updateField("occasion", e.target.value)} className={inputClass}>
                        <option value="">بدون مناسبة محددة</option>
                        {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-yacht" className={labelClass}>اليخت المفضل</label>
                    <select id="booking-yacht" name="yacht" value={form.yacht} onChange={(e) => updateField("yacht", e.target.value)} className={inputClass}>
                      <option value="">لم أحدد يختاً بعد</option>
                      {yachts.map((y) => (
                        <option key={y.slug} value={y.name}>{y.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="booking-notes" className={labelClass}>ملاحظات إضافية</label>
                    <textarea id="booking-notes" name="notes" rows={4} placeholder="طلبات تحتاج إلى تأكيد أو معلومات أخرى" value={form.notes} onChange={(e) => updateField("notes", e.target.value)} className={inputClass} />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 liquid-btn-primary text-base">
                    <Send className="w-4 h-4" /> أرسل الاستفسار عبر واتساب
                  </button>
                  <p id="booking-form-status" role="status" aria-live="polite" className="min-h-6 text-sm text-muted-foreground">
                    {formStatus}
                  </p>
                </form>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2} className="space-y-4">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" data-analytics-placement="contact_sidebar" className="liquid-glass p-5 flex items-center gap-4 hover:border-green-500/20 transition-colors block">
                <div className="w-10 h-10 liquid-btn rounded-xl flex items-center justify-center shrink-0 text-green-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">واتساب</p>
                  <p className="text-xs text-muted-foreground">إرسال تفاصيل الاستفسار</p>
                </div>
              </a>
              <a href={getPhoneLink()} data-analytics-placement="contact_sidebar" className="liquid-glass p-5 flex items-center gap-4 hover:border-primary/20 transition-colors block">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">اتصل بنا</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{PHONE_DISPLAY}</p>
                </div>
              </a>
              <div className="liquid-glass p-5 flex items-center gap-4">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">نقطة الانطلاق</p>
                  <p className="text-xs text-muted-foreground">مرسى دبي مارينا</p>
                </div>
              </div>
              <div className="liquid-glass p-5 flex items-center gap-4">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">ساعات العمل</p>
                  <p className="text-xs text-muted-foreground">يومياً 6ص – 11م • الحجز 24/7</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
