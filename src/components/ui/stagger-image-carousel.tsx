"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';

interface StaggerImageCarouselProps {
  images: string[];
  altPrefix?: string;
  fallbackSrc?: string;
}

interface ImageCardProps {
  position: number;
  src: string;
  alt: string;
  fallbackSrc?: string;
  handleMove: (steps: number) => void;
  handleOpen: () => void;
  cardSize: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  position,
  src,
  alt,
  fallbackSrc,
  handleMove,
  handleOpen,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => (isCenter ? handleOpen() : handleMove(position))}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 overflow-hidden transition-all duration-500 ease-in-out rounded-xl",
        isCenter
          ? "z-10 border-primary/60 shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.4)]"
          : "z-0 border-border/40 hover:border-primary/30"
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
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={(e) => {
          if (fallbackSrc) (e.target as HTMLImageElement).src = fallbackSrc;
        }}
      />
    </div>
  );
};

export const StaggerImageCarousel: React.FC<StaggerImageCarouselProps> = ({
  images,
  altPrefix = "Image",
  fallbackSrc,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [imageList, setImageList] = useState(images.map((src, i) => ({ src, id: i })));
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageList(images.map((src, i) => ({ src, id: i })));
  }, [images]);

  const handleMove = (steps: number) => {
    const newList = [...imageList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, id: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, id: Math.random() });
      }
    }
    setImageList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 420 : 300);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="relative w-full" style={{ height: cardSize * 0.65 + 80 }}>
        {imageList.map((img, index) => {
          const position =
            imageList.length % 2
              ? index - (imageList.length + 1) / 2
              : index - imageList.length / 2;
          return (
            <ImageCard
              key={img.id}
              position={position}
              src={img.src}
              alt={`${altPrefix} ${index + 1}`}
              fallbackSrc={fallbackSrc}
              handleMove={handleMove}
              handleOpen={() => setFullscreenSrc(img.src)}
              cardSize={cardSize}
            />
          );
        })}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
              "bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
              "bg-background/80 backdrop-blur border border-border hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fullscreen dialog */}
      <Dialog open={!!fullscreenSrc} onOpenChange={() => setFullscreenSrc(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-black/95 flex items-center justify-center">
          <VisuallyHidden><DialogTitle>Image preview</DialogTitle></VisuallyHidden>
          {fullscreenSrc && (
            <img
              src={fullscreenSrc}
              alt={altPrefix}
              className="max-w-full max-h-[90vh] object-contain"
              referrerPolicy="no-referrer"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
