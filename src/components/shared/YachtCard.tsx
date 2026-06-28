import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, BedDouble, Ruler, MessageCircle } from "lucide-react";
import { Yacht } from "@/data/yachts";
import { YACHT_AR } from "@/data/yachts-ar";
import { PLACEHOLDER_IMAGE, getWhatsAppLink } from "@/lib/constants";

interface YachtCardProps {
  yacht: Yacht;
  index?: number;
}

const TYPE_AR: Record<string, string> = {
  Standard: "قياسي",
  Luxury: "فاخر",
  Superyacht: "سوبر يخت",
};

const YachtCard = ({ yacht }: YachtCardProps) => {
  const nameAr = YACHT_AR[yacht.slug]?.name ?? yacht.name;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="liquid-glass overflow-hidden group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={yacht.images?.[0] || PLACEHOLDER_IMAGE}
          alt={`${nameAr} - تأجير يخت ${yacht.length_ft} قدم في دبي`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <span className="absolute top-4 right-4 liquid-pill">
          {TYPE_AR[yacht.type] ?? yacht.type}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">{nameAr}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{yacht.length_ft} قدم</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{yacht.max_guests} ضيف</span>
          <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{yacht.bedrooms}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-primary font-display text-lg font-semibold">
            {yacht.price_per_hour_from_aed.toLocaleString()} <span className="text-xs text-muted-foreground font-body">د.إ/ساعة</span>
          </p>
          <div className="flex gap-2">
            <a
              href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن ${nameAr} (${yacht.length_ft} قدم).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl liquid-btn text-green-400"
              aria-label={`واتساب ${nameAr}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              to={`/yachts/${yacht.slug}`}
              className="text-sm font-medium px-4 py-2 liquid-btn-gold text-primary"
            >
              التفاصيل
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YachtCard;
