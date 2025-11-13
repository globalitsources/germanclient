import axios from 'axios'


const getForm = (url:string) => {
    return axios({
        method: 'GET',
        url: `${url}`,
    })
    .then((res)=>{
        return res;
    })
}
export default getForm;
