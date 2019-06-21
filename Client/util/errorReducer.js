import { ERROR, NO_ERROR } from './errorActions';

const initialState = {
  isError: false,
};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return { ...state, isError: true, message: action.message };

    case NO_ERROR:
      return { ...state, isError: false, message: action.response  };

    default:
      return state;
  }
}
