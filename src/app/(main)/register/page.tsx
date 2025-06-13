'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import backIcon from '../../../assets/icons/back-icon.png';
import { useState } from 'react';
import axios from '@/api/axiosInstance';

interface SearchResult {
    subscribeNo: number;
    subscribeName: string;
    image: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<SearchResult[]>([]);
    const [showRegisterSelf, setShowRegisterSelf] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setFiltered([]);
            setShowRegisterSelf(false);
            return;
        }

        try {
            const response = await axios.get<SearchResult[]>(`/subscribe/search?keyword=${value}`);
            setFiltered(response.data);
            setShowRegisterSelf(response.data.length === 0);
        } catch (err) {
            console.error('검색 실패:', err);
        }
    };

    const handleSelect = (service: SearchResult) => {
        router.push(
            `/register/done?name=${encodeURIComponent(service.subscribeName)}&img=${encodeURIComponent(service.image)}&subscribeNo=${service.subscribeNo}`
        );
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <img
                        src={backIcon.src}
                        alt="back"
                        width={75}
                        height={75}
                        style={{ objectFit: 'cover' }}
                    />
                </BackButton>
            </TopBar>

            <ContentWrapper>
                <FixedContent>
                    <Title>어떤 서비스를 구독하고 계신가요? 📌</Title>
                    <SearchInput
                        placeholder="서비스 명 검색"
                        value={query}
                        onChange={handleInputChange}
                    />
                </FixedContent>

                {query.trim() !== '' && (
                    <DynamicContent>
                        {filtered.length > 0 && (
                            <Dropdown>
                                {filtered.map((service) => (
                                    <DropdownItem
                                        key={service.subscribeNo}
                                        onClick={() => handleSelect(service)}
                                    >
                                        {service.subscribeName}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        )}
                        {showRegisterSelf && (
                            <RegisterSelf onClick={() => router.push('/edit-firsthand')}>
                                … 직접 등록하기
                            </RegisterSelf>
                        )}
                    </DynamicContent>
                )}
            </ContentWrapper>
        </Container>
    );
}

// ---------- 스타일 ----------

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.white};
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    height: 4.5rem;
    padding-left: 1rem;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    padding-top: 1rem;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    flex: 1;
    position: relative;
    padding: 1rem;
    margin-right: 2rem;
    margin-left: 2rem;
`;

const FixedContent = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    max-width: 480px;
`;

const DynamicContent = styled.div`
    position: absolute;
    top: calc(30% + 3rem); /* 위치 보정 */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${TEXT_COLORS.black};
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`;

const SearchInput = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    font-size: 1rem;
    background-color: #f7f7f7;
    color: ${TEXT_COLORS.default};
`;

const Dropdown = styled.ul`
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    background: #fff;
    list-style: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const DropdownItem = styled.li`
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 1rem;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const RegisterSelf = styled.div`
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 500;
    color: ${TEXT_COLORS.default};
    cursor: pointer;
    background-color: #f2f2f2;
    border-radius: 0.75rem;
    &:hover {
        background-color: #e0e0e0;
    }
`;