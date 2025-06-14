'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/api/axiosInstance';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../assets/icons/back-icon.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerSizeOverride } from '../../../styles/globalStyles';
import type { DatePickerProps } from 'react-datepicker';


interface SubscribeDetail {
    subscribeName: string;
    image: string;
    price: number;
    priceUnit: string;
    period: number;
    periodUnit: string;
    startDate: string;
    passedMonth: number;
    categoryNo: number;
}

const PRICE_UNITS = ['₩', '$'];
const PERIOD_UNITS = ['달', '년'];

export default function EditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('subscribeNo');

    const [data, setData] = useState<SubscribeDetail | null>(null);
    const [price, setPrice] = useState('');
    const [priceUnit, setPriceUnit] = useState('');
    const [period, setPeriod] = useState('');
    const [periodUnit, setPeriodUnit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startDateObj, setStartDateObj] = useState<Date | null>(null);
    const [passedMonth, setPassedMonth] = useState(0);

    useEffect(() => {
        if (!id) return;

        axios.get(`/subscribe/${id}`).then((res) => {
            const fetched = res.data;
            setData(fetched);
            setPrice(fetched.price.toString());
            setPriceUnit(fetched.priceUnit);
            setPeriod(fetched.period.toString());
            setPeriodUnit(fetched.periodUnit);
            setStartDate(fetched.startDate);
            setStartDateObj(new Date(fetched.startDate));
            setPassedMonth(calculatePassedMonth(fetched.startDate));
        }).catch(() => {
            alert('잘못된 접근입니다.');
            router.push('/home');
        });
    }, [id]);

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
            await axios.put(`/subscribe/${id}`, {
                name: data?.subscribeName,
                image: data?.image,
                price: parseInt(price.replace(/,/g, '')) || 0,
                priceUnit: priceUnit || '원',
                period: parseInt(period) || 1,
                periodUnit: periodUnit || '달',
                startDate: startDate || '2025-01-01',
                categoryNo: data?.categoryNo ?? 0,
            });
            router.push('/home');
        } catch {
            alert('수정에 실패했습니다.');
        }
    };

    const handleDateSelect = (date: Date | null) => {
        if (!date) return;
        setStartDateObj(date);
        const iso = date.toISOString().split('T')[0];
        setStartDate(iso);
        setPassedMonth(calculatePassedMonth(iso));
    };

    const getResolvedImageUrl = (img: string) => {
        if (!img || img === 'null' || img.trim() === '') return null;
        if (img.startsWith('http')) return img;
        return `https://your-temp-domain.com/${img}`;
    };

    if (!id) return <div>잘못된 접근입니다. (id 없음)</div>;
    if (!data) return <div>구독 정보를 불러오고 있습니다...</div>;

    return (
        <>
            <DatePickerSizeOverride />
            <Container>
                <TopBar>
                    <BackButton onClick={handleBack}>
                        <Image src={backIcon} alt="back" width={75} height={75} />
                    </BackButton>
                </TopBar>

                {getResolvedImageUrl(data.image) && (
                    <Image
                        src={getResolvedImageUrl(data.image)!}
                        alt={data.subscribeName}
                        width={170}
                        height={170}
                        style={{ borderRadius: '1rem', objectFit: 'cover' }}
                    />
                )}
                <ServiceName>{data.subscribeName}</ServiceName>

                <InputGroup>
                    <Label>구독 요금</Label>
                    <Row>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                        <Select value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)}>
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
                        portalId={null} // ✅ 포털 완전 비활성화
                        withPortal
                        popperModifiers={[
                            { name: 'offset', options: { offset: [0, 8] } },
                            { name: 'preventOverflow', enabled: false },
                            { name: 'flip', enabled: false },
                        ]}
                    />

                    <Label>구독 중인 개월 수</Label>
                    <Input value={`${passedMonth}개월간 구독중`} readOnly />
                </InputGroup>

                <SaveButton onClick={handleSave}>저장하기</SaveButton>
            </Container>
        </>

    );
}

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