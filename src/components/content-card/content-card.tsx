import React, { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image"

import "./content-card.scss";
import ContentModal from "../modal/modal";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

export enum Size {
  SMALL,
  LARGE
}

export enum ContentType {
  BLOG,
  ART
}

export interface CardProps {
  type: ContentType;
  size: Size;
  title: string;
  description?: string;
  url: string;
  image: any;
  date: Date;
}

const ContentCard = (props: CardProps) => {

  const [modalOpen, setModalOpen] = useState(false);
  const action = (type: ContentType) =>
    type === ContentType.BLOG
      ? { href: props.url }
      : { onClick: () => setModalOpen(true) };

  return (
    <>
      <Card className={"card mb-4" + (" " + Size[props.size].toLocaleLowerCase() + "-card")}
            data-acctest="content-card">
        <CardActionArea component="a" {...action(props.type)}>
          <GatsbyImage className="img-fluid" alt="card image"
               style={{ height: props.size === Size.SMALL ? 200 : 350 }} image={props.image}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="mb-0">
              {props.title}
            </Typography>
            <Typography variant="subtitle2" component="h3" className="mb-2">
              {props.date.toDateString()}
            </Typography>
            {props.description && <Typography component="p">
              {props.description}
            </Typography>}
          </CardContent>
        </CardActionArea>
      </Card>
      <ContentModal open={modalOpen}
                    setClosed={() => setModalOpen(false)}
                    title={props.title}
                    date={props.date}>
        <a href={props.url} target="_blank" className="pb-3">
          <img className="img-fluid pb-3" src={props.url} alt={props.title} />
        </a>
      </ContentModal>
    </>
  );
};

export default ContentCard;
