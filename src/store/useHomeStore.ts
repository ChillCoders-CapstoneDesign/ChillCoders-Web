import { create } from 'zustand';
import axios from '../api/axiosInstance';
import type { SubscribeData } from '../types/subscribe';
import type { SubscribeDatas } from '../api/subscribe';
import type { Service } from '@/types/service';

type HomeState = {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;

    monthlyCost: number;
    yearlyCost: number;
    setCosts: (month: number, year: number) => void;

    services: Service[];
    setServices: (services: Service[]) => void;

    fetchHomeData: () => Promise<void>;
};

export const useHomeStore = create<HomeState>((set, get) => ({
    selectedCategory: '전체보기',
    setSelectedCategory: (category) => set({ selectedCategory: category }),

    monthlyCost: 0,
    yearlyCost: 0,
    setCosts: (month, year) => set({ monthlyCost: month, yearlyCost: year }),

    services: [],
    setServices: (services) => set({ services }),

    fetchHomeData: async () => {
        try {
            const category = get().selectedCategory;

            let allData: SubscribeData[] = [];
            let monthly = 0;
            let yearly = 0;

            if (category === '전체보기') {
                const res = await axios.get<SubscribeDatas>('/subscribe/list');
                allData = res.data.subscribeList;
                monthly = res.data.monthlyTotalPrice;
                yearly = res.data.yearlyTotalPrice;
            } else if (category === '기타') {
                const [etcRes, deliveryRes] = await Promise.all([
                    axios.get<SubscribeDatas>('/subscribe/list/category/7'),
                    axios.get<SubscribeDatas>('/subscribe/list/category/3'),
                ]);
                allData = [...etcRes.data.subscribeList, ...deliveryRes.data.subscribeList];
                monthly = etcRes.data.monthlyTotalPrice + deliveryRes.data.monthlyTotalPrice;
                yearly = etcRes.data.yearlyTotalPrice + deliveryRes.data.yearlyTotalPrice;
            } else {
                const categoryNo = categoryToNo(category);
                const res = await axios.get<SubscribeDatas>(`/subscribe/list/category/${categoryNo}`);
                allData = res.data.subscribeList;
                monthly = res.data.monthlyTotalPrice;
                yearly = res.data.yearlyTotalPrice;
            }

            const parsed: Service[] = allData.map((item, index) => ({
                id: item.subscribeNo || index,
                name: item.subscribeName,
                price: item.price.toLocaleString(),
                priceUnit: item.priceUnit,
                billingType: item.periodUnit,
                dday: item.dday?.toString() || '0',
                logoUrl: item.image || '',
                period: `${item.period} ${item.periodUnit}`,
                category: item.categoryNo?.toString() || '기타',
            }));

            set({
                services: parsed,
                monthlyCost: monthly,
                yearlyCost: yearly,
            });
        } catch (err) {
            console.error('fetchHomeData error:', err);
        }
    },
}));

// 🔧 카테고리 이름 → 번호 변환 함수
function categoryToNo(name: string): number {
    const map: Record<string, number> = {
        OTT: 1,
        음악: 2,
        '배달/배송': 3,
        클라우드: 4,
        AI: 5,
        툴: 6,
        기타: 7, // 기본 기타는 7번
    };
    return map[name] ?? 0;
}