import * as types from "./actionTypes";
import * as services from "services/environment";

export function allEnvironments() {
  return async dispatch => {
    try {
      dispatch(types.allEnvironmentBegin());

      const result = await services.allEnvironments();
      let environments = result.data.Envs;

      dispatch(types.allEnvironmentSuccess(environments));
    } catch (error) {
      dispatch(types.allEnvironmentError(error));
    }
  };
}

export function createEnvironment(data) {
  return async dispatch => {
    try {
      dispatch(types.createEnvironmentBegin());

      await services.createEnvironment(data);
      const result = await services.allEnvironments();
      let environments = result.data.Envs;

      dispatch(types.createEnvironmentSuccess(environments));
    } catch (error) {
      dispatch(types.createEnvironmentError(error));
    }
  };
}

export function editEnvironment(data) {
  return async dispatch => {
    try {
      dispatch(types.editEnvironmentBegin());

      await services.editEnvironment(data);
      const result = await services.allEnvironments();
      let environments = result.data.Envs;

      dispatch(types.editEnvironmentSuccess(environments));
    } catch (error) {
      dispatch(types.editEnvironmentError(error));
    }
  };
}

export function deleteEnvironment(environmentId) {
  return async dispatch => {
    try {
      dispatch(types.deleteEnvironmentBegin());

      await services.deleteEnvironment(environmentId);
      const result = await services.allEnvironments();
      let environments = result.data.Envs;

      dispatch(types.deleteEnvironmentSuccess(environments));
    } catch (error) {
      dispatch(types.deleteEnvironmentError(error));
    }
  };
}
