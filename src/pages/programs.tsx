import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Shield, Flame, Target } from 'lucide-react';
import { TiltCard } from '@/components/tilt-card';
import { MagneticButton } from '@/components/magnetic-button';
import { RippleButton } from '@/components/ripple-button';

const PROGRAMS = [
  {
    id: "crossfit",
    title: "CROSSFIT CLASSES",
    icon: <Activity size={32} className="text-primary" />,
    desc: "High-intensity functional movement. Group classes led by expert coaching focused on gymnastics, weightlifting, and metabolic conditioning.",
    difficulty: "INTENSE",
    details: ["Daily WODs", "Olympic Lifting Focus", "Team Environment"]
  },
  {
    id: "weight-loss",
    title: "WEIGHT LOSS PROGRAM",
    icon: <Flame size={32} className="text-primary" />,
    desc: "Structured fat-loss programming combining targeted cardiovascular work with resistance training to preserve muscle mass while shredding fat.",
    difficulty: "ALL LEVELS",
    details: ["Nutrition Guidance", "Cardio + Resistance", "Measurable Tracking"]
  },
  {
    id: "strength",
    title: "STRENGTH & POWERLIFTING",
    icon: <Shield size={32} className="text-primary" />,
    desc: "Focus on the big three: Squat, Bench, Deadlift. Programs built around progressive overload utilizing our heavy-duty racks and calibrated plates.",
    difficulty: "ADVANCED",
    details: ["Progressive Overload", "1RM Testing", "Technique Clinics"]
  },
  {
    id: "functional",
    title: "FUNCTIONAL TRAINING",
    icon: <Zap size={32} className="text-primary" />,
    desc: "Athletic conditioning utilizing battle ropes, sleds, medicine balls, and our signature SWAY sandbags to build explosive real-world power.",
    difficulty: "INTERMEDIATE",
    details: ["SWAY Equipment", "Agility Work", "Explosive Power"]
  },
  {
    id: "personal",
    title: "PERSONAL TRAINING",
    icon: <Target size={32} className="text-primary" />,
    desc: "1-on-1 dedicated coaching. A completely customized plan based on your exact biomechanics, goals, and lifestyle.",
    difficulty: "CUSTOM",
    details: ["1-on-1 Sessions", "Customized Plans", "Accountability"]
  }
];

function ProgramCard({ program, delay }: { program: typeof PROGRAMS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <TiltCard className="bg-secondary border border-border flex flex-col h-full card-hover-glow transition-all group" maxAngle={6}>
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-background border border-border flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
              {program.icon}
            </div>
            <span className="bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border">
              {program.difficulty}
            </span>
          </div>
          
          <h3 className="text-3xl font-display tracking-wider text-foreground mb-4 uppercase">{program.title}</h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {program.desc}
          </p>
          
          <ul className="space-y-3 mb-8">
            {program.details.map((detail, j) => (
              <li key={j} className="flex items-center gap-3 text-sm uppercase tracking-wider font-bold text-foreground">
                <div className="w-1.5 h-1.5 bg-primary"></div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-8 pt-0 mt-auto">
          <Link to="/contact">
            <RippleButton
              className="w-full bg-background border border-border hover:border-primary text-foreground font-display text-xl tracking-wider py-4 flex items-center justify-center gap-2 group/btn transition-colors"
              rippleColor="rgba(255,61,46,0.15)"
              data-testid={`btn-enquire-${program.id}`}
            >
              ENQUIRE NOW <ArrowRight className="text-primary group-hover/btn:translate-x-1 transition-transform" size={20} />
            </RippleButton>
          </Link>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <div className="w-full bg-background pt-24 min-h-screen">
      <SEO title="Training Programs" />
      
      <div className="container mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <h1 className="text-6xl md:text-8xl font-display text-foreground leading-none mb-4 uppercase">
            TRAINING <span className="text-primary">PROGRAMS</span>
          </h1>
          <div className="w-24 h-2 bg-primary mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.id} program={program} delay={i * 0.1} />
          ))}
          
          {/* CTA Card */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: PROGRAMS.length * 0.1 }}
             className="bg-primary border-none flex flex-col h-full justify-center p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/images/real-dumbbell-floor.png')] bg-cover mix-blend-overlay opacity-30"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-display tracking-wider text-primary-foreground mb-4 uppercase">NOT SURE WHERE TO START?</h3>
              <p className="text-primary-foreground/90 font-bold mb-8 uppercase tracking-widest">
                Drop by for a free consultation.
              </p>
              <Link to="/contact">
                <MagneticButton strength={0.4}>
                  <RippleButton
                    className="bg-background text-foreground font-display text-2xl tracking-wider px-8 py-4 neon-glow"
                    rippleColor="rgba(255,255,255,0.2)"
                    data-testid="btn-programs-visit"
                  >
                    VISIT THE GYM
                  </RippleButton>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
