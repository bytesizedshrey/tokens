import axios from 'axios'


export let axiosInstance = axios.create({
    baseURL : 'http://localhost:3000',
    withCredentials: true
})

//grab the response before hitting the frontend from backend

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.get('/api/auth/get-accessToken');
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)