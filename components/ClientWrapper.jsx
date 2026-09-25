"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import CustomCursor from './CustomCursor/CustomCursor';
import PageLoader from './PageLoader/PageLoader';
import PageMetaSync from './PageMetaSync/PageMetaSync';
import Chatbot from './Chatbot/Chatbot';

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
        <Footer />
      </ReactLenis>
    </CMSProvider>
  );
}

