import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import { graphql } from "gatsby";
import { BlogProps } from "../components/blog-props.state";
import ContentCard, { CardProps, ContentType, Size } from "../components/content-card/content-card";
import SupportCard from "../components/support-card/support-card";
import {Layout as ILayout} from "gatsby-plugin-image";

const Art = (props: BlogProps) => {
  const hero = props.data.placeholderImage.childImageSharp.gatsbyImageData;
  const drawingList = useArtFetch();

  return (
    <Layout heroImage={hero}>
      <Seo title="Blog" description="Nik Mouzourides sketches" />
      <h1 className="pb-2">Art</h1>
      <div className="d-flex flex-row flex-wrap justify-content-center mb-3">
        {drawingList && drawingList.map((drawing: CardProps) =>
          <ContentCard {...drawing} key={drawing.title} />)}
      </div>
      <SupportCard title={"Like what you see?"} />
    </Layout>
  );
};

export const pageQuery = graphql`
    {
      placeholderImage: file(relativePath: { eq: "drawings-hero.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
    }
`;

export function useArtFetch(): CardProps[] {
  const [drawingList, setDrawingList]: Array<any> = useState([]);

  useEffect(() => {
    const drawingBaseUrl = "https://nikmouz-drawings.s3-eu-west-1.amazonaws.com/";
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
              layout: "constrained" as ILayout,
              backgroundColor: "#181818",
              images: {
                fallback:
                {
                  src: drawingBaseUrl + fileName,
                  srcSet: drawingBaseUrl + fileName,
                  sizes: "(min-width: 6000px) 6000px, 100vw"
                },
                sources: [
                  {
                    srcSet: drawingBaseUrl + fileName,
                    type: "image/webp",
                    sizes: "(min-width: 6000px) 6000px, 100vw"
                  }
                ]
              },
              width: 6000,
              height: 2964
            }
          };
        }
        ).sort((a, b) => +a.date + +b.date);

        setDrawingList(drawings);
      });
  }, []);
  return drawingList;
}

export default Art;
