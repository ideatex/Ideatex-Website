"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCMSData } from "@/lib/cms-client";

export default function PageMetaSync() {
  const pathname = usePathname();
  const cms = useCMSData();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    let targetTitle = "";
    let targetDescription = "";

    const pages = cms.pages || [];
    const globalSeo = cms.seo || {};
    const defaultGlobalTitle = globalSeo.defaultTitle || "Ideate X — Software, Products & Digital Growth";
    const defaultGlobalDesc = globalSeo.defaultDescription || "We design, build and grow software products, digital platforms and business systems.";

    // 1. Homepage
    if (pathname === "/" || pathname === "/home") {
      const homePage = pages.find((p) => p.slug === "home");
      targetTitle = homePage?.seoTitle || defaultGlobalTitle;
      targetDescription = homePage?.seoDescription || defaultGlobalDesc;
    }
    // 2. Service detail
    else if (pathname.startsWith("/services/")) {
      const slug = pathname.replace("/services/", "").split("/")[0];
      const service = (cms.services || []).find((s) => s.slug === slug);
      if (service) {
        targetTitle = service.seoTitle || `${service.title} — Ideate X`;
        targetDescription = service.seoDescription || service.heroDescription || service.tagline || defaultGlobalDesc;
      }
    }
    // 3. Services list
    else if (pathname === "/services") {
      const srvPage = pages.find((p) => p.slug === "services");
      targetTitle = srvPage?.seoTitle || "Our Services — Ideate X";
      targetDescription = srvPage?.seoDescription || defaultGlobalDesc;
    }
    // 4. Case study detail
    else if (pathname.startsWith("/case-studies/")) {
      const slug = pathname.replace("/case-studies/", "").split("/")[0];
      const study = (cms.caseStudies || []).find((c) => c.slug === slug);
      if (study) {
        targetTitle = study.seoTitle || `${study.title} — Ideate X Case Study`;
        targetDescription = study.seoDescription || study.subtitle || study.summary || defaultGlobalDesc;
      }
    }
    // 5. Case studies list
    else if (pathname === "/case-studies") {
      const csPage = pages.find((p) => p.slug === "case-studies");
      targetTitle = csPage?.seoTitle || "Technical Case Studies — Ideate X";
      targetDescription = csPage?.seoDescription || defaultGlobalDesc;
    }
    // 6. Blog detail
    else if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "").split("/")[0];
      const post = (cms.insights || []).find((i) => i.slug === slug);
      if (post) {
        targetTitle = post.seoTitle || `${post.title} — Technical Insights | Ideate X`;
        targetDescription = post.seoDescription || post.subtitle || post.excerpt || defaultGlobalDesc;
      }
    }
    // 7. Blog list
    else if (pathname === "/blog") {
      const blogPage = pages.find((p) => p.slug === "blog");
      targetTitle = blogPage?.seoTitle || "Insights & Engineering Blog — Ideate X";
      targetDescription = blogPage?.seoDescription || defaultGlobalDesc;
    }
    // 8. Other named pages (about, portfolio, contact, privacy, terms, cookie-policy)
    else {
      const cleanSlug = pathname.replace(/^\//, "").split("/")[0];
      const matchedPage = pages.find((p) => p.slug === cleanSlug);
      if (matchedPage) {
        targetTitle = matchedPage.seoTitle || `${matchedPage.title} — Ideate X`;
        targetDescription = matchedPage.seoDescription || defaultGlobalDesc;
      } else if (cleanSlug === "portfolio") {
        targetTitle = "Portfolio & Work — Ideate X";
      } else if (cleanSlug === "about") {
        targetTitle = "About Us — Ideate X";
      } else if (cleanSlug === "contact") {
        targetTitle = "Contact Us — Start a Project | Ideate X";
      } else if (cleanSlug === "privacy") {
        targetTitle = "Privacy Policy — Ideate X";
      } else if (cleanSlug === "terms") {
        targetTitle = "Terms of Service — Ideate X";
      } else if (cleanSlug === "cookie-policy") {
        targetTitle = "Cookie Policy — Ideate X";
      } else {
        targetTitle = defaultGlobalTitle;
      }
    }

    if (targetTitle && document.title !== targetTitle) {
      document.title = targetTitle;
    }

    if (targetDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", targetDescription);
      }
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && targetTitle) {
        ogTitle.setAttribute("content", targetTitle);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && targetDescription) {
        ogDesc.setAttribute("content", targetDescription);
      }
    }
  }, [pathname, cms.pages, cms.seo, cms.services, cms.caseStudies, cms.insights, cms.settings]);

  return null;
}
