import React, { useEffect, useRef } from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps, Edge } from "../components/blog-props.state";
import { useArtFetch } from "./art";
import ContentCard, { CardProps, ContentType, Size } from "../components/content-card/content-card";
import { Terminal } from "xterm";

import "xterm/css/xterm.css";

const IndexPage = (props: BlogProps) => {
  const drawingList: CardProps[] = useArtFetch()
    .map(art => ({ ...art, size: Size.SMALL }));

  const posts: CardProps[] = [...props.data.allMarkdownRemark.edges.map((edge: Edge) =>
  ({
    type: ContentType.BLOG,
    size: Size.SMALL,
    title: edge.node.frontmatter.title,
    date: new Date(edge.node.frontmatter.date),
    description: edge.node.frontmatter.description,
    url: edge.node.frontmatter.path,
    image: edge.node.frontmatter.hero.childImageSharp.gatsbyImageData,
  })),
  ...drawingList
  ].sort((a: CardProps, b: CardProps) => +b.date - +a.date)
    .slice(0, 3);

  const hero = props.data.placeholderImage.childImageSharp.gatsbyImageData;
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({ disableStdin: false });
    const element = terminalRef.current;
    let buffer: string[] = [];
    let position = 0;

    if (element) {
      term.open(element);
      term.write('$ ');
      term.onKey(e => {

        if (e.key == '\r') {
          // enter
          term.write('\n\x1b[2K\r$ ');
          buffer = [];
          position = 0;
        } else if (e.key == "\u007f") {
          // backspace
          if (buffer.length !== 0 && position !== 0) {
            buffer.splice(position - 1, 1);
            term.write('\x1b[2K\r$ '); // clear line and add $
            term.write(buffer.join(""));
            term.write(buffer.slice(position - 1).map(e => "\u001b[D").join("")); // left arrow for buffer size - 1
            position--;
          }
        } else if (e.key === "\u001b[D") {
          // left arrow
          if (position !== 0) {
            position--;
            term.write(e.key);
          }
        } else if (e.key === "\u001b[C") {
          // right arrow
          if (position !== buffer.length) {
            position++;
            term.write(e.key);
          }
        } else if (e.key === "\u001b[B" || e.key === "\u001b[A") {

        } else {
          buffer.splice(position, 0, e.key);
          position++;
          const x = buffer.slice(position - 1);
          term.write(x.join(""));
          term.write(buffer.slice(position).map(e => "\u001b[D").join(""));
        }

        console.log(e);
        console.log(buffer);
        console.log(position);
      });
    }
  }, []);

  return (
    <>
      <Layout heroImage={hero}>
        <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]} />
        <div className="terminal" ref={terminalRef} style={{ height: "200px" }}></div>
        <h1>Hello world</h1>
        <p>
          I'm Nikolas Mouzourides; a software developer, security enthusiast, hacker, gamer, and sketcher.
        </p>
        <h5 className="pb-5">
          <i>Welcome to my corner of the web.</i>
        </h5>
        <h1>Recent Activity</h1>
        <div className="d-flex flex-row flex-wrap justify-content-center">
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
