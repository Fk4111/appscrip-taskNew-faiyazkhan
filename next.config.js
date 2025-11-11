// next.config.js
// ye codes maine chatgpt ki help se likha i was unable to add paths isliye deployment successful hua lekin image show nh kr rhi thi 

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

