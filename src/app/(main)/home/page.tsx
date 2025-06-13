'use client';

import { useEffect } from 'react';
import { useHomeStore } from '../../../store/useHomeStore';
import Summary from './components/summary';
import Category from './components/category';
import List from './components/list';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { fetchNotifications } from '@/api/notification'; // ✅ 알림 API
import { useNotificationStore } from '@/store/useNotificationStore'; // ✅ Zustand store

// 🟡 알림 타입에 read 필드 추가 (Zustand 타입과 맞추기)
type Notification = {
    notificationNo: number;
    message: string;
    createdAt: string;
    read: boolean;
};

const HomePage = () => {
    const { fetchHomeData, selectedCategory } = useHomeStore();
    const { setNotifications } = useNotificationStore(); // ✅ setter

    useEffect(() => {
        fetchHomeData();
    }, [selectedCategory]);

    useEffect(() => {
        const showNotifications = async () => {
            try {
                const fetched: Omit<Notification, 'read'>[] = await fetchNotifications();

                // ✅ read: false 추가
                const allNoti: Notification[] = fetched.map((n) => ({
                    ...n,
                    read: false,
                }));

                // ✅ Zustand에 저장
                setNotifications(allNoti);

                // ✅ 최신 1개만 Toast로 보여주기
                const latest = allNoti
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 1);

                latest.forEach((noti) => {
                    toast.info(noti.message, {
                        toastId: `noti-${noti.notificationNo}`,
                    });
                });
            } catch (err) {
                console.error('알림 로딩 실패:', err);
            }
        };

        showNotifications();
    }, []); // ✅ 최초 1회만

    return (
        <PageContainer>
            <Summary />
            <Category />
            <List />
        </PageContainer>
    );
};

export default HomePage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;