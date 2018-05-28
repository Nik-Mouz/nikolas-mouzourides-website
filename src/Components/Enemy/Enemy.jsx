import React from "react";
import PropTypes from "prop-types";

const Enemy = props => {
  return (
    <text
      x={props.x}
      y={props.y}
      className={props.experienceLevel.concat(" text")}
    >
      {props.text}
    </text>
  );
};

Enemy.propTypes = {
  text: PropTypes.string.isRequired,
  experienceLevel: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Enemy;
