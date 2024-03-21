/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/communitiesplatform-pictures/**",
      },
    ],
  },
  redirects: [
    {
      source: "/themartin",
      destination: "/the-martin",
      permanent: true,
    },
    {
      source: "/windsor",
      destination: "/windsor-dogpatch",
      permanent: true,
    },
    {
      source: "/2290third",
      destination: "/2290-third",
      permanent: true,
    },
    {
      source: "/777tenn",
      destination: "/777-tenn",
      permanent: true,
    },
    {
      source: "/potrerolaunch",
      destination: "/potrero-launch",
      permanent: true,
    },
    {
      source: "/thegantry",
      destination: "/the-gantry",
      permanent: true,
    },
    {
      source: "/themariposa",
      destination: "/the-mariposa",
      permanent: true,
    },
    {
      source: "/potrerolaunch",
      destination: "/potrero-launch",
      permanent: true,
    },
  ],
};

export default nextConfig;
