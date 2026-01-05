import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'smartlibrary.runasp.net',
        pathname: '/images/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://smartlibrary.runasp.net/api/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'http://smartlibrary.runasp.net/images/:path*',
      },
    ];
  },
};

export default nextConfig;