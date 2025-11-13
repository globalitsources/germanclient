import { ISearchParams } from "~/service/models/QueryParams";

//console.log('process: ', process.env);

//export const GoogleMapsApiKey = process.env.VUE_APP_GOOGLE_MAPS_KEY; 
export const GoogleMapsApiKey = "AIzaSyBCod0AmOvMtKkk087WXQfyggRMBZ9zgb4";
export const mapInit = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapsApiKey}&libraries=places`;

export const GoogleAnalyticsV4 = "G-SXV19HTE5M";

//export const pythonApiUrl = process.env.API_HOST_SLAVE+"realty/?";
export const pythonApiUrl = "https://api.slave.zimmer-im-revier.de/realty/?";

export const pythonApiUrlCities = "https://api.slave.zimmer-im-revier.de/cities/";

export const buildQueryString = (options: ISearchParams) => {



  


  return Object.keys(options)
    .map(
      (key) =>
        `${key}=${encodeURIComponent(options[key as keyof ISearchParams])}`
    )
    .join("&");
};
