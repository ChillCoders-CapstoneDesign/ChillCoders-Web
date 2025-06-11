'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../../assets/icons/back-icon.png';
import { getParticle } from '@/utils/postposition';

export default function RegisterDonePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const name = searchParams.get('name');
    const img = searchParams.get('img');

    const handleBack = () => {
        router.back();
    };

    const handleGoToInput = () => {
        router.push('/edit');
    };

    //이거 아직 S3에 배포 안되어서 더미로 넣음
    const getResolvedImageUrl = (img?: string) => {
        if (!img || img === 'null') return '/images/gray-circle.png';

        if (img.startsWith('http')) return img;

        return `https://your-temp-domain.com/${img}`;
    };
    //여기까지 더미 


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
                        // src={img}
                        src={getResolvedImageUrl(img)} //여기 더미 넣음
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