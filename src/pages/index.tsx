import { ChangeEvent, useEffect, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/component';
import Chart from '@/component/charts/chart';
import { API_URL, BASE_URL } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { getFinnhubData } from '@/utils/get-finnhub-data';
import { convertToArrayObjects } from '@/utils/obj-to-array';
import { Loader } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [chartData, setCharData] = useState<any>([]);

  const [symbolQuery, setSymbolQuery] = useState<string>('');
  const [symbolResult, setSymbolResult] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const debouncedQuery = useDebounce<string>(symbolQuery, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSymbolQuery(event.target.value);
    console.log('symbolQuery', symbolQuery);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (debouncedQuery.length > 0) {
      getSearchResults({
        signal: controller.signal,
      });
    }
    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  async function getSearchResults(options: RequestInit) {
    const data = await getFinnhubData({
      url: BASE_URL.FINHUB_BASE_URL + API_URL.FINHUB.SEARCH + '?q=' + symbolQuery,
      options: options,
    });
    setSymbolResult(data.result);
    return data;
  }

  async function getStockCandle(options?: RequestInit) {
    const data = await getFinnhubData({
      url:
        BASE_URL.FINHUB_BASE_URL +
        API_URL.FINHUB.STOCK_CANDLES +
        `?symbol=${selectedSymbol}&resolution=D&from=1590988249&to=1591852249`,
      options: options,
    });

    console.log(selectedSymbol, 'symbol data', data);
    const formattedData = convertToArrayObjects(data).map((item: any) => {
      return {
        time: item.t,
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
        volume: item.v,
      };
    });
    setCharData(formattedData);
    return data;
  }

  useEffect(() => {
    if (selectedSymbol.length > 0) {
      getStockCandle();
    }

    return () => {};
  }, [selectedSymbol]);

  if (status === 'loading') {
    return (
      <>
        <Loader className='animate-spin' />
      </>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className='grid h-screen w-screen place-items-center bg-neutral-900'>
        <Button onClick={() => signOut()}>Sign out: as {userEmail}</Button>
        <div>
          <input
            id='symbol'
            list='symbolList'
            type='text'
            value={symbolQuery}
            onChange={handleChange}
            className='border border-gray-800 bg-neutral-800 px-4 py-2  text-gray-200 focus:outline-none'
          />
          <datalist
            id='symbolList'
            className='w-full border border-gray-800 bg-neutral-800 px-4 py-2  text-gray-200 focus:outline-none'
            // onChange={(e) => {
            //   setSelectedSymbol(e.target.);
            // }}
          >
            <option value='' defaultChecked className='w-full'>
              Select symbol
            </option>
            {symbolResult?.slice(0, 10)?.map((item: any) => (
              <option key={item.symbol} value={item.symbol}>
                {item.symbol}
              </option>
            ))}
          </datalist>
          {symbolResult.length > 0 ? (
            <>
              <select
                className='border border-gray-800 bg-neutral-800 px-4 py-2  text-gray-200 focus:outline-none'
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                }}
              >
                <option value='' defaultChecked>
                  Select symbol
                </option>
                {symbolResult?.slice(0, 10)?.map((item: any) => (
                  <option key={item.symbol} value={item.symbol}>
                    {item.symbol}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <Loader className='animate-spin' />
          )}
        </div>

        <Chart data={chartData} width={500} height={500} />
      </div>
    );
  }

  return (
    <div className='grid h-screen w-screen place-items-center'>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
