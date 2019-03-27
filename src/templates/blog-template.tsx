import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo/seo";
import Layout from "../components/layout/layout";
import Img, { FluidObject } from "gatsby-image";

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        description: string;
        path: string;
        hero: {
          childImageSharp: {
            fluid: FluidObject;
          }
        };
      };
      html: string;
    }
  }
}

const BlogTemplate = (props: Props) => {
  console.log(props);
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Layout
        heroImage={
          <Img className="hero" imgStyle={{height: 400, objectPosition: "bottom" }} fadeIn={true}
               fluid={frontmatter.hero.childImageSharp.fluid}
          />
        }
      >
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