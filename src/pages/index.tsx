import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps, Edge } from "../components/blog-props.state";
import { useArtFetch } from "./art";
import ContentCard, { CardProps, ContentType, Size } from "../components/content-card/content-card";

const IndexPage = (props: BlogProps) => {
  const drawingList: CardProps[] = useArtFetch()
    .map(art => ({...art, size: Size.SMALL}));

  const posts: CardProps[] = [...props.data.allMarkdownRemark.edges.map((edge: Edge) =>
    ({
      type: ContentType.BLOG,
      size: Size.SMALL,
      title: edge.node.frontmatter.title,
      date: new Date(edge.node.frontmatter.date),
      description: edge.node.frontmatter.description,
      url: edge.node.frontmatter.path,
      image: edge.node.frontmatter.hero.childImageSharp.fluid,
    })),
    ...drawingList
  ].sort((a: CardProps, b: CardProps) => +b.date - +a.date)
    .slice(0, 3);

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
          On 4th March 2019, nikmouz.dev was deployed.
          It was a basic website only containing the text "Hello world by Nikolas Mouzourides",
          but it was a start; I had a corner of the web that was my own.
        </p>
        <p>
          From there I iterated and developed the site, improving the UX and adding a blog.
          The site is always changing but for now, I want it to be a place to tie together my interests,
          a portal one can view to catch up with what I've been up to.
          I plan to accomplish this by releasing monthly-ish blog posts.
        </p>
        <p>
          I hope you enjoy your stay :)
        </p>
        <h1>Recent Activity</h1>
        <div className="d-flex flex-row flex-wrap">
          {posts.map((post) =>
            <ContentCard
              key={post.title}
              {...post}
            />
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
