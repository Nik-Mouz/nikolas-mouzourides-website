import { FluidObject } from "gatsby-image";

export interface BlogData {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    },
    placeholderImage: {
      childImageSharp: {
        fluid: FluidObject;
      }
    }
  };
}

export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  path: string;
  hero: {
    childImageSharp: {
      fluid: FluidObject;
    }
  }
}

export interface Node {
  frontmatter: Frontmatter;
}

export interface Edge {
  node: Node;
}