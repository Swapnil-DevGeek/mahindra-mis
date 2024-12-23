'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ProtectedPage() {
    const { user, loading,logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/'); // Redirect if not authenticated
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null; // Prevent rendering anything if redirecting
    }

    return (
        <div>
            Welcome, {user.name}!
            <Button onClick={()=>logout()}>Logout</Button>
        </div>
    )
}
