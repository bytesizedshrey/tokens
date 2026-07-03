import axios from 'axios'


export let axiosInstance = axios.create({
    baseURL : 'https://fakestoreapi.com',
    // withCredentials: true
})

//grab the response before hitting the frontend from backend

// axiosInstance.interceptors.request.use()

// axiosInstance.interceptors.response.use(
//     (response) => {
//         console.log("Axios instance response -> ", response)
//         return response
//     },
//     (error) => {
//         console.log('error in instance : ', error)


//         if(error.response.status === 401){
//             axiosInstance.get('/get-accessToken')
//         }
//     }
// )