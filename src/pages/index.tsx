import React, { useRef } from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps, Edge } from "../components/blog-props.state";
import { useArtFetch } from "./art";
import ContentCard, { CardProps, ContentType, Size } from "../components/content-card/content-card";

import "xterm/css/xterm.css";
import { useTerm } from "../components/term";

const IndexPage = (props: BlogProps) => {
  const drawingList: CardProps[] = useArtFetch()
    .map(art => ({...art, size: Size.SMALL}));

  const blogPosts: CardProps[] = [...props.data.allMarkdownRemark.edges.map((edge: Edge) =>
  ({
    type: ContentType.BLOG,
    size: Size.SMALL,
    title: edge.node.frontmatter.title,
    date: new Date(edge.node.frontmatter.date),
    description: edge.node.frontmatter.description,
    url: edge.node.frontmatter.path,
    image: edge.node.frontmatter.hero.childImageSharp.gatsbyImageData,
  }))];

  const posts: CardProps[] = [...blogPosts, ...drawingList].sort((a: CardProps, b: CardProps) => +b.date - +a.date);

  const hero = props.data.placeholderImage.childImageSharp.gatsbyImageData;
  const terminalRef = useRef(null);

  useTerm(terminalRef, blogPosts.map(posts => posts.url.replaceAll("/blog/", "")));

  return (
    <>
      <Layout heroImage={hero}>
        <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hello world</h1>
        <div className="terminal w-100" ref={terminalRef} style={{ height: "275px" }}></div>
        <div className="d-flex flex-row flex-wrap justify-content-between pt-2">
          {posts.slice(0, 3).map((post) =>
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
      placeholderImage: file(relativePath: { eq: "home-hero.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
    }
`;

export default IndexPage;
