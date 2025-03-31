import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'www.themealdb.com'
      },
      {
        protocol: "https",
        hostname: 'ss3.4sqi.net'
      }
      
    ]
  },
};

export default nextConfig;
