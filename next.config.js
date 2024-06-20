const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return [
      {
        source: "/(games|web|other)",
        destination: "/",
      },
      {
        source: "/(games|web|other)/:project",
        destination: "/",
      },
      {
        source: "/:fallback",
        destination: "/",
      },
    ];
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/project/:projectName",
        destination: "/#:projectName",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
