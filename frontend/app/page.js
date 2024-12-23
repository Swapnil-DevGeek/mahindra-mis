'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Login from "@/components/Login";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  return (
    <>
      {!user && <Login />}
    </>
  );
}
