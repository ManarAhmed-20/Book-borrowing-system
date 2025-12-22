const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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