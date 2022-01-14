import axios from "axios";

let baseURL = "http://localhost:3000/";

export default {
  getUser(data) {
    return axios.post(baseURL + 'user', data, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }});
  },
  login(data) {
    return axios.post(baseURL + 'user/login', data);
  },
  signup(data) {
    return axios.post(baseURL + 'user/create', data);
  },

  deleteUrl(data){
    return axios.post(baseURL + 'link/remove', data, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }});
  },
  getUrl(code){
    return axios.get(baseURL + code);
  },
  getAllUrls(){
    return axios.get(baseURL + 'link/all');
  },
  getShortUrl(data){
    return axios.post(baseURL + 'link/create', data);
  }  
};