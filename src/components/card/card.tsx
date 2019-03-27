import React from "react";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/es/Card/Card";
import Img, { FluidObject } from "gatsby-image";

import "./card.scss";

interface CardProps {
  title: string;
  description: string;
  url: string;
  image: FluidObject;
}

const BlogCard = (props: CardProps) => (
  <>
    <Card className="card mb-4">
      <CardActionArea href={props.url}>
        <CardMedia title="Card"/>
        <Img className="img-fluid" style={{ height: 200 }} fadeIn={true} fluid={props.image}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </>
);

export default BlogCard;