import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://98.81.122.163:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;