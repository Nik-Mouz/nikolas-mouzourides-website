import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import BlogCard from "../components/card/card";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

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
            hero: any;
          }
        }
      }[];
    },
    placeholderImage: {
      childImageSharp: {
        fluid: FluidObject;
      }
    }
  };
}

const Blog = (props: Props) => {
  const posts = props.data.allMarkdownRemark.edges;
  console.log(props.data);
  return (
    <Layout heroImage={
      <Img className="hero" imgStyle={{height: 400, objectPosition: "bottom" }} fadeIn={true}
           fluid={props.data.placeholderImage.childImageSharp.fluid} />
    }>
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
