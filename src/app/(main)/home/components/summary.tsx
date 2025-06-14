import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { TEXT_COLORS, COLORS } from '@/constants/colors';
import { FONTS } from '../../../../constants/font';

import { BellOutlined } from '@ant-design/icons';
import { useState } from 'react';
import NotificationModal from '@/components/common/NotificationModal'; // ✅ 추가
import { useNotificationStore } from '../../../../store/useNotificationStore';

const Summary = () => {
    const { monthlyCost, yearlyCost } = useHomeStore();
    const [showModal, setShowModal] = useState(false);
    const notifications = useNotificationStore((state) => state.notifications);

    const hasUnread = notifications.some((n) => !n.read); // 읽지 않은 게 하나라도 있으면 true

    return (
        <Container>
            <DollarEmoji>💸</DollarEmoji>
            <ContentWrapper>
                <CostText>
                    월간 비용 : <strong>{monthlyCost.toLocaleString()} 원</strong>
                </CostText>
                <CostText>
                    연간 비용 : <strong>{yearlyCost.toLocaleString()} 원</strong>
                </CostText>
            </ContentWrapper>
            <Bell onClick={() => setShowModal(true)}>
                <BellOutlined style={{ fontSize: '2rem' }} />
                {hasUnread && <RedDot />} {/* ✅ 조건부 렌더링 */}
            </Bell>
            {showModal && <NotificationModal onClose={() => setShowModal(false)} />}
        </Container>
    );
};

export default Summary;

const Container = styled.div`
    display: flex;
    align-items: center;
    background: linear-gradient(0deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%);
    padding-top: 3rem;
    padding-bottom: 3rem;
    color: ${TEXT_COLORS.topBar};
    width: 100%;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const DollarEmoji = styled.div`
    font-size: 2.4rem;
    margin-right: 1.7rem;
    margin-left: 1.7rem;
`;

const CostText = styled.p`
    font-size: 1.1rem;
    margin: 0.2rem;
    font-weight: ${FONTS.PRETENDARD[700]};

    strong {
        font-weight: ${FONTS.PRETENDARD[700]}; // ✅ 여기에 추가
    }
`;

const Bell = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RedDot = styled.div`
    width: 8px;
    height: 8px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    right: -2px;
`;