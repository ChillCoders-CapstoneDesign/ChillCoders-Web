'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchNotifications, markAsRead } from '@/api/notification';
import { CloseOutlined } from '@ant-design/icons';
import { useNotificationStore } from '@/store/useNotificationStore'; // ✅ Zustand 전역 상태 동기화용

interface Notification {
    notificationNo: number;
    message: string;
    createdAt: string;
}

interface Props {
    onClose: () => void;
}

const NotificationModal = ({ onClose }: Props) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { setNotifications: setGlobalNotifications } = useNotificationStore(); // ✅ 전역 상태 업데이트

    useEffect(() => {
        const load = async () => {
            const data = await fetchNotifications();
            setNotifications(data);
        };
        load();
    }, []);

    const handleClick = async (noti: Notification) => {
        await markAsRead(noti.notificationNo);
        const updated = notifications.filter((n) => n.notificationNo !== noti.notificationNo);
        setNotifications(updated);
    };

    const handleCloseButton = () => {
        if (notifications.length === 0) {
            setGlobalNotifications([]); // ✅ 전역 상태도 비워야 Summary 빨간 점 사라짐
            window.location.reload();   // ✅ 전체 새로고침으로 동기화
        } else {
            onClose(); // ✅ 모달만 닫기
        }
    };

    return (
        <Backdrop onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h3>알림</h3>
                    <CloseOutlined onClick={handleCloseButton} />
                </Header>
                <Content>
                    {notifications.length === 0 ? (
                        <p>📭 새로운 알림이 없습니다.</p>
                    ) : (
                        notifications.map((noti) => (
                            <Item key={noti.notificationNo} onClick={() => handleClick(noti)}>
                                {noti.message}
                            </Item>
                        ))
                    )}
                </Content>
            </Modal>
        </Backdrop>
    );
};

export default NotificationModal;

// ------ styled -------
const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
`;

const Modal = styled.div`
    background: white;
    width: 90%;
    max-width: 380px;
    padding: 1rem;
    border-radius: 12px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Item = styled.div`
    background: #f6f6f6;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        background: #e2e2e2;
    }
`;