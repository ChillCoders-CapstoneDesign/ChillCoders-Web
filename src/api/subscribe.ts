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

export interface SubscribeDatas {
    categoryNo: number,
    totalCount: number,
    monthlyTotalPrice: number,
    yearlyTotalPrice: number,
    subscribeList: SubscribeData[]
}

const isMock = false;

// 특정 구독 서비스 하나 조회
export const getSubscribeById = async (id: number): Promise<SubscribeData> => {
    const response = await axiosInstance.get(`/subscribe/${id}`);
    return response.data;
};

// 여러 서비스 불러오고 싶을 경우 (추후 필요시)
export const getSubscribesAll = async (): Promise<SubscribeDatas> => {
    if (isMock){
        return mockSubscribes;
    }
    const response = await axiosInstance.get(`subscribe/list`);
    return response.data;
}


// 여러 서비스 불러오고 싶을 경우 (추후 필요시)
export const getSubscribes = async (id: number): Promise<SubscribeDatas> => {
    if (isMock){
        return mockSubscribes;
    }
    const response = await axiosInstance.get(`subscribe/list/category/${id}`);
    return response.data;
}


const mockSubscribes = {
    categoryNo: 0,
    totalCount: 7,
    monthlyTotalPrice: 35000,
    yearlyTotalPrice: 87000,
    subscribeList: [
        {
        "subscribeNo": 1,
        "subscribeName": "넷플릭스",
        "image": "S3에 배포한 netflix.png",
        "price": 12000,
        "priceUnit": "원",
        "period": 1,
        "periodUnit": "달",
        "startDate": "2025-05-17",
        "categoryNo": 0,
        "passedMonth": 9,
        "dday": 0
        },
        {
        "subscribeNo": 2,
        "subscribeName": "밀리의서재",
        "image": "S3에 배포한 밀리.png",
        "price": 35000,
        "priceUnit": "원",
        "period": 1,
        "periodUnit": "달",
        "startDate": "2025-05-17",
        "categoryNo": 0,
        "passedMonth": 9,
        "dday": 0
        },
    ] as SubscribeData[]
} as SubscribeDatas