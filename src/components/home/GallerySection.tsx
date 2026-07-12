import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { motion } from "framer-motion";
import { responsiveYachtMediaSrcSet } from "@/lib/responsive-image";

const GallerySection = () => {
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60", "h-44", "h-68"];
  const gallerySlugs = [
    "رحلة-يخت-50-قدم-رويال-ماجستي",
    "يخت-42-قدم-ازيموت-للايجار",
    "رحلة-يخت-56-قدم-ماجستي",
    "يخت-64-قدم-ازيموت-إيطالي",
    "يخت-64-قدم-هاترس-للإيجار",
    "ايجار-يخت-ماجستي-88-قدم-جاكوزي",
    "يخت-ماجستي-101-قدم-جاكوزي-للإيجار",
    "اوشن-دريم-يخت-143-قدم-للايجار",
  ];

  const galleryImages = gallerySlugs.map((slug) => {
    const yacht = yachts.find((candidate) => candidate.slug === slug);
    if (!yacht?.media[0]) throw new Error(`Missing homepage gallery yacht: ${slug}`);
    return { ...yacht.media[0], name: yacht.name };
  });

  return (
    <section className="section-padding liquid-divider" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block">نماذج مصورة</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            نماذج من اليخوت المعروضة
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            صور مرتبطة بخيارات محددة في الكتالوج للمساعدة على المقارنة البصرية؛ راجع صفحة اليخت لبياناته المسجلة.
          </p>
        </AnimatedSection>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${heights[i]} rounded-3xl overflow-hidden break-inside-avoid group cursor-pointer liquid-glass p-0`}
            >
              <img
                src={img.path}
                srcSet={responsiveYachtMediaSrcSet(img)}
                alt={img.altAr}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
