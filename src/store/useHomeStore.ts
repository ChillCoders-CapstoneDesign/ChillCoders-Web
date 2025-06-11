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

            // 🔀 API 경로 분기
            const url = category === '전체보기'
                ? '/subscribe/list'
                : `/subscribe/list/category/${categoryToNo(category)}`;

            const { data } = await axios.get<{
                subscribeList: SubscribeData[];
            }>(url);

            const parsed: Service[] = data.subscribeList.map((item, index) => ({
                id: item.subscribeNo || index,
                name: item.subscribeName,
                price: item.price.toLocaleString(),
                billingType: item.periodUnit,
                dday: item.dday?.toString() || '0',
                logoUrl: item.image || '',
                period: `${item.period} ${item.periodUnit}`,
                category: item.categoryNo?.toString() || '기타',
            }));

            const monthlyOnly = parsed.filter(s => s.billingType === '달');
            const yearlyOnly = parsed.filter(s => s.billingType === '년');

            const totalMonthly = monthlyOnly.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + price;
            }, 0);

            const totalYearly = yearlyOnly.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + price;
            }, 0);

            set({
                services: parsed,
                monthlyCost: totalMonthly,
                yearlyCost: totalYearly,
            });

        } catch (err) {
            console.error('fetchHomeData error:', err);
        }
    }
}));

// 🔧 카테고리 이름 → 번호 변환 함수
function categoryToNo(name: string): number {
    const map: Record<string, number> = {
        음악: 1,
        OTT: 2,
        툴: 3,
        AI: 4,
        클라우드: 5,
        기타: 6,
    };
    return map[name] ?? 0;
}