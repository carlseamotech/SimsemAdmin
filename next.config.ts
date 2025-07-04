import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "parsefiles.back4app.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env:{
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack"],
    // });
    return config;
  },
};

export default nextConfig;
