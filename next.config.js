/** @type {import('next').NextConfig} */
const path = require("path");
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  compiler: {
    removeConsole: true, // suppress all logs as default
    reactRemoveProperties: true, // remove react properties (Default: ^data-test)
  },
  reactStrictMode: true,
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["assets"] = path.resolve(__dirname, "./src/assets/");
    config.resolve.alias["components"] = path.resolve(
      __dirname,
      "./src/components/"
    );
    config.resolve.alias["layouts"] = path.resolve(__dirname, "./src/layouts/");
    config.resolve.alias["pages"] = path.resolve(__dirname, "./src/pages/");
    config.resolve.alias["styles"] = path.resolve(__dirname, "./src/styles/");
    config.resolve.alias["utils"] = path.resolve(__dirname, "./src/utils/");
    return config;
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
