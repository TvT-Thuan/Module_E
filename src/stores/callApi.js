import axios from "axios";
const urlPrefix = "http://localhost:8000/api/v1";
export default {
  getToken() {
    return window.localStorage.getItem("token");
  },
  get(url) {
    return axios.get(urlPrefix + url);
  },
  post(url, data) {
    return axios.post(urlPrefix + url, data);
  },
  getWithToken(url) {
    return axios.get(urlPrefix + url + "?token=" + this.getToken());
  },
  postWithToken(url, data) {
    return axios.post(urlPrefix + url + "?token=" + this.getToken(), data);
  },
};
