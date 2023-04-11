import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import styles from './posts.module.scss';

const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then(m => m.Code),
  {
    ssr: false
  }
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(m => m.Equation)
);

interface Props {
  recordMap: ExtendedRecordMap;
  title: string;
}

const NotionContent = ({ recordMap, title }: Props) => {
  return (
    <section>
      <h1 className={styles.title}>{title}</h1>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          Code,
          Equation,
          nextImage: Image,
          nextLink: Link
        }}
      />
    </section>
  );
};

export default NotionContent;
