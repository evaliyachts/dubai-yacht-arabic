import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getWhatsAppLink, getPhoneLink, PHONE_DISPLAY } from "@/lib/constants";
import { MessageCircle, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { yachts } from "@/data/yachts";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord("/contact/");

const OCCASIONS = [
  "عيد ميلاد", "خطوبة", "طلب زواج", "زفاف", "ذكرى زواج",
  "تخرج", "تحديد جنس المولود", "وداع عزوبية", "حفلة عائلية",
  "شواء BBQ", "عشاء رومانسي", "رحلة صباحية", "صيد", "أخرى",
];

const Contact = () => {
  const { toast } = useToast();
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", guests: "",
    occasion: "", yacht: "", notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    const msg = `استفسار جديد:
الاسم: ${form.name}
الهاتف: ${form.phone}
التاريخ: ${form.date}
وقت الرحلة: ${form.time}
عدد الضيوف: ${form.guests}
نوع المناسبة: ${form.occasion}
اختيار اليخت: ${form.yacht}
ملاحظات: ${form.notes}`;
    window.open(getWhatsAppLink(msg), "_blank");
    toast({ title: "تم إرسال الاستفسار", description: "سيتم التواصل معك خلال دقائق." });
  };

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm backdrop-blur-sm text-right";

  return (
    <Layout>
      <SEOHead route={route} />

      <div className="pt-28 pb-20" dir="rtl">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="liquid-pill inline-block mb-4">تواصل معنا</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              {route.h1}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              املأ النموذج التالي وسنتواصل معك خلال دقائق عبر واتساب، أو تواصل معنا مباشرة.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="liquid-glass-gold p-6 md:p-8 space-y-4">
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="الاسم *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                    <input required type="tel" placeholder="رقم الهاتف *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" placeholder="التاريخ" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
                    <input type="time" placeholder="وقت الرحلة" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="number" min="1" placeholder="عدد الضيوف" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className={inputClass} />
                    <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className={inputClass}>
                      <option value="">نوع المناسبة</option>
                      {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <select value={form.yacht} onChange={(e) => setForm({ ...form, yacht: e.target.value })} className={inputClass}>
                    <option value="">اختيار اليخت (اختياري)</option>
                    {yachts.map((y) => (
                      <option key={y.slug} value={y.name}>
                        {y.name}
                      </option>
                    ))}
                  </select>
                  <textarea rows={4} placeholder="ملاحظات إضافية" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} />
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 liquid-btn-primary text-base">
                    <Send className="w-4 h-4" /> أرسل الاستفسار عبر واتساب
                  </button>
                </form>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2} className="space-y-4">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="liquid-glass p-5 flex items-center gap-4 hover:border-green-500/20 transition-colors block">
                <div className="w-10 h-10 liquid-btn rounded-xl flex items-center justify-center shrink-0 text-green-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">واتساب</p>
                  <p className="text-xs text-muted-foreground">رد فوري</p>
                </div>
              </a>
              <a href={getPhoneLink()} className="liquid-glass p-5 flex items-center gap-4 hover:border-primary/20 transition-colors block">
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
