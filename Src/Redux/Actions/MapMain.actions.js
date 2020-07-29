import {FETCHING_DATA_MAP,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';
//
export const requestMapData = () => {
    return {
        type: FETCHING_DATA_MAP,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.getMapData}`,
        },
      };
}

export const resetReducer = () => {
    return {
      type: RESET
    }
  }
