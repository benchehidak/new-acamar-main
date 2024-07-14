
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:9400"],
      // allowedForwardedHosts: ["localhost:3000"],
      // ^ You might have to use this property depending on your exact version.
    }
  }
};

 module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }
 
// module.exports = nextConfig

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
