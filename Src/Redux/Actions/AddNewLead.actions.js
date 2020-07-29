import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';


export const resetReducer = () => {
    return {
      type: RESET
    }
  }
//
  export const getMultipleDropDownData = () => {
    return {
      type: FETCHING_DATA_MULTIPLE,
      payload: {
          ReqType: 'GET',
          isAuthorizationAvailable:true,
          requests:[
            {name: 'Contact',baseURL: `${API.baseURL}${APIEndPoints.contactList}`},
            {name: 'Company',baseURL: `${API.baseURL}${APIEndPoints.companyList}`},
            {name: 'Quality',baseURL: `${API.baseURL}${APIEndPoints.qualityList}`},
            {name: 'Stage',baseURL: `${API.baseURL}${APIEndPoints.StageList}`},
            {name: 'Company',baseURL: `${API.baseURL}${APIEndPoints.sources}`},
        ],
      },
    };
  }
//
  export const sendLeadData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'POST',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.addOneLead}`,
          body:{
            "contact_id":values.contact_id,
            "quality":values.quality,
            "stage":values.stage,
            "source":values.source,
            "value":values.value,
            "company_id": values.company_id,
            "project_id":values.project_id,
            "notes": values.notes
          }
      },
    };
  }

  /// export const getProjectData = (id) => {
  //   return {
  //       type: FETCHING_DATA,
  //       payload: {
  //           ReqType: 'GET',
  //           isAuthorizationAvailable:true,
  //           baseURL: `${API.baseURL}${APIEndPoints.projectList}${id}`,
  //       }
  //   }
  // }

  export const getProjectData = (id) => {
    console.log("Company ID",id);
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.singleCompanyList}${id}`,
        }
    }
  }

  
