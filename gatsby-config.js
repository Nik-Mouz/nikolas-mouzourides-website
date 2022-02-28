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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // Add any options here
      }
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
        icon: "src/images/favicon.png",
        background_color: `#0e0e0e`,
        theme_color: `#0e0e0e`,
        display: `minimal-ui`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blogs`,
        name: "markdown-pages"
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'nikmouz.dev',
        protocol: "https",
        hostname: "nikmouz.dev",
        acl: null
      },
    }
  ]
};
