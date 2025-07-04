'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userRef = doc(db, 'users', user.uid);

      // Store user data in Firestore
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString()
      });

      // 🔍 Debug: Attempt to fetch the document just written
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log('User document created:', docSnap.data());
        } else {
          console.warn('User document not found after creation.');
        }
      } catch (err) {
        console.error('Firestore Read Error:', err);
      }

      toast.success('Account created successfully!');
      router.push('/sign-in');

    } catch (error: any) {
      toast.error(error.message || 'Sign up failed');
    }
  };

  return (
    <div className="flex justify-center items-center pt-7">
      <Card className="w-[80%] max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-900 text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <div className="flex justify-center">
              <Button className="bg-blue-900 hover:bg-blue-800 w-full max-w-xs">Sign Up</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/sign-in" className="underline text-blue-900 hover:text-blue-800">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
