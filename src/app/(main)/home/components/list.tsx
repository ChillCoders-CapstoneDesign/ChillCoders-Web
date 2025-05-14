'use client';

import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { useState } from 'react';
import ListComponent from './ListComponent';
import { TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';

const List = () => {
    const { services } = useHomeStore();
    const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

    const sortedServices = [...services].sort((a, b) => {
        if (sortBy === 'date') {
            return Number(a.dday) - Number(b.dday);
        } else {
            return parseFloat(b.price.replace(/[^\d.-]+/g, '')) - parseFloat(a.price.replace(/[^\d.-]+/g, ''));
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