import { Button } from '@/component';
import { API_URL } from '@/constants/api-url';
import { BASE_URL } from '@/constants/base-url';
import { useData } from '@/hooks/useData';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const data = useData({
    url: BASE_URL.FINHUB_BASE_URL + API_URL.FINHUB.STOCK_SYMBOLS + '?exchange=US',
  });
  console.log(data);
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
