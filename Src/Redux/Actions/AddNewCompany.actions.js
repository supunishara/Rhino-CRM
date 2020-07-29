import {FETCHING_DATA, RESET, REQUEST_LOADER} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
}

  export const sendAddCompanyData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'POST',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.addNewCompany}`,
          body:{
            "business_name":values.business_name,
            "registered_address":values.address,
            "city":values.city,
          }
      },
    };
  }
