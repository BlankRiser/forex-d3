import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export const protectedAuth = async (context: GetServerSidePropsContext, callback: () => any) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: '/404', permanent: false },
    };
  }
  return callback();
};
