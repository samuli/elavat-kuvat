const encodeFacet = value => value.replace(/\s\&\s/g, ' %26 ');

module.exports = {
  siteUrl: 'https://www.elavatkuvat.fi',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    return {
      loc: encodeFacet(path),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  }
};
