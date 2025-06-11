import { create } from 'zustand';
import axios from '../api/axiosInstance';
import type { SubscribeData } from '@/types/subscribe';
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

            // ✅ 백엔드에서 /subscribe/list API 호출
            const { data } = await axios.get<{
                totalCount: number;
                monthlyTotalPrice: number;
                yearlyTotalPrice: number;
                subscribeList: SubscribeData[];
            }>('/subscribe/list');

            // ✅ raw data → Service 타입으로 파싱
            const parsed: Service[] = data.subscribeList.map((item, index) => ({
                id: item.subscribeNo || index,
                name: item.subscribeName,
                price: item.price.toLocaleString(), // 쉼표 있는 문자열로 변환
                billingType: item.periodUnit,       // '월' 또는 '년'
                dday: item.dday?.toString() || '0',
                logoUrl: item.image || '',
                period: `${item.period} ${item.periodUnit}`,
                category: item.categoryNo?.toString() || '기타',
            }));

            // ✅ 카테고리 필터링 (예: 음악, OTT 등)
            const filtered = category === '전체보기'
                ? parsed
                : parsed.filter((service) => service.category === category);

            // ✅ 월간 비용 계산 (billingType이 '달'인 것만)
            const monthlyOnly = filtered.filter(s => s.billingType === '달');
            const totalMonthly = monthlyOnly.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + price;
            }, 0);

            // ✅ 연간 비용 계산 (billingType이 '년'인 것만)
            const yearlyOnly = filtered.filter(s => s.billingType === '년');
            const totalYearly = yearlyOnly.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + price;
            }, 0);

            // ✅ Zustand store에 상태 저장
            set({
                services: filtered,
                monthlyCost: totalMonthly,
                yearlyCost: totalYearly,
            });

        } catch (err) {
            console.error('fetchHomeData error:', err);
        }
    }
}));