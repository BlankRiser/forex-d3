import { ChangeEvent, useEffect, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/component';
import Chart from '@/component/charts/chart';
import { API_URL, BASE_URL } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useWindowSize } from '@/hooks/useWindowSize';
import { getChartSize } from '@/utils/get-chart-size';
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
  const [isUnavailable, setIsUnavailable] = useState(false);

  const debouncedQuery = useDebounce<string>(symbolQuery, 500);

  const { width } = useWindowSize();

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

    if (data === undefined) {
      setIsUnavailable(true);
      return;
    }
    setIsUnavailable(false);
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
        <div className='flex items-center  gap-2'>
          <div className='flex flex-col gap-1 '>
            <label htmlFor='symbol' className='text-sm font-medium text-neutral-300'>
              Search symbol
            </label>
            <input
              id='symbol'
              list='symbolList'
              type='text'
              value={symbolQuery}
              onChange={handleChange}
              className='border border-gray-800 bg-neutral-800 px-4 py-2  text-gray-200 focus:outline-none'
            />
          </div>
          {symbolResult.length > 0 ? (
            <>
              <select
                className='mt-auto border border-gray-800 bg-neutral-800 px-4 py-2  text-gray-200 focus:outline-none'
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                }}
              >
                <option value='select' defaultChecked>
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
            <>
              <div className='mt-auto grid h-10 w-28 place-items-center bg-neutral-800'>
                <Loader className='animate-spin text-neutral-400' />
              </div>
            </>
          )}
        </div>

        {chartData.length > 0 ? (
          <Chart data={chartData} width={getChartSize({ container_width: width })} height={500} />
        ) : (
          <div className='grid h-[500px] w-11/12 place-items-center bg-neutral-800'>
            {isUnavailable ? (
              <p className='font-medium text-neutral-300'>No data available for the symbol</p>
            ) : (
              <Loader className='animate-spin text-neutral-400' />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='grid h-screen w-screen place-items-center'>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
