import { IGatsbyImageData } from "gatsby-plugin-image";

export interface BlogProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    },
    placeholderImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
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
      gatsbyImageData: IGatsbyImageData;
    }
  }
}

export interface Node {
  frontmatter: Frontmatter;
}

export interface Edge {
  node: Node;
}