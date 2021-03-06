import {FETCHING_DATA,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

export const requestLeadData = () => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.leadMainList}`,
        },
      };
}


export const resetReducer = () => {
    return {
      type: RESET
    }
  }
