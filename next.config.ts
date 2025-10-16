import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/coming-soon",
        permanent: false,
      },
      {
        source: "/((?!coming-soon).*)",
        destination: "/coming-soon",
        permanent: false,
      },
    ];
  },
  output: "export",
};

export default nextConfig;
