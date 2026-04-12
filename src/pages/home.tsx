import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/seo';
import { MagneticButton } from '@/components/magnetic-button';
import { RippleButton } from '@/components/ripple-button';
import { KineticText } from '@/components/kinetic-text';
import { useCountUp } from '@/hooks/use-count-up';

const STRENGTH_WORDS = ["STRONGER", "LEANER", "FASTER"];

const STATS = [
  { value: 500, suffix: '+', label: 'ACTIVE MEMBERS' },
  { value: 100, suffix: '+', label: 'EQUIPMENT PIECES' },
  { value: 5, suffix: '', label: 'TRAINING ZONES' },
  { value: 4.5, suffix: '★', label: 'GOOGLE RATING' },
];

// ─── Bento grid data ──────────────────────────────────────────────────────────

const BENTO_CELLS = [
  {
    type: 'zone' as const,
    name: "CROSSFIT BOX",
    label: "ZONE 03",
    desc: "Bumper plates, Olympic barbells & pull-up rigs",
    image: "/images/real-bumper-plates.png",
    // mobile: 2×2 — desktop: 2 cols × 2 rows (large)
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    type: 'zone' as const,
    name: "POWER RACK SECTOR",
    label: "ZONE 05",
    desc: "Heavy-duty racks & deadlift platforms",
    image: "/images/real-power-rack.png",
    // mobile: 1×1 — desktop: 1 col × 2 rows (tall)
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
  },
  {
    type: 'zone' as const,
    name: "FUNCTIONAL TRAINING",
    label: "ZONE 02",
    desc: "Battle ropes, SWAY sandbags & agility",
    image: "/images/real-functional-zone.png",
    // mobile: 1×1 — desktop: 1 col × 2 rows (tall)
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
  },
  {
    type: 'zone' as const,
    name: "BOXING & COMBAT",
    label: "ZONE 04",
    desc: "Heavy bags, speed bags & mat space",
    image: "/images/real-sandbags-boxing.png",
    // mobile: 1×1 — desktop: 1×1
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
  },
  {
    type: 'zone' as const,
    name: "WEIGHT & MACHINE FLOOR",
    label: "ZONE 01",
    desc: "Premium dumbbells, machines & mirror walls",
    image: "/images/real-dumbbell-floor.png",
    // mobile: 2×1 — desktop: 2 cols × 1 row (wide)
    span: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    type: 'cta' as const,
    name: "START TODAY",
    label: "JOIN NOW",
    desc: "",
    image: "",
    // mobile: 2×1 — desktop: 1×1
    span: "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(value, 2.2);
  return (
    <div className="text-center py-6 px-4 border-r border-border/40 last:border-none">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="text-5xl md:text-6xl font-display text-primary leading-none mb-2">
        {value % 1 === 0 ? count : count.toFixed(1)}{suffix}
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function HeroWord({ word, wordIndex }: { word: string; wordIndex: number }) {
  const shouldReduce = useReducedMotion();
  const chars = word.split('');
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={wordIndex}
        className="inline-flex"
        exit={
          shouldReduce
            ? { opacity: 0, transition: { duration: 0 } }
            : { opacity: 0, filter: 'blur(8px)', y: -16, transition: { duration: 0.22, ease: 'easeIn' } }
        }
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={shouldReduce
              ? { y: 0, opacity: 1, filter: 'blur(0px)' }
              : { y: 28, opacity: 0, filter: 'blur(10px)' }
            }
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldReduce ? 0 : i * 0.038,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

function BentoCell({ cell, index }: { cell: typeof BENTO_CELLS[0]; index: number }) {
  const shouldReduce = useReducedMotion();

  if (cell.type === 'cta') {
    return (
      <motion.div
        className={`relative overflow-hidden bg-primary group cursor-pointer flex flex-col items-center justify-center p-6 text-center ${cell.span}`}
        initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: shouldReduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldReduce ? 0 : index * 0.07 }}
        data-testid={`bento-cell-${index}`}
      >
        {/* animated bg grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(0,0,0,0.5) 40px,rgba(0,0,0,0.5) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(0,0,0,0.5) 40px,rgba(0,0,0,0.5) 41px)' }}
        />
        <Link to="/membership" className="relative z-10 flex flex-col items-center gap-3">
          <span className="font-display text-sm tracking-[0.3em] text-primary-foreground/70 uppercase">// JOIN</span>
          <span className="font-display text-3xl md:text-4xl tracking-wider text-primary-foreground uppercase leading-none">START<br />TODAY</span>
          <motion.div
            className="w-10 h-10 border-2 border-primary-foreground rounded-full flex items-center justify-center mt-2 group-hover:bg-primary-foreground group-hover:text-primary transition-colors"
            whileHover={shouldReduce ? {} : { scale: 1.15 }}
          >
            <ArrowRight size={18} className="text-primary-foreground group-hover:text-primary" />
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer bg-secondary border border-border ${cell.span}`}
      initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1], delay: shouldReduce ? 0 : index * 0.07 }}
      data-testid={`bento-cell-${index}`}
    >
      {/* Background image with clip-path reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: shouldReduce ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: shouldReduce ? 0 : 1.0, ease: [0.22, 1, 0.36, 1], delay: shouldReduce ? 0 : index * 0.07 + 0.1 }}
      >
        <img
          src={cell.image}
          alt={cell.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

      {/* Red tint on hover */}
      <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <KineticText
          text={cell.label}
          as="span"
          className="text-primary font-display text-xs tracking-[0.25em] mb-1 block"
          delay={index * 0.07 + 0.55}
          stagger={0.03}
        />
        <KineticText
          text={cell.name}
          as="h3"
          mode="words"
          className="font-display text-base md:text-xl tracking-wider text-foreground uppercase leading-tight"
          delay={index * 0.07 + 0.72}
          stagger={0.06}
        />
        {cell.desc && (
          <p className="text-muted-foreground text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            {cell.desc}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  // ── Scroll-scaling setup ─────────────────────────────────────────────────
  const { scrollY } = useScroll();
  const aboutImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutImgProgress } = useScroll({
    target: aboutImgRef,
    offset: ['start end', 'end start'],
  });

  // Hero background: zoom in as user scrolls down (parallax)
  const heroImgScale = useTransform(scrollY, [0, 600], [1, 1.14]);
  const heroImgY     = useTransform(scrollY, [0, 600], ['0%', '10%']);
  // Hero text: fade + shrink away as user scrolls off hero
  const heroContentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const heroContentScale   = useTransform(scrollY, [0, 350], [1, 0.88]);
  // About image: continuous parallax zoom as section moves through viewport
  const aboutImgScale = useTransform(aboutImgProgress, [0, 1], [0.9, 1.12]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % STRENGTH_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <SEO title="Home" />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Scroll-scaling hero background: zooms in as you scroll past */}
          <motion.img
            src="/images/real-dumbbell-floor.png"
            alt="Capital Gym Floor"
            className="w-full h-full object-cover object-center opacity-40"
            style={{
              scale: shouldReduce ? 1 : heroImgScale,
              y: shouldReduce ? '0%' : heroImgY,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Scroll-linked: hero content fades + shrinks as user scrolls away */}
        <motion.div
          className="relative z-10 w-full"
          style={{
            opacity: shouldReduce ? 1 : heroContentOpacity,
            scale: shouldReduce ? 1 : heroContentScale,
          }}
        >
          <div className="container mx-auto px-4 md:px-8 text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-foreground leading-none mb-4">
              TRAIN HARDER.<br />
              BURN{' '}
              <span className="text-primary inline-flex min-w-[280px] md:min-w-[420px] justify-center">
                <HeroWord word={STRENGTH_WORDS[wordIndex]} wordIndex={wordIndex} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-bold tracking-widest uppercase mb-12 max-w-3xl mx-auto">
              Islamabad's Most Equipped Gym — CrossFit · Strength · Weight Loss
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/membership">
                <MagneticButton strength={0.4}>
                  <RippleButton
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl tracking-wider px-12 py-5 neon-glow w-full sm:w-auto"
                    data-testid="btn-hero-start"
                  >
                    START YOUR JOURNEY
                  </RippleButton>
                </MagneticButton>
              </Link>
              <Link to="/about">
                <MagneticButton strength={0.4}>
                  <RippleButton
                    className="border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-display text-2xl tracking-wider px-12 py-5 transition-colors w-full sm:w-auto"
                    rippleColor="rgba(255,255,255,0.15)"
                    data-testid="btn-hero-tour"
                  >
                    TAKE A TOUR
                  </RippleButton>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
          </div>
        </motion.div>

        {/* Stat Ticker */}
        <div className="absolute bottom-0 w-full bg-primary/10 border-t border-primary/20 py-4 backdrop-blur-sm z-20 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap flex items-center gap-8">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-8 px-4 min-w-max">
                <span className="font-display text-xl tracking-widest text-primary">5+ TRAINING ZONES</span>
                <span className="text-foreground">•</span>
                <span className="font-display text-xl tracking-widest text-primary">100+ EQUIPMENT PIECES</span>
                <span className="text-foreground">•</span>
                <span className="font-display text-xl tracking-widest text-primary flex items-center gap-1"><Star size={16} fill="currentColor" /> 4.5 RATED</span>
                <span className="text-foreground">•</span>
                <span className="font-display text-xl tracking-widest text-primary">OPEN UNTIL 11 PM</span>
                <span className="text-foreground">•</span>
                <span className="font-display text-xl tracking-widest text-primary">B-17 ISLAMABAD</span>
                <span className="text-foreground">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="py-20 bg-background diagonal-divider">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <KineticText
                text="THE ZONES"
                as="h2"
                className="text-5xl md:text-6xl font-display text-foreground leading-none uppercase"
                delay={0.05}
              />
              <motion.div
                className="w-16 h-1 bg-primary mt-3"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.6 }}
              />
            </div>
            <Link to="/about" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold uppercase tracking-widest text-sm group">
              Explore All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 grid-flow-dense"
            style={{ gridAutoRows: 'clamp(160px, 22vw, 260px)' }}
          >
            {BENTO_CELLS.map((cell, i) => (
              <BentoCell key={i} cell={cell} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNT-UP STATS BAR ── */}
      <section className="bg-[#050505] border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display text-foreground mb-6 leading-none">
                <KineticText text="BUILT FOR RESULTS." as="span" className="block" delay={0.1} />
                <KineticText text="NOT EXCUSES." as="span" className="block text-primary" delay={0.45} />
              </h2>
              <div className="w-20 h-2 bg-primary mb-8" />
              <p className="text-lg text-muted-foreground mb-8">
                Welcome to Islamabad's premier fitness facility. Located in B-17, The Capital Gym is a gritty, results-driven environment built for real athletes. Whether your goal is weight loss, powerlifting, or functional fitness, we provide the elite equipment and atmosphere you need to push past your limits.
              </p>
              <Link to="/about">
                <button className="flex items-center gap-2 text-foreground font-display text-xl tracking-widest hover:text-primary transition-colors group" data-testid="btn-about-more">
                  READ OUR STORY <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </motion.div>
            <motion.div
              ref={aboutImgRef}
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[600px] bg-card overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
              {/* Scroll-linked parallax: image zooms in as section moves through viewport */}
              <motion.img
                src="/images/real-dumbbell-floor.png"
                alt="Gym Floor"
                className="w-full h-full object-cover grayscale opacity-80"
                style={{ scale: shouldReduce ? 1 : aboutImgScale }}
              />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 border border-primary/30 z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background diagonal-divider">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-6 py-3 border border-border mb-8">
            <span className="font-bold text-accent text-xl">4.5</span>
            <Star className="text-accent" fill="currentColor" size={20} />
            <span className="text-sm text-foreground uppercase tracking-wider font-bold">Google Reviews</span>
          </div>

          <div className="mb-12">
            <KineticText
              text="WHAT THEY'RE SAYING"
              as="h2"
              className="text-4xl md:text-5xl font-display text-foreground uppercase"
              delay={0.05}
              stagger={0.02}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Ali Raza", text: "Best gym in B-17. The equipment is top tier and the environment pushes you to work harder. The CrossFit area is insane." },
              { name: "Sarah K.", text: "Switched here for the weight loss program. The trainers actually care and the atmosphere is purely focused on results." },
              { name: "Usman M.", text: "Raw, industrial, and exactly what a real gym should be. No distractions, just heavy weights and good vibes." }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: shouldReduce ? 1 : 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1], delay: shouldReduce ? 0 : i * 0.1 }}
                className="bg-card p-8 border border-border"
                data-testid={`card-review-${i}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className={j < 4 || (i === 0 && j === 4) ? "text-accent" : "text-muted"} fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
                <p className="font-display tracking-widest text-foreground text-lg">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
