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
      // {
      //   source: "/:fallback",
      //   destination: "/",
      // },
    ];
  },
};

module.exports = withMDX(nextConfig);
