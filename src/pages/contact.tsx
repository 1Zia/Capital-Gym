import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SEO } from '@/components/seo';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from '@/components/magnetic-button';
import { RippleButton } from '@/components/ripple-button';

function FocusInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative">
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className={`w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${className}`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

function FocusTextarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative">
      <textarea
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className={`w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none ${className}`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

function FocusSelect({ className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative">
      <select
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className={`w-full bg-background border border-border px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none ${className}`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default function Contact() {
  return (
    <div className="w-full bg-background pt-24 min-h-screen">
      <SEO title="Contact" />
      
      <div className="container mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-display text-foreground leading-none mb-4 uppercase">
            GET IN <span className="text-primary">TOUCH</span>
          </h1>
          <div className="w-24 h-2 bg-primary"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 border border-border relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <h2 className="text-3xl font-display tracking-wider text-foreground mb-8">SEND US A MESSAGE</h2>
            
            <form action="https://formspree.io/f/xdkgnpwj" method="POST" className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                <FocusInput
                  type="text"
                  id="name"
                  name="name"
                  required
                  data-testid="input-contact-name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Phone Number</label>
                  <FocusInput
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    data-testid="input-contact-phone"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                  <FocusInput
                    type="email"
                    id="email"
                    name="email"
                    data-testid="input-contact-email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="enquiry" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Enquiry Type</label>
                <FocusSelect
                  id="enquiry"
                  name="enquiry"
                  data-testid="select-contact-type"
                >
                  <option value="Membership">Membership Details</option>
                  <option value="Personal Training">Personal Training</option>
                  <option value="CrossFit">CrossFit Classes</option>
                  <option value="General">General Enquiry</option>
                </FocusSelect>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Message</label>
                <FocusTextarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  data-testid="input-contact-message"
                />
              </div>
              
              <MagneticButton className="w-full" strength={0.25}>
                <RippleButton
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl tracking-wider py-4 neon-glow transition-all"
                  data-testid="btn-contact-submit"
                >
                  SEND ENQUIRY
                </RippleButton>
              </MagneticButton>
            </form>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-secondary p-8 border border-border">
              <h2 className="text-3xl font-display tracking-wider text-foreground mb-8">VISIT THE GYM</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display tracking-widest text-xl text-foreground">LOCATION</h3>
                    <p className="text-muted-foreground mt-1">
                      Street 46, Block C, Multi Gardens<br/>
                      B-17, Islamabad<br/>
                      (Capital Square Mall)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display tracking-widest text-xl text-foreground">PHONE & WHATSAPP</h3>
                    <p className="text-muted-foreground mt-1 font-mono">0317 5441707</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display tracking-widest text-xl text-foreground">HOURS</h3>
                    <p className="text-muted-foreground mt-1">
                      Monday - Sunday<br/>
                      6:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="border border-border overflow-hidden h-[300px]">
              <iframe
                title="The Capital Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.0!2d72.9817!3d33.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfc16001000001%3A0x0!2sCapital+Square+Mall%2C+B-17%2C+Islamabad!5e0!3m2!1sen!2spk!4v1617000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="map-embed"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/?q=Capital+Square+Mall+B-17+Islamabad"
              target="_blank"
              rel="noreferrer"
              className="block"
              data-testid="link-directions"
            >
              <RippleButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display text-xl tracking-wider py-3 text-center neon-glow transition-all">
                GET DIRECTIONS
              </RippleButton>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
