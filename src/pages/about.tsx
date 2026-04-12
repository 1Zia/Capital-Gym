import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { SEO } from '@/components/seo';
import { useCountUp } from '@/hooks/use-count-up';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────

const ZONES = [
  {
    title: "WEIGHT & MACHINE FLOOR",
    image: "/images/real-dumbbell-floor.png",
    desc: "Hardwood floors, wall-to-wall mirrors, and an arsenal of premium dumbbells and selectorized machines. Built for serious hypertrophy and isolation work.",
  },
  {
    title: "FUNCTIONAL TRAINING AREA",
    image: "/images/real-functional-zone.png",
    desc: "Thick rubber mats equipped with battle ropes, agility cones, and our signature SWAY sandbags (5–20 kg). Designed for explosive, athletic conditioning.",
  },
  {
    title: "CROSSFIT BOX",
    image: "/images/real-bumper-plates.png",
    desc: "The proving ground. Loaded with bumper plates, Olympic barbells, pull-up rigs, and open space for high-intensity WODs.",
  },
  {
    title: "BOXING & MARTIAL ARTS",
    image: "/images/real-sandbags-boxing.png",
    desc: "Gritty, raw, and intense. Heavy bags, speed bags, and mat space for striking and combat conditioning — surrounded by concrete murals.",
  },
  {
    title: "POWER RACK SECTOR",
    image: "/images/real-power-rack.png",
    desc: "Dedicated real estate for the big three. Heavy-duty power racks, deadlift platforms, and iron plates for pure strength development.",
  },
];

const MANIFESTO = [
  { text: "WE DIDN'T BUILD A SPA.", accent: true, align: "left" },
  { text: "WE BUILT A FORGE.", accent: false, align: "right" },
  { text: "SHOW UP.", accent: true, align: "center" },
  { text: "DO THE WORK.", accent: false, align: "left" },
  { text: "GET RESULTS.", accent: true, align: "right" },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function ScrollProgressBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  if (reducedMotion) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] origin-left"
      style={{ scaleX }}
    />
  );
}

function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: reducedMotion ? 0 : '108%', opacity: reducedMotion ? 1 : 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ChapterLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <motion.span
        className="text-primary font-display text-xl tracking-widest shrink-0"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        // {number}
      </motion.span>
      <LineReveal>
        <span className="font-display text-4xl md:text-5xl tracking-wider text-foreground uppercase">{title}</span>
      </LineReveal>
    </div>
  );
}

function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Parallax: image starts slightly zoomed out and zooms in as it scrolls through viewport
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.12]);
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: reducedMotion ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale: reducedMotion ? 1 : imgScale }}
      />
    </motion.div>
  );
}

