// src/app/(main)/register/done/page.tsx
'use client';

import { Suspense } from 'react';
import RegisterDoneContent from './RegisterDoneContent';

export default function RegisterDonePage() {
    return (
        <Suspense fallback={<div>불러오는 중...</div>}>
            <RegisterDoneContent />
        </Suspense>
    );
}