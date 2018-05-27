import React from 'react';
import PropTypes from 'prop-types';

const Player = (props) => {
  const ballStyle = {
    fill: '#0055ff',
    stroke: '#444',
    strokeWidth: '2px',
  };
  return (
    <ellipse
      style={ballStyle}
      cx={props.x}
      cy={props.y}
      rx="32"
      ry="32"
    />
  );
};

Player.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default Player;