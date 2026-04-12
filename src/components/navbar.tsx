import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';
import { RippleButton } from '@/components/ripple-button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname: location } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Membership', path: '/membership' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="group flex items-baseline gap-1" data-testid="link-home-logo">
          <span className="text-3xl md:text-4xl font-display tracking-wider text-foreground">THE CAPITAL GYM</span>
          <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`relative group text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary pb-1 ${
                  location === link.path ? 'text-primary' : 'text-foreground'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-primary origin-left transition-transform duration-300 ease-out ${
                    location === link.path ? 'scale-x-100 w-full' : 'scale-x-0 w-full group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>
          <Link to="/membership">
            <MagneticButton strength={0.4}>
              <RippleButton
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-xl tracking-wider px-8 py-2 rounded-none neon-glow"
                data-testid="btn-join-now"
              >
                JOIN NOW
              </RippleButton>
            </MagneticButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="btn-mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-background z-40 flex flex-col items-center pt-12 gap-8 md:hidden h-screen">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-2xl font-display tracking-widest transition-colors hover:text-primary ${
                location === link.path ? 'text-primary' : 'text-foreground'
              }`}
              data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/membership" className="mt-4">
            <RippleButton
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl tracking-wider px-12 py-6 rounded-none neon-glow"
              data-testid="btn-mobile-join-now"
            >
              JOIN NOW
            </RippleButton>
          </Link>
        </div>
      )}
    </nav>
  );
}
