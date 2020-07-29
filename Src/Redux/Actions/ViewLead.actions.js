import {FETCHING_DATA, RESET, FETCHING_DATA_MULTIPLE, FETCHING_DATA_OTHER, RESET_OTHER_DATA} from './ActionTypes';
import {API, APIEndPoints} from '../../Helpers/URL';

//
export const resetReducer = () => {
    return {
      type: RESET
    }
  }

  export const resetOtherDataReducer = () => {
    return {
      type: RESET_OTHER_DATA
    }
  }

  

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
            {name: 'Source',baseURL: `${API.baseURL}${APIEndPoints.sources}`},
            {name: 'Share',baseURL: `${API.baseURL}${APIEndPoints.getTenantData}`},
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
            baseURL: `${API.baseURL}${APIEndPoints.singleCompanyList}${id}`,
        }
    }
  }

  export const addLeadToMap = (id) => {
    return {
        type: FETCHING_DATA_MAP,
        payload: {
            ReqType: 'POST',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.addLeadToMap}`,
            body:{
              "lead_id":id,
            }
        }
    }
  }

  export const sendUpdateLeadData = (values) => {
    return {
      type: FETCHING_DATA,
      payload: {
          ReqType: 'PATCH',
          isAuthorizationAvailable:true,
          baseURL: `${API.baseURL}${APIEndPoints.updateNewLead}${values.id}`,
          body:{
            "id":values.id,
            "value":values.value,
            "contact_id":values.contact_id,
            "project_id":values.project_id,
            "quality":values.quality,
            "stage":values.stage,
            "source":values.source,
            "notes": values.notes
          }
      },
    };
  }

  export const getLeadData = (id) => {
    return {
        type: FETCHING_DATA,
        payload: {
            ReqType: 'GET',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.viewOneLead}${id}`,
        }
    }
  }

  export const sendShareData = (obj) => {
    return {
        type: FETCHING_DATA_OTHER,
        payload: {
            ReqType: 'POST',
            isAuthorizationAvailable:true,
            baseURL: `${API.baseURL}${APIEndPoints.shareTenant}${obj.lead_id}/${obj.user_id}`,
        }
    }
  }

  //

  

  
