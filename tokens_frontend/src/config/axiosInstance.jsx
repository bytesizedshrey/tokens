import axios from 'axios'


export let axiosInstance = axios.create({
    baseURL : 'http://fakestoreapi.com',
    withCredentials: true
})