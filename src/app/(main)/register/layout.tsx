'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { Providers } from '@/app/providers';

export default function RegisterLayout({ children }: PropsWithChildren) {
    return (
        <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
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
    background-color: ${COLORS.white};
    overflow-y: auto;

    @media (max-width: 430px) {
        max-width: 100%;
    }
`;