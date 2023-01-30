interface Params {
  url: string;
  options?: RequestInit;
}

export async function getFinnhubData({ url, options }: Params) {
  const urlWithToken = url + `&token=${process.env.NEXT_PUBLIC_FINHUB_TOKEN}`;

  const res = await fetch(urlWithToken, {
    method: 'GET',
    ...options,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));

  return res;
}
