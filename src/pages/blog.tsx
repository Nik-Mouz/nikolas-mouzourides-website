import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import BlogCard from "../components/card/card";
import { graphql } from "gatsby";
import { BlogData } from "../components/BlogDataProps.state";

const Blog = (props: BlogData) => {
  const posts = props.data.allMarkdownRemark.edges;
  const hero = props.data.placeholderImage.childImageSharp.fluid;
  return (
    <Layout heroImage={hero}>
      <Seo title="Blog" description="Nik Mouzourides blog"/>
      <h1 className="pb-2">Blog</h1>
      <div className="d-flex flex-row flex-wrap">
        {posts.map((post) =>
          <BlogCard title={post.node.frontmatter.title}
                    url={post.node.frontmatter.path}
                    description={post.node.frontmatter.description}
                    image={post.node.frontmatter.hero.childImageSharp.fluid}
          />
        )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 50
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              date
              description
              hero {
                childImageSharp {
                  fluid(maxWidth: 310) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      placeholderImage: file(relativePath: { eq: "blog-hero.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
    }
`;

export default Blog;
