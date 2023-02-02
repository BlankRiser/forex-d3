import Chart from '@/component/charts/candle';
import { protectedAuth } from '@/utils/protected-auth';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function Protected({ session }: { session: any }) {
  return (
    <div className='grid h-screen w-screen place-items-center'>
      <Chart />
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
