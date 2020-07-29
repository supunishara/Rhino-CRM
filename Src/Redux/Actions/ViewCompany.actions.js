import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
  }

  //
  export const requestCompanyDataWithId = (id) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.viewOneCompany}${id}`,
      },
    };
  }

  //
  export const sendUpdateCompanyData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'PATCH',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.updateNewCompany}${values.id}`,
          body:{
            "business_name":values.business_name,
            "registered_address":values.address,
            "city":values.city,
            "phone":values.phone,
            "email":values.email,
            "company_id": values.id
          }
      },
    };
  }
