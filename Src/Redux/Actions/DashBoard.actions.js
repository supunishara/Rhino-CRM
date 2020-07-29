import {FETCHING_DATA,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';
//
export const requestDashboardData = () => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.getDashboardData}`,
        },
      };
}

