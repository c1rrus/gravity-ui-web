module.exports = {
  plugins: [
    '@buildit/semantic-release-lerna-analyzer',
    '@buildit/semantic-release-lerna-release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};
