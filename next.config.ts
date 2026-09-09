import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This build is a static showcase, so keep the dev overlay out of demos.
  devIndicators: false,
  agentRules: false,
};

export default nextConfig;
