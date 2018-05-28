import React from "react";
import PropTypes from "prop-types";
import { generateEnemy } from "../../Util/Util";
import Enemy from "./Enemy";

const EnemyGenerator = props => {
  const enemy = generateEnemy();

  return (
    <Enemy
      x={props.x}
      y={props.y}
      text={enemy.technology}
      experienceLevel={enemy.experience}
    />
  );
};

EnemyGenerator.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default EnemyGenerator;
