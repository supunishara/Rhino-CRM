import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET} from '../Actions/ActionTypes';

const initialState = {
  isLoading:false,
  data: null,
  errors: null,
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
    default:
      return state;
  }
};

export default reducer;
