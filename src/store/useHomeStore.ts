// src/store/useHomeStore.ts
import { create } from 'zustand';

type Service = {
    id: number;
    name: string;
    price: string;
    billingType: string;
    dday: string;
    logoUrl: string;
    period: string;
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

    fetchHomeData: async () => {
        const category = get().selectedCategory;
        try {
            const res = await fetch(`/api/home?category=${category}`);
            const data = await res.json();

            // 예시: 백엔드에서 이런 형태로 준다고 가정
            // {
            //   monthlyCost: 96400,
            //   yearlyCost: 1069200,
            //   services: [ ... ]
            // }

            set({
                monthlyCost: data.monthlyCost,
                yearlyCost: data.yearlyCost,
                services: data.services,
            });
        } catch (err) {
            console.error('홈 데이터 fetch 실패:', err);
        }
    },
}));