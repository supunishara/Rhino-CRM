import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
  }

  //
  export const requestContactsDataWithId = (id) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          // nextScreen:'Dashboard',
          baseURL: `${API.baseURL}${APIEndPoints.getContactById}${id}`,
      },
    };
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

  
  export const sendUpdateContactData = (values) => {
    console.log();
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'PATCH',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.storeContact}${values.id}`,
          body:{
            "title":values.selectedTitleText,
            "first_name":values.first_name,
            "last_name":values.last_name,
            "company_id":values.selectedCompanyIndex,
            "designation":values.Designation,
            "email":values.email,
            "phone":values.phone,
            "address":values.address,
            "city":values.city,
            "dob":values.dob,
            "notes":values.notes,
            "isEditable": values.isEditable
          }
      },
    };
  }
