import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Compass, Shield, Clock, Star, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
const HERO_DESKTOP = "https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_dt.avif";
const HERO_MOBILE = "https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_mob.avif";
const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const badges = [{
    icon: Shield,
    text: "Licensed Crew"
  }, {
    icon: Clock,
    text: "Instant Booking Support"
  }, {
    icon: MapPin,
    text: "Dubai Marina Pickup"
  }, {
    icon: Star,
    text: "5★ Guest Experience"
  }];
  return <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div style={{
      y: imgY
    }} className="absolute inset-0">
        <img src={isMobile ? HERO_MOBILE : HERO_DESKTOP} alt="Luxury yacht rental in Dubai Marina" className="w-full h-full object-cover scale-110" />
      </motion.div>
      <div className="absolute inset-0 hero-gradient" />

      <motion.div style={{
      y: textY,
      opacity
    }} className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}>
          <span className="liquid-pill inline-block mb-4">
            Premium Yacht Charters
          </span>
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
          Luxury Yacht Rental{" "}
          <span className="text-gradient-gold">in Dubai</span>
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="text-lg md:text-xl text-muted-foreground mb-3 font-light">
          Private charters • Dubai Marina • Sunset cruises • VIP service
        </motion.p>

        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.7
      }} className="text-primary font-display text-xl mb-8">
          From AED ___/hour
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.8
      }} className="sm:flex-row gap-4 justify-center mb-10 flex flex-row">
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 liquid-btn-primary text-base hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" /> Book on WhatsApp
          </a>
          <Link to="/yachts" className="inline-flex items-center justify-center gap-2 px-8 py-4 liquid-btn text-foreground text-base hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" /> Explore Yachts
          </Link>
        </motion.div>

        
      </motion.div>

      <motion.div animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>;
};
export default HeroSection;