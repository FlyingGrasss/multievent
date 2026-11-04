import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/genc-muzik-etkinligi", destination: "/bodrum-forte-muzik-festivali", permanent: false },
      { source: "/tr/genc-muzik-etkinligi", destination: "/tr/bodrum-forte-muzik-festivali", permanent: false },
      { source: "/en/genc-muzik-etkinligi", destination: "/en/bodrum-forte-muzik-festivali", permanent: false },
      { source: "/bodrum-piyano-festivali", destination: "/bodrum-forte-muzik-festivali", permanent: false },
      { source: "/tr/bodrum-piyano-festivali", destination: "/tr/bodrum-forte-muzik-festivali", permanent: false },
      { source: "/en/bodrum-piyano-festivali", destination: "/en/bodrum-forte-muzik-festivali", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
