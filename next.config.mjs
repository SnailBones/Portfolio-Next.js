// import withMDX from "@next/mdx";
import createMDX from "@next/mdx";

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
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
