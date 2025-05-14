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
    padding-bottom: 6rem; /* BottomTab 높이만큼 패딩 추가 -> 없으면 리스트 많을시 BottomTab 뒤에 리스트 쌓임*/
`;