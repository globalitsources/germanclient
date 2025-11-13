import axios from 'axios'


const postForm = (url:string, fields:string) => {
    return axios({
        method: 'POST',
        url: `${url}`,
        data: fields,
    })
}
export default postForm;
