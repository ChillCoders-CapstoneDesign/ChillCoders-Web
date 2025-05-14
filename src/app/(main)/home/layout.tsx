// src/app/(main)/home/layout.tsx
'use client';
import { Providers } from '../../providers';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <Providers>
                        {children}
                </Providers>
            </body>
        </html>
    );
}