import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps } from "../components/blog-props.state";
import ContentCard, { CardProps, ContentType, Size } from "../components/content-card/content-card";

const Art = (props: BlogProps) => {
  const hero = props.data.placeholderImage.childImageSharp.fluid;
  const drawingList = useArtFetch();

  return (
    <Layout heroImage={hero}>
      <Seo title="Blog" description="Nik Mouzourides sketches"/>
      <h1 className="pb-2">Art</h1>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {drawingList && drawingList.map((drawing: CardProps) =>
          <ContentCard {...drawing} key={drawing.title}/> )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
    {
      placeholderImage: file(relativePath: { eq: "drawings-hero.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
    }
`;

export function useArtFetch(): CardProps[] {
  const [drawingList, setDrawingList]: Array<any> = useState([]);

  useEffect(() => {
    let drawingBaseUrl = "https://nikmouz-drawings.s3-eu-west-1.amazonaws.com/";
    fetch(drawingBaseUrl)
      .then(r => r.text())
      .then(r => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(r, "text/xml");
        const contents = Array.from(xml.getElementsByTagName("Contents"));
        const drawings: CardProps[] = contents.map(c => {
            const fileName = c.childNodes[0].textContent || "";
            const title: string = (fileName)
              .replace(/-/g, " ")
              .replace(".jpg", "")
              .replace(".jpeg", "")
              .replace(".png", "");
            const date = new Date(c.childNodes[1].textContent || "");

            return {
              type: ContentType.ART,
              title,
              url: drawingBaseUrl + fileName,
              date,
              size: Size.LARGE,
              image: {
                aspectRatio: 200,
                src: drawingBaseUrl + fileName,
                srcSet: drawingBaseUrl + fileName,
                sizes: "(max-width: 2000px) 100vw, 2000px"
              }
            };
          }
        );

        setDrawingList(drawings);
      });
  }, []);
  return drawingList;
}

export default Art;
