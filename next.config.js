const path = require('path');

module.exports = {
  experimental: {
    optimizeCss: true,
  },

  webpack: (config, { webpack, buildId, isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId)
      })
    );
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
};
