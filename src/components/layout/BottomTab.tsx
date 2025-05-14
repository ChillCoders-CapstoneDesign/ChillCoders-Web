// src/components/layout/BottomTab.tsx
'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { HomeFilled, PlusCircleOutlined } from '@ant-design/icons';
import { COLORS } from '@/constants/colors';

type BottomTabProps = {
    currentPath: string;
};

const BottomTab = ({ currentPath }: BottomTabProps) => {
    const isHome = currentPath.startsWith('/home');
    const isRegister = currentPath.startsWith('/register');

    return (
        <TabWrapper>
            <TabItem>
                <Link href="/home">
                    <HomeFilled style={{ fontSize: 35, color: COLORS.main }} />
                </Link>
            </TabItem>
            <TabItem>
                <Link href="/register">
                    <PlusCircleOutlined style={{ fontSize: 35, color: COLORS.main }} />
                </Link>
            </TabItem>
        </TabWrapper>
    );
};

export default BottomTab;

const TabWrapper = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 6rem;
    background-color: white;
    border-top: 1px solid #eee;
`;


const TabItem = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        cursor: pointer;
    }
`;