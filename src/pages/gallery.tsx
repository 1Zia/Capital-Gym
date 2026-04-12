import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { KineticText } from '@/components/kinetic-text';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSite } from '@/contexts/site-context';

// ─── Static images ─────────────────────────────────────────────────────────

const STATIC_IMAGES = [
  { src: "/images/real-dumbbell-floor.png",       alt: "Main dumbbell rack and bench press area with motivational wall murals" },
  { src: "/images/real-functional-zone.png",      alt: "Functional training zone with battle ropes and open floor space" },
  { src: "/images/real-bumper-plates.png",        alt: "CrossFit area — bumper plates and barbells on the lifting platform" },
  { src: "/images/real-power-rack.png",           alt: "Power rack section with cable machines and mirror wall" },
  { src: "/images/real-machine-row.png",          alt: "Leg press and incline machine row against vibrant mural wall" },
  { src: "/images/real-spinning-bikes.png",       alt: "Spinning and cycling bikes on the hardwood floor" },
  { src: "/images/real-cable-treadmill.png",      alt: "Cable sled machine and treadmill area on polished hardwood" },
  { src: "/images/real-cable-row-machine.png",    alt: "White cable row machine with muscle mural artwork on wall" },
  { src: "/images/real-cardio-corridor.png",      alt: "Long cardio and machine corridor on hardwood floor" },
  { src: "/images/real-ellipticals.png",          alt: "Elliptical trainers with colourful typography motivation mural" },
  { src: "/images/real-sandbags-boxing.png",      alt: "SWAY sandbags and battle ropes in the functional and boxing room" },
  { src: "/images/real-treadmill-corridor.png",   alt: "Treadmill and cardio corridor on hardwood floor with teal word-cloud mural" },
  { src: "/images/real-dumbbells-wide.png",       alt: "Wide dumbbell rack with members training, mirror wall and motivational banner" },
  { src: "/images/real-bench-warrior-mural.png",  alt: "Bench press area with warrior figure mural on white pillar and incline benches" },
  { src: "/images/real-bench-geometric-mural.png",alt: "Bench press floor with colorful geometric mural column and mirror wall" },
];

/**
 * Bento tile sizes for the 15 static images.
 * 'wide'  → col-span-2  (landscape feel)
 * 'tall'  → row-span-2  (portrait / dramatic)
 * 'std'   → 1×1 default
 * These are applied on md+ breakpoint (desktop); mobile is 1×1 or 2×1 for wide.
 */
const TILE_CONFIG: Array<{ colSpan: number; rowSpan: number }> = [
  { colSpan: 2, rowSpan: 1 }, // 0  wide
  { colSpan: 1, rowSpan: 2 }, // 1  tall
  { colSpan: 1, rowSpan: 1 }, // 2  std
  { colSpan: 1, rowSpan: 1 }, // 3  std
  { colSpan: 2, rowSpan: 1 }, // 4  wide
  { colSpan: 1, rowSpan: 1 }, // 5  std
  { colSpan: 1, rowSpan: 2 }, // 6  tall
  { colSpan: 1, rowSpan: 1 }, // 7  std
  { colSpan: 2, rowSpan: 1 }, // 8  wide
  { colSpan: 1, rowSpan: 1 }, // 9  std
  { colSpan: 1, rowSpan: 1 }, // 10 std
  { colSpan: 1, rowSpan: 2 }, // 11 tall
  { colSpan: 2, rowSpan: 1 }, // 12 wide
  { colSpan: 1, rowSpan: 1 }, // 13 std
  { colSpan: 1, rowSpan: 1 }, // 14 std
];

function getTileConfig(index: number) {
  if (index < TILE_CONFIG.length) return TILE_CONFIG[index];
  return { colSpan: 1, rowSpan: 1 };
}

// ─── Tile component ─────────────────────────────────────────────────────────

