import { useEffect, useState } from 'react';

interface Props {
  url: string;
}

export function useData<T>({ url }: Props) {
  const [data, setData] = useState<T[]>([]);
  const urlWithToken = url + `&token=${process.env.NEXT_PUBLIC_FINHUB_TOKEN}`;
  useEffect(() => {
    fetch(urlWithToken)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return data;
}
