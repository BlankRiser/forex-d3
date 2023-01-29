import { Button } from '@/component';
import { GetServerSidePropsContext } from 'next';
import { getProviders, getSession, signIn, useSession } from 'next-auth/react';

export default function SingIn({ providers }: { providers: any }) {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  console.log('providers', providers);

  return (
    <div className='grid h-screen w-screen place-items-center'>
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
