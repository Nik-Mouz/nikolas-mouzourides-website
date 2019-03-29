import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import BlogCard from "../components/card/card";
import { graphql } from "gatsby";
import { BlogProps } from "../components/blog-props.state";

const IndexPage = (props: BlogProps) => {
  const posts = props.data.allMarkdownRemark.edges;
  const hero = props.data.placeholderImage.childImageSharp.fluid;
  return (
    <>
      <Layout heroImage={hero}>
        <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
        <h1>Hello world</h1>
        <p>
          My name is Nikolas Mouzourides and I am a full stack developer at&nbsp;
          <a href="https://www.blackpepper.co.uk" target="_blank">Black Pepper Software.</a>
        </p>
        <p>
          My original goal for this website was simple, to create something, anything, and put it on the web.
          On 4th March 2019, nikmouz.dev was born.
          It was a basic website only containing the text "Hello world by Nikolas Mouzourides",
          however it made me happy; not because it was difficult to do, it didn't take me long,
          but due to having something on the web that was my own.
        </p>
        <p>
          Having achieved this, I realised this website had the potential to be
          so much more. It had my name on it. I wanted this website to better reflect my ability as a software
          developer, a place to tie together my interests, a portal into my world.
          And so I deployed nikmouz.dev v2, with improved UX and a blog.
        </p>
        <p>
          I hope you enjoy your stay :)
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
