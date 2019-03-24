import React from "react";
import BlogHeroImage from "../images/blog-hero.jpg";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import BlogCard from "../components/card/card";
import { graphql } from "gatsby";

interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            date: string;
            description: string;
            path: string;
            title: string;
          }
        }
      }[];
    }
  };
}

const Blog = (props: Props) => {
  const posts = props.data.allMarkdownRemark.edges;
  return (
    <Layout heroImage={<img className="hero" style={{ height: 400 }} src={BlogHeroImage}/>}>
      <Seo title="Blog" description="Nik Mouzourides blog"/>
      <h1 className="pb-2">Blog</h1>
      <div className="d-flex flex-row flex-wrap">
        {posts.map((post) =>
          <BlogCard title={post.node.frontmatter.title}
                    url={post.node.frontmatter.path}
                    description={post.node.frontmatter.description}
                    imagePath={BlogHeroImage}
          />
        )}
      </div>
    </Layout>
  )
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
            }
          }
        }
      }
    }
`;

export default Blog;
