import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { TEXT_COLORS, COLORS } from '@/constants/colors';
import { FONTS } from '../../../../constants/font';

const Summary = () => {
    const { monthlyCost, yearlyCost } = useHomeStore();

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
    align-items: center;
`;

const DollarEmoji = styled.div`
    font-size: 2.4rem;
    margin-right: 1.7rem;
    margin-left: 1.7rem;
`;

const CostText = styled.p`
    font-size: 1.1rem;
    margin: 0.2rem 0;
    font-weight: ${FONTS.PRETENDARD[700]};
`;