import { TableOfContentsEntry } from 'notion-utils';
import { useState } from 'react';
import styles from './posts.module.scss';

interface Props {
  toc: TableOfContentsEntry[];
}

const TableOfContent = ({ toc }: Props) => {
  const [isActive, setIsActive] = useState(0);

  const formattedId = (id: string) => {
    return id.replaceAll('-', '');
  };

  return (
    <nav className={styles.toc}>
      <ul>
        {toc &&
          toc.map(x => (
            <li key={x.id}>
              <a href={`#${formattedId(x.id)}`}>{x.text}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default TableOfContent;
