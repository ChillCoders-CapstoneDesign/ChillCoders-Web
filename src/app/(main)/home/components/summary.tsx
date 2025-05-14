import styled from 'styled-components';
import { useHomeStore } from '@/store/useHomeStore';
import { TEXT_COLORS, COLORS } from '@/constants/colors';

const Summary = () => {
    const { monthlyCost, yearlyCost } = useHomeStore();

    return (
        <Container>
            <CostText>
                월간 비용 : <strong>{monthlyCost.toLocaleString()} 원</strong>
            </CostText>
            <CostText>
                연간 비용 : <strong>{yearlyCost.toLocaleString()} 원</strong>
            </CostText>
        </Container>
    );
};

export default Summary;

const Container = styled.div`
    background: linear-gradient(180deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%);
    padding: 1rem;
    border-radius: 0.5rem;
    color: ${TEXT_COLORS.topBar};
`;

const CostText = styled.p`
    font-size: 1.1rem;
    margin: 0.2rem 0;
`;