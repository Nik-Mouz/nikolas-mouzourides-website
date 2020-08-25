import React from "react";

import "./support-card.scss";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

interface Props {
  title: string;
  description?: string;
}

const SupportCard = (props: Props) => {
  const url = "https://ko-fi.com/nikmouz";

  return (
    <div className="d-flex justify-content-center">
      <Card className={"support-card mb-4"}>
        <CardActionArea component="a" href={url} target="_blank">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="mb-0">
              <b>{props.title}</b>
            </Typography>
            <Typography>{props.description || 'Show support :)'}</Typography>
            <div className="coffee-button d-flex justify-content-center mt-3">
              <span>Buy me a coffee</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SupportCard;
