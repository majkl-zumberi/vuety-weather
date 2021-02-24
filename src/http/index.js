import axios from 'axios';

export default (() => axios.create({
  baseURL: process.env.BASEURL,
  params: {
    appid: process.env.APIKEY,
    lang: process.env.LANG,
    units: process.env.UNITS,
  },
}))();
