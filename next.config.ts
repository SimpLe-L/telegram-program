import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'turquoise-real-jellyfish-905.mypinata.cloud',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
