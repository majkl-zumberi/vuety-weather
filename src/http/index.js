import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  params: {
    appid: process.env.VUE_APP_APIKEY,
    lang: process.env.VUE_APP_LANG,
    units: process.env.VUE_APP_UNITS
  }
});
