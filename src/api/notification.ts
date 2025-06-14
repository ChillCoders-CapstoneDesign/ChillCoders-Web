import axios from './axiosInstance';

export const fetchNotifications = async () => {
    const res = await axios.get('/notification');
    return res.data;
};

export const markAsRead = async (notificationNo: number) => {
    await axios.patch(`/notification/${notificationNo}/read`);
};