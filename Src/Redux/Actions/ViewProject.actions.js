import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
}

export const requestProjectDataWithId = (id) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          // nextScreen:'Dashboard',
          baseURL: `${API.baseURL}${APIEndPoints.viewOneProject}${id}`,
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
            {name: 'Company',
            baseURL: `${API.baseURL}${APIEndPoints.companyList}`},
        ],
      },
    };
  }


  export const sendUpdateProjectData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'PATCH',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.updateNewProject}${values.project_id}`,
          body:{
            "project_name":values.project_name,
            "address":values.address,
            "city":values.city,
            "comapny_id":values.comapny_id,
            "notes":values.notes,
            "project_id": values.project_id
          }
      },
    };
  }
