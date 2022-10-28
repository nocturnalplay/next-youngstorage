/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["my.spline.design"],
  },
  env: {
    API: "http://localhost:3333",
    URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
