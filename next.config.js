/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/students",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
