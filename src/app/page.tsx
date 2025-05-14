// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/home'); // 👈 여기에 원하는 경로 입력
}