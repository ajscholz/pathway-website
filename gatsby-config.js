const path = require("path")
const { createProxyMiddleware } = require("http-proxy-middleware")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: "eval-source-map",
  })
}

module.exports = {
  siteMetadata: {
    title: `Pathway Community Church`,
    description: `A life-giving church in Marietta, Ohio. No matter where you've been you belong here.`,
    author: `@pathwaychurch`,
    url: `https://pathwaymarietta.com`,
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions",

      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          {
            resolve: `gatsby-remark-absolute-link-catch`,
            options: {
              absoluteUrls: [
                //Here I am using pretty much every protocol combination you could expect for a www... site
                "https://pathwaymarietta.com",
                "https://www.pathwaymarietta.com",
                "http://pathwaymarietta.com",
                "http://www.pathwaymarietta.com",
              ],
              developmentLocation: `http://localhost:8000`, //optional, defaults to http://localhost:8000
            },
          },
          `gatsby-remark-line-breaks`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          src: path.resolve(__dirname, "src"),
          components: path.resolve(__dirname, "src/components"),
          assets: path.resolve(__dirname, "src/assets"),
          pages: path.resolve(__dirname, "src/pages"),
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`${__dirname}/src/components/layout`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pathway Community Church`,
        short_name: `Pathway`,
        start_url: `https://pathwaymarietta.com/?utm_source=pwa`,
        background_color: `#f8f8ff`,
        theme_color: `#f8f8ff`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
