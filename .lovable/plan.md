

## Fix Yacht Images, Filtering, and Add Image Carousel

### Problem Summary
1. **Images not showing**: YachtCard and YachtDetails both hardcode `PLACEHOLDER_IMAGE` instead of using `yacht.images[0]` from the data
2. **Filtering appears broken**: All cards look identical because they show the same placeholder -- once real images load, filtering will visually work as expected
3. **No image carousel**: The yacht details page needs a swipeable image gallery

---

### Changes

#### 1. Fix YachtCard images (`src/components/shared/YachtCard.tsx`)
- Replace `PLACEHOLDER_IMAGE` with `yacht.images[0]` as the image source
- Add a fallback to `PLACEHOLDER_IMAGE` via an `onError` handler
- Keep `referrerPolicy="no-referrer"` for CDN compatibility

#### 2. Fix YachtDetails hero and add image carousel (`src/pages/YachtDetails.tsx`)
- Remove the single placeholder hero image
- Replace it with a responsive image carousel using Embla (already installed via `embla-carousel-react`)
- Use the existing `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` components from `src/components/ui/carousel.tsx`
- Show all images from `yacht.images` array in the carousel
- Add dot indicators for current slide position
- Add `referrerPolicy="no-referrer"` on all carousel images
- Mobile responsive: full-width carousel, touch-swipeable, arrows hidden on small screens (dots only)

#### 3. Fix FeaturedYachts on home page (`src/components/home/FeaturedYachts.tsx`)
- This component also uses YachtCard, so fixing YachtCard fixes it automatically

---

### Technical Details

**Carousel implementation** on YachtDetails:
- Use the existing Embla-based Carousel components already in the project
- The carousel replaces the hero section (same height: `h-[50vh] min-h-[400px]`)
- Dot navigation below the carousel for mobile-friendly interaction
- Previous/Next arrow buttons visible on desktop (md and up)
- All images get `referrerPolicy="no-referrer"` and an `onError` fallback
- Carousel set to `loop: true` for continuous browsing

**Files to modify**:
- `src/components/shared/YachtCard.tsx` -- use `yacht.images[0]` instead of `PLACEHOLDER_IMAGE`
- `src/pages/YachtDetails.tsx` -- replace hero with image carousel, add dot indicators

