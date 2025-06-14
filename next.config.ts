import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['url.kr', 'your-temp-domain.com', 'buly.kr'],
  },
  eslint: {
    ignoreDuringBuilds: true, // 이 줄을 추가하세요!
  },
};

export default nextConfig;
