import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { useEffect, useState } from 'react';

interface Props {
  url: string;
  options?: RequestInit;
}

export function useData<T = unknown>({ url, options }: Props) {
  const [data, setData] = useState<T>();
  const urlWithToken = url + `&token=${process.env.NEXT_PUBLIC_FINHUB_TOKEN}`;

  useEffect(() => {
    const controller = new AbortController();

    fetch(urlWithToken, {
      method: 'GET',
      signal: controller.signal,
      ...options,
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlWithToken]);

  return data;
}
