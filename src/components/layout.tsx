import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { WhatsAppButton } from './whatsapp-button';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="noise-overlay"></div>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <div className="noise-overlay"></div>
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
