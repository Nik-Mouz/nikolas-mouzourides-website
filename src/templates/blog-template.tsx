import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo/seo";
import Layout from "../components/layout/layout";
import { FluidObject } from "gatsby-image";
import { Frontmatter } from "../components/BlogProps.state";

interface Props {
  data: {
    markdownRemark: {
      frontmatter: Frontmatter;
      html: string;
    }
  }
}

const BlogTemplate = (props: Props) => {
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;
  const hero = frontmatter.hero.childImageSharp.fluid;
  return (
    <>
      <Layout heroImage={hero}>
        <Seo title={frontmatter.title} description={frontmatter.description}/>
        <h1 className="pb-2">{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        hero {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default BlogTemplate;