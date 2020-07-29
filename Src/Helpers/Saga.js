//importing Redux Saga Functions
import {takeEvery, put, delay, all} from 'redux-saga/effects';
// import NetworkConnectivity from './NetworkConnectivity';
import * as RootNavigation from '../Config/RootNavigation';
import NetworkConnectivity from './NetworkConnectivity';
import APIUtil from './APIUtil';
import LocalStorage from '../Helpers/LocalStorage';

//Define Network Connectivity class
const networkConnectivity = new NetworkConnectivity();

//create instance of other Helper classes
const apiUtil = new APIUtil();
let localStorage = new LocalStorage();

import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, FETCHING_DATA_MULTIPLE,FETCHING_DATA_SUCCESS_MULTIPLE,FETCHING_DATA_FAILURE_MULTIPLE, FETCHING_DATA_MAP, FETCHING_DATA_SUCCESS_MAP, FETCHING_DATA_FAILURE_MAP, 
  FETCHING_DATA_OTHER, FETCHING_DATA_SUCCESS_OTHER, FETCHING_DATA_FAILURE_OTHER} from '../Redux/Actions/ActionTypes.js';

///this is  called from RootSaga whenever the FETCHING_DATA Happens
function* fetchData(action) {
  const isConnected = yield networkConnectivity.checkNetworkConnectivityFunc();
  if(isConnected){
    try{
      let {ReqType, body, isAuthorizationAvailable, nextScreen,baseURL} = action.payload;
      console.log("baseURL=============baseURL======baseURL===",baseURL);
      let data = null;
      let header = yield apiUtil.getHeader(isAuthorizationAvailable);
      if(ReqType == 'POST'){
        data = yield apiUtil.callPOST(header,body,baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE, error:data.errors[0].message});
          }else{

            yield put({type: FETCHING_DATA_SUCCESS, data: data.data});
            yield delay(500);
            yield localStorage.storeData("clientAuthToken", data.data.accessToken);
            if(nextScreen != null){
                RootNavigation.navigate(nextScreen,{
                  data: data.data
                });
            }
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE, error:'request failure'});
        }
      }else if(ReqType == 'GET'){
        
        data = yield apiUtil.callGET(header, baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE, error:data.errors[0].message});
          }
          else{

            if(data.data.message == 'Successfully logged out'){
              yield localStorage.clearAll();
              yield put({type: FETCHING_DATA_SUCCESS});
              RootNavigation.navigate('SignIn');
            }
            console.log("GET CALL HETE--------->", data);
            yield put({type: FETCHING_DATA_SUCCESS, data: data.data});

            yield delay(500);
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE, error:'request failure'});
        }
      }else if(ReqType == 'PATCH'){
        data = yield apiUtil.callPATCH(header,body,baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE, error:data.errors[0].message});
          }
          else{
            yield put({type: FETCHING_DATA_SUCCESS, data: data.data});
            yield delay(500);
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE, error:'request failure'});
        }
      }

    }catch(error){
      yield put({type: FETCHING_DATA_FAILURE, error: error});
    }
  }else{
    yield put({type: FETCHING_DATA_FAILURE, error: 'No Internet Connection'});
  }
}

export function* fetchDataMultiple(action) {
  const isConnected = yield networkConnectivity.checkNetworkConnectivityFunc();
  if (isConnected) {
    try {
      let {ReqType, body, isAuthorizationAvailable, nextScreen,baseURL} = action.payload;
      let data = null;
      let header = yield apiUtil.getHeader(isAuthorizationAvailable);
      if(ReqType == 'GET'){
        const promises = action.payload.requests.map(request => apiUtil.callGET(header, request.baseURL));
        const results = yield all(promises);
          
        let resultArray = [];
        const resultsPromises = results.map(async result => {
          return resultArray.push({name:result.data});
        });

        yield put({type: FETCHING_DATA_SUCCESS_MULTIPLE, multipleData: resultArray});
        }
      
    } catch (error) {
        yield put({type: FETCHING_DATA_FAILURE_MULTIPLE, error: error});
    }
  }else{
    const error = 'no_network_connection';
    yield put({type: FETCHING_DATA_FAILURE_MULTIPLE, error:error }); 
  }
}

