import '@/styles/main.scss';
import Layout from '@/components/layout/layout';
import type { AppProps } from 'next/app';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  fallback: ['Noto Sans Kr', 'sans-serif'],
  display: 'fallback'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          body {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
