import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
}

  export const sendAddProjectData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'POST',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.addNewProject}`,
          body:{
            "project_name":values.project_name,
            "address":values.address,
            "city":values.city,
            "notes":values.notes,
            "company_id":values.company_id,
          }
      },
    };
  }

  export const getDropDownData = () => {
    return {
      type: FETCHING_DATA_MULTIPLE,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          requests:[
            {name: 'Company',baseURL: `${API.baseURL}${APIEndPoints.companyList}`},
        ],
      },
    };
  }
