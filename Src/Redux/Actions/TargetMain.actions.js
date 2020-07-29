import {FETCHING_DATA,RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

export const requestTargetData = () => {
  return {
    type: FETCHING_DATA_MULTIPLE,
    payload: {
        ReqType: 'GET',
        isAuthorizationAvailable:true,
        requests:[
          {name: 'Year',baseURL: `${API.baseURL}${APIEndPoints.getAllTargets}`},
      ],
    },
  };
}

export const getOneSalesmanData = (id) => {
  return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.viewOnetarget}${id}`,
      }
  }
}

//
export const resetReducer = () => {
    return {
      type: RESET
    }
  }
