"use client";

import React from "react";
import Link from "next/link";
import ImmersiveFullscreenNav from "../ui/immersive-fullscreen-nav";
import Logo from "../Logo/Logo";
import { useCMSData } from "../../lib/cms-client";
import { COMPANY_DETAILS } from "../../constants/contactInfo";

const defaultNavLinks = [
  { path: "/portfolio", label: "Work" },
  { path: "/services", label: "Services" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/blog", label: "Insights" },
  { path: "/about", label: "About" },
];

const NAV_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=640&auto=format&q=75&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=640&auto=format&q=75&fit=crop",
];
const SOCIAL_TYPES = ["instagram", "facebook", "twitter", "linkedin"];

export default function Navbar() {
  const cms = useCMSData();

  const navLinks =
    cms.navigation?.header && cms.navigation.header.length > 0
      ? cms.navigation.header.map((item) => ({ path: item.url, label: item.label }))
      : defaultNavLinks;

  const socialLinks = cms.settings?.socialLinks || {};
  const socials = SOCIAL_TYPES.filter((type) => socialLinks[type]).map((type) => ({ type, href: socialLinks[type] }));

  const { city, country } = COMPANY_DETAILS.address;

  return (
    <ImmersiveFullscreenNav
      brand={
        <Link href="/" aria-label="Ideate X Home">
          <Logo size={64} showText={true} />
        </Link>
      }
      navConfig={{
        clipOrigin: "bottom",
        overlayBg: "var(--bg-primary)",
        headerOpenColor: "#ffffff",
        openDuration: 1.2,
        closeDuration: 1.2,
      }}
      navContent={{
        agencyName: "",
        tagline: "Create. Grow. Build.",
        location: `${city}, ${country}`,
        links: navLinks.map(({ path, label }) => ({ href: path, label })),
        images: NAV_IMAGES,
        socials,
      }}
    />
  );
}

export { Navbar };
