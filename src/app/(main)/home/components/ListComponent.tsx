'use client';

import styled from 'styled-components';
import { useState, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import { useHomeStore } from '@/store/useHomeStore';
import { useRouter } from 'next/navigation';
import axios from '@/api/axiosInstance';
import { formatPrice } from '@/utils/formatPrice';
import { serviceLoginLinks } from '@/constants/serviceLinks';

interface Props {
    service: {
        id: number;
        name: string;
        price: string;
        priceUnit: string;
        billingType: string;
        dday: string;
        logoUrl: string;
        period: string;
    };
}

const ListComponent = ({ service }: Props) => {
    const [showDelete, setShowDelete] = useState(false);
    const touchStartX = useRef(0);
    const mouseStartX = useRef(0);
    const isAnimating = useRef(false);
    const { setServices, services, setCosts } = useHomeStore();
    const router = useRouter();

    const loginUrl = serviceLoginLinks[service.name.trim()];

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 30) {
            // Left swipe (right to left) → show delete
            setShowDelete(true);
            isAnimating.current = true;
            setTimeout(() => (isAnimating.current = false), 1000);
        } else if (diff < -30) {
            // Right swipe (left to right) → hide delete
            setShowDelete(false);
            isAnimating.current = true;
            setTimeout(() => (isAnimating.current = false), 1000);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        mouseStartX.current = e.clientX;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const diff = mouseStartX.current - e.clientX;
        if (diff > 30) {
            // Left swipe (right to left) → show delete
            setShowDelete(true);
            isAnimating.current = true;
            setTimeout(() => (isAnimating.current = false), 1000);
        } else if (diff < -30) {
            // Right swipe (left to right) → hide delete
            setShowDelete(false);
            isAnimating.current = true;
            setTimeout(() => (isAnimating.current = false), 1000);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/subscribe/${service.id}`);
            const updated = services.filter((s) => s.id !== service.id);
            setServices(updated);

            const totalMonthly = updated.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + (s.billingType === '달' ? price : 0);
            }, 0);

            const totalYearly = updated.reduce((sum, s) => {
                const price = parseInt(s.price.replace(/[^0-9]/g, ''), 10);
                return sum + (s.billingType === '년' ? price : 0);
            }, 0);

            setCosts(totalMonthly, totalYearly);
        } catch (err) {
            console.error('❌ 삭제 실패:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (showDelete || isAnimating.current) {
            e.stopPropagation(); // Prevent unintended navigation
            return;
        }
        router.push(`/edit?subscribeNo=${service.id}`);
    };

    return (
        <Container>
            <SwipeWrapper>
                <Content
                    $showDelete={showDelete}
                    onClick={(e) => handleClick(e)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <a
                        href={loginUrl || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            if (loginUrl) e.stopPropagation();
                        }}
                    >
                        <Logo
                            src={
                                service.logoUrl && service.logoUrl !== ''
                                    ? service.logoUrl
                                    : '/images/cloverlogo.png'
                            }
                            alt={service.name}
                        />
                    </a>
                    <TextBox>
                        <ServiceName>{service.name}</ServiceName>
                        <ServicePrice>
                            {formatPrice(service.price, service.priceUnit === '₩' ? '원' : service.priceUnit)} /{' '}                            
                            {['달', '년'].includes(service.billingType)
                                ? `${parseInt(service.period)}${service.billingType} 단위`
                                : `${service.period.trim()} ${service.billingType} 구독제`}
                        </ServicePrice>
                    </TextBox>
                    <Dday>D-{service.dday}</Dday>
                </Content>

                {showDelete && (
                    <DeleteArea onClick={handleDelete}>
                        <DeleteOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />
                    </DeleteArea>
                )}
            </SwipeWrapper>
        </Container>
    );
};

export default ListComponent;

const Container = styled.div`
    position: relative;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-bottom: 1rem;
`;

const SwipeWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const Content = styled.div<{ $showDelete: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 1rem;
    transform: ${({ $showDelete }) => ($showDelete ? 'translateX(-4rem)' : 'translateX(0)')};
    transition: transform 0.3s ease;
    cursor: ${({ $showDelete }) => ($showDelete ? 'default' : 'pointer')};
`;

const Logo = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 1.2rem;
`;

const TextBox = styled.div`
    flex: 1;
`;

const ServiceName = styled.div`
    font-family: ${FONTS.PRETENDARD[600]};
    font-size: 1rem;
    color: ${TEXT_COLORS.serviceName};
`;

const ServicePrice = styled.div`
    font-size: 0.875rem;
    color: ${TEXT_COLORS.default};
`;

const Dday = styled.div`
    background-color: ${COLORS.main};
    color: #fff;
    padding: 0.5rem 0;
    width: 4.5rem;
    text-align: center;
    border-radius: 20px;
    font-weight: bold;
`;

const DeleteArea = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 4rem;
    height: 100%;
    background-color: ${COLORS.delete};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;