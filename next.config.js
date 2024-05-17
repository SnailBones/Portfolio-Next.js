const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