function BentoTile({
  src,
  alt,
  index,
  tileIndex,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  tileIndex: number;
  onClick: () => void;
}) {
  const shouldReduce = useReducedMotion();
  const { colSpan, rowSpan } = getTileConfig(tileIndex);

  const colClass = colSpan === 2 ? 'md:col-span-2 col-span-2' : 'col-span-1';
  const rowClass = rowSpan === 2 ? 'md:row-span-2 row-span-1' : 'row-span-1';

  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer bg-secondary border border-border/40 ${colClass} ${rowClass}`}
      initial={shouldReduce
        ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
        : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
      }
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-30px' }}
      transition={shouldReduce
        ? { duration: 0 }
        : { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.5) }
      }
      onClick={onClick}
      data-testid={`gallery-item-${index}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        whileHover={shouldReduce ? {} : { scale: 1.06 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        loading="lazy"
      />
      {/* Red tint overlay */}
      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-background/80 backdrop-blur p-3 border border-border text-foreground">
          <ZoomIn size={22} />
        </div>
      </div>
      {/* Bottom alt text on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-xs text-muted-foreground truncate">{alt}</p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Gallery() {
  const { adminImages } = useSite();
  const shouldReduce = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = [
    ...STATIC_IMAGES,
    ...adminImages.map((img) => ({ src: img.src, alt: img.alt })),
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  return (
    <div className="w-full bg-background pt-24 min-h-screen">
      <SEO title="Facility Gallery" />

      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: shouldReduce ? 1 : 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-display text-foreground leading-none mb-4 uppercase">
            <KineticText text="THE FACILITY" as="span" delay={0.1} stagger={0.03} />
          </h1>
          <div className="w-24 h-2 bg-primary" />
          {adminImages.length > 0 && (
            <p className="text-muted-foreground text-sm mt-4 tracking-wider">
              {allImages.length} photos — including {adminImages.length} recently uploaded
            </p>
          )}
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 grid-flow-dense gap-3"
          style={{ gridAutoRows: 'clamp(160px, 20vw, 300px)' }}
        >
          {allImages.map((img, i) => (
            <BentoTile
              key={i}
              src={img.src}
              alt={img.alt}
              index={i}
              tileIndex={i}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-24 text-center border-t border-border pt-16">
          <KineticText
            text="WANT TO SEE MORE?"
            as="h3"
            className="text-4xl font-display tracking-wider text-foreground mb-4 uppercase"
            delay={0.1}
            stagger={0.025}
          />
          <p className="text-muted-foreground mb-8">Follow us on Instagram for daily updates, form checks, and community highlights.</p>
          <a href="https://instagram.com/thecapitalgymofficial" target="_blank" rel="noreferrer" className="inline-block">
            <button className="bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-display text-2xl tracking-wider px-12 py-4 transition-colors" data-testid="btn-gallery-ig">
              @THECAPITALGYMOFFICIAL
            </button>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors p-2 z-10"
              onClick={closeLightbox}
              data-testid="btn-lightbox-close"
            >
              <X size={32} />
            </button>

            {/* Prev / Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors p-3 bg-background/60 border border-border backdrop-blur-sm z-10"
              onClick={prevImage}
              data-testid="btn-lightbox-prev"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors p-3 bg-background/60 border border-border backdrop-blur-sm z-10"
              onClick={nextImage}
              data-testid="btn-lightbox-next"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                initial={shouldReduce
                  ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                  : { scale: 0.92, opacity: 0, filter: 'blur(8px)' }
                }
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={shouldReduce
                  ? { opacity: 1 }
                  : { scale: 0.92, opacity: 0, filter: 'blur(8px)' }
                }
                transition={shouldReduce ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
                src={allImages[currentIndex].src}
                alt={allImages[currentIndex].alt}
                className="max-w-full max-h-[85vh] object-contain border border-border shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
              <span className="bg-background/80 px-4 py-2 font-display tracking-widest text-foreground border border-border text-sm">
                {currentIndex + 1} / {allImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
