import { Link } from "react-router-dom";
import { Anchor, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { BRAND_NAME, NAV_LINKS, getWhatsAppLink, getPhoneLink } from "@/lib/constants";

const Footer = () => (
  <footer className="bg-secondary/30 border-t border-border/50 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Anchor className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-bold">{BRAND_NAME}</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Premium yacht rental experiences in Dubai Marina. Licensed crew, luxury fleet, and unforgettable moments on the Arabian Gulf.
          </p>
          <div className="flex gap-3">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={getPhoneLink()} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Service Areas</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Dubai Marina", "JBR & Bluewaters", "Palm Jumeirah", "Atlantis & Burj Al Arab", "Dubai Harbour", "World Islands"].map(a => (
              <li key={a} className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary" />{a}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Operating Hours</h4>
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p>Daily: 6:00 AM – 11:00 PM</p>
              <p>Booking Support: 24/7</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Pickup: Dubai Marina Dock</p>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
