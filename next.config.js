/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["my.spline.design"],
  },
  env: {
    API: "http://172.19.0.1:3333",
    WS: "ws://172.19.0.1:3333/ws",
    URL: "http://172.19.0.1:3000",
  },
};

module.exports = nextConfig;
