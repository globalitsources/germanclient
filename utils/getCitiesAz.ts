import axios from "axios";
import {pythonApiUrlCities} from "~/service/helpers/strings";
const getCitiesAz = () => {
  return axios.get(pythonApiUrlCities);
};
export default getCitiesAz;
