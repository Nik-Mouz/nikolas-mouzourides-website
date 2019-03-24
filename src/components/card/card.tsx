import React from "react";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/es/Card/Card";
import "./card.scss";

interface CardProps {
  title: string;
  description: string;
  url: string;
  imagePath: string;
}

const BlogCard = (props: CardProps) => (
  <>
    <Card className="card mb-4">
      <CardActionArea href={props.url}>
        <CardMedia title="Card"/>
        <img className="img-fluid" height="200px" src={props.imagePath}/>
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