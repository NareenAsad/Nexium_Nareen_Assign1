// app/sign-in/page.tsx
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Fill all fields');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${userCredential.user.displayName || 'User'}!`);
      router.push('/dashboard');
    } catch (err: any) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <Card className="w-[90%] max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900 text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="flex justify-center">
              <Button className="bg-blue-900 hover:bg-blue-800 w-full max-w-xs">Sign In</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="underline text-blue-900 hover:text-blue-800">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
