import {FETCHING_DATA,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';
//
export const requestCompanyData = () => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.mainCompanies}`,
        },
      };
}

//
export const resetReducer = () => {
    return {
      type: RESET
    }
  }
