'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { Providers } from '../../providers';

export default function EditLayout({ children }: PropsWithChildren) {
    return (
        <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
    );
}

const LayoutWrapper = styled.div`
    height: 100vh;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    background-color: ${COLORS.white};
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem 2rem;

    @media (max-width: 430px) {
        max-width: 100%;
    }
`;