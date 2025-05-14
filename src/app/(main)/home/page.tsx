'use client';

import { useEffect } from 'react';
import { useHomeStore } from '../../../store/useHomeStore';
import Summary from './components/summary';
import Category from './components/category';
import List from './components/list';

const HomePage = () => {
    const { fetchHomeData, selectedCategory } = useHomeStore();

    useEffect(() => {
        fetchHomeData();
    }, [selectedCategory]);

    return (
        <>
            <Summary />
            <Category />
            <List />
        </>
    );
};

export default HomePage;
