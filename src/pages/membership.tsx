import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { Check, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TiltCard } from '@/components/tilt-card';
import { MagneticButton } from '@/components/magnetic-button';
import { RippleButton } from '@/components/ripple-button';

const PLANS = [
  {
    name: "BASIC",
    price: "3,500",
    period: "/mo",
    desc: "Access to the iron and the machines. No frills.",
    features: [
      "Full gym floor access",
      "All weight & cardio equipment",
      "Locker room access",
      "Open hours access"
    ],
    highlight: false
  },
  {
    name: "PRO",
    price: "5,500",
    period: "/mo",
    desc: "The standard for serious athletes wanting variety.",
    features: [
      "Everything in Basic",
      "Unlimited Group Classes",
      "CrossFit Box access",
      "Functional Training Area",
      "Dedicated locker"
    ],
    highlight: true
  },
  {
    name: "ELITE",
    price: "8,500",
    period: "/mo",
    desc: "Guided programming for guaranteed results.",
    features: [
      "Everything in Pro",
      "1 Personal Training Session/wk",
      "Customized Nutrition Plan",
      "Monthly body comp analysis",
      "Priority class booking"
    ],
    highlight: false
  }
];

const FAQS = [
  {
    q: "WHAT ARE YOUR OPENING HOURS?",
    a: "We are open Monday to Sunday, from 6:00 AM to 11:00 PM. No excuses."
  },
  {
    q: "DO YOU HAVE A JOINING FEE OR CONTRACTS?",
    a: "No hidden joining fees. We operate on month-to-month memberships because we believe our facility speaks for itself. You stay because you want to."
  },
  {
    q: "CAN I TRY THE GYM BEFORE JOINING?",
    a: "Yes. We offer a single-day guest pass for PKR 1,000. If you sign up for a membership that same day, we'll credit the 1,000 towards your first month."
  },
  {
    q: "DO YOU HAVE FEMALE-ONLY HOURS OR CLASSES?",
    a: "The Capital Gym is a mixed facility, but we maintain a strictly professional, respectful environment focused purely on training. We do offer specific female-only functional training class times. Contact us for the current schedule."
  }
];

function FaqItem({ faq, index, isOpen, onToggle }: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: 0.3 + index * 0.1 }}
      className="bg-secondary border border-border overflow-hidden"
    >
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
        onClick={onToggle}
        data-testid={`btn-faq-${index}`}
      >
        <span className="font-display text-xl tracking-wider text-foreground">{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
        >
          {isOpen ? <Minus className="text-primary shrink-0" /> : <Plus className="text-foreground shrink-0" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground text-lg border-t border-border/50 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PlanCard({ plan, index }: { plan: typeof PLANS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={plan.highlight ? 'transform md:-translate-y-4' : ''}
    >
      <TiltCard
        className={`relative bg-secondary border flex flex-col h-full ${plan.highlight ? 'border-primary shadow-[0_0_30px_rgba(255,61,46,0.15)]' : 'border-border'}`}
        maxAngle={6}
      >
        {plan.highlight && (
          <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 font-bold uppercase tracking-widest text-xs">
            Most Popular
          </div>
        )}
        
        <div className={`p-8 ${plan.highlight ? 'pt-12' : ''} border-b border-border`}>
          <h3 className="text-3xl font-display tracking-wider text-foreground mb-2">{plan.name}</h3>
          <p className="text-muted-foreground text-sm mb-6 h-10">{plan.desc}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-muted-foreground">PKR</span>
            <span className={`text-6xl font-display tracking-wider ${plan.highlight ? 'text-primary' : 'text-foreground'}`}>{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col">
          <ul className="space-y-4 mb-8 flex-1">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-start gap-3">
                <Check className="text-primary shrink-0 mt-0.5" size={18} />
                <span className="text-foreground font-bold text-sm tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
          
          <a href="https://wa.me/923175441707" target="_blank" rel="noreferrer" className="w-full">
            {plan.highlight ? (
              <MagneticButton className="w-full" strength={0.35}>
                <RippleButton
                  className="w-full font-display text-xl tracking-wider py-4 bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                  data-testid={`btn-plan-${plan.name.toLowerCase()}`}
                >
                  SELECT PLAN
                </RippleButton>
              </MagneticButton>
            ) : (
              <RippleButton
                className="w-full font-display text-xl tracking-wider py-4 bg-background text-foreground border border-border hover:border-primary transition-all"
                rippleColor="rgba(255,61,46,0.12)"
                data-testid={`btn-plan-${plan.name.toLowerCase()}`}
              >
                SELECT PLAN
              </RippleButton>
            )}
          </a>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Membership() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full bg-background pt-24 min-h-screen">
      <SEO title="Membership & Pricing" />
      
      <div className="container mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-display text-foreground leading-none mb-4 uppercase">
            CHOOSE YOUR <span className="text-primary">ARSENAL</span>
          </h1>
          <div className="w-24 h-2 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground uppercase font-bold tracking-widest">Straightforward pricing. No hidden fees.</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-4xl md:text-6xl font-display tracking-wider text-foreground mb-4 uppercase">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center bg-secondary border border-border p-10">
            <h3 className="text-3xl font-display tracking-wider text-foreground mb-4 uppercase">STILL HAVE QUESTIONS?</h3>
            <p className="text-muted-foreground mb-8">Reach out to us directly. We're here to help.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a href="https://wa.me/923175441707" target="_blank" rel="noreferrer">
                <RippleButton
                  className="bg-[#25D366] text-white font-display text-xl tracking-wider px-8 py-3 w-full sm:w-auto"
                  rippleColor="rgba(255,255,255,0.25)"
                  data-testid="btn-faq-whatsapp"
                >
                  WHATSAPP US
                </RippleButton>
               </a>
               <Link to="/contact">
                <RippleButton
                  className="bg-background border border-border hover:border-foreground text-foreground font-display text-xl tracking-wider px-8 py-3 transition-colors w-full sm:w-auto"
                  rippleColor="rgba(255,255,255,0.1)"
                  data-testid="btn-faq-contact"
                >
                  CONTACT FORM
                </RippleButton>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
