import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET, FETCHING_DATA_MULTIPLE, FETCHING_DATA_SUCCESS_MULTIPLE, FETCHING_DATA_FAILURE_MULTIPLE} from '../Actions/ActionTypes';

const initialState = {
  isLoading:false,
  data: null,
  errors: null,
  multipleData: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHING_DATA_SUCCESS: 
      return{
          ...state,
          isLoading: false,
          data: action.data
      };
    case FETCHING_DATA_FAILURE:
        return {
            ...state,
            isLoading: false,
            errors: action.error
        }
    case RESET:
        return {
            ...state,
            errors: initialState.errors
        }
    case FETCHING_DATA_MULTIPLE:
        return{
              ...state,
              isLoading: true,
        };
    case FETCHING_DATA_SUCCESS_MULTIPLE:
        return{
            ...state,
              isLoading: false,
              multipleData: action.multipleData,
          };
    case FETCHING_DATA_FAILURE_MULTIPLE:
          return {
              ...state,
              isLoading: false,
              errors: action.error,
          };
    default:
      return state;
  }
};

export default reducer;
