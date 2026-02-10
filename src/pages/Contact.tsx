import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { MessageCircle, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", guests: "", message: "", yacht: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    console.log("Contact form submission:", form);
    toast({ title: "Inquiry Sent!", description: "We'll get back to you within the hour." });
    setForm({ name: "", phone: "", email: "", date: "", guests: "", message: "", yacht: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm backdrop-blur-sm";

  return (
    <Layout>
      <SEOHead
        title="Book a Yacht in Dubai | WhatsApp Instant Booking – Dubai Yatch"
        description="Contact Dubai Yatch to book your luxury yacht charter. WhatsApp, call, or fill out our inquiry form for instant availability."
        path="/contact"
        keywords="book yacht dubai, yacht booking dubai, contact dubai yacht rental"
      />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="liquid-pill inline-block mb-4">Contact</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ready to book? Reach out via WhatsApp for instant response, or fill out the form below.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="liquid-glass-gold p-6 md:p-8 space-y-4">
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                    <input required type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" placeholder="Preferred Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
                    <input type="number" min="1" placeholder="Number of Guests" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className={inputClass} />
                  </div>
                  <input placeholder="Yacht Interest (optional)" value={form.yacht} onChange={(e) => setForm({ ...form, yacht: e.target.value })} className={inputClass} />
                  <textarea rows={4} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 liquid-btn-primary text-base">
                    <Send className="w-4 h-4" /> Send Inquiry
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
                  <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Instant response</p>
                </div>
              </a>
              <a href={getPhoneLink()} className="liquid-glass p-5 flex items-center gap-4 hover:border-primary/20 transition-colors block">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Call Us</p>
                  <p className="text-xs text-muted-foreground">+971 50 000 0000</p>
                </div>
              </a>
              <div className="liquid-glass p-5 flex items-center gap-4">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Pickup Location</p>
                  <p className="text-xs text-muted-foreground">Dubai Marina Dock</p>
                </div>
              </div>
              <div className="liquid-glass p-5 flex items-center gap-4">
                <div className="w-10 h-10 liquid-icon rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Operating Hours</p>
                  <p className="text-xs text-muted-foreground">Daily 6AM–11PM • Support 24/7</p>
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
