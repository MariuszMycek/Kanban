export const ERROR = 'ERROR';
export const NO_ERROR = 'NO_ERROR';

export function isError(error) {
  return {
    type: ERROR,
    message: error.message || 'Something went wrong',
  };
}

export function noError(response) {
  return {
    type: NO_ERROR,
    response,
  };
}

export function handler(promise) {
  return dispatch => {
    return promise
      .then(res => dispatch(noError(res)))
      .catch(err => dispatch(isError(err)));
  };
}
