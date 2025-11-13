import axios from 'axios'

const getDictionary = (url:string) => {
    return axios({
        method: 'GET',
        url: `${url}`,
    })
    .then((res)=>{

	   
        return res;
    })
}
export default getDictionary;
