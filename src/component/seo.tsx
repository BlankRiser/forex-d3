import Head from 'next/head';

interface Props {
  title: string;
  description: string;
}

export function Seo(props: Props) {
  const { title = 'Forex D3', description = 'Visualize' } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://metatags.io/' />
      <meta property='og:title' content='Next.js + TypeScript Example' />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='/favicon.ico' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://metatags.io/' />
      <meta property='twitter:title' content='Next.js + TypeScript Example' />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content='/favicon.ico' />
    </Head>
  );
}
