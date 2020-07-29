import {FETCHING_DATA,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

export const requestContactsData = () => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            // nextScreen:'Dashboard',
            baseURL: `${API.baseURL}${APIEndPoints.contacts}`,
        },
      };
}

//
export const resetReducer = () => {
    return {
      type: RESET
    }
  }
