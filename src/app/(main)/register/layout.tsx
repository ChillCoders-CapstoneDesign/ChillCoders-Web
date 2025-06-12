'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { Providers } from '@/app/providers';
import BottomTab from '@/components/layout/BottomTab';

export default function RegisterLayout({ children }: PropsWithChildren) {
    const pathname = usePathname();

    return (
        <Providers>
            <LayoutWrapper>
                <MainContent>{children}</MainContent>
                <BottomTab currentPath={pathname} />
            </LayoutWrapper>
        </Providers>
    );
}

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    position: relative;
    background-color: ${COLORS.white};

    --bottom-tab-height: 4.25rem;

    @media (max-width: 430px) {
        max-width: 100%;
    }
`;

const MainContent = styled.main`
    flex: 1;
    padding-bottom: var(--bottom-tab-height);
    overflow-y: auto;
`;