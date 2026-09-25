import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "../styles/global.css";
import ClientWrapper from "../components/ClientWrapper";
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

    const title = homePage?.seoTitle || seo.defaultTitle || `${settings.name || 'Ideate X'} — ${settings.tagline || 'Software, Products & Digital Growth'}`;
    const description = homePage?.seoDescription || seo.defaultDescription || "We design, build and grow software products, digital platforms and business systems.";

    return {
      title,
      description,
      metadataBase: new URL(seo.canonicalBase || "https://ideatex.co.in"),
      openGraph: {
        title,
        description,
        images: [seo.defaultOgImage || "/logo-ideatex.png"],
      },
      robots: seo.robots || "index, follow",
    };
  } catch (err) {
    return {
      title: "Ideate X — Software, Products & Digital Growth",
      description: "We design, build and grow software products, digital platforms and business systems.",
    };
  }
}

export default function RootLayout({ children }) {
  const initialCmsData = getServerPublicContent();

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ClientWrapper initialCmsData={initialCmsData}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}

