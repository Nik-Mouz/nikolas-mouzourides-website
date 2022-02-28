import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps } from "../components/blog-props.state";
import ContentCard, { ContentType, Size } from "../components/content-card/content-card";

const Blog = (props: BlogProps) => {
  const posts = props.data.allMarkdownRemark.edges;
  const hero = props.data.placeholderImage.childImageSharp.gatsbyImageData;

  return (
    <Layout heroImage={hero}>
      <Seo title="Blog" description="Nik Mouzourides blog"/>
      <h1 className="pb-2">Blog</h1>
      <div className="d-flex flex-row flex-wrap">
        {posts.map((post, idx) =>
          <ContentCard key={"blog-" + idx}
                       type={ContentType.BLOG}
                       title={post.node.frontmatter.title}
                       url={post.node.frontmatter.path}
                       date={new Date(post.node.frontmatter.date)}
                       description={post.node.frontmatter.description}
                       image={post.node.frontmatter.hero.childImageSharp.gatsbyImageData}
                       size={Size.SMALL}
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
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
      placeholderImage: file(relativePath: { eq: "blog-hero.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
    }
`;

export default Blog;
