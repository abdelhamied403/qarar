require('dotenv').config();
const compose = require('next-compose');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = compose([
    [withFonts, {}],
    [withCSS, {}],
    [withSass, {}],
    [withLess, {}],
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
        config.plugins.push(
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
          })
        );
        return config;
      },
      i18n: {
        localeDetection: false
      }
    }
  ]);
