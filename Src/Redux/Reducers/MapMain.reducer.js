import {FETCHING_DATA_MAP, FETCHING_DATA_SUCCESS_MAP, FETCHING_DATA_FAILURE_MAP, RESET} from '../Actions/ActionTypes';

const initialState = {
  isLoading:false,
  data: null,
  errors: null,
  mapData: null
};
//
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA_MAP:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHING_DATA_SUCCESS_MAP: 
      return{
          ...state,
          isLoading: false,
          mapData: action.mapData
      };
    case FETCHING_DATA_FAILURE_MAP:
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
