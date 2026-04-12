import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-display tracking-wider text-foreground">THE CAPITAL GYM</span>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mb-6">Train Harder. Burn Smarter.</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/thecapitalgymofficial" target="_blank" rel="noreferrer" className="w-10 h-10 bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="link-social-ig">
                <FaInstagram size={20} />
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 bg-secondary px-3 py-2 border border-border">
              <span className="font-bold text-accent">4.5★</span>
              <span className="text-xs text-muted-foreground">Google (35 Reviews)</span>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">QUICK LINKS</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Programs', 'Membership', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase font-bold tracking-wider" data-testid={`link-footer-${item.toLowerCase()}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">PROGRAMS</h4>
            <ul className="flex flex-col gap-3">
              {['CrossFit Classes', 'Weight Loss Program', 'Strength & Powerlifting', 'Functional Training', 'Personal Training'].map((item) => (
                <li key={item}>
                  <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold tracking-wide" data-testid={`link-footer-program-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-display text-xl tracking-wider mb-6 text-foreground">CONTACT</h4>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <p>
                <strong className="block text-foreground mb-1 uppercase text-xs tracking-wider">Address</strong>
                Street 46, Block C, Multi Gardens<br/>
                B-17, Islamabad<br/>
                (Capital Square Mall)
              </p>
              <p>
                <strong className="block text-foreground mb-1 uppercase text-xs tracking-wider">Phone & WhatsApp</strong>
                0317 5441707
              </p>
              <p>
                <strong className="block text-foreground mb-1 uppercase text-xs tracking-wider">Hours</strong>
                Open daily until 11 PM
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Capital Gym. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Built for Results.</p>
            <Link to="/admin" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors" data-testid="link-admin">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
