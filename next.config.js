/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}
 
module.exports = nextConfig

// const withPWA = require ("next-pwa") ({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === "development",
// });

// module.exports = withPWA ({
//   ...nextConfig,
//   reactStrictMode: true,
// });
