const path = require("path");

const webpackBase = require("../webpack/webpack.base");

module.exports = {
    addons: [
        "storybook-readme",
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
        "@storybook/addon-docs",
        "@storybook/addon-knobs",
        "@storybook/addon-links",
        {
          name: "@storybook/addon-storysource",
          options: {
            parser: "typescript",
            rule: {
              include: [path.resolve(__dirname, "../packages")],
            }
          }
        }
    ],
    stories: ["../packages/**/*.stories.@(tsx)"],
    typescript: {
      check: true,
      checkOptions: {},
      reactDocgen: "react-docgen-typescript",
    },
    webpackFinal: async (config) => {
      config.devtool = webpackBase.getDevTool();

      config.module.rules = config.module.rules.concat(webpackBase.getRules());
      config.plugins = config.plugins.concat(webpackBase.getPlugins());
      config.module.rules[0].use[0].options.sourceType = "unambiguous";

      return {
          ...config,
          resolve: {
              ...config.resolve,
              alias: {
                ...config.resolve.alias,
                "core-js/modules": "@storybook/core/node_modules/core-js/modules",
                "core-js/features": "@storybook/core/node_modules/core-js/features",
              },
              extensions: [
                  ...config.resolve.extensions,
                  ...webpackBase.getExtensions()
              ]
          }
      };
    },
};
