const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/project",
          destination: "/",
        },
        {
          source: "/project/:project",
          destination: "/",
        },
      ],
    };
  },
};

module.exports = withMDX(nextConfig);
