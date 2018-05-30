// Actions

import { generateEnemy } from "../../Util/Util";

export const GENERATE_ENEMY = "GENERATE_ENEMY";
export const REMOVE_ENEMY = "REMOVE_ENEMY";

const initialEnemy = generateEnemy();

// State
const initialState = {
  enemies: [
    {
      technology: initialEnemy.technology,
      experience: initialEnemy.experience
    }
  ]
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_ENEMY:
      return {
        ...state,
        enemies: state.enemies.concat(generateEnemy())
      };

    case REMOVE_ENEMY:
      return {
        ...state,
        enemies: state.enemies.pop()
      };

    default:
      return state;
  }
};
