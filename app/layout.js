import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/global.css";
import ClientWrapper from "../components/ClientWrapper";
import { localBusinessJsonLd } from "@/lib/schema";
import { getServerGlobalSeo, getServerPageBySlug, getServerSiteSettings, getServerPublicContent } from "@/lib/cms-server";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading-next",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-next",
  display: "swap",
});

export async function generateMetadata() {
  try {
    const seo = getServerGlobalSeo();
    const homePage = getServerPageBySlug("home");
    const settings = getServerSiteSettings();

    const title = homePage?.seoTitle || seo.defaultTitle || `${settings.name || 'Ideate X'} — ${settings.tagline || 'Apps, Products & Digital Growth'}`;
    const description = homePage?.seoDescription || seo.defaultDescription || "We design, build and grow digital products, digital platforms and business systems.";

    const siteName = settings.name || "Ideate X";
    const image = homePage?.ogImage || seo.defaultOgImage || "/logo-ideatex.png";

    return {
      title,
      description,
      metadataBase: new URL(seo.canonicalBase || "https://ideatex.co.in"),
      alternates: { canonical: homePage?.canonicalUrl || "/" },
      openGraph: { title, description, url: "/", siteName, type: "website", locale: "en_US", images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
      robots: seo.robots || "index, follow",
    };
  } catch (err) {
    return {
      title: "Ideate X — Apps, Products & Digital Growth",
      description: "We design, build and grow digital products, digital platforms and business systems.",
    };
  }
}

export default function RootLayout({ children }) {
  const initialCmsData = getServerPublicContent();
  const seo = getServerGlobalSeo();
  const settings = getServerSiteSettings();
  const base = (seo.canonicalBase || "https://ideatex.co.in").replace(/\/+$/, "");
  const jsonLd = [
    localBusinessJsonLd(base, settings),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.name || "Ideate X",
      url: base,
    },
  ];

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <ClientWrapper initialCmsData={initialCmsData}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}

