import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/DS",
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@constructpluseu/react"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
