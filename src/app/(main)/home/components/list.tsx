'use client';

import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { useState } from 'react';
import ListComponent from './ListComponent';
import { TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';

const USD_TO_KRW = 1350; // 💱 환율 (고정값, 필요 시 API로 대체 가능)

const normalizeUnit = (unit: string): '₩' | '$' => {
    if (unit.includes('$') || unit.toLowerCase().includes('usd')) return '$';
    return '₩';
};

const getPriceInKRW = (price: string, unit: string): number => {
    const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
    const normalized = normalizeUnit(unit);
    return normalized === '$' ? num * USD_TO_KRW : num;
};

const List = () => {
    const { services } = useHomeStore();
    const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

    const sortedServices = [...services].sort((a, b) => {
        if (sortBy === 'date') {
            return Number(a.dday) - Number(b.dday);
        } else {
            const priceA = getPriceInKRW(a.price, a.priceUnit);
            const priceB = getPriceInKRW(b.price, b.priceUnit);
            return priceB - priceA;
        }
    });

    return (
        <Wrapper>
            <Header>
                <Title>내 구독 개수 : {services.length} 개</Title>
                <Select onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}>
                    <option value="date">결제일</option>
                    <option value="price">가격순</option>
                </Select>
            </Header>
            <ServiceList>
                {sortedServices.map(service => (
                    <ListComponent key={service.id} service={service} />
                ))}
            </ServiceList>
        </Wrapper>
    );
};

export default List;

// ---------- 스타일 ----------

const Wrapper = styled.div`
    width: 100%;
    padding: 1rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const Title = styled.div`
    font-family: ${FONTS.PRETENDARD[700]};
    color: ${TEXT_COLORS.black};
`;

const Select = styled.select`
    padding: 0.4rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
`;

const ServiceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;