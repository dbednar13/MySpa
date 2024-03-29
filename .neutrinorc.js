const react = require('@neutrinojs/react');

module.exports = {
  use: [
    react({
      hot: true,
      html: { title: 'My Spa Assistant' },
      devtool: {
        development: 'cheap-module-source-map', // Changing "eval-source-map" to cheap-module-source-map per https://reactjs.org/docs/cross-origin-errors.html
      },
    }),
  ],
};
