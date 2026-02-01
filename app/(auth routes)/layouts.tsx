'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';

interface AuthRoutesProps {
  children: React.ReactNode;
}

const AuthRoutesLayout = ({ children }: AuthRoutesProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const valid = await checkSession();
        if (!valid) router.push('/auth/login');
      } catch {
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default AuthRoutesLayout;
