// Actions

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// State
const initialState = {
  count: 0
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
};
