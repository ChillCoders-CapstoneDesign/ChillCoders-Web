'use client';

import { ReactNode, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import GlobalStyle from '../styles/globalStyles';

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    if (typeof window !== 'undefined')
        return (
            <>
                <GlobalStyle />
                {children}
            </>
        );

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            <GlobalStyle />
            {children}
        </StyleSheetManager>
    );
}