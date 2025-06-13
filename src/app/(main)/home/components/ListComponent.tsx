'use client';

import styled from 'styled-components';
import { useState, useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import { useHomeStore } from '@/store/useHomeStore';
import { useRouter } from 'next/navigation'; // 시연용 추가
import axios from '@/api/axiosInstance';
import { formatPrice } from '../../../../utils/formatPrice';

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
    const { setServices, services, setCosts } = useHomeStore();
    const router = useRouter(); // 시연용 추가

    // 터치 이벤트
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 30) {
            setShowDelete(true); // 왼쪽으로 스와이프 → 삭제 버튼 보이기
        } else if (diff < -30) {
            setShowDelete(false); // 오른쪽으로 스와이프 → 숨기기
        }
    };

    // 마우스 이벤트
    const handleMouseDown = (e: React.MouseEvent) => {
        mouseStartX.current = e.clientX;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const diff = mouseStartX.current - e.clientX;
        if (diff > 30) {
            setShowDelete(true);
        } else if (diff < -30) {
            setShowDelete(false);
        }
    };

    const handleDelete = async () => {
        try {
            // 1. 서버에 DELETE 요청
            await axios.delete(`/subscribe/${service.id}`);

            // 2. 상태에서 제거
            const updated = services.filter((s) => s.id !== service.id);
            setServices(updated);

            // 3. 비용 재계산
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


    const handleClick = () => {
        if (!showDelete) {
            router.push(`/edit?subscribeNo=${service.id}`);  // ✅ 서비스 ID를 쿼리로 넘김
        }
    };

    return (
        <Container>
            <SwipeWrapper>
                <Content
                    $showDelete={showDelete}
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >   
                    <a
                        href={
                            service.name.toLowerCase() === 'netflix premium'
                                ? 'https://www.netflix.com/login'
                                : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            if (service.name.toLowerCase() === 'netflix premium') {
                                e.stopPropagation(); // 카드 클릭(router.push('/edit')) 방지
                            }
                        }}
                    >
                    <Logo
                        src={
                            service.logoUrl && service.logoUrl !== ''
                                ? service.logoUrl
                                : '/images/cloverlogo.png' // 직접 등록한 경우 기본 로고
                        }
                        alt={service.name}
                    />
                    </a>
                    <TextBox>
                        <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>
                        {formatPrice(service.price, service.priceUnit)} / {service.period}
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

// ------------------ 스타일 ------------------

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

    /* 🌟 [중간시연용] 커서 스타일 이건 시연 끝나고도 놔둬도 될듯 */
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
    padding: 0.5rem 0;          // 좌우 패딩 제거
    width: 4.5rem;              // 고정 너비 설정 (3자리 숫자 + 여백 감안)
    text-align: center;         // 가운데 정렬
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