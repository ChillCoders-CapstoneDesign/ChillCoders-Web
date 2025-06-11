import axiosInstance from './axiosInstance';

export interface SubscribeData {
    subscribeNo: number;
    subscribeName: string;
    image: string;
    price: number;
    priceUnit: string;
    period: number;
    periodUnit: string;
    startDate: string;
    categoryNo: number;
    passedMonth: number;
    dday: number;
}

// 특정 구독 서비스 하나 조회
export const fetchSubscribeById = async (id: number): Promise<SubscribeData> => {
    const response = await axiosInstance.get(`/subscribe/${id}`);
    return response.data;
};

// 여러 서비스 불러오고 싶을 경우 (추후 필요시)