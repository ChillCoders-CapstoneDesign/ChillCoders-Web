'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import backIcon from '../../../assets/icons/back-icon.png';
import { useState } from 'react';

const allServices = ['넷플릭스', '왓챠', '웨이브', '티빙', 'FLO Music', 'APPLE Music'];

export default function RegisterPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);

    const handleBack = () => {
        router.back();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === '') {
            setFiltered([]);
            return;
        }

        const matches = allServices.filter((s) =>
            s.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(matches);
    };

    const handleSelect = (service: string) => {
        // 실제론 상태 저장하거나 쿼리 파라미터 넘겨야 하지만 일단 라우팅만
        router.push('/register/done');
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="back" width={75} height={75} />
                </BackButton>
            </TopBar>

            <Content>
                <Title>어떤 서비스를 구독하고 계신가요? 🤔</Title>
                <SearchInput
                    placeholder="서비스 명 검색"
                    value={query}
                    onChange={handleInputChange}
                />
                {filtered.length > 0 && (
                    <Dropdown>
                        {filtered.map((service) => (
                            <DropdownItem key={service} onClick={() => handleSelect(service)}>
                                {service}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
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
    margin-bottom: 1.25rem;
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
    gap: 1.25rem;
    position: relative;
`;

const Title = styled.h1`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${TEXT_COLORS.black};
`;

const SearchInput = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    font-size: 1rem;
    background-color: #f7f7f7;
    color: ${TEXT_COLORS.default};
`;

// ✅ Dropdown
const Dropdown = styled.ul`
    margin-top: -0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    background: #fff;
    list-style: none;
    padding: 0.5rem 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const DropdownItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;