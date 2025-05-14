'use client';

import { useEffect } from 'react';
import { useHomeStore } from '../../../store/useHomeStore';
import Summary from './components/summary';
import Category from './components/category';
import List from './components/list';
import styled from 'styled-components';

const HomePage = () => {
    const { fetchHomeData, selectedCategory } = useHomeStore();

    useEffect(() => {
        fetchHomeData();
    }, [selectedCategory]);

    return (
        <>
        <PageContainer>
            <Summary />
            <Category />
            <List />
        </PageContainer>

        </>
    );
};

export default HomePage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* 💥 이거 추가 */
    gap: 1rem; /* 필요시 컴포넌트 간 간격 */
`;