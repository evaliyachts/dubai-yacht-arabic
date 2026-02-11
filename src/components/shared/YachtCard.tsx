import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, BedDouble, Ruler, MessageCircle } from "lucide-react";
import { Yacht } from "@/data/yachts";
import { PLACEHOLDER_IMAGE, getWhatsAppLink } from "@/lib/constants";

interface YachtCardProps {
  yacht: Yacht;
  index?: number;
}

const YachtCard = ({ yacht, index = 0 }: YachtCardProps) => {
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
          alt={`${yacht.name} - ${yacht.length_ft}ft ${yacht.type} yacht rental in Dubai`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <span className="absolute top-4 left-4 liquid-pill">
          {yacht.type}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">{yacht.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{yacht.length_ft}ft</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{yacht.max_guests}</span>
          <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{yacht.bedrooms}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-primary font-display text-lg font-semibold">
            AED {yacht.price_per_hour_from_aed.toLocaleString()}<span className="text-xs text-muted-foreground font-body">/hr</span>
          </p>
          <div className="flex gap-2">
            <a
              href={getWhatsAppLink(`Hi, I'm interested in ${yacht.name} (${yacht.length_ft}ft). Please share availability.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl liquid-btn text-green-400"
              aria-label={`WhatsApp inquiry for ${yacht.name}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              to={`/yachts/${yacht.slug}`}
              className="text-sm font-medium px-4 py-2 liquid-btn-gold text-primary"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YachtCard;
