// src/store/useHomeStore.ts
import { create } from 'zustand';
import { mockServices } from '@/constants/mockServices'; // ✅ 이 줄 추가

export type Service = {
    id: number;
    name: string;
    price: string;
    billingType: string;
    dday: string;
    logoUrl: string;
    period: string;
    category: string;
};

type HomeState = {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;

    monthlyCost: number;
    yearlyCost: number;
    setCosts: (month: number, year: number) => void;

    services: Service[];
    setServices: (services: Service[]) => void;

    fetchHomeData: () => Promise<void>; // 👈 추가
};


export const useHomeStore = create<HomeState>((set, get) => ({
    selectedCategory: '전체보기',
    setSelectedCategory: (category) => set({ selectedCategory: category }),

    monthlyCost: 0,
    yearlyCost: 0,
    setCosts: (month, year) => set({ monthlyCost: month, yearlyCost: year }),

    services: [],
    setServices: (services) => set({ services }),

    // ✅ 여기 부분 교체!
    fetchHomeData: async () => {
        const category = get().selectedCategory;
    
        const filtered = category === '전체보기'
            ? mockServices
            : mockServices.filter(service => service.category === category); // ✅ 수정
    
        const totalMonthly = filtered.reduce((sum, s) => {
            const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
            return sum + (s.billingType === '1년' ? price / 12 : price);
        }, 0);
    
        set({
            services: filtered,
            monthlyCost: totalMonthly,
            yearlyCost: totalMonthly * 12,
        });
    }
}));