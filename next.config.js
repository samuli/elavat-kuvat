const path = require('path');
const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  webpack5: true,
  experimental: {
//    optimizeCss: true,
  },

  webpack: (config, { dev, webpack, buildId, isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId)
      })
    );

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    if (isServer) {
      return {
        ...config,
        entry() {
          return config.entry().then((entry) => ({
            ...entry,
            download: path.resolve(process.cwd(), 'lib/download.js')
          }));
        }
      };
    }

    return config
  },
});
