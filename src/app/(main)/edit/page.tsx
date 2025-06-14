'use client';

import { Suspense } from 'react';
import EditClient from './EditClient';

export default function EditPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <EditClient />
        </Suspense>
    );
}