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
            hero: {
              childImageSharp: {
                fluid: FluidObject;
              }
            };
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

const IndexPage = (props: Props) => {
  const posts = props.data.allMarkdownRemark.edges;
  const hero = props.data.placeholderImage.childImageSharp.fluid;
  return (
    <>
      <Layout heroImage={
        <Img className="hero" imgStyle={{objectFit: "cover", objectPosition: "bottom" }}
             fadeIn={true} fluid={hero}/>
      }>
        <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
        <h1>Hello world</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et convallis lorem. Morbi accumsan imperdiet
          augue,
          a vulputate libero. Ut placerat tempus ex, in egestas lacus tincidunt ut. Aliquam erat volutpat. Sed mi risus,
          viverra id hendrerit nec, faucibus et enim. Aliquam pulvinar nulla id ex porta commodo a nec massa. Vestibulum
          rutrum urna eu ante placerat pretium.
        </p>
        <h1>Recent Activity</h1>
        <div className="d-flex flex-row flex-wrap">
          {posts.map((post) =>
             <BlogCard title={post.node.frontmatter.title}
                       description={post.node.frontmatter.description}
                       url={post.node.frontmatter.path}
                       image={post.node.frontmatter.hero.childImageSharp.fluid}/>
          )}
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 3
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
      placeholderImage: file(relativePath: { eq: "hero.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
    }
`;

export default IndexPage;
