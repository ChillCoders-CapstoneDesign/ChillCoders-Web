import dynamic from 'next/dynamic';

const EditClient = dynamic(() => import('./EditClient'), { ssr: false });

export default function EditPage() {
    return <EditClient />;
}