'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from '@/api/axiosInstance';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../assets/icons/back-icon.png'; // ⬅️ "뒤로가기"용 이미지만 유지
import Image from 'next/image';

const PRICE_UNITS = ['원', '달러'];
const PERIOD_UNITS = ['달', '년'];
const CATEGORY_OPTIONS: { name: string; value: number }[] = [
    { name: '음악', value: 2 },
    { name: 'OTT', value: 1 },
    { name: '툴', value: 6 },
    { name: 'AI', value: 5 },
    { name: '클라우드', value: 4 },
    { name: '기타', value: 7 },
];

export default function EditFirsthandPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('0');
    const [priceUnit, setPriceUnit] = useState('원');
    const [period, setPeriod] = useState('1');
    const [periodUnit, setPeriodUnit] = useState('달');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [passedMonth, setPassedMonth] = useState(0);
    const [categoryNo, setCategoryNo] = useState<number>(7); // 기타의 value

    const calculatePassedMonth = (start: string) => {
        const startDt = new Date(start);
        const today = new Date();
        let months = (today.getFullYear() - startDt.getFullYear()) * 12 + (today.getMonth() - startDt.getMonth());
        if (today.getDate() < startDt.getDate()) months -= 1;
        return Math.max(0, months);
    };

    const handleBack = () => router.back();

    const handleSave = async () => {
        try {
            await axios.post('/subscribe/create', {
                name,
                image: '', // 이미지 없음
                price: parseInt(price.replace(/,/g, '')) || 0,
                priceUnit: priceUnit === '달러' ? '$' : priceUnit,
                period: parseInt(period) || 1,
                periodUnit,
                startDate,
                categoryNo: categoryNo ?? 0,
            });
            router.push('/home');
        } catch (err) {
            console.error('❌ 생성 실패:', err);
            alert('저장에 실패했습니다.');
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setStartDate(newDate);
        setPassedMonth(calculatePassedMonth(newDate));
    };

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="back" width={75} height={75} />
                </BackButton>
            </TopBar>

            <InputGroup>
                <Label>서비스 이름</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="서비스 이름을 입력하세요" />

                <Label>구독 요금</Label>
                <Row>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Select
                        value={priceUnit === '$' ? '달러' : priceUnit}
                        onChange={(e) => setPriceUnit(e.target.value === '달러' ? '$' : e.target.value)}
                    >
                        {PRICE_UNITS.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </Select>
                </Row>

                <Label>구독 주기</Label>
                <Row>
                    <Input value={period} onChange={(e) => setPeriod(e.target.value)} />
                    <Select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value)}>
                        {PERIOD_UNITS.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </Select>
                </Row>

                <Label>구독 시작</Label>
                <Input type="date" value={startDate} onChange={handleDateChange} />

                <Label>구독 중인 개월 수</Label>
                <Input value={`${passedMonth}개월간 구독중`} readOnly />

                <Label>카테고리</Label>
                <Select
                    value={categoryNo}
                    onChange={(e) => setCategoryNo(parseInt(e.target.value))}
                >
                    <option value="" disabled>카테고리를 선택하세요</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                    ))}
                </Select>
            </InputGroup>

            <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </Container>
    );
}

// ------------------ 스타일 ------------------

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

const Select = styled.select`
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    font-size: 1rem;
    background-color: #fff;
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