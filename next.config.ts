import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/proxy_api/:path*',
        destination: 'http://smartlibrary.runasp.net/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'smartlibrary.runasp.net',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;