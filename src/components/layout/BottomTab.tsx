// src/components/layout/BottomTab.tsx
'use client';

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
            {isHome && (
                <TabItem>
                    <Link href="/register">
                        <PlusCircleOutlined style={{ fontSize: 35, color: COLORS.main }} />
                    </Link>
                </TabItem>
            )}
            {isRegister && (
                <TabItem>
                    <Link href="/home">
                        <HomeFilled style={{ fontSize: 35, color: COLORS.main }} />
                    </Link>
                </TabItem>
            )}
        </TabWrapper>
    );
};

export default BottomTab;

const TabWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px; /* ✅ 폰 크기 고정 */
    height: 6rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-top: 1px solid #eee;
    z-index: 1000;
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