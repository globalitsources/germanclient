import axios from 'axios'

let formData = new FormData();
formData.append('email', 'job@bogatyrev.de');
formData.append('password', '123456');

const getAuthToken = (url:string) => {
    return axios({
        method: 'POST',
        url: url,
        data: formData
    })
    .then((res)=>{
        return res;
    })
}
export default getAuthToken;
