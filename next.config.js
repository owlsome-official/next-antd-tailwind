/** @type {import('next').NextConfig} */

const { defaultConfig } = require("next/dist/server/config-shared");
const pkg = require("./package.json");

const cspHeader = `
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const baseSecurityHeader = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(),autoplay=(),camera=(),display-capture=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Accel-Buffering",
    value: "no",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "x-powered-by",
    value: "owlsome-official/next-antd-tailwind",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          ...baseSecurityHeader,
          {
            key: "Content-Security-Policy",
            value: cspHeader.replaceAll("\n", ""),
          },
          {
            key: "X-App-Version",
            value: pkg.version,
          },
        ],
      },
    ];
  },
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  generateBuildId: async () => {
    return (
      process.env.GIT_COMMIT_SHA ||
      process.env.GIT_COMMIT_HASH ||
      process.env.GIT_HASH ||
      pkg.version
    );
  },
  transpilePackages: [
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cache-handler.mjs")
      : defaultConfig.cacheHandler,
  cacheMaxMemorySize:
    process.env.NODE_ENV === "production"
      ? 0
      : defaultConfig.cacheMaxMemorySize,
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
