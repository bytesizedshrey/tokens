import axios from 'axios'


export let axiosInstance = axios.create({
    baseURL : 'https://fakestoreapi.com',
    // withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Axios instance response -> ", response)
        return response
    },
    (error) => {
        console.log('error in instance : ', error)


        if(error.response.status === 401){
            axiosInstance.get('/get-accessToken')
        }
    }
)