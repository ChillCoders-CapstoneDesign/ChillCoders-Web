import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://balanced-united-famous-copied.trycloudflare.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;