function StaggerList({ items }: { items: { label: string; value: string }[] }) {
  const reducedMotion = useReducedMotion();
  return (
    <ul className="space-y-5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
        >
          <div className="w-1 h-8 bg-primary shrink-0 mt-1" />
          <div>
            <span className="font-bold text-foreground uppercase tracking-wider text-sm">{item.label}: </span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

function ManifestoStatement({
  text,
  accent,
  align,
  index,
}: {
  text: string;
  accent: boolean;
  align: string;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  return (
    <div className={`overflow-hidden py-2 ${alignClass}`}>
      <motion.div
        initial={{
          opacity: 0,
          x: reducedMotion ? 0 : align === 'left' ? -60 : align === 'right' ? 60 : 0,
          y: reducedMotion ? 0 : align === 'center' ? 30 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        className={`font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter ${
          accent ? 'text-primary' : 'text-foreground'
        }`}
      >
        {text}
      </motion.div>
    </div>
  );
}

function ZoneCard({ zone, index }: { zone: typeof ZONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const isReverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} bg-card border border-border overflow-hidden`}
      data-testid={`card-zone-${index}`}
    >
      {/* Image with clip-path wipe */}
      <div className="w-full md:w-1/2 h-64 md:h-[440px] relative overflow-hidden bg-secondary">
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: reducedMotion ? 'inset(0 0% 0 0)' : isReverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <img
            src={zone.image}
            alt={zone.title}
            className="w-full h-full object-cover"
          />
          {/* Red overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/20 mix-blend-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Zone number badge */}
        <motion.div
          className="absolute bottom-4 left-4 z-10 bg-background/80 backdrop-blur-sm px-3 py-1 border-l-4 border-primary"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="font-display text-sm tracking-widest text-primary">ZONE 0{index + 1}</span>
        </motion.div>
      </div>

      {/* Text content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        >
          <h3 className="text-3xl md:text-4xl font-display tracking-wider text-foreground mb-6 uppercase leading-tight">
            {zone.title}
          </h3>
        </motion.div>
        <motion.p
          className="text-muted-foreground text-lg leading-relaxed"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          {zone.desc}
        </motion.p>
      </div>
    </div>
  );
}

function AboutZoneStats() {
  const { ref: ref1, value: zones } = useCountUp(5, 1.8);
  const { ref: ref2, value: equipment } = useCountUp(100, 2.0);
  const { ref: ref3, value: members } = useCountUp(500, 2.2);
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-10">
      <div className="text-center">
        <div ref={ref1 as unknown as React.RefObject<HTMLDivElement>} className="text-6xl md:text-7xl font-display text-primary leading-none">
          {zones}
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">TRAINING ZONES</p>
      </div>
      <div className="text-center">
        <div ref={ref2 as unknown as React.RefObject<HTMLDivElement>} className="text-6xl md:text-7xl font-display text-primary leading-none">
          {equipment}+
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">EQUIPMENT PIECES</p>
      </div>
      <div className="text-center">
        <div ref={ref3 as unknown as React.RefObject<HTMLDivElement>} className="text-6xl md:text-7xl font-display text-primary leading-none">
          {members}+
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">ACTIVE MEMBERS</p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const reducedMotion = useReducedMotion();
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', reducedMotion ? '0%' : '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, reducedMotion ? 1 : 0]);

  return (
    <div className="w-full bg-background min-h-screen">
      <SEO title="About Us" />
      <ScrollProgressBar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroImgY }}
        >
          <img
            src="/images/real-sandbags-boxing.png"
            alt="The Capital Gym"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
        </motion.div>

        <motion.div
          className="container mx-auto px-4 md:px-8 relative z-10 pt-24"
          style={{ opacity: heroOpacity }}
        >
          <LineReveal delay={0.1}>
            <span className="text-primary font-display text-2xl tracking-widest uppercase block mb-4">
              // CHAPTER 00
            </span>
          </LineReveal>
          <LineReveal delay={0.2}>
            <h1 className="text-7xl md:text-9xl font-display text-foreground leading-none uppercase">
              OUR <span className="text-primary">STORY</span>
            </h1>
          </LineReveal>
          <motion.div
            className="w-0 h-1 bg-primary mt-6 mb-8"
            animate={{ width: '6rem' }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          />
          <LineReveal delay={0.5}>
            <p className="text-xl md:text-3xl font-display tracking-wider text-muted-foreground max-w-2xl uppercase leading-tight">
              "We didn't build a spa. We built a forge for real athletes in the heart of B-17."
            </p>
          </LineReveal>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-12 left-8 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-px h-16 bg-primary origin-top"
              animate={reducedMotion ? {} : { scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest -rotate-90 origin-left translate-x-4">Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CHAPTER 01: PHILOSOPHY ── */}
      <section className="py-28 container mx-auto px-4 md:px-8">
        <ChapterLabel number="01" title="The Philosophy" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-12">
          <div className="space-y-8">
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              {[
                <>The Capital Gym was founded on a simple principle: <strong className="text-foreground">Train Harder. Burn Smarter.</strong> We saw a fitness industry obsessed with aesthetics, juice bars, and comfortable couches. We went the other way.</>,
                <>Located in Capital Square Mall, B-17 Islamabad, our facility is engineered for performance. Dark concrete, heavy iron, loud music, and a community that demands your best.</>,
                <>If you want a place to take mirror selfies for an hour, look elsewhere. <strong className="text-foreground">If you want results, you're home.</strong></>,
              ].map((line, i) => (
                <LineReveal key={i} delay={i * 0.1}>
                  <p>{line}</p>
                </LineReveal>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              className="bg-card border-l-4 border-primary p-8"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-display tracking-wider text-foreground mb-6 uppercase">Equipment Standards</h3>
              <StaggerList
                items={[
                  { label: "Premium Free Weights", value: "Calibrated plates and competition barbells." },
                  { label: "SWAY Gear", value: "Official partner for SWAY sandbags (5–20 kg) and conditioning tools." },
                  { label: "Matte Black Machines", value: "Heavy-duty selectorized and plate-loaded resistance machines." },
                  { label: "CrossFit Rig", value: "Full competition-spec pull-up rig and bumper plate system." },
                ]}
              />
            </motion.div>

            {/* Image with clip reveal */}
            <ImageReveal
              src="/images/real-power-rack.png"
              alt="Power Rack"
              className="h-[260px] grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="bg-[#050505] border-y border-border py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-xs font-bold uppercase tracking-widest text-primary mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // THE MANIFESTO
          </motion.div>
          <div className="space-y-2 md:space-y-4">
            {MANIFESTO.map((item, i) => (
              <ManifestoStatement
                key={i}
                text={item.text}
                accent={item.accent}
                align={item.align}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: THE ZONES ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 mb-16">
          <ChapterLabel number="02" title="The Zones" />
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border" />
            <AboutZoneStats />
            <div className="flex-1 h-px bg-border" />
          </div>
          <LineReveal>
            <p className="text-muted-foreground text-center uppercase tracking-widest font-bold text-lg">
              Five purpose-built training environments. Zero excuses.
            </p>
          </LineReveal>
        </div>

        <div className="space-y-0">
          {ZONES.map((zone, i) => (
            <ZoneCard key={i} zone={zone} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <LineReveal>
            <h2 className="text-5xl md:text-7xl font-display text-foreground mb-4 uppercase leading-none">
              READY TO<br /><span className="text-primary">START?</span>
            </h2>
          </LineReveal>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto mt-4 mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl tracking-wider px-12 py-5 neon-glow transition-all group"
              data-testid="btn-about-cta"
            >
              VIEW MEMBERSHIP
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
