import { Service } from '../types/service';

export const mockServices: Service[] = [
    // ♫ 음악
    {
        id: 1,
        name: 'FLO Music',
        price: '8,900₩',
        billingType: '1달',
        dday: '2',
        logoUrl: '',
        period: '1달',
        category: '음악'
    },
    {
        id: 2,
        name: 'APPLE Music',
        price: '9,900₩',
        billingType: '1달',
        dday: '2',
        logoUrl: '',
        period: '1달',
        category: '음악'
    },

    // 🎬 OTT
    {
        id: 3,
        name: 'Netflix Premium',
        price: '17,000₩',
        billingType: '1달',
        dday: '3',
        logoUrl: '',
        period: '1달',
        category: 'OTT'
    },
    {
        id: 4,
        name: 'Watcha Basic',
        price: '7,900₩',
        billingType: '1달',
        dday: '30',
        logoUrl: '',
        period: '1달',
        category: 'OTT'
    },

    // 🛠️ 툴
    {
        id: 5,
        name: 'ChatGPT Plus',
        price: '$20 USD',
        billingType: '1달',
        dday: '5',
        logoUrl: '',
        period: '1달',
        category: 'AI'
    },
    {
        id: 6,
        name: 'Photoshop',
        price: '356,400₩',
        billingType: '1년',
        dday: '332',
        logoUrl: '',
        period: '1년',
        category: '툴'
    },
    {
        id: 7,
        name: 'Claude',
        price: '$16.67 USD',
        billingType: '1달',
        dday: '10',
        logoUrl: '',
        period: '1달',
        category: 'AI',
    }
];