'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToSignIn() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sign-in');
  }, [router]);

  return null;
}
