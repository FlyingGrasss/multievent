import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/genc-muzik-etkinligi", destination: "/bodrum-piyano-festivali", permanent: false },
      { source: "/tr/genc-muzik-etkinligi", destination: "/tr/bodrum-piyano-festivali", permanent: false },
      { source: "/en/genc-muzik-etkinligi", destination: "/en/bodrum-piyano-festivali", permanent: false },
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
