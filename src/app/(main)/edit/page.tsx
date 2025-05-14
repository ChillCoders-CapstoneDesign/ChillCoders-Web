'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../assets/icons/back-icon.png';
import netflixLogo from '../../../../public/images/netflix_premium.png';

export default function EditPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleSave = () => {
        router.push('/home');
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="back" width={75} height={75} />
                </BackButton>
            </TopBar>

            

            <Image
                src={netflixLogo}
                alt="넷플릭스"
                width={170}
                height={170}
                style={{
                    borderRadius: '1rem',
                    objectFit: 'cover',
                }}
            />
            <ServiceName>Netflix ✏️</ServiceName>

            <InputGroup>
                <Label>구독 요금</Label>
                <Row>
                    <Input placeholder="17,000" />
                    <Unit>원</Unit>
                </Row>

                <Label>구독 주기</Label>
                <Row>
                    <Input placeholder="1" />
                    <Unit>달</Unit>
                </Row>

                <Label>구독 시작</Label>
                <Input placeholder="2025년 4월 29일" />

                <Label>구독 중인 개월 수</Label>
                <Input placeholder="9개월간 구독중" />
            </InputGroup>

            <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const TopBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const ServiceImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 1rem;
    object-fit: cover;
`;

const ServiceName = styled.h2`
    font-size: 1.2rem;
    font-family: ${FONTS.PRETENDARD[600]};
    margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: ${TEXT_COLORS.black};
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Input = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    font-size: 1rem;
    background-color: #f7f7f7;
`;

const Unit = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${TEXT_COLORS.default};
`;

const SaveButton = styled.button`
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;
    background-color: ${COLORS.main};
    color: white;
    font-size: 1rem;
    font-family: ${FONTS.PRETENDARD[500]};
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
`;