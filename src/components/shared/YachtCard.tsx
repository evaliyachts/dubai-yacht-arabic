import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BedDouble, CalendarDays, Clock3, MessageCircle, Ruler, Users } from "lucide-react";
import type { YachtRecord } from "@/data/yachts";
import { getWhatsAppLink } from "@/lib/constants";
import { requireRouteRecord } from "@/seo/route-manifest";

interface YachtCardProps {
  yacht: YachtRecord;
  index?: number;
}

const YachtCard = ({ yacht }: YachtCardProps) => {
  const image = yacht.media[0];
  const route = requireRouteRecord(`/yachts/${yacht.slug}`);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="liquid-glass overflow-hidden group"
    >
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={image.path}
          alt={image.altAr}
          width={image.width}
          height={image.height}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {yacht.availability && (
          <span className="absolute top-4 right-4 liquid-pill">
            {yacht.availability === "available" ? "متاح عند آخر تحقق" : yacht.availability === "unavailable" ? "غير متاح" : "حسب الطلب"}
          </span>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-xl font-display font-semibold text-foreground mb-3">{yacht.name}</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /><dt className="sr-only">الطول</dt><dd>{yacht.lengthFt} قدم</dd></div>
          <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><dt className="sr-only">السعة</dt><dd>{yacht.guestCapacity} ضيفاً</dd></div>
          <div className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /><dt className="sr-only">سنة البناء</dt><dd>{yacht.yearBuilt}</dd></div>
          <div className="flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" /><dt className="sr-only">الحد الأدنى</dt><dd>{yacht.minimumDuration} ساعات</dd></div>
          {yacht.numberOfBedrooms && <div className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /><dt className="sr-only">غرف النوم</dt><dd>{yacht.numberOfBedrooms === 1 ? "غرفة واحدة" : yacht.numberOfBedrooms === 2 ? "غرفتان" : `${yacht.numberOfBedrooms} غرف`}</dd></div>}
        </dl>
        <div className="flex items-center justify-between gap-3">
          <p className="text-primary font-display text-lg font-semibold">
            {yacht.pricePerHour.toLocaleString("ar-AE")} <span className="text-xs text-muted-foreground font-body">د.إ/ساعة</span>
          </p>
          <div className="flex gap-2">
            <a href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن ${yacht.name}.`)} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl liquid-btn text-green-400" aria-label={`واتساب عن ${yacht.name}`}>
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link to={route.path} className="text-sm font-medium px-4 py-2 liquid-btn-gold text-primary">التفاصيل</Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default YachtCard;
