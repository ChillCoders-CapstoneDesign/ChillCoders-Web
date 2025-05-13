'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type StyledLayoutProps = {
    children: ReactNode;
};

const StyledLayout = ({ children }: StyledLayoutProps) => {
    return (
        <PageContainer>
            <MobileContainer>
                <ContentContainer>{children}</ContentContainer>
            </MobileContainer>
        </PageContainer>
    );
};

export default StyledLayout;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;
`;

const MobileContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    background-color: white;

    @media (min-width: 431px) {
        width: 430px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    @media (min-width: 768px) {
        width: 480px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
`;
