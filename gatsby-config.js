const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Pathway Community Church`,
    description: `A church for you in Marietta, Ohio.`,
    author: `@pathwaychurch`,
    siteUrl: `https://www.pathwaymarietta.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
        // start_url: `https://pathwaymarietta.com/pwa-index?utm_source=pwa`,
        start_url: `/`,
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
