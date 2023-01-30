import { ChangeEvent, useEffect, useState } from 'react';

import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/component';
import { API_URL, BASE_URL } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { getFinnhubData } from '@/utils/get-finnhub-data';

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [symbolQuery, setSymbolQuery] = useState<string>('');
  const debouncedValue = useDebounce<string>(symbolQuery, 500);
  const [symbolResult, setSymbolResult] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbolQuery(event.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (debouncedValue.length > 0) {
      getSearchResults({
        signal: controller.signal,
      });
    }
    return () => {
      controller.abort();
    };
  }, [debouncedValue]);

  async function getSearchResults(options: RequestInit) {
    const data = await getFinnhubData({
      url: BASE_URL.FINHUB_BASE_URL + API_URL.FINHUB.SEARCH + '?q=' + symbolQuery,
    });
    console.log(data);
    setSymbolResult(data.result);
    return data;
  }

  async function getStockCandle(options: RequestInit) {
    const data = await getFinnhubData({
      url:
        BASE_URL.FINHUB_BASE_URL +
        API_URL.FINHUB.STOCK_CANDLES +
        '?symbol=AAPL&resolution=D&from=1590988249&to=1591852249',
      options: options,
    });
    console.log(data);
    return data;
  }

  // useEffect(() => {
  //   if (symbolQuery.length > 0) {
  //     getStockCandle();
  //   }

  //   return () => {};
  // }, [symbolQuery]);

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

      <input
        type='text'
        value={symbolQuery}
        onChange={handleChange}
        className='border bg-gray-50 text-gray-800 focus:outline-none'
      />

      {symbolResult.length > 0 ? (
        <select
          name=''
          id=''
          // onChange={(e) => {
          //   setSymbol(e.target.value);
          // }}
        >
          {symbolResult?.slice(0, 10)?.map((item: any) => (
            <option key={item.symbol} value={item.symbol}>
              {item.symbol}
            </option>
          ))}
        </select>
      ) : (
        <div className='animate-pulse rounded-sm bg-gray-200 px-4 py-2'>Loading</div>
      )}
    </div>
  );
}
