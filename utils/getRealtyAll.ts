import axios from "axios";
import { pythonApiUrl } from "~/service/helpers/strings";
import { buildQueryString } from "~/service/helpers/strings";
import { ISearchParams } from "~/service/models/QueryParams";

const getRealtyAll = (options: ISearchParams) => {
  const searchUrl = pythonApiUrl + buildQueryString(options);
  return axios.get(searchUrl);
};
export default getRealtyAll;
