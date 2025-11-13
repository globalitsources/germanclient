import axios from 'axios'

const getProject = (url:string, authToken:string) => {
    return axios({
        method: 'GET',
        url: `${url}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    })
    .then((res)=>{
        return res;
    })
}
export default getProject;
