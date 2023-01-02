import { isNil } from 'lodash';
/**
 * create simple action that takes data and output {type, data} action
 * @param {*} type
 */
export const createAction = (type) => {
  return (data) => ({ type, data });
};

/**
 * basic reducer for replacing state all the time
 * @param {*} actionType action type key
 * @param {*} initState
 */
export const simpleReducer = (type, initState) => {
  return (state, action) =>
    action.type === type ? action.data : state || initState;
};

/**
 * reducer for data manipulation, support replace all, update and delete
 * @param {*} actionsTypes object indicates action type key 1. replaceActionType: replace whole state 2. updateActionType: update single/multiple items 3. deleteActionType: delete single item by id
 * @param {*} initState
 */
export const simpleDataSetReducer = (
  { updateActionType, replaceActionType, deleteActionType },
  initState
) => {
  return (state, { type, data }) => {
    switch (type) {
      case updateActionType:
        return { ...state, ...data };
      case replaceActionType:
        return data;
      case deleteActionType:
        const newState = { ...state };
        delete newState[data];
        return newState;
      default:
        return state || initState;
    }
  };
};

/**
 * reducer for data manipulation with loading and error functionality
 * @param {*} actionsTypes object indicates action type key
 * 1. replaceActionType: replace whole state with loading as false and error as empty
 * 2. updateActionType: update single/multiple items
 * 3. deleteActionType: delete single item by id loading as false and error as empty
 * 4. loadingActionType:  replace state with loading as true and error as empty
 * 5. errorActionType: replace state with loading as false and error data
 * @param {*} initState
 */

export const loaderErrorDataSetReducer = (
  {
    updateActionType,
    replaceActionType,
    deleteActionType,
    loadingActionType,
    errorActionType,
  },
  initState
) => {
  return (state, { type, data }) => {
    switch (type) {
      case updateActionType:
        const updatedData = { ...state.data, ...data };
        return { ...state, data: updatedData };
      case replaceActionType:
        return {
          ...state,
          loading: false,
          error: {},
          data: !isNil(data) ? data : initState,
        };
      case deleteActionType:
        const newState = { ...state.data };
        delete newState[data];
        return { ...state, loading: false, error: {}, data: newState };
      case loadingActionType:
        return { ...state, loading: true, error: {} };
      case errorActionType:
        return { ...state, loading: false, error: data };
      default:
        return state || { loading: false, error: {}, data: initState };
    }
  };
};
