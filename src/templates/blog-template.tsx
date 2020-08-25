import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo/seo";
import Layout from "../components/layout/layout";
import { Frontmatter } from "../components/blog-props.state";
import SupportCard from "../components/support-card/support-card";

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
        <h1 className="mb-0 pb-0">{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <div className="blog mt-3 pb-5"
             dangerouslySetInnerHTML={{ __html: html }}
        />
        <SupportCard title={"Learn something new?"}/>
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
