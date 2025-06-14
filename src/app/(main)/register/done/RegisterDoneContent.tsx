// src/app/(main)/register/done/RegisterDoneContent.tsx
'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../../assets/icons/back-icon.png';
import { getParticle } from '../../../../utils/postposition';

export default function RegisterDoneContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const name = searchParams.get('name');
    const img = searchParams.get('img');
    const subscribeNo = searchParams.get('subscribeNo');

    const handleBack = () => {
        router.back();
    };

    const handleGoToInput = () => {
        if (!subscribeNo) {
            alert('구독 번호가 없습니다');
            return;
        }
        router.push(`/edit?subscribeNo=${subscribeNo}`);
    };

    const getResolvedImageUrl = (img?: string) => {
        if (!img || img === 'null') return '/images/gray-circle.png';
        if (img.startsWith('http')) return img;
        return `https://your-temp-domain.com/${img}`;
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="뒤로가기" width={75} height={75} />
                </BackButton>
            </TopBar>

            <Content>
                {img && (
                    <Image
                        src={getResolvedImageUrl(img)}
                        alt={name || '서비스 로고'}
                        width={80}
                        height={80}
                        style={{ borderRadius: '50%' }}
                    />
                )}
                <Message>
                    <span>
                        “{name}”{getParticle(name || '', ['을', '를'])} 구독하고 계시는군요!
                    </span>
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

// ... styled-components는 기존 그대로 유지 ...

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: ${COLORS.white};
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    height: 4.5rem;

`;

const BackButton = styled.button`
    background: none;
    border: none;
    padding-top: 1rem;
    padding-left: 1rem;
    cursor: pointer;
`;

const Content = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 100%;
    max-width: 480px;
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