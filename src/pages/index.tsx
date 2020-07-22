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
          I'm Nikolas Mouzourides; a software developer, security enthusiast, hacker, gamer, and sketcher.
        </p>
        <h5 className="pb-5">
          <i>Welcome to my corner of the web.</i>
        </h5>
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
                  fluid(maxWidth: 3000) {
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
