const compose = require('next-compose');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withSass = require('@zeit/next-sass');

module.exports = compose([
  [withFonts, {}],
  [withCSS, {}],
  [withSass, {}],
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      });

      return config;
    }
  }
]);
