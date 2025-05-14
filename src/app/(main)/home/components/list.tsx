import styled from 'styled-components';
import { useHomeStore } from '../../../../store/useHomeStore';
import { TEXT_COLORS, COLORS } from '@/constants/colors';

const List = () => {
    const { services } = useHomeStore();

    return (
        <ListContainer>
            {services.map((service) => (
                <Item key={service.id}>
                    <Logo src={service.logoUrl} alt={service.name} />
                    <TextBox>
                        <ServiceName>{service.name}</ServiceName>
                        <ServicePrice>{service.price} / {service.period}</ServicePrice>
                    </TextBox>
                    <Dday>D-{service.dday}</Dday>
                </Item>
            ))}
        </ListContainer>
    );
};

export default List;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
`;

const TextBox = styled.div`
    flex: 1;
    margin-left: 1rem;
`;

const ServiceName = styled.div`
    font-weight: bold;
`;

const ServicePrice = styled.div`
    font-size: 0.875rem;
    color: #666;
`;

const Dday = styled.div`
    background-color: ${COLORS.main};
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: bold;
`;

// layout은 이미 StyledLayout.tsx 로 쓰고 있으니 별도 작성은 불필요
