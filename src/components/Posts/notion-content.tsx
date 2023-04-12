import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import styles from './posts.module.scss';
import { Tag as TTag } from '@/types/post';
import Tag from '../base/Tag';

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
  tags: TTag[];
  date: string;
}

const NotionContent = ({ recordMap, title, tags, date }: Props) => {
  return (
    <section>
      <ul className={styles.tags}>
        {tags.map(tag => (
          <li key={tag.id}>
            <Tag name={tag.name} fill={true} size="default" key={tag.id} />
          </li>
        ))}
      </ul>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>{date}</p>
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
