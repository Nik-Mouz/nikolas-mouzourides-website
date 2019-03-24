import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo/seo";
import Layout from "../components/layout/layout";

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        description: string;
        path: string;
      };
      html: string;
    }
  }
}

const BlogTemplate = (props: Props) => {
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Layout
        // heroImage={<img className="hero" style={{height: 400}} src={BlogHeroImage}/>}
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
      }
    }
  }
`;

export default BlogTemplate;