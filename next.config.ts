import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'example.com',
      'assets.aceternity.com', // Add the hostname here
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https", // Add a remotePattern for assets.aceternity.com if needed
        hostname: "assets.aceternity.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
