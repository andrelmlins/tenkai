export const ALL_ENVIRONMENT_BEGIN = "environment.ALL_BEGIN";
export const ALL_ENVIRONMENT_SUCCESS = "environment.ALL_SUCCESS";
export const ALL_ENVIRONMENT_ERROR = "environment.ALL_ERROR";

export const DELETE_ENVIRONMENT_BEGIN = "environment.DELETE_BEGIN";
export const DELETE_ENVIRONMENT_SUCCESS = "environment.DELETE_SUCCESS";
export const DELETE_ENVIRONMENT_ERROR = "environment.DELETE_ERROR";

export const CREATE_ENVIRONMENT_BEGIN = "environment.CREATE_BEGIN";
export const CREATE_ENVIRONMENT_SUCCESS = "environment.CREATE_SUCCESS";
export const CREATE_ENVIRONMENT_ERROR = "environment.CREATE_ERROR";

export const EDIT_ENVIRONMENT_BEGIN = "environment.EDIT_BEGIN";
export const EDIT_ENVIRONMENT_SUCCESS = "environment.EDIT_SUCCESS";
export const EDIT_ENVIRONMENT_ERROR = "environment.EDIT_ERROR";

export const allEnvironmentBegin = () => ({
  type: ALL_ENVIRONMENT_BEGIN
});

export const allEnvironmentSuccess = environments => ({
  type: ALL_ENVIRONMENT_SUCCESS,
  payload: { environments }
});

export const allEnvironmentError = error => ({
  type: ALL_ENVIRONMENT_ERROR,
  payload: { error }
});

export const createEnvironmentBegin = () => ({
  type: CREATE_ENVIRONMENT_BEGIN
});

export const createEnvironmentSuccess = environments => ({
  type: CREATE_ENVIRONMENT_SUCCESS,
  payload: { environments }
});

export const createEnvironmentError = error => ({
  type: CREATE_ENVIRONMENT_ERROR,
  payload: { error }
});

export const editEnvironmentBegin = () => ({
  type: EDIT_ENVIRONMENT_BEGIN
});

export const editEnvironmentSuccess = environments => ({
  type: EDIT_ENVIRONMENT_SUCCESS,
  payload: { environments }
});

export const editEnvironmentError = error => ({
  type: EDIT_ENVIRONMENT_ERROR,
  payload: { error }
});

export const deleteEnvironmentBegin = () => ({
  type: DELETE_ENVIRONMENT_BEGIN
});

export const deleteEnvironmentSuccess = environments => ({
  type: DELETE_ENVIRONMENT_SUCCESS,
  payload: { environments }
});

export const deleteEnvironmentError = error => ({
  type: DELETE_ENVIRONMENT_ERROR,
  payload: { error }
});
