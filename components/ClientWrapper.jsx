"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import dynamic from 'next/dynamic';
import PageLoader from './PageLoader/PageLoader';
import PageMetaSync from './PageMetaSync/PageMetaSync';

// Non-critical widgets load after the page is interactive
const CustomCursor = dynamic(() => import('./CustomCursor/CustomCursor'), { ssr: false });
const Chatbot = dynamic(() => import('./Chatbot/Chatbot'), { ssr: false });
const WhatsAppButton = dynamic(() => import('./WhatsAppButton/WhatsAppButton'), { ssr: false });

import { CMSProvider } from '@/lib/cms-client';

export default function ClientWrapper({ initialCmsData, children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <CMSProvider initialData={initialCmsData}>
        {children}
      </CMSProvider>
    );
  }

  return (
    <CMSProvider initialData={initialCmsData}>
      <ReactLenis root options={{ lerp: 0.12, duration: 1.0, smoothWheel: true, syncTouch: false, wheelMultiplier: 1.0 }}>
        <PageMetaSync />
        <PageLoader />
        <CustomCursor />
        <Navbar />
        {children}
        <Chatbot />
        <WhatsAppButton />
        <Footer />
      </ReactLenis>
    </CMSProvider>
  );
}

