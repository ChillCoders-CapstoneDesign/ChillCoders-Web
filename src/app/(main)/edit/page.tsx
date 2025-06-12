'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/api/axiosInstance';
import { COLORS, TEXT_COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/font';
import backIcon from '../../../assets/icons/back-icon.png';

interface SubscribeDetail {
    subscribeName: string;
    image: string;
    price: number;
    priceUnit: string;
    period: number;
    periodUnit: string;
    startDate: string;
    passedMonth: number;
}

const PRICE_UNITS = ['원', '달러'];
const PERIOD_UNITS = ['달', '년'];

export default function EditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const subscribeNo = searchParams.get('subscribeNo');

    const [data, setData] = useState<SubscribeDetail | null>(null);
    const [price, setPrice] = useState('');
    const [priceUnit, setPriceUnit] = useState('');
    const [period, setPeriod] = useState('');
    const [periodUnit, setPeriodUnit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [passedMonth, setPassedMonth] = useState(0);

    useEffect(() => {
        if (!subscribeNo) return;

        axios
            .get(`/subscribe/${subscribeNo}`)
            .then((res) => {
                const fetched = res.data;
                setData(fetched);
                setPrice(fetched.price.toString());
                setPriceUnit(fetched.priceUnit);
                setPeriod(fetched.period.toString());
                setPeriodUnit(fetched.periodUnit);
                setStartDate(fetched.startDate);
                setPassedMonth(calculatePassedMonth(fetched.startDate));
            })
            .catch((err) => console.error('❌ 구독 정보 불러오기 실패:', err));
    }, [subscribeNo]);

    const calculatePassedMonth = (start: string) => {
        const startDt = new Date(start);
        const today = new Date();

        let months = (today.getFullYear() - startDt.getFullYear()) * 12 + (today.getMonth() - startDt.getMonth());

        if (today.getDate() < startDt.getDate()) {
            months -= 1;
        }

        return Math.max(0, months);
    };

    const handleBack = () => router.back();

    const handleSave = async () => {
        try {
            await axios.put(`/subscribe/${subscribeNo}`, {
                name: data?.subscribeName ?? '',             // ✅ 키 이름 수정
                image: data?.image ?? '',
                price: parseInt(price.replace(/,/g, '')) || 0,
                priceUnit: priceUnit || '원',
                period: parseInt(period) || 1,
                periodUnit: periodUnit || '달',
                startDate: startDate || '2025-01-01',
                categoryNo: 0,
            });
            router.push('/home');
        } catch (err) {
            console.error('❌ 저장 실패:', err);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setStartDate(newDate);
        setPassedMonth(calculatePassedMonth(newDate));
    };

    const getResolvedImageUrl = (img: string) => {
        if (!img || img === 'null') return '/images/gray-circle.png';
        if (img.startsWith('http')) return img;
        return `https://your-temp-domain.com/${img}`;
    };

    if (!subscribeNo) {
        return <div>잘못된 접근입니다. (구독 번호 없음)</div>;
    }

    if (!data) {
        return <div>구독 정보를 불러오고 있습니다...</div>;
    }

    return (
        <Container>
            <TopBar>
                <BackButton onClick={handleBack}>
                    <Image src={backIcon} alt="back" width={75} height={75} />
                </BackButton>
            </TopBar>

            <Image
                src={getResolvedImageUrl(data.image)}
                alt={data.subscribeName}
                width={170}
                height={170}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
            />
            <ServiceName>{data.subscribeName} ✏️</ServiceName>

            <InputGroup>
                <Label>구독 요금</Label>
                <Row>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Select value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)}>
                        {PRICE_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </Select>
                </Row>

                <Label>구독 주기</Label>
                <Row>
                    <Input value={period} onChange={(e) => setPeriod(e.target.value)} />
                    <Select value={periodUnit} onChange={(e) => setPeriodUnit(e.target.value)}>
                        {PERIOD_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </Select>
                </Row>

                <Label>구독 시작</Label>
                <Input type="date" value={startDate} onChange={handleDateChange} />

                <Label>구독 중인 개월 수</Label>
                <Input value={`${passedMonth}개월간 구독중`} readOnly />
            </InputGroup>

            <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </Container>
    );
}

// 스타일링
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