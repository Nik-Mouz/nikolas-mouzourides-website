module.exports = {
  siteMetadata: {
    title: `nikmouz.dev`,
    description: `Personal website of Nikolas Mouzourides`,
    author: `@nik-mouz`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    "gatsby-plugin-typescript-checker",
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#3f51b5`,
        theme_color: `#3f51b5`,
        display: `minimal-ui`
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: 'auto',
        lang: 'en-GB',
        background: '#3f51b5',
        theme_color: '#3f51b5',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: true,
          yandex: false,
          windows: false
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
