import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = 'Jane.DevLog';
const DEFAULT_DESCRIPTION =
  'Welcome to my DevLog where I upload whatever I felt worth noting while developing.';
const SITE_DOMAIN = 'https://fly1chop.github.io';

const Header = ({ title, description }: Props) => {
  const router = useRouter();

  const fullTitle = title ? `${title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const fullUrl = SITE_DOMAIN + router.asPath;

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta
        key="desc"
        name="description"
        content={description ?? DEFAULT_DESCRIPTION}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ?? DEFAULT_TITLE} />
      <meta
        property="og:description"
        content={description ?? DEFAULT_DESCRIPTION}
      />
      <meta property="og:url" content={fullUrl} />
    </Head>
  );
};

export default Header;
