const axios = require('axios');
import LocalStorage from '../Helpers/LocalStorage';
import { API_KEY } from "./URL";

//create instance of other Helper classes
let localStorage = new LocalStorage();

export default class APIUtil {
      ////return header
  async getHeader(isAuthorizationAvailable){
    if(isAuthorizationAvailable){
      let token = await localStorage.getData("clientAuthToken");
      console.log("Header Token======================",token);
      let header = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
      return header;
    }else{
      let header = {
        'Content-Type': 'application/json',
      };
      return header;
    }
  }

  //POST Request
  async callPOST(header, body, baseURL) {
    return axios({
      method: 'post',
      headers: header,
      url: baseURL,
      data: body
    })
      .then(res => {
        return res;
      })
      .catch(error => {
        return error;
      });
  }

  async callGET(header, baseURL){
    return axios({
      method: 'get',
      headers: header,
      url: baseURL,
    })
      .then(res => {
        return res;
      })
      .catch(error => {
        console.log("error======================",error);
        return error;
      });
  }

  async callPATCH(header, body, baseURL) {
    return axios({
      method: 'patch',
      headers: header,
      url: baseURL,
      data: body
    })
      .then(res => {
        console.log("PATCH========res==============",res);
        return res;
      })
      .catch(error => {
        return error;
      });
  }

  async GETMapMarkers(header, result){
    let mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${result.address+','+result.city}&key=${API_KEY}&country:lk`;
    return axios({
      method: 'get',
      headers: header,
      url: mapURL,
    })
      .then(res => {
        if(res.data.results[0].geometry.location && res.data.results[0].geometry.location != null){
          return res.data.results[0].geometry.location;
        }
      })
      .catch(error => {
        console.log("error======================",error);
        return error;
      });
  }


}