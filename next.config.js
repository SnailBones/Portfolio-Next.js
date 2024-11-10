const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/project/:project",
          destination: "/",
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/project",
        destination: "/",
        permanent: false,
      },
      {
        source: "/games/:project",
        destination: "/project/:project",
        permanent: false,
      },
      {
        source: "/web/:project",
        destination: "/project/:project",
        permanent: false,
      },
      {
        source: "/other/:project",
        destination: "/project/:project",
        permanent: false,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
