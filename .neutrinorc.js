const react = require('@neutrinojs/react');

module.exports = {
  use: [
    react({
      html: { title: 'My Spa Assistant' },
      devtool: {
        production: 'source-map',
        development: 'cheap-module-source-map', // Changing "eval-source-map" to cheap-module-source-map per https://reactjs.org/docs/cross-origin-errors.html
      },
    }),
  ],
};
