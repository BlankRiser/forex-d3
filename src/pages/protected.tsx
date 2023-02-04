import { protectedAuth } from '@/utils/protected-auth';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function Protected({ session }: { session: any }) {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <div className='text-white'>Protected Page</div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  return protectedAuth(context, () => {
    return {
      props: { session },
    };
  });
}
