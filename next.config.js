const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    basePath: "/demo",
};

module.exports = withMDX(nextConfig);
