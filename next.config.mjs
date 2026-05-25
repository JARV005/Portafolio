/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Portafolio",
  assetPrefix: "/Portafolio/",

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
