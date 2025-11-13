import axios from "axios";

const getProjectSingle = (
  url: string,
  extern_id: string,
  lat: string,
  lng: string
) => {
  return axios({
    method: "GET",
    url: `${url}?extern_id=${extern_id}&lat=${lat}&lng=${lng}`,
  }).then((res) => {
    return res;
  });
};
export default getProjectSingle;
