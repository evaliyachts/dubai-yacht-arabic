import { Link } from "react-router-dom";
import { CalendarDays, Clock3, Ruler, Users } from "lucide-react";
import { yachts } from "@/data/yachts";
import { requireRouteRecord } from "@/seo/route-manifest";

interface VerifiedYachtSelectionProps {
  slugs: string[];
}

const VerifiedYachtSelection = ({ slugs }: VerifiedYachtSelectionProps) => {
  const selected = slugs.map((slug) => {
    const yacht = yachts.find((candidate) => candidate.slug === slug);
    if (!yacht) throw new Error(`Unknown featured yacht slug: ${slug}`);
    return yacht;
  });

  return (
    <section className="mb-12" aria-labelledby="verified-yacht-selection">
      <div className="mb-6 text-center">
        <h2 id="verified-yacht-selection" className="text-2xl md:text-3xl font-display font-bold text-foreground">
          أمثلة ببيانات مسجلة للمقارنة
        </h2>
        <p className="mt-3 text-muted-foreground">
          هذه الأرقام تخص اليخوت المحددة فقط؛ الموعد والسعر النهائي يحتاجان إلى تأكيد مباشر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selected.map((yacht) => {
          const route = requireRouteRecord(`/yachts/${yacht.slug}`);
          const image = yacht.media[0];
          return (
            <article key={yacht.slug} className="liquid-glass overflow-hidden">
              <img
                src={image.path}
                alt={image.altAr}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-52 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-5">
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">{yacht.name}</h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                <div><dt className="sr-only">الطول</dt><dd className="flex items-center gap-2 text-muted-foreground"><Ruler className="w-4 h-4 text-primary" aria-hidden="true" />{yacht.lengthFt} قدم</dd></div>
                <div><dt className="sr-only">سعة الضيوف</dt><dd className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4 text-primary" aria-hidden="true" />{yacht.guestCapacity} ضيفاً</dd></div>
                <div><dt className="sr-only">سنة البناء</dt><dd className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="w-4 h-4 text-primary" aria-hidden="true" />بناء {yacht.yearBuilt}</dd></div>
                <div><dt className="sr-only">الحد الأدنى</dt><dd className="flex items-center gap-2 text-muted-foreground"><Clock3 className="w-4 h-4 text-primary" aria-hidden="true" />حد أدنى {yacht.minimumDuration} س</dd></div>
                </dl>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="font-display font-semibold text-primary">
                    {yacht.pricePerHour.toLocaleString("ar-AE")} د.إ/ساعة
                  </p>
                  <Link to={route.path} className="liquid-pill hover:scale-105 transition-transform">
                    بيانات اليخت
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VerifiedYachtSelection;
