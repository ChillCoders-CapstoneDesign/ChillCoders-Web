'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from '@/api/axiosInstance';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../assets/icons/back-icon.png';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerSizeOverride } from '../../../styles/globalStyles';
import type { DatePickerProps } from 'react-datepicker';

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
    const [categoryNo, setCategoryNo] = useState<number>(7);
    const [startDateObj, setStartDateObj] = useState<Date | null>(null);

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
                image: '',
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

    const handleDateSelect = (date: Date | null) => {
        if (!date) return;
        setStartDateObj(date);
        const iso = date.toISOString().split('T')[0];
        setStartDate(iso);
        setPassedMonth(calculatePassedMonth(iso));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setStartDate(newDate);
        setPassedMonth(calculatePassedMonth(newDate));
    };

    return (
        <>
            <DatePickerSizeOverride />
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
                    <StyledDatePicker
                        selected={startDateObj}
                        onChange={handleDateSelect}
                        dateFormat="yyyy. MM. dd"
                        placeholderText="날짜 선택"
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                        portalId={null}
                        withPortal
                        popperModifiers={[
                            { name: 'offset', options: { offset: [0, 8] } },
                            { name: 'preventOverflow', enabled: false },
                            { name: 'flip', enabled: false },
                        ]}
                    />

                    <Label>구독 중인 개월 수</Label>
                    <Input value={`${passedMonth}개월간 구독중`} readOnly />

                    <Label>카테고리</Label>
                    <CategorySelect
                        value={categoryNo}
                        onChange={(e) => setCategoryNo(parseInt(e.target.value))}
                    >
                        <option value="" disabled>카테고리를 선택하세요</option>
                        {CATEGORY_OPTIONS.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.name}</option>
                        ))}
                    </CategorySelect>
                </InputGroup>

                <SaveButton onClick={handleSave}>저장하기</SaveButton>
            </Container>
        </>
    );
}

// ------------------ 스타일 ------------------

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: ${COLORS.white};
    gap: 1rem;
    padding: 10rem 2rem 14rem;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const TopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 4.5rem;
    background-color: ${COLORS.white};
    z-index: 10;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    padding-top: 1rem;
    padding-left: 1rem;
    cursor: pointer;
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
    width: 4rem;
    height: 2.75rem;
    padding: 0 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #fff;
    text-align: center;
    appearance: none;
`;

const CategorySelect = styled.select`
    width: 100%; // 또는 예: width: 12rem;
    height: 2.75rem;
    padding: 0 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #fff;
    text-align: left;
    appearance: none;
`;

const StyledDatePicker = styled(DatePicker as any)`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  font-family: ${FONTS.PRETENDARD[500]};
  color: ${TEXT_COLORS.default};
  position: relative;
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