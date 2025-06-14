import { Suspense } from 'react';
import EditFirsthandPageClient from './EditFirsthandPageClient';

export default function EditFirsthandPageWrapper() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <EditFirsthandPageClient />
        </Suspense>
    );
}