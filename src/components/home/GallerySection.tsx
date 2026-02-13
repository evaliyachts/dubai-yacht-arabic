import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { motion } from "framer-motion";

const GallerySection = () => {
  const heights = ["h-48", "h-64", "h-56", "h-72", "h-52", "h-60", "h-44", "h-68"];

  // Pick the first image from each yacht as gallery items
  const galleryImages = yachts
    .filter((y) => y.images.length > 0)
    .slice(0, heights.length)
    .map((y) => ({ src: y.images[0], name: y.name }));

  return (
    <section className="section-padding liquid-divider">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block">Gallery</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            Life on the Water
          </h2>
        </AnimatedSection>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`${heights[i]} rounded-3xl overflow-hidden break-inside-avoid group cursor-pointer liquid-glass p-0`}
            >
              <img
                src={img.src}
                alt={`${img.name} - yacht rental in Dubai`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
