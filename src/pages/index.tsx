import { useData } from '@/hooks/useData';
import { useEffect, useState } from 'react';

import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/component';
import { API_URL, BASE_URL } from '@/constants';
import { getFinnhubData } from '@/utils/get-finnhub-data';

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [symbol, setSymbol] = useState<string>('');

  const data = useData<StockSymbol[]>({
    url: BASE_URL.FINHUB_BASE_URL + API_URL.FINHUB.STOCK_SYMBOLS + '?exchange=US',
  });

  async function getStockCandle() {
    const data = await getFinnhubData({
      url:
        BASE_URL.FINHUB_BASE_URL +
        API_URL.FINHUB.STOCK_CANDLES +
        '?symbol=AAPL&resolution=D&from=1590988249&to=1591852249',
    });
    console.log(data);
    return data;
  }

  useEffect(() => {
    if (symbol.length > 0) {
      getStockCandle();
    }

    return () => {};
  }, [symbol]);

  // if (status === 'loading') {
  //   return <p>Hang on there...</p>;
  // }

  // if (status === 'authenticated') {
  //   return (
  //     <div className='grid h-screen w-screen place-items-center'>
  //       <Button onClick={() => signOut()}>Sign out: as {userEmail}</Button>
  //     </div>
  //   );
  // }

  return (
    <div className='grid h-screen w-screen place-items-center'>
      <Button onClick={() => signIn()}>Sign in</Button>

      <select
        name=''
        id=''
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
      >
        {data?.slice(0, 10)?.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
