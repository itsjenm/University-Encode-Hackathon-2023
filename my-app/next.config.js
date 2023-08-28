/** @type {import('next').NextConfig} */


const nextConfig = {
  webpack: (config,{ buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  
  distDir: "build",
};

module.exports = nextConfig;

