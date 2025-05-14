'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../../assets/icons/back-icon.png';

export default function RegisterDonePage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleGoToInput = () => {
        router.push('/edit');
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="뒤로가기" width={75} height={75} />
                </BackButton>
            </TopBar>

            <Content>
                <Message>
                    <span>“넷플릭스”를 구독하고 계시는군요!</span>
                    <br />
                    구독 정보를 입력하러 가볼까요?
                </Message>

                <ConfirmButton onClick={handleGoToInput}>
                    입력하러 가기
                </ConfirmButton>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    padding: 1.5rem 1rem 2rem;
    height: 100vh;
    background-color: ${COLORS.white};
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
`;

const Message = styled.div`
    text-align: center;
    font-size: 1rem;
    font-family: ${FONTS.PRETENDARD[600]};
    color: ${TEXT_COLORS.black};
    line-height: 1.5;
`;

const ConfirmButton = styled.button`
    width: 100%;
    max-width: 280px;
    padding: 1rem 0;
    background-color: ${COLORS.main};
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-family: ${FONTS.PRETENDARD[500]};
    cursor: pointer;
`;