"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { YachtMediaRecord } from "@/data/yachts";
import { responsiveYachtMediaSrcSet } from "@/lib/responsive-image";

interface StaggerImageCarouselProps {
  images: YachtMediaRecord[];
  altPrefix?: string;
  fallbackSrc: string;
}

interface ImageCardProps {
  position: number;
  media: YachtMediaRecord;
  isInitialPrimary: boolean;
  handleMove: (steps: number) => void;
  handleOpen: () => void;
  handleFailure: (path: string) => void;
  cardSize: number;
}

const ImageCard = ({
  position,
  media,
  isInitialPrimary,
  handleMove,
  handleOpen,
  handleFailure,
  cardSize,
}: ImageCardProps) => {
  const isCenter = position === 0;
  const activate = () => (isCenter ? handleOpen() : handleMove(position));

  return (
    <button
      type="button"
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
      aria-label={isCenter ? `فتح ${media.altAr} بالحجم الكامل` : `اختيار ${media.altAr}`}
      aria-current={isCenter ? "true" : undefined}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 overflow-hidden transition-all duration-500 ease-in-out rounded-xl",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none",
        isCenter
          ? "z-10 border-primary/60 shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.4)]"
          : "z-0 border-border/40 hover:border-primary/30",
      )}
      style={{
        width: cardSize,
        height: cardSize * 0.65,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
      }}
    >
      <img
        src={media.path}
        srcSet={responsiveYachtMediaSrcSet(media)}
        alt={media.altAr}
        width={media.width}
        height={media.height}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        loading={isInitialPrimary ? "eager" : "lazy"}
        decoding="async"
        sizes="(min-width: 640px) 420px, 300px"
        {...(isInitialPrimary ? { fetchpriority: "high" } : {})}
        onError={() => handleFailure(media.path)}
      />
    </button>
  );
};

const carouselPosition = (index: number, length: number) => {
  if (index === 0) return 0;
  return index <= Math.ceil((length - 1) / 2) ? index : index - length;
};

export const StaggerImageCarousel = ({
  images,
  altPrefix = "صورة اليخت",
  fallbackSrc,
}: StaggerImageCarouselProps) => {
  const [cardSize, setCardSize] = useState(365);
  const failedSources = useRef(new Set<string>());
  const fallbackMedia: YachtMediaRecord = {
    type: "image",
    path: fallbackSrc,
    altAr: `صورة بديلة محايدة لـ ${altPrefix}`,
    width: 1200,
    height: 1200,
    rightsRecordId: "media-neutral-placeholder-001",
    featured: true,
    priority: 0,
  };
  const availableImages = images.filter((media) => !failedSources.current.has(media.path));
  const [imageList, setImageList] = useState<YachtMediaRecord[]>(
    availableImages.length > 0 ? availableImages : [fallbackMedia],
  );
  const [fullscreenMedia, setFullscreenMedia] = useState<YachtMediaRecord | null>(null);
  const initialPrimaryPath = images[0]?.path ?? fallbackSrc;
  const orderedUsableImages = images.filter((media) => !failedSources.current.has(media.path));
  const currentPosition = Math.max(
    1,
    orderedUsableImages.findIndex((media) => media.path === imageList[0]?.path) + 1,
  );
  const positionTotal = orderedUsableImages.length || 1;

  useEffect(() => {
    const usable = images.filter((media) => !failedSources.current.has(media.path));
    setImageList(usable.length > 0 ? usable : [fallbackMedia]);
    setFullscreenMedia((current) =>
      current && usable.some((media) => media.path === current.path) ? current : null,
    );
    // fallbackMedia is derived from stable scalar props; listing the object would reset on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, altPrefix, fallbackSrc]);

  const handleMove = (steps: number) => {
    setImageList((current) => {
      if (current.length < 2 || steps === 0) return current;
      const normalized = ((steps % current.length) + current.length) % current.length;
      return [...current.slice(normalized), ...current.slice(0, normalized)];
    });
  };

  const handleFailure = (path: string) => {
    if (failedSources.current.has(path)) return;
    failedSources.current.add(path);
    if (path === fallbackSrc) return;
    setFullscreenMedia((current) => (current?.path === path ? null : current));
    setImageList((current) => {
      const remaining = current.filter((media) => media.path !== path);
      return remaining.length > 0 ? remaining : [fallbackMedia];
    });
  };

  useEffect(() => {
    const updateSize = () => setCardSize(window.matchMedia("(min-width: 640px)").matches ? 420 : 300);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleMove(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleMove(1);
    }
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: cardSize * 0.65 + 80 }}
        onKeyDown={handleKeyDown}
        aria-label={`معرض صور ${altPrefix}`}
      >
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          الصورة {currentPosition} من {positionTotal}
        </p>
        {imageList.map((media, index) => {
          const position = carouselPosition(index, imageList.length);
          return (
            <ImageCard
              key={media.path}
              position={position}
              media={media}
              isInitialPrimary={media.path === initialPrimaryPath}
              handleMove={handleMove}
              handleOpen={() => setFullscreenMedia(media)}
              handleFailure={handleFailure}
              cardSize={cardSize}
            />
          );
        })}

        {imageList.length > 1 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            <button
              type="button"
              onClick={() => handleMove(-1)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                "bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary motion-reduce:transition-none",
              )}
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleMove(1)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                "bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary motion-reduce:transition-none",
              )}
              aria-label="الصورة التالية"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <Dialog open={Boolean(fullscreenMedia)} onOpenChange={(open) => !open && setFullscreenMedia(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-black/95 flex items-center justify-center">
          <DialogTitle className="sr-only">عرض صورة {altPrefix} بالحجم الكامل</DialogTitle>
          <DialogDescription className="sr-only">معاينة الصورة المحددة دون تغيير ترتيب معرض اليخت.</DialogDescription>
          {fullscreenMedia && (
            <img
              src={fullscreenMedia.path}
              srcSet={responsiveYachtMediaSrcSet(fullscreenMedia)}
              alt={fullscreenMedia.altAr}
              width={fullscreenMedia.width}
              height={fullscreenMedia.height}
              className="max-w-full max-h-[90vh] object-contain"
              referrerPolicy="no-referrer"
              decoding="async"
              sizes="95vw"
              onError={() => handleFailure(fullscreenMedia.path)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
