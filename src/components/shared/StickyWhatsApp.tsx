import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

const StickyWhatsApp = () => (
  <a
    href={getWhatsAppLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="تواصل واتساب"
    className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold shadow-[0_8px_24px_-6px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform"
  >
    <MessageCircle className="w-5 h-5" />
    <span className="hidden sm:inline text-sm">واتساب</span>
  </a>
);

export default StickyWhatsApp;
