import React from "react";
import PropTypes from "prop-types";
import Enemy from "./Enemy";
import { connect } from "react-redux";
import { GENERATE_ENEMY, REMOVE_ENEMY } from "./EnemyActionReducer";
import _ from "lodash";

const EnemyGenerator = props => {
  return (
    <Enemy
      x={props.x}
      y={props.y}
      text={_.head(props.enemies).technology}
      experienceLevel={_.head(props.enemies).experience}
    />
  );
};

EnemyGenerator.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  enemies: state.enemyReducer.enemies
});

const mapDispatchToProps = dispatch => {
  return {
    generateEnemy: () => {
      dispatch({
        type: GENERATE_ENEMY
      });
    },
    removeEnemy: () => {
      dispatch({
        type: REMOVE_ENEMY
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnemyGenerator);
