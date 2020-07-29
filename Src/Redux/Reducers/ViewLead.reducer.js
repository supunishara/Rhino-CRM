import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET, FETCHING_DATA_MULTIPLE, FETCHING_DATA_SUCCESS_MULTIPLE, FETCHING_DATA_FAILURE_MULTIPLE, FETCHING_DATA_MAP, FETCHING_DATA_SUCCESS_MAP, FETCHING_DATA_FAILURE_MAP,
  FETCHING_DATA_OTHER, FETCHING_DATA_SUCCESS_OTHER, FETCHING_DATA_FAILURE_OTHER, RESET_OTHER_DATA} from '../Actions/ActionTypes';

const initialState = {
  isLoading:false,
  data: null,
  errors: null,
  multipleData: null,
  mapData: null,
  otherData: null
};
//
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
        };
    case RESET_OTHER_DATA:
          return {
              ...state,
              otherData: null
          };

        
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

    case FETCHING_DATA_MAP:
        return{
              ...state,
              isLoading: true,
        };
    case FETCHING_DATA_SUCCESS_MAP:
        return{
            ...state,
              isLoading: false,
              mapData: action.mapData,
          };
    case FETCHING_DATA_FAILURE_MAP:
          return {
              ...state,
              isLoading: false,
              errors: action.error,
          };

    case FETCHING_DATA_OTHER:
            return {
              ...state,
              isLoading: true,
            };

    case FETCHING_DATA_SUCCESS_OTHER: 
            console.log(" VIEW LEAD reducer Data----------",action.otherData);
            return{
                ...state,
                isLoading: false,
                otherData: action.otherData
            };

    case FETCHING_DATA_FAILURE_OTHER:
              return {
                  ...state,
                  isLoading: false,
                  errors: action.error
              }
    default:
      return state;
  }
};

export default reducer;
