import { Button } from '@/component';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'authenticated') {
    return (
      <div className='grid h-screen w-screen place-items-center'>
        <Button onClick={() => signOut()}>Sign out: as {userEmail}</Button>
      </div>
    );
  }

  return (
    <div className='grid h-screen w-screen place-items-center'>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
