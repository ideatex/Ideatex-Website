/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    // Retired service pages now send visitors to the matching section of the Services page
    return [
      { source: '/services/software-ai-product-development', destination: '/services#development', permanent: true },
      { source: '/services/digital-marketing', destination: '/services#marketing', permanent: true },
      { source: '/services/creative-production', destination: '/services#creative', permanent: true },
      { source: '/services/hosting-deployment-maintenance', destination: '/services', permanent: true },
      { source: '/services/product-strategy-consulting', destination: '/services', permanent: true },
      { source: '/services/ad-film-production', destination: '/services#creative', permanent: true },
    ];
  },
  async headers() {
    // Static images from /public are otherwise re-validated on every visit
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];
    return [
      { source: '/clients/:path*', headers: cache },
      { source: '/clients%20logos/:path*', headers: cache },
      { source: '/case-studies/:path*.(png|jpg|jpeg|webp|avif)', headers: cache },
      { source: '/:file(logo-ideatex.png|sankara.png|sudharsan.jpg|amal.jpg)', headers: cache },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
