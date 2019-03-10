/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

interface SeoProps {
  title: string
  description: string,
  meta?: any[],
  keywords?: string[]
}

const Seo = (props: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }`
  );

  const metaDescription = props.description || site.siteMetadata.description;
  const title = props.title;
  const meta = props.meta || [];
  const keywords = props.keywords || [];

  return (
    <Helmet
      htmlAttributes={{
        lang: "en"
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ]
        .concat(
          keywords.length > 0
            ? {
              name: `keywords`,
              content: keywords.join(`, `)
            }
            : []
        )
        .concat(meta)}
      link={[
        {
          rel: "apple-touch-icon",
          sizes:"180x180",
          href: "../images/favicon/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes:"32x32",
          href: "../images/favicon/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes:"16x16",
          href: "../images/favicon/favicon-16x16.png"
        },
        {
          rel: "manifesto",
          href: "../images/favicon/site.webmanifest"
        }
      ]}
    />
  );
};

export default Seo;
