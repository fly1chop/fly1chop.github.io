import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import styles from './posts.module.scss';
import { TagResponse } from '@/types/tag';
import Tag from '../base/Tag';
import Giscus from '@giscus/react';

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
  tags: TagResponse[];
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
        bodyClassName={styles.notionCustom}
        recordMap={recordMap}
        fullPage={false}
        components={{
          Code,
          Equation,
          nextImage: Image,
          nextLink: Link
        }}
      />
      <div className={styles.giscus}>
        <Giscus
          id="comments"
          term="blog"
          repo="fly1chop/fly1chop.github.io"
          repoId="R_kgDOJM59ng"
          category="General"
          categoryId="DIC_kwDOJM59ns4CV1uI"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default NotionContent;