export function* fetchMapData(action){
  const isConnected = yield networkConnectivity.checkNetworkConnectivityFunc();
  if (isConnected) {
    try {
      let {ReqType, body, isAuthorizationAvailable, nextScreen,baseURL} = action.payload;
      let data = null;
      let header = yield apiUtil.getHeader(isAuthorizationAvailable);
      if(ReqType == 'POST'){
        data = yield apiUtil.callPOST(header,body,baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE_MAP, error:data.errors[0].message});
          }else{

            yield put({type: FETCHING_DATA_SUCCESS_MAP, mapData: data.data});
            yield delay(500);
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE_MAP, error:'request failure'});
        }
      }else if(ReqType == 'GET'){
        data = yield apiUtil.callGET(header, baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE_MAP, error:data.errors[0].message});
          }
          else{
            //Fetching Cities
            if(data.data && data.data.length > 0){
              const promises = data.data.map(request => apiUtil.GETMapMarkers(header, request));
              const results = yield all(promises);
              
              yield put({type: FETCHING_DATA_SUCCESS_MAP, mapData: results});
            }
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE_MAP, error:'request failure'});
        }
      }

    }catch (error) {
        yield put({type: FETCHING_DATA_FAILURE_MAP, error: error});
    }
  }else{
    const error = 'no_network_connection';
    yield put({type: FETCHING_DATA_FAILURE_MAP, error:error }); 
  }
}




export function* fetchOtherData(action){
  const isConnected = yield networkConnectivity.checkNetworkConnectivityFunc();
  if (isConnected) {
    try {
      let {ReqType, body, isAuthorizationAvailable, nextScreen,baseURL} = action.payload;
      let data = null;
      let header = yield apiUtil.getHeader(isAuthorizationAvailable);
      if(ReqType == 'POST'){
        data = yield apiUtil.callPOST(header,body,baseURL);
        if(data.status == 200){
          
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE_OTHER, error:data.errors[0].message});
          }else{
            console.log(" VIEW LEAD saga Data-----123-----",data.data);
            yield put({type: FETCHING_DATA_SUCCESS_OTHER, otherData: data.data});
            yield delay(500);
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE_OTHER, error:'request failure'});
        }
      }else if(ReqType == 'GET'){
        data = yield apiUtil.callGET(header, baseURL);
        if(data.status == 200){
          if(data.data == null || data.errors){
            yield put({type: FETCHING_DATA_FAILURE_OTHER, error:data.errors[0].message});
          }
          else{
            //Fetching Cities
            if(data.data && data.data.length > 0){
              const promises = data.data.map(request => apiUtil.GETMapMarkers(header, request));
              const results = yield all(promises);
              
              yield put({type: FETCHING_DATA_SUCCESS_OTHER, otherData: results});
            }
          }
        }else{
          yield put({type: FETCHING_DATA_FAILURE_OTHER, error:'request failure'});
        }
      }

    }catch (error) {
        yield put({type: FETCHING_DATA_FAILURE_OTHER, error: error});
    }
  }else{
    const error = 'no_network_connection';
    yield put({type: FETCHING_DATA_FAILURE_OTHER, error:error }); 
  }
}


//
function* RootSaga() {
    yield takeEvery(FETCHING_DATA, fetchData);
    yield takeEvery(FETCHING_DATA_MULTIPLE, fetchDataMultiple);
    yield takeEvery(FETCHING_DATA_MAP, fetchMapData);
    yield takeEvery(FETCHING_DATA_OTHER, fetchOtherData);
  }
  
  export default RootSaga;


