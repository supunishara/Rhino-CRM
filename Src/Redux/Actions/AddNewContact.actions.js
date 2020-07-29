import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
}

  export const getMultipleDropDownData = () => {
    return {
      type: FETCHING_DATA_MULTIPLE,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          requests:[
            {name: 'Title',baseURL: `${API.baseURL}${APIEndPoints.titleList}`},
            {name: 'Company',baseURL: `${API.baseURL}${APIEndPoints.companyList}`},
        ],
      },
    };
  }

  export const getProjectData = (id) => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.projectList}${id}`,
        }
    }
  }
  
//
  export const sendAddContactData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'POST',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.addContact}`,
          body:{
            "title":values.selectedTitleText,
            "first_name":values.f_name,
            "last_name":values.l_name,
            "company_id":values.selectedCompanyIndex,
            "designation":values.designation,
            "email":values.email,
            "phone":values.Phone,
            "address":values.address,
            "city":values.city,
            "dob":values.dob,
            "notes":values.Notes,
          }
      },
    };
  }
