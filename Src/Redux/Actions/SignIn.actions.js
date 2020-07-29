import {FETCHING_DATA,RESET} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

export const requestLoginData = (values) => {
    console.log("values",values);
    console.log(`${API.baseURL}${APIEndPoints.login}`);
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'POST',
            isAuthorizationAvailable:false,
            // nextScreen:'Dashboard',
            baseURL: `${API.baseURL}${APIEndPoints.login}`,
            body:{
                "email":values.userName,
                "password":values.password
              }
        },
      };
}

//
export const resetReducer = () => {
  return {
    type: RESET
  }
}