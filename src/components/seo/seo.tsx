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
    />
  );
};

export default Seo;